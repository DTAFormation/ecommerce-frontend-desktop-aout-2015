describe('loginTest', function() {

var apiUrl="http://5.196.89.85:9080/ec-backend/api/personne/";

	beforeEach(function() {
        module('ecDesktopApp.authentification');
    });

	it("test de la fonction de login succès", inject(function($controller,$httpBackend, loginService) {
		 $httpBackend.expect("POST",'http://5.196.89.85:9080/ec-backend/api/admin/connect').respond(200);

		 var loginCtrl = $controller("LoginCtrl");

		 loginCtrl.username = "loginTest";
		 loginCtrl.password = "testPassword";

		 spyOn(loginService, "SetCredentials");

		 loginCtrl.login();

		 $httpBackend.flush();

		 expect(loginService.SetCredentials).toHaveBeenCalledWith(loginCtrl.username ,loginCtrl.password);
	 }));

	 it("test de la fonction de login échec", inject(function($controller,$httpBackend,loginService) {
		 var respond = $httpBackend.expect("POST",'http://5.196.89.85:9080/ec-backend/api/admin/connect').respond(400);

		 var loginCtrl = $controller("LoginCtrl");

		 loginCtrl.username = "loginTest";
		 loginCtrl.password = "testPassword";


		 loginCtrl.login();

		 $httpBackend.flush();
		 expect(loginCtrl.dataLoading).toEqual(true);
	 }));

});
