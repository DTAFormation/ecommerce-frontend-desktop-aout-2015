describe('productServiceTest', function() {

    beforeEach(function() {
        module('ecDesktopApp.product');
    });

    //test sur le service d'ajout' de produit
	it("Le service productService.addProduct()"+
		"ajoute le produit a la base avec un POST", inject(function(productService, $httpBackend, API_URL) {
        var url = API_URL + "/produit/";
        var product={id:'1', actif:'true', libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12};
        $httpBackend.expectPOST(url, {id:'1', actif:'true', libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12}).respond(201, '');
        productService.addProduct(product);
        $httpBackend.flush();
	}));

    //test sur le service de maj de produit
    it("Le service productService.updtadeProduct(product)"+
        " doit envoyer une requete PUT avec les infos", inject(function(productService, $httpBackend, API_URL){
            var url = API_URL + "/produit/";
        var product={id:'1', actif:'true', libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12};
        $httpBackend.expectPUT(url, {id:'1', actif:'true', libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12}).respond(200, '');
        productService.updateProduct(product);
        $httpBackend.flush();
    }));

    //test sur le service de récupération de produit par id
    it("Le service productService.get(id)"+
        " doit envoyer une requete GET avec les infos", inject(function(productService, $httpBackend, API_URL){
            var url = API_URL + "/produit/";
        //var product={id:'1',libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12};
        $httpBackend.expectGET(url+1).respond(200, '');
        productService.get(1);
        $httpBackend.flush();
    }));

    //test sur le service de suppression de produit par id
    it("Le service productService.deleteProduct(id)"+
        " doit envoyer une requete DELETE avec l'id du produit'", inject(function(productService, $httpBackend, API_URL){
            var url = API_URL + "/produit/";
        //var product={id:'1',libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12};
        $httpBackend.expectDELETE(url+1).respond(200, '');
        productService.deleteProduct(1);
        $httpBackend.flush();
    }));

    //test sur le service de récupération des produits
    it("Le service productService.getProducts()"+
        " doit envoyer une requete GET'", inject(function(productService, $httpBackend, API_URL){
            var url = API_URL + "/produit/";
        //var product={id:'1',libelle:'libelle',caracteristique:'caracteristique',categorie:'categorie',image:'image',prix:12};
        $httpBackend.expectGET(url).respond(200, '');
        productService.getProducts();
        $httpBackend.flush();
    }));

    it("est ce que la fonction cherche la liste du produit? ", inject(function(productService,$httpBackend, API_URL){
        //code du test de vérification
        var url = API_URL + "/produit/";
        //simulation de la réponse que l'on recevra
        var reponseSimule={id : 1, actif:'true', libelle : "libelle" , caracteristique : "carac", categorie : "categorie", image : "image" , prix : 0.10};

        //l'adresse sur laquelle on récupère les données
        $httpBackend.when("GET", url).respond(reponseSimule);

        //récupération des données
        var reponsePromesse=productService.getProducts();

        // vérification du résultat
        reponsePromesse.then(function(response){
            var product = response.data;
            expect(product.id).toEqual(1);
            expect(product.libelle).toEqual("libelle");
            expect(product.caracteristique).toEqual("carac");
            expect(product.categorie).toEqual("categorie");
            expect(product.image).toEqual("image");
            expect(product.prix).toEqual(0.10);
        });
        //pour déclencher les réponses des requêtes faites avec $http.
        $httpBackend.flush();
    }));

    it("est ce que la fonction delete essaye de supprimer quelque chose? ", inject(function(productService,$httpBackend, API_URL){
        var url = API_URL + "/produit/";
        var reponseSimule={id : 1, actif:'true', libelle : "libelle" , caracteristique : "carac", categorie : "categorie", image : "image" , prix : 0.10};
        $httpBackend.expectDELETE(url+1).respond(200, '');
        var reponsePromesse=productService.deleteProduct(reponseSimule.id);
        $httpBackend.flush();
    }));

});
