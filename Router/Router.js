import Route from "./Route.js";
import { allRoutes, websiteName } from "./allRoutes.js";

/*
//Debug
console.log("allRoutes à l'entrée du Router:");
for (const element of allRoutes) {
    console.log(element);    
}
//Fin débug
*/

// Création d'une route pour la page 404 (page introuvable)
const route404 = new Route("/pages", "Page introuvable", "./pages/404.html");

// Fonction pour récupérer la route correspondant à une URL donnée
const getRouteByUrl = (url) => {
    let currentRoute = null;
    // Parcours de toutes les routes pour trouver la correspondance
    allRoutes.forEach((element) => {
        if (element.url == url) {
            currentRoute = element;
        }
    });
    // Si aucune correspondance n'est trouvée, on retourne la route 404
    if (currentRoute != null) {
        return currentRoute;
    } else {
        //console.log("currentRoute dans getRouteByUrl: " + currentRoute);
        return route404;
    }
};

// Fonction pour charger le contenu de la page
const LoadContentPage = async () => {
    const path = window.location.pathname;
    //console.log("window.location.pathname: " + path); //Debug
    // Récupération de l'URL actuelle
    const actualRoute = getRouteByUrl(path);
    /*
    //Debug
    console.log("actualRoute: ");
    for (const key in actualRoute) {
        console.log(actualRoute[key]);
    }
    */


    // Récupération du contenu HTML de la route
    const html = await fetch(actualRoute.pathHtml).then((data) => data.text());
    // Ajout du contenu HTML à l'élément avec l'ID "main-page"
    document.getElementById("main-page").innerHTML = html;

    // Ajout du contenu JavaScript
    if (actualRoute.pathJS != "") {
        // Création d'une balise script
        var scriptTag = document.createElement("script");
        scriptTag.setAttribute("type", "text/javascript");
        scriptTag.setAttribute("src", actualRoute.pathJS);

        // Ajout de la balise script au corps du document
        document.querySelector("body")?.appendChild(scriptTag);
    }

    // Changement du titre de la page
    document.title = actualRoute.title + " - " + websiteName;
};

// Fonction pour gérer les événements de routage (clic sur les liens)
const routeEvent = (event) => {
    event = event || window.event;
    event.preventDefault();
    // Mise à jour de l'URL dans l'historique du navigateur
    window.history.pushState({}, "", event.target.href);
    // Chargement du contenu de la nouvelle page
    LoadContentPage();
};

// Gestion de l'événement de retour en arrière dans l'historique du navigateur
window.onpopstate = LoadContentPage;
// Assignation de la fonction routeEvent à la propriété route de la fenêtre
window.route = routeEvent;
// Chargement du contenu de la page au chargement initial
LoadContentPage();