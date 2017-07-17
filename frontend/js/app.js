// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ui.router',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice',
    'pascalprecht.translate',
    'angulartics',
    'angulartics.google.analytics',
    'ngMap',

]);

firstapp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

    var templateURL = "frontend/views/template.html";
    // for http request with session
    $httpProvider.defaults.withCredentials = true;
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: templateURL,
            controller: 'HomeCtrl'
        })
        .state('about', {
            url: "/about",
            templateUrl: templateURL,
            controller: 'AboutCtrl'
        })
        .state('google-map-2', {
            url: "/google-map-2",
            templateUrl: templateURL,
            controller: 'Google-Map-2Ctrl'
        })
        .state('google-map', {
            url: "/google-map",
            templateUrl: templateURL,
            controller: 'Google-MapCtrl'
        })
        .state('aboutus', {
            url: "/aboutus",
            templateUrl: templateURL,
            controller: 'AboutusCtrl'
        })
        .state('blog-individual', {
            url: "/blog-individual/:id",
            templateUrl: templateURL,
            controller: 'Blog-IndividualCtrl'
        })
        .state('blog', {
            url: "/blog",
            templateUrl: templateURL,
            controller: 'BlogCtrl'
        })
        .state('product', {
            url: "/product",
            templateUrl: templateURL,
            controller: 'ProductCtrl'
        })
        .state('support-dfm', {
            url: "/support-dfm",
            templateUrl: templateURL,
            controller: 'Support-DfmCtrl'
        })
        .state('support-dfm-2', {
            url: "/support-dfm-2",
            templateUrl: templateURL,
            controller: 'supportDfm2Ctrl'
        })

        .state('service', {
            url: "/service",
            templateUrl: templateURL,
            controller: 'ServiceCtrl'
        })
        .state('how-we-work', {
            url: "/how-we-work",
            templateUrl: templateURL,
            controller: 'How-We-WorkCtrl'
        })
        .state('checkout', {
            url: "/checkout",
            templateUrl: templateURL,
            controller: 'ShippingCtrl'
        })
        .state('continue', {
            url: "/continue",
            templateUrl: templateURL,
            controller: 'ContinueCtrl'
        })
        .state('mycart', {
            url: "/mycart",
            templateUrl: templateURL,
            controller: 'MycartCtrl'
        })
        .state('member-page', {
            url: "/member-page",
            templateUrl: templateURL,
            controller: 'MemberPageCtrl'
        })
        .state('member', {
            url: "/member/:id",
            templateUrl: templateURL,
            controller: 'MemberCtrl'
        })
        .state('contactus', {
            url: "/contactus",
            templateUrl: templateURL,
            controller: 'ContactUsCtrl'
        })

        .state('privacypolicy', {
            url: "/privacypolicy",
            templateUrl: templateURL,
            controller: 'PrivacyPolicyCtrl'
        })
        .state('terms-and-conditions', {
            url: "/terms",
            templateUrl: templateURL,
            controller: 'TermsandConditionsCtrl'
        })
        .state('shipping', {
            url: "/shipping",
            templateUrl: templateURL,
            controller: 'ShippingCtrl'
        })
        .state('form', {
            url: "/form",
            templateUrl: templateURL,
            controller: 'FormCtrl'
        });
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(isproduction);
});

firstapp.directive('img', function ($compile, $parse) {
    return {
        restrict: 'E',
        replace: false,
        link: function ($scope, element, attrs) {
            var $element = $(element);
            if (!attrs.noloading) {
                $element.after("<img src='frontend/img/loading.gif' class='loading' />");
                var $loading = $element.next(".loading");
                $element.load(function () {
                    $loading.remove();
                    $(this).addClass("doneLoading");
                });
            } else {
                $($element).addClass("doneLoading");
            }
        }
    };
});

firstapp.directive('fancybox', function ($document) {
    return {
        restrict: 'EA',
        replace: false,
        link: function (scope, element, attr) {
            var $element = $(element);
            var target;
            if (attr.rel) {
                target = $("[rel='" + attr.rel + "']");
            } else {
                target = element;
            }

            target.fancybox({
                openEffect: 'fade',
                closeEffect: 'fade',
                closeBtn: true,
                padding: 0,
                helpers: {
                    media: {}
                }
            });
        }
    };
});
firstapp.directive('fancyboxBox', function ($document) {
    return {
        restrict: 'EA',
        replace: false,
        link: function (scope, element, attr) {
            var $element = $(element);
            var target;
            if (attr.rel) {
                target = $("[rel='" + attr.rel + "']");
            } else {
                target = element;
            }

            target.fancybox({
                openEffect: 'fade',
                closeEffect: 'fade',
                closeBtn: true,
                helpers: {
                    media: {}
                }
            });
        }
    };
});
firstapp.directive('autoHeight', function ($compile, $parse) {
    return {
        restrict: 'EA',
        replace: false,
        link: function ($scope, element, attrs) {
            var $element = $(element);
            var windowHeight = $(window).height();
            $element.css("min-height", windowHeight);
        }
    };
});

firstapp.config(function ($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});
firstapp.directive('onlyDigits', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            var digits;

            function inputValue(val) {
                if (val) {
                    if (attr.type == "tel") {
                        digits = val.replace(/[^0-9\+\\]/g, '');
                    } else {
                        digits = val.replace(/[^0-9\-\\]/g, '');
                    }


                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return parseInt(digits, 10);
                }
                return undefined;
            }
            ctrl.$parsers.push(inputValue);
        }
    };
});

firstapp.filter('sumFilter', function () {

    return function (cartProducts) {
        var taxTotal = 0;
        _.forEach(cartProducts, function (n) {
            taxTotal = taxTotal + (n.price * n.quantity);
        });
        return taxTotal;
    };
});