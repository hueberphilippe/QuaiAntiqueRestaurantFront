const apiUrl = "http://127.0.0.1:8000/api/";



//Fonctions de gestion des cookies (Set - Get -erase)
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//Fonctions de gestion des token 
const tokenCookieName = "accesstoken";

function setToken(token) {
    setCookie(tokenCookieName, token, 7);
}

function getToken() {
    return getCookie(tokenCookieName);
}


//Fonction pour vérifier si l'on est connecter (Cookie présent)
function isConnected() {
    if (getToken() == null || getToken == undefined) {
        return false;
    }
    else {
        return true;
    }
}

/*
//Pour debug
if (isConnected()) {
    alert("Je suis connecté");    
} else {
    alert("Je ne suis pas connecté");
    
}
*/

//Gestion de la déconnexion
const RoleCookieName = "role"
const signoutBtn = document.getElementById("signout-btn");

signoutBtn?.addEventListener('click', signout);

function getRole() {
    return getCookie(RoleCookieName);
}

function signout() {
    eraseCookie(tokenCookieName);
    eraseCookie(RoleCookieName);
    window.location.reload();
}

//Les 4 roles à gérer:
/*
disconnected
connected
    - admin
    - client
*/

function showAndHideElementsForRoles() {
    const userConnected = isConnected();
    const role = getRole();

    let allElementsToEdit = document.querySelectorAll('[data-show]');

    allElementsToEdit.forEach(element => {
        switch (element.dataset.show) {
            case 'disconnected':
                if (userConnected) {
                    element.classList.add("d-none"); //d-none de Bootstrap => display none
                }
                break;
            case 'connected':
                if (!userConnected) {
                    element.classList.add("d-none");
                }
                break;
            case 'admin':
                if (!userConnected || role != "admin") {
                    element.classList.add("d-none");
                }
                break;
            case 'client':
                if (!userConnected || role != "client") {
                    element.classList.add("d-none");
                }
                break;
        }
    })
}
