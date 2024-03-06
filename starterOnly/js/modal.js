const toggleMobileNav = () => {
  var x = document.getElementById("myTopnav");
  x.classList.toggle('responsive');
}

// DOM Elements
const modalBg = document.querySelector(".bground");
const modalContent = document.querySelector(".content");
const openModalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtns = document.querySelectorAll(".close-modal-action-btn");

// open the modal when clicking on the button
openModalBtn.forEach((btn) => btn.addEventListener("click", () => {
  modalBg.style.display = "block";
}));

closeModalBtns.forEach(closeModalBtn =>
  closeModalBtn.addEventListener("click", () => {
    modalContent.style.animation = 'modalclose .8s forwards';
    modalBg.style.animation = "fadeOut .3s .4s forwards";
    setTimeout(() => {
      modalBg.style.display = "none";
      modalBg.style.animation = "";
      modalContent.style.animation = '';
    }, 800)
  })
);

/// Form


const modalForm = document.querySelector("form[name=reserve]");
const modalSuccess = document.querySelector(".modal-send-success");

const firstNameElement = document.getElementById('form-data-first');
const firstNameInputField = firstNameElement.querySelector('input');

const lastNameElement = document.getElementById('form-data-last');
const lastNameInputField = lastNameElement.querySelector('input');

const emailElement = document.getElementById('form-data-email');
const emailInputField = emailElement.querySelector('input');

const birthdateElement = document.getElementById('form-data-birthdate');
const birthdateInputField = birthdateElement.querySelector('input');

const tournamentEntriesElement = document.getElementById('form-data-quantity');
const tournamentEntriesInputField = tournamentEntriesElement.querySelector('input');

const tournamentLocationsElement = document.getElementById('form-data-tournament-locations');
const tournamentLocationsInputFields = tournamentLocationsElement.querySelectorAll('input');

const agreeTermsOfUseElement = document.getElementById('form-data-agree-terms-of-use');
const agreeTermsOfUseInputField = document.getElementById('checkbox1');

const subscribeNewsletterInputField  = document.getElementById('checkbox2');

const errorMessages = {
  first: "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
  last: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  email: "Veuillez saisir une adresse Email valide.",
  birthdate: "Vous devez entrer votre date de naissance.",
  tournamentEntries: "Vous devez saisir votre nombre de participation.",
  tournamentLocations: "Vous devez saisir le tournois auquel vous souhaitez participer",
  agreeTermsOfUse: "Vous devez vérifier que vous acceptez les termes et conditions.",
}

const validateFields = () => {
  return [validateFirstName(), validateLastName(), validateEmail(), validateBirthdate(), validateTournamentEntries(), validateTournamentLocations(), validateAgreeTermsOfUse()].filter(formFieldInError => formFieldInError === false).length === 0;
}

const validateFirstName = () => {
  const isError = firstNameInputField.value.length < parseInt(firstNameInputField.getAttribute('minlength'));
  firstNameElement.setAttribute('data-error-visible', isError)
  firstNameElement.setAttribute('data-error', errorMessages.first)
  return !isError;
}

const validateLastName = () => {
  const isError = lastNameInputField.value.length < parseInt(lastNameInputField.getAttribute('minlength'));
  lastNameElement.setAttribute('data-error-visible', isError)
  lastNameElement.setAttribute('data-error', errorMessages.last)
  return !isError;
}

const validateEmail = () => {
  const isError = !/^\S+@\S+\.\S+$/.test(emailInputField.value) || emailInputField.value === '';
  emailElement.setAttribute('data-error-visible', isError)
  emailElement.setAttribute('data-error', errorMessages.email)
  return !isError;
}

const validateBirthdate = () => {
  const isError = birthdateInputField.value === '' || new Date(birthdateInputField.value) > new Date();
  birthdateElement.setAttribute('data-error-visible', isError)
  birthdateElement.setAttribute('data-error', errorMessages.birthdate)
  return !isError;
}

const validateTournamentEntries = () => {
  const isError = tournamentEntriesInputField.value === '' || parseInt(tournamentEntriesInputField.value) < 0;
  tournamentEntriesElement.setAttribute('data-error-visible', isError)
  tournamentEntriesElement.setAttribute('data-error', errorMessages.tournamentEntries)
  return !isError;
}

const validateAgreeTermsOfUse = () => {
  const isError = !agreeTermsOfUseInputField.checked;
  isError ? agreeTermsOfUseElement.classList.add('error') : agreeTermsOfUseElement.classList.remove('error');
  return !isError;
}

const validateTournamentLocations = () => {
  var isError = Array.from(tournamentLocationsInputFields).filter(input => input.checked).length === 0;
  tournamentLocationsElement.setAttribute('data-error-visible', isError)
  tournamentLocationsElement.setAttribute('data-error', errorMessages.tournamentLocations)
  return !isError;}

// Listen when user submit the form
modalForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const canSubmit = validateFields();

  if (canSubmit) {
    const formData = {
      firstName: firstNameInputField.value,
      lastName: lastNameInputField.value,
      email: emailInputField.value,
      birthdate: new Date(birthdateInputField.value).toDateString(),
      quantity: parseInt(tournamentEntriesInputField.value),
      location: getSelectedTournamentLocation(),
      agreeTermsOfUse: agreeTermsOfUseInputField.checked,
      subscribeNewsletter: subscribeNewsletterInputField.checked,
    }
    console.log('Form data', formData);
    displaySuccessModal();
  }else {
    console.log('Form contains errors')
  }
})

const getSelectedTournamentLocation = () => {
  return Array.from(tournamentLocationsInputFields).find(input => input.checked).value;
}

const displaySuccessModal = () => {
  modalForm.classList.add('hidden');
  modalSuccess.classList.remove('hidden');
}

firstNameElement.addEventListener('input', () => { validateFirstName() })
lastNameElement.addEventListener('input', () => { validateLastName() })
emailElement.addEventListener('input', () => { validateEmail() })
birthdateElement.addEventListener('input', () => { validateBirthdate() })
tournamentEntriesElement.addEventListener('change', () => { validateTournamentEntries() })
tournamentLocationsElement.addEventListener('change', () => { validateTournamentLocations() })
agreeTermsOfUseElement.addEventListener('change', () => { validateAgreeTermsOfUse() })