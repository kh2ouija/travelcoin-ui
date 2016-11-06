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
    $scope.username = "stefan@travelcoin.com";
    $scope.password = "password";

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

        $scope.assetdata = []


        $scope.loginUser = function () {
            var user =  sessionFactory.retrieveUserAssets($scope.username, $scope.password);
            $scope.user = user;
            $scope.userService.user = user;
            console.log($scope.userService.user)
        }

        $scope.assetData = function() {
             sessionFactory.retrieveUserAssets($scope.username, $scope.password).success(function (data) {
                $scope.assetdata = data;
                 var total = 0;
                 for (var i = 0; i < $scope.assetdata.assets.length; i++) {
                     total = total + $scope.assetdata.assets[i].amount;
                 }

                 $scope.assetdata.total = total;
            })
        }
        $scope.assetData()

    })
    .controller('ngGridCtrl', ngGridCtrl)
    .controller('translateCtrl', translateCtrl)
    .controller('MarketController', function MarketController($scope, sessionFactory) {
        'use strict';

        $scope.marketdata = []

        $scope.marketData = function() {
            $scope.marketdata = sessionFactory.getMarketData().success(function (data) {
                $scope.marketdata = data
            })
        }

        $scope.marketData()

     })
     .controller('ClaimController', function ClaimController($scope, $state, $http) {
    $scope.providers = [];

    this.init = function() {
        console.log('ClaimController.init()');
        $http({
            method: 'GET',
            url: 'http://travelcoin-api.herokuapp.com/providers'
        }).then(function(response) {
            $scope.providers = response.data;
        });
    }

    this.init();
    })
     .service('userService', UserService)

    .factory('Base64', function () {
        /* jshint ignore:start */

        var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        return {
            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);

                return output;
            },

            decode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    window.alert("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                do {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";

                } while (i < input.length);

                return output;
            }
        };

        /* jshint ignore:end */
    })
    .factory('sessionFactory', function ($http, Base64) {

        var factory = {};
        $http.defaults.useXDomain = true;
        $http.defaults.useXDomain = true;

        function genericError(data) {
            console.log(data || "Closing session failed")
        }

        factory.retrieveUserAssets = function (username, password) {
            return $http({
                method: 'POST',
                //url: 'http://travelcoin-api.herokuapp.com/authenticate',
                url: 'http://localhost:8080/authenticate',
                data: $.param({email:username}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        };


        factory.getMarketData = function() {
            return $http({
                method: 'GET',
                url: 'http://travelcoin-api.herokuapp.com/products'
            });
        };

        return factory;
    })
;
