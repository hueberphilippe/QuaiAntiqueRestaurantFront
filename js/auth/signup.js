//implementer  le controle de champ
const inputNom = document.getElementById("NomInput");
const inputPrenom = document.getElementById("PrenomInput");
const inputMail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidationPassword = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("btnValidationInscription");
const formInscription = document.getElementById("formulaireInscription");

inputNom?.addEventListener("keyup", validateForm);
inputPrenom?.addEventListener("keyup", validateForm);
inputMail?.addEventListener("keyup", validateForm);
inputPassword?.addEventListener("keyup", validateForm);
inputValidationPassword?.addEventListener("keyup", validateForm);
btnValidation?.addEventListener("click", inscrireUtilisateur);


function validateForm() {
    const nomOK = validateRequired(inputNom);
    const prenomOK = validateRequired(inputPrenom);
    const mailOK = validateMail(inputMail);
    const passwordOK = validatePassword(inputPassword);
    const validationPasswordOK = validateConfirmationPassword(inputPassword, inputValidationPassword);

    if (nomOK && prenomOK && mailOK && passwordOK && validationPasswordOK) {
        btnValidation.disabled = false;
    } else {
        btnValidation.disabled = true;
    }
}

function validateRequired(input) { //Controle des champs vide Nom Prénom
    if (input.value != '') { //Différent de rien
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        return false;
    }
}


function validateMail(input) {
    //Définir mon regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if (mailUser.match(emailRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}


function validatePassword(input) {
    //Définir mon regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if (passwordUser.match(passwordRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}


function validateConfirmationPassword(inputPwd, inputConfirmPwd) {
    if (inputPwd.value == inputConfirmPwd.value) {
        inputConfirmPwd.classList.add("is-valid");
        inputConfirmPwd.classList.remove("is-invalid");
        return true;
    }

    else {
        inputConfirmPwd.classList.add("is-invalid");
        inputConfirmPwd.classList.remove("is-valid");
        return false;
    }
}


//Les inscriptions
function inscrireUtilisateur() {
    let dataForm = new FormData(formInscription);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    //Body
    let raw = JSON.stringify({
        "firstName": dataForm.get('nom'),
        "lastName": dataForm.get('prenom'),
        "email": dataForm.get('email'),
        "password": dataForm.get('mdp')
    });

    let requestOptions = {
        //mode: 'no-cors',
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    }

    fetch(apiUrl+"registration", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Erreur lors de l'inscription");
            }
        })
        .then(result => {
            alert("Bravo " + dataForm.get("prenom") + ", vous êtes maintenant inscrit, vous pouvez vous connecter.")
            document.location.href = "/signin";
            console.log(result)
        })
        .catch(error => console.log('error', error));
    
}




