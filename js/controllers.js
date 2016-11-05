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


function UserService($log, sessionFactory) {
    var userService = this;
    var user = { name: ''};
    this.user = {name: ''}
}

var mainController = function AssetController($scope, userService) {
    $scope.userService = userService;
    $scope.username = "costin@travelcoin.com";
    $scope.password = "demo@test.com";


    $scope.loginUser = function () {
        var user =  sessionFactory.retrieveUserAssets($scope.username, $scope.password);
        $scope.user = user;
        $scope.userService.user = user;
        console.log($scope.userService.user)
    }

}

angular
    .module('inspinia')
    .controller('MainController', mainController)
    .controller('AssetController', function AssetController($scope, userService, sessionFactory) {
        'use strict';
        $scope.userService = userService;
        $scope.username = "costin@travelcoin.com";
        $scope.password = "demo@test.com";
        $scope.assetdata = []


        $scope.loginUser = function () {
            var user =  sessionFactory.retrieveUserAssets($scope.username, $scope.password);
            $scope.user = user;
            $scope.userService.user = user;
            console.log($scope.userService.user)
        }

        $scope.assetData = function() {
            $scope.assetdata = sessionFactory.retrieveUserAssets();
        }
        $scope.assetData()

    })
    .controller('ngGridCtrl', ngGridCtrl)
    .controller('translateCtrl', translateCtrl)
    .controller('MarketController', function MarketController($scope, sessionFactory) {
        'use strict';

        $scope.marketdata = []

        $scope.marketData = function() {
            $scope.marketdata = sessionFactory.getMarketData();
        }

        $scope.marketData()

     })
     .service('userService', UserService)
    .factory('sessionFactory', function ($http, $log) {

        var factory = {};
        $http.defaults.useXDomain = true;
        $http.defaults.useXDomain = true;

        function genericError(data) {
            console.log(data || "Closing session failed")
        }

        factory.retrieveUserAssets = function (username, password) {
            var response = JSON.parse('{"id":2,"assets":[{"id":3,"assetType":{"id":1,"provider":{"id":1,"name":"Accor"},"displayName":"points","conversionRate":5.00},"amount":20.00},' +
                '{"id":4,"assetType":{"id":2,"provider":{"id":2,"name":"KLM"},"displayName":"miles","conversionRate":8.00},"amount":50.00},' +
                '{"id":5,"assetType":{"id":2,"provider":{"id":2,"name":"Hilton"},"displayName":"miles","conversionRate":8.00},"amount":50.00},' +
                '{"id":6,"assetType":{"id":2,"provider":{"id":2,"name":"KLM VIP"},"displayName":"miles","conversionRate":8.00},"amount":50.00},' +
                '{"id":7,"assetType":{"id":2,"provider":{"id":2,"name":"Uber"},"displayName":"miles","conversionRate":8.00},"amount":50.00},' +
                '{"id":8,"assetType":{"id":2,"provider":{"id":2,"name":"AirBnB"},"displayName":"miles","conversionRate":8.00},"amount":50.00}' +
                '],"name":"Costin Aldea"}'
            )
            return response;
        };


        var auth = $base64.encode("foo:bar"),
            headers = {"Authorization": "Basic " + auth};

        factory.getMarketData = function() {
            var result = JSON.parse(
                '{"id":2,"assets":[{"id":3,"assetType":{"id":1,"provider":{"id":1,"name":"Accor"},"displayName":"points","conversionRate":5.00, "category":"Accomodation"},"amount":20.00},' +
                '{"id":4,"assetType":{"id":2,"provider":{"id":2,"name":"KLM"},"displayName":"miles","conversionRate":8.00},"amount":50.00, "category":"Transportation"},' +
                '{"id":5,"assetType":{"id":2,"provider":{"id":2,"name":"Hilton"},"displayName":"miles","conversionRate":8.00},"amount":50.00, "category":"Accomodation"},' +
                '{"id":6,"assetType":{"id":2,"provider":{"id":2,"name":"KLM VIP"},"displayName":"miles","conversionRate":8.00},"amount":50.00,  "category":"Transportation"},' +
                '{"id":7,"assetType":{"id":2,"provider":{"id":2,"name":"Uber"},"displayName":"miles","conversionRate":8.00},"amount":50.00,  "category":"Transportation"},' +
                '{"id":8,"assetType":{"id":2,"provider":{"id":2,"name":"AirBnB"},"displayName":"miles","conversionRate":8.00},"amount":50.00,  "category":"Accomodation"}' +
                '],"name":"Costin Aldea"}'
            )
            return result;
        }

        return factory;
    });
