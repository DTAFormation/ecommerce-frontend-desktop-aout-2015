// Déclaration du module 'product'
angular.module('ecDesktopApp.product', [
    'ngRoute',
    ]);


// Configuration du module 'product'
angular.module('ecDesktopApp.product').config(function($routeProvider) {

// TODO Définir les routes spécifiques au module 'product' ici
$routeProvider
	.when('/product/createProduct', {   //quand tu vois la route /product/createProduct utilise le template createProduct
		templateUrl:'product/template/createProduct.tpl.html',
		controller : "createProductCtrl",
		controllerAs:"createProductCtrl",
	})
	.when('/product/listproduct', { //
		templateUrl:'product/template/listproduct.html',
		controller : "productCtrl",
		controllerAs : "productCtrl"
	})

	.when("/product/updateProduct/:id",{
		templateUrl : "product/template/updateProduct.tpl.html",
		controller: "updateProductController",
		controllerAs: "updateProductCtrl"

    });

});

// Contrôleur principal du module 'product'
// Usage de la syntaxe 'controller as', pas besoin du '$scope'
angular.module('ecDesktopApp.product').controller('productCtrl', function(productService) {

    var self = this;
    //afficher la liste des produit récupéré par "getProduct".
    productService.getProducts().then(
        function(response) {
         return response.data;
     }, function(response) {
        return "impossible d'afficher des produits";
    })
    .then(
        function(product) {
         console.log(product);
         self.products = product;
     });

    //lancer le traitement de supprimer produit.
    self.delProduct = function(product){
        productService.deleteProduct(product);
    };


// ...

});
//controlleur pour formulaire de creation des produits
angular.module('ecDesktopApp.product').controller('createProductCtrl', function(productService) {


	var self = this;
	self.addProd = function(product){
		productService.addProduct(product)
		.then(function(response){ //en cas de succes
			console.log("succes lors de la requete de post");
			self.err=false;
		},function(error){ //en cas d'erreur
			console.log("erreur lors de la requete de post");
			self.err=true;
		});
	};
	});

angular.module('ecDesktopApp.product').controller("updateCustomerController", function(productService, $routeParams, $location){
	var updateCtrl = this;
	productService.get($routeParams.id).then(function(product){
		updateCtrl.product = product;
	});

	updateCtrl.updateProduct = function(form){
		if(form.$invalid){return;}
		productService.updateProduct(updateCtrl.product).then(function(){$location.path("/");
	});
};

});

