import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html", []),
    new Route("/galerie", "Galerie", "/pages/galerie.html", [] , "/js/galerie.js"),
    new Route("/signin", "Connexion", "/pages/auth/signin.html", ["disconnected"], "js/auth/signin.js"),
    new Route("/signup", "Inscription", "/pages/auth/signup.html", ["disconnected"], "js/auth/signup.js"),
    new Route("/account", "Mon Compte", "/pages/auth/account.html", ["client", "admin"]),
    new Route("/editPassword", "Changement de mot de passe", "/pages/auth/editPassword.html", ["client", "admin"]),
    new Route("/allResa", "Vos réservations", "/pages/reservations/allresa.html", ["client"]),
    new Route("/reserver", "Réserver", "/pages/reservations/reserver.html", ["client"]),
];
    
/*
[] -> Tout le monde peut y accéder
["disconnected"] -> Réserver aux utilisateurs déconnecté 
["client"] -> Réserver aux utilisateurs avec le rôle client 
["admin"] -> Réserver aux utilisateurs avec le rôle admin
["admin", "client"] -> Réserver aux utilisateurs avec le rôle client OU admin
*/


//Le titre s'affiche comme ici: Route.title - websitename
export const websiteName = "Quai Antique";



