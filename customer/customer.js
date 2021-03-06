    // Déclaration du module 'Customer'
angular.module('ecDesktopApp.customer', [
    'ngRoute',
    'ui.bootstrap',
    'ecDesktopApp.shared',
    'chart.js'
   // 'ecDesktopApp.shared'

   ]);

// Configuration du module 'home'
angular.module('ecDesktopApp.customer').config(function($routeProvider) {

    $routeProvider
    .when("/customer/createCustomer",{
        templateUrl : "customer/template/createCustomer.tpl.html",
        controller: "CreateCustomerController",
        controllerAs: "createCustomer"

    })
    .when('/customer/listcustomer', { //
        templateUrl : "customer/template/listcustomer.html",
        controller : "customerCtrl",
        controllerAs : "customerCtrl"
    })
    .when("/customer/updateCustomer/:id",{
        templateUrl : "customer/template/updateCustomer.tpl.html",
        controller: "updateCustomereController",
        controllerAs: "updateCustomerCtrl"

    })
    .when("/customer/detailsCustomer/:id",{
        templateUrl : "customer/template/detailsCustomer.tpl.html",
        controller: "detailsCustomereController",
        controllerAs: "detailsCustomerCtrl"

    });

});

// Contrôleur principal du module 'createCustomer'
// Usage de la syntaxe 'controller as', pas besoin du '$scope'
angular.module('ecDesktopApp.customer').controller('CreateCustomerController', function(customerService, $location, $q) {

    var self = this;
    self.ajoutClient = function(customer){
        customer.actif=true;
        customerService.addCustomer(customer)
        .then(function(response){ //en cas de succes
            self.err = false;

            $location.path("/customer/listcustomer");
        },function(error){
            self.err = true;
        });
    };

    self.doesNotExist = function(value){
        return $q(function(resolve, reject) {
          customerService.getlogin(value)
            .then(function(response){
                reject(false);
            },function(response){
                resolve(true);
            });
        });
    };
});

//controlleur pour formulaire liste des clients
angular.module('ecDesktopApp.customer').controller('customerCtrl', function (customerService) {


    var customerCtrl = this;
    customerCtrl.customers = null;


    customerCtrl.displayCustomers = function() {
        return customerService.getCustomers()
        .then(function(customer) {
            customerCtrl.customers = customer;
        });
    };

    customerCtrl.delCustomer = function(id){
        customerService.deleteCustomer(id) // appel du service de suppresion d'un client
        .then(function(succes){
            customerCtrl.err=false;
            return customerCtrl.displayCustomers();
        }, function(error){
            customerCtrl.err=true;
            setTimeout(function(){window.location.reload();},2000);

        });
    };

    customerCtrl.displayCustomers();

});

/* customerService:service


*/
angular.module('ecDesktopApp.customer').controller("updateCustomereController", function(customerService,$routeParams,$location) {
    var updatectrl = this;

    customerService.getById($routeParams.id) // recupere les donnees du client
    .then(function(customer){
        updatectrl.customer = customer;      // que l'on stocke dans updatectrl.customer
    });

    updatectrl.updateCustomer = function(form){ //maj du client appelé lorsqu'on clique sur le bouton enregistrer du formulaire de update
        //if (form.$invalid) {return ;}
        //Delete adresses with wrong format
        var neuAdresses=null;
        console.log(updatectrl.customer);
        var nbAdresses=updatectrl.customer.adresses.length;

        for(var i=0;i<nbAdresses;i++){

            if( updatectrl.customer.adresses[i].numero===null ||
                updatectrl.customer.adresses[i].rue==="" ||
                updatectrl.customer.adresses[i].ville===""){
                updatectrl.customer.adresses.splice(i--, 1);
                continue;
            }/*else if($.trim(updatectrl.customer.adresses[i].rue)==="" ||
                updatectrl.customer.adresses[i].ville.trim()===""){
                updatectrl.customer.adresses.splice(i--, 1);
                continue;
            }*/
            if(updatectrl.customer.adresses[i].id===null){
                neuAdresses.push(updatectrl.customer.adresses[i]);
            }
        }
        if(neuAdresses!==null){
            customerService.addAdressesCustomer(updatectrl.customer.id,neuAdresses)
            .then(function(succes){

            },function(fail){

           });
        }
        customerService.updateCustomer(updatectrl.customer) //fait appel au "updateCustomer" du service qui va envoyer une requete PUT avec les données du updatectrl.customer
        .then(function(succes) { //en cas de succes
            $location.path("/customer/listcustomer");       //on redirige sur la page listant tous les clients
        },function(fail){

        });
    };

    updatectrl.addAdresse = function(){

        var adresse={
            'numero':'',
            'rue':'',
            'ville':''
        };
        updatectrl.customer.adresses.push(adresse);

    };
});

/* controller du détails client


*/
angular.module('ecDesktopApp.customer').controller("detailsCustomereController", function(customerService,$routeParams,$location) {
    var detailsctrl = this;

      customerService.getById($routeParams.id) // recupere les donnees du client
    .then(function(customer){
        detailsctrl.customer = customer;      // que l'on stocke dans detailsctrl.customer
    });

});
