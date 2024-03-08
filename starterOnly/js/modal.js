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

const subscribeNewsletterInputField = document.getElementById('checkbox2');


const formFieldsData =
    {
        first:
            {
                element: document.getElementById('form-data-first'),
                inputField: document.getElementById('form-data-first').querySelector('input'),
                validator: function () {
                    return this.inputField.value.length < parseInt(this.inputField.getAttribute('minlength'));
                },
                errorMessage: "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
            },
        last:
            {
                element: document.getElementById('form-data-last'),
                inputField: document.getElementById('form-data-last').querySelector('input'),
                validator: function () {
                    return this.inputField.value.length < parseInt(this.inputField.getAttribute('minlength'));
                },
                errorMessage: "Veuillez entrer 2 caractères ou plus pour le champ du nom."
            },
        tournamentEntries:
            {
                element: document.getElementById('form-data-quantity'),
                inputField: document.getElementById('form-data-quantity').querySelector('input'),
                validator: function () {
                    return this.inputField.value === '' || parseInt(this.inputField.value) < 0
                },
                errorMessage: "Vous devez saisir votre nombre de participation."
            },
        email:
            {
                element: document.getElementById('form-data-email'),
                inputField: document.getElementById('form-data-email').querySelector('input'),
                validator: function () {
                    return !/^\S+@\S+\.\S+$/.test(this.inputField.value) || this.inputField.value === '';
                },
                errorMessage: "Veuillez saisir une adresse Email valide."
            },
        birthdate:
            {
                element: document.getElementById('form-data-birthdate'),
                inputField: document.getElementById('form-data-birthdate').querySelector('input'),
                validator: function () {
                    return this.inputField.value === '' || new Date(this.inputField.value) > new Date();
                },
                errorMessage: "Vous devez entrer votre date de naissance."
            },
        tournamentLocations:
            {
                element: document.getElementById('form-data-tournament-locations'),
                inputField: document.getElementById('form-data-tournament-locations').querySelectorAll('input'),
                validator: function () {
                    return Array.from(this.inputField).filter(input => input.checked).length === 0;
                },
                errorMessage: "Vous devez saisir le tournois auquel vous souhaitez participer."
            },
      agreeTermsOfUse:
          {
            element: document.getElementById('form-data-agree-terms-of-use'),
            inputField: document.getElementById('checkbox1'),
            validator: function () {
              return !this.inputField.checked;
            },
            errorMessage: "Vous devez vérifier que vous acceptez les termes et conditions."
          }
    };


const validateField = (element) => {
    element.element.setAttribute('data-error-visible', element.validator())
    element.element.setAttribute('data-error', element.errorMessage)
    return !element.validator();
}

const validateFields = () => {
    return Object.keys(formFieldsData).map(key => validateField(formFieldsData[key])).filter(formFieldInError => formFieldInError === false).length === 0;
}

// Listen when user submit the form
modalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const canSubmit = validateFields();

    if (canSubmit) {
        const formData = {
            firstName: formFieldsData.first.inputField.value,
            lastName: formFieldsData.last.inputField.value,
            email: formFieldsData.email.inputField.value,
            birthdate: new Date(formFieldsData.birthdate.inputField.value).toDateString(),
            quantity: parseInt(formFieldsData.tournamentEntries.inputField.value),
            location: getSelectedTournamentLocation(),
            agreeTermsOfUse: formFieldsData.agreeTermsOfUse.inputField.checked,
            subscribeNewsletter: subscribeNewsletterInputField.checked,
        }
        console.log('Form data', formData);
        displaySuccessModal();
    } else {
        console.log('Form contains errors')
    }
})

// Add event listener to test field for each input when user interact with it
Object.keys(formFieldsData).forEach(key => formFieldsData[key].element.addEventListener('input', () => validateField(formFieldsData[key])));

// get the selected location of the tournament selected
const getSelectedTournamentLocation = () => {
    return Array.from(formFieldsData.tournamentLocations.inputField).find(input => input.checked).value;
}

const displaySuccessModal = () => {
    modalForm.classList.add('hidden');
    modalSuccess.classList.remove('hidden');
}