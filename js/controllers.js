function MainCtrl($scope, $log, userService ) {

    this.userService = userService;


    this.user =  JSON.parse('{"id":2,"assets":[{"id":3,"assetType":{"id":1,"provider":{"id":1,"name":"Accor"},"displayName":"points","conversionRate":5.00},"amount":20.00},' +
        '{"id":4,"assetType":{"id":2,"provider":{"id":2,"name":"KLM"},"displayName":"miles","conversionRate":8.00},"amount":50.00},' +
        '{"id":5,"assetType":{"id":2,"provider":{"id":2,"name":"Hilton"},"displayName":"miles","conversionRate":8.00},"amount":50.00},' +
        '{"id":6,"assetType":{"id":2,"provider":{"id":2,"name":"KLM VIP"},"displayName":"miles","conversionRate":8.00},"amount":50.00},' +
        '{"id":7,"assetType":{"id":2,"provider":{"id":2,"name":"Uber"},"displayName":"miles","conversionRate":8.00},"amount":50.00},' +
        '{"id":8,"assetType":{"id":2,"provider":{"id":2,"name":"AirBnB"},"displayName":"miles","conversionRate":8.00},"amount":50.00}' +
        '],"name":"Costin Aldea"}'
    )

    this.username = "costin@travelcoin.com";
    this.password = "demo@test.com";

    this.loginUser = function () {
        sessionFactory.retrieveUserAssets(username, password)
        $log.debug( "you have been logged as: " + userService.user)
    }
};

/**
 * ngGridCtrl - Controller for code ngGrid
 */
function ngGridCtrl($scope) {
    $scope.ngData = [
        {Name: "Moroni", Age: 50, Position: 'PR Menager', Status: 'active', Date: '12.12.2014'},
        {Name: "Teancum", Age: 43, Position: 'CEO/CFO', Status: 'deactive', Date: '10.10.2014'},
        {Name: "Jacob", Age: 27, Position: 'UI Designer', Status: 'active', Date: '09.11.2013'},
        {Name: "Nephi", Age: 29, Position: 'Java programmer', Status: 'deactive', Date: '22.10.2014'},
        {Name: "Joseph", Age: 22, Position: 'Marketing manager', Status: 'active', Date: '24.08.2013'},
        {Name: "Monica", Age: 43, Position: 'President', Status: 'active', Date: '11.12.2014'},
        {Name: "Arnold", Age: 12, Position: 'CEO', Status: 'active', Date: '07.10.2013'},
        {Name: "Mark", Age: 54, Position: 'Analyst', Status: 'deactive', Date: '03.03.2014'},
        {Name: "Amelia", Age: 33, Position: 'Sales manager', Status: 'deactive', Date: '26.09.2013'},
        {Name: "Jesica", Age: 41, Position: 'Ruby programmer', Status: 'active', Date: '22.12.2013'},
        {Name: "John", Age: 48, Position: 'Marketing manager', Status: 'deactive', Date: '09.10.2014'},
        {Name: "Berg", Age: 19, Position: 'UI/UX Designer', Status: 'active', Date: '12.11.2013'}
    ];

    $scope.ngOptions = {data: 'ngData'};
    $scope.ngOptions2 = {
        data: 'ngData',
        showGroupPanel: true,
        jqueryUIDraggable: true
    };
}

/**
 * translateCtrl - Controller for translate
 */
function translateCtrl($translate, $scope) {
    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
    };
}


function UserService($log) {
    var userService = this;
    var user = null;
}

function AppController($scope, $state, $log, userService) {

    this.userService = userService;
    $scope.userService = userService;

    this.isAuthenticated = function() {
      var result = userService.user != null;
        $log.debug(result + " is the response for the authentication method")
        return result
    }

    this.init();

};


angular
    .module('inspinia')
    .controller('MainCtrl', MainCtrl)
    .controller('ngGridCtrl', ngGridCtrl)
    .controller('translateCtrl', translateCtrl)
    .controller('AppController', AppController)
    .service('userService', UserService)
    .factory('sessionFactory', function ($http, $log) {

        var factory = {};

        var user = {}

        $http.defaults.useXDomain = true;
        $http.defaults.useXDomain = true;

        function genericError(data) {
            console.log(data || "Closing session failed")
        }

        factory.retrieveUserAssets = function (username, password) {
          /*  $http({
             method: 'POST',
             url: 'http://travelcoin.herokuapp.com/authenticate ',
             data: $.param({email:'costin@travelcoin.com'}),
             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
             }).success(function (data) {
             return  data
             }).error(genericError)*/
            var response = JSON.parse('{"id":2,"assets":[{"id":3,"assetType":{"id":1,"provider":{"id":1,"name":"Accor"},"displayName":"points","conversionRate":5.00},"amount":20.00},' +
                '{"id":4,"assetType":{"id":2,"provider":{"id":2,"name":"KLM"},"displayName":"miles","conversionRate":8.00},"amount":50.00},' +
                '{"id":5,"assetType":{"id":2,"provider":{"id":2,"name":"Hilton"},"displayName":"miles","conversionRate":8.00},"amount":50.00},' +
                '{"id":6,"assetType":{"id":2,"provider":{"id":2,"name":"KLM VIP"},"displayName":"miles","conversionRate":8.00},"amount":50.00},' +
                '{"id":7,"assetType":{"id":2,"provider":{"id":2,"name":"Uber"},"displayName":"miles","conversionRate":8.00},"amount":50.00},' +
                '{"id":8,"assetType":{"id":2,"provider":{"id":2,"name":"AirBnB"},"displayName":"miles","conversionRate":8.00},"amount":50.00}' +
                '],"name":"Costin Aldea"}'
            )
            return response;
        }

        return factory;
    });
