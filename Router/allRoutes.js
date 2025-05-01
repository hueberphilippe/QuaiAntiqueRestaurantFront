import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/galerie", "Galerie", "/pages/galerie.html"),
    new Route("/signin", "Connexion", "/pages/signin.html"),
    new Route("/signup", "Inscription", "/pages/signup.html"),
    new Route("/account", "Mon Compte", "/pages/account.html"),
    new Route("/editPassword", "Mot de passe", "/pages/editPassword.html"),
    /*new Route("/Galerie", "Galerie", "/pages/gallerie.html", "/js/galerie.js"),*/
];
    
//Le titre s'affiche comme ici: Route.title - websitename
export const websiteName = "Quai Antique";



