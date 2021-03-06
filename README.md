# ECommerce Frontend Desktop
Application Desktop d'administration des données

Application auto déployée : http://dtaformation.github.io/ecommerce-frontend-desktop/deploy/

## Suivi du projet
Le projet est réalisé en suivant la méthodologie Scrum :
* [Le Backlog du produit](https://github.com/DTAFormation/ecommerce-frontend-desktop/wiki/Backlog-Produit)
* [La définition du "Done"](https://github.com/DTAFormation/ecommerce-frontend-desktop/wiki/Définition-du-Done-!)
* [Le Sprint 1](https://github.com/DTAFormation/ecommerce-frontend-desktop/wiki/Sprint-1) : du 05/08 au 11/08
* [Le Sprint 2](https://github.com/DTAFormation/ecommerce-frontend-desktop/wiki/Sprint-2) : du 21/08 au 28/08

## Prérequis
* Installer NodeJS et NPM
* Installer grunt-cli
```
npm install grunt-cli
```
* Installer bower
```
npm install -g bower
```

## Installation de l'environnement de développement
* Récupérer les dépendances nécessaires
```
npm install
bower install
./node_modules/grunt-protractor-runner/node_modules/.bin/webdriver-manager update
```
* Lancer l'application
```
grunt serve
```
* Lancer les tests d'IHM (Chrome uniquement)
```
grunt test-e2e
```

## Utilisation de l'application
* Aller sur l'adresse
[http://dtaformation.github.io/ecommerce-frontend-desktop/deploy/](http://dtaformation.github.io/ecommerce-frontend-desktop/deploy/)

login administrateur : loginAdmin
mot de passe administrateur : pwdAdmin
