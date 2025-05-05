//alert("Hello");

const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSingin = document.getElementById("btnSignin");
const Formsignin = document.getElementById("signinForm");

btnSingin.addEventListener("click", checkCredentials);


function checkCredentials() {
    let dataForm = new FormData(Formsignin);
    //Ici, il faudra appeler l'API pour vérifier les credentials en BDD

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    //Body
    let raw = JSON.stringify({
        "username": dataForm.get('email'),
        "password": dataForm.get('mdp')
    });

    let requestOptions = {
        //mode: 'no-cors',
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    }

    fetch(apiUrl+"login", requestOptions)
        .then(response => {
            //debugger;
            if (response.ok) {
                return response.json();
            } else {
                mailInput?.classList.add("is-invalid");
                passwordInput?.classList.add("is-invalid");
            }
        })
        .then(result => {
            const token = result.apiToken;
            //placer ce token en cookie
            setToken(token);
            //setCookie(RoleCookieName, "client", 7);
            setCookie(RoleCookieName, result.roles[0], 7);            
            window.location.replace("/");
        })
        .catch(error => console.log('error', error));

}

