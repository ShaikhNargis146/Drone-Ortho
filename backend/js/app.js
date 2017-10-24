// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ui.router',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice',
    'pascalprecht.translate',
    'angulartics',
    'angulartics.google.analytics',
    'imageupload',
    "ngMap",
    "internationalPhoneNumber",
    "jsonservicemod",
    'summernote',
    'datePicker',
    'angular-flot',
    'rzModule'
]);

L.mapbox.accessToken = 'pk.eyJ1IjoibmFyZ2lzLXNoYWlraCIsImEiOiJjajVsMWdjbTgyN2t0MzBuejY0YWZvYnU1In0.sxNSmPeAZRDks6p3JmRUkw';

firstapp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    // for http request with session

    var tempateURL = "views/login.html"; //Default Template URL

    $httpProvider.defaults.withCredentials = true;
    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            controller: 'headerctrl'
        })
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "views/template.html",
            controller: 'DashboardCtrl',
        })

        .state('ticket-history', {
            url: "/ticket-history/:ticketId",
            templateUrl: "views/template.html",
            controller: 'TicketHistoryCtrl',
        })
        .state('support', {
            url: "/support",
            templateUrl: "views/template.html",
            controller: 'SupportCtrl',
        })
        .state('product-detail', {
            url: "/product-detail/:productId",
            templateUrl: "views/template.html",
            controller: 'ProductDetailCtrl',
        })

        .state('missions', {
            url: "/missions",
            templateUrl: "views/template.html",
            controller: 'MissionsCtrl',
        })
        .state('mission-details', {
            url: "/mission-details/:missionId",
            templateUrl: "views/template.html",
            controller: 'MissionsDetailsCtrl'
        })
        .state('mail-detail', {
            url: "/mail-detail",
            templateUrl: "views/template.html",
            controller: 'MailDetailCtrl'
        })
        .state('mail-compose', {
            url: "/mail-compose",
            templateUrl: "views/template.html",
            controller: 'MailComposeCtrl'
        })
        // .state('lightbox-gallery', {
        //     url: "/lightbox-gallery",
        //     templateUrl: "views/template.html",
        //     controller: 'LightboxGalleryCtrl'
        // })
        .state('issue-tracker', {
            url: "/issue-tracker",
            templateUrl: "views/template.html",
            controller: 'IssueTrackerCtrl'
        })
        .state('invoice-view', {
            url: "/invoice-view",
            templateUrl: "views/template.html",
            controller: 'InvoiceViewCtrl'
        })
        .state('invoice', {
            url: "/invoice",
            templateUrl: "views/template.html",
            controller: 'InvoiceCtrl'
        })
        .state('forgot-password', {
            url: "/forgot-password",
            templateUrl: "views/template.html",
            controller: 'ForgotPasswordCtrl'
        })
        .state('create-mission', {
            url: "/create-mission",
            templateUrl: "views/template.html",
            controller: 'CreatemissionCtrl',
        })
        .state('cadfile-request', {
            url: "/cadfile-request",
            templateUrl: "views/template.html",
            controller: 'CadFileRequestCtrl',
        })
        .state('cadfile-details', {
            url: "/cadfile-details/:cadId",
            templateUrl: "views/template.html",
            controller: 'CadfileDetailsCtrl',
        })
        .state('acc-and-sub', {
            url: "/acc-and-sub",
            templateUrl: "views/template.html",
            controller: 'AccandSubCtrl',
        })
        .state('500', {
            url: "/500",
            templateUrl: "views/template.html",
            controller: '500Ctrl',
        })
        .state('404', {
            url: "/404",
            templateUrl: "views/template.html",
            controller: '404Ctrl',
        })
        // <****************** for admin only ************>
        .state('users', {
            url: "/users",
            templateUrl: "views/template.html",
            controller: 'UsersCtrl',
        })
        .state('ecommerce', {
            url: "/ecommerce",
            templateUrl: "views/template.html",
            controller: 'EcommerceCtrl',
        })
        .state('products-plans', {
            url: "/products-plans",
            templateUrl: "views/template.html",
            controller: 'ProductsPlansCtrl',
        })
        .state('edit-product', {
            url: "/edit-product/:productId",
            templateUrl: "views/template.html",
            controller: 'EditProductCtrl',
        })
        .state('reports', {
            url: "/reports",
            templateUrl: "views/template.html",
            controller: 'ReportsCtrl',
        })

        // ,************ common for vendor and admin **********
        .state('vendors', {
            url: "/vendors",
            templateUrl: "views/template.html",
            controller: 'VendorsCtrl',
        })
        // ,************ common for vendor and admin **********
        .state('create-vendor', {
            url: "/create-vendor",
            templateUrl: "views/template.html",
            controller: 'CreateVendorCtrl',
        })
        .state('add-product', {
            url: "/add-product",
            templateUrl: "views/template.html",
            controller: 'AddProductCtrl',
        })
        .state('ecom-details', {
            url: "/ecom-details",
            templateUrl: "views/template.html",
            controller: 'EcomDetailsCtrl',
        })

        .state('edit-vendor', {
            url: "/edit-vendor/:vendorId",
            templateUrl: "views/template.html",
            controller: 'EditVendorCtrl',
        })

        .state('admin-profile', {
            url: "/admin-profile",
            templateUrl: "views/template.html",
            controller: 'AdminProfileCtrl',
        })
        .state('support-details', {
            url: "/support-details/:ticketId",
            templateUrl: "views/template.html",
            controller: 'SupportDetailsCtrl',
        })
        .state('user-details', {
            url: "/user-details/:userId",
            templateUrl: "views/template.html",
            controller: 'UserDetailsCtrl',
        })
        // <****************** for admin only ************>
        // <****************** for vendor only ************>
        .state('billing', {
            url: "/billing",
            templateUrl: "views/template.html",
            controller: 'BillingCtrl',
        })

    // <****************** for vendor only ************>
    $urlRouterProvider.otherwise("/login");
    $locationProvider.html5Mode(isproduction);
});

firstapp.directive('dateModel', function ($filter, $timeout) {
    return {
        scope: {
            model: '=ngModel'
        },
        link: function ($scope, element, attrs) {
            console.log("in date model");
            $timeout(function () {
                console.log($filter('date')(new Date($scope.model), 'dd/MM/yyyy'));
                $scope.model = new Date($scope.model);
            }, 100)

        }
    };
});

firstapp.filter('uploadpath', function () {
    return function (input, width, height, style) {
        var other = "";
        if (width && width !== "") {
            other += "&width=" + width;
        }
        if (height && height !== "") {
            other += "&height=" + height;
        }
        if (style && style !== "") {
            other += "&style=" + style;
        }
        if (input) {
            if (input.indexOf('https://') == -1) {
                return imgpath + "?file=" + input + other;
            } else {
                return input;
            }
        }
    };
});

firstapp.filter('uploadpathlocal', function () {
    return function (input, width, height, style) {
        var other = "";
        if (width && width !== "") {
            other += "&width=" + width;
        }
        if (height && height !== "") {
            other += "&height=" + height;
        }
        if (style && style !== "") {
            other += "&style=" + style;
        }
        if (input) {
            if (input.indexOf('https://') == -1) {
                return imgpath1 + "?file=" + input + other;
            } else {
                return input;
            }
        }
    };
});
firstapp.filter('showdate', function () {
    return function (input) {
        return new Date(input);
    };
});

firstapp.directive('imageonload', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('load', function () {
                scope.$apply(attrs.imageonload);
            });
        }
    };
});


firstapp.directive('uploadImage', function ($http, $filter, $timeout) {
    return {
        templateUrl: 'views/directive/uploadFile.html',
        scope: {
            model: '=ngModel',
            type: "@type",
            callback: "&ngCallback"
        },
        link: function ($scope, element, attrs) {
            $scope.showImage = function () {};
            $scope.check = true;
            if (!$scope.type) {
                $scope.type = "image";
            }
            $scope.isMultiple = false;
            $scope.inObject = false;
            if (attrs.multiple == "true") {
                $scope.isMultiple = true;
                $("#inputImage").attr("multiple", "ADD");
            }
            if (attrs.noView || attrs.noView === "") {
                $scope.noShow = true;
            }
            // if (attrs.required) {
            //     $scope.required = true;
            // } else {
            //     $scope.required = false;
            // }

            $scope.$watch("image", function (newVal, oldVal) {
                isArr = _.isArray(newVal);
                if (!isArr && newVal && newVal.file) {
                    $scope.uploadNow(newVal);
                } else if (isArr && newVal.length > 0 && newVal[0].file) {

                    $timeout(function () {
                        _.each(newVal, function (newV, key) {
                            if (newV && newV.file) {
                                $scope.uploadNow(newV);
                            }
                        });
                    }, 100);

                }
            });

            if ($scope.model) {
                if (_.isArray($scope.model)) {
                    $scope.image = [];
                    _.each($scope.model, function (n) {
                        $scope.image.push({
                            url: n
                        });
                    });
                } else {
                    if (_.endsWith($scope.model, ".pdf")) {
                        $scope.type = "pdf";
                    }
                }

            }
            if (attrs.inobj || attrs.inobj === "") {
                $scope.inObject = true;
            }
            $scope.clearOld = function () {
                $scope.model = [];
                $scope.uploadStatus = "removed";
            };
            $scope.removeImage = function (index) {
                $scope.image = [];
                $scope.model.splice(index, 1);
                _.each($scope.model, function (n) {
                    $scope.image.push({
                        url: n
                    });
                });
            }
            $scope.uploadNow = function (image) {
                $scope.uploadStatus = "uploading";

                var Template = this;
                image.hide = true;
                var formData = new FormData();
                formData.append('file', image.file, image.file.name);
                $http.post(uploadurl, formData, {
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: angular.identity
                }).then(function (data) {
                    data = data.data;
                    $scope.uploadStatus = "uploaded";
                    if ($scope.isMultiple) {
                        if ($scope.inObject) {
                            $scope.model.push({
                                "image": data.data[0]
                            });
                        } else {
                            if (!$scope.model) {
                                $scope.clearOld();
                            }
                            $scope.model.push(data.data[0]);
                        }
                    } else {
                        if (_.endsWith(data.data[0], ".pdf")) {
                            $scope.type = "pdf";
                        } else {
                            $scope.type = "image";
                        }
                        $scope.model = data.data[0];

                    }
                    $timeout(function () {
                        $scope.callback();
                    }, 100);

                });
            };
        }
    };
});

firstapp.directive('uploadImageFiles', function ($http, $filter, $timeout, $state) {
    return {
        templateUrl: 'views/directive/uploadImageFiles.html',
        scope: {
            model: '=ngModel',
            type: "@type",
            callback: "&ngCallback"
        },
        link: function ($scope, element, attrs) {

            $scope.showImage = function () {};
            $scope.check = true;
            if (!$scope.type) {
                $scope.type = "image";
            }
            $scope.isMultiple = false;
            $scope.inObject = false;
            if (attrs.multiple == "true") {
                $scope.isMultiple = true;
                $("#inputImage").attr("multiple", "ADD");
            }
            if (attrs.noView || attrs.noView === "") {
                $scope.noShow = true;
            }
            // if (attrs.required) {
            //     $scope.required = true;
            // } else {
            //     $scope.required = false;
            // }
            $scope.$watch("image", function (newVal, oldVal) {

                isArr = _.isArray(newVal);
                if (!isArr && newVal && newVal.file) {
                    $(".loading-img").css("display", "block");
                    $(".loading-img-modal").css("display", "block");

                    $scope.uploadNow(newVal);

                } else if (isArr && newVal.length > 0 && newVal[0].file) {

                    if (newVal.length > 0) {
                        var countForm = {}
                        countForm.user = $scope.$parent.profile._id
                        $http.post(adminurl + "Mission/totalMissionCount", countForm).then(function (data) {
                            data = data.data;
                            if ($scope.$parent.profile.currentSubscription.UploadPhoto <= data.data) {
                                console.log("data-----count---...", $scope.$parent.profile.currentSubscription.UploadPhoto, data.data)
                                $("#myAlertModal").modal();
                            } else {
                                $(".loading-img").css("display", "block");
                                $(".loading-img-modal").css("display", "block");
                                $timeout(function () {
                                    async.eachLimit(newVal, 1, function (image, callback) {
                                        // Perform operation on file here.
                                        console.log('Processing file ' + image);
                                        if (image && image.file) {
                                            $scope.fileprogressbar = 0;
                                            $scope.uploadStatus = "uploading";

                                            var Template = this;
                                            image.hide = true;
                                            var formData = new FormData();
                                            formData.append('file', image.file, image.file.name);
                                            $http.post(missionFileUrl, formData, {
                                                headers: {
                                                    'Content-Type': undefined
                                                },
                                                transformRequest: angular.identity,
                                                uploadEventHandlers: {
                                                    progress: function (e) {
                                                        console.log(e.loaded * 100 / e.total);
                                                        $scope.fileprogressbar = parseInt((e.loaded / e.total) * 100); // percentage of progress
                                                    }
                                                }

                                            }).then(function (data) {
                                                data = data.data;
                                                $scope.uploadStatus = "uploaded";
                                                $(".loading-img").css("display", "none");
                                                $(".loading-img-modal").css("display", "none");

                                                if ($scope.isMultiple) {
                                                    if ($scope.inObject) {
                                                        $scope.model.push({
                                                            "image": data.data[0]
                                                        });
                                                        callback(null, "next");
                                                    } else {
                                                        if (!$scope.model) {
                                                            $scope.clearOld();
                                                        }
                                                        var fileList = {};
                                                        fileList.file = data.data[0];
                                                        $scope.model.push(fileList);
                                                        callback(null, "next");
                                                    }
                                                } else {
                                                    if (_.endsWith(data.data[0], ".pdf")) {
                                                        $scope.type = "pdf";
                                                    } else {
                                                        $scope.type = "image";
                                                    }
                                                    var fileList = {};
                                                    fileList.file = data.data[0];
                                                    $scope.model = fileList;
                                                    callback(null, "next");
                                                }
                                            });
                                        } else {
                                            callback(null, "next");
                                        }
                                    }, function (err) {
                                        // if any of the file processing produced an error, err would equal that error
                                        if (err) {
                                            // One of the iterations produced an error.
                                            // All processing will now stop.
                                            console.log('A file failed to process');
                                        } else {
                                            console.log('All files have been processed successfully');
                                            if ($scope.$parent.mission) {
                                                console.log($scope.$parent.mission, $scope.$parent.profile);
                                                if ($scope.$parent.mission.selected == true) {
                                                    $scope.$parent.mission.user = $scope.$parent.profile._id;
                                                    $http.post(adminurl + "Mission/createMission", $scope.$parent.mission).then(function (data) {
                                                        data = data.data;
                                                        console.log("missionCreated", $state.$current.name)
                                                        $state.go("missions")
                                                    });
                                                }
                                            }
                                        }
                                    });
                                    // _.each(newVal, function (newV, key) {
                                    //     if (newV && newV.file) {
                                    //         $scope.uploadNow(newV);
                                    //     }
                                    // });
                                }, 15000);
                            }
                        });
                    }


                }
            });

            if ($scope.model) {
                if (_.isArray($scope.model)) {
                    $scope.image = [];
                    _.each($scope.model, function (n) {
                        $scope.image.push({
                            url: n
                        });
                    });
                } else {
                    if (_.endsWith($scope.model, ".pdf")) {
                        $scope.type = "pdf";
                    }
                }

            }
            if (attrs.inobj || attrs.inobj === "") {
                $scope.inObject = true;
            }
            $scope.clearOld = function () {
                $scope.model = [];
                $scope.uploadStatus = "removed";
            };
            $scope.removeImage = function (index) {
                $scope.image = [];
                $scope.model.splice(index, 1);
                _.each($scope.model, function (n) {
                    $scope.image.push({
                        url: n
                    });
                });
            }

            $scope.uploadNow = function (image) {
                $scope.fileprogressbar = 0;
                $scope.uploadStatus = "uploading";
                var Template = this;
                image.hide = true;
                var formData = new FormData();
                formData.append('file', image.file, image.file.name);
                $http.post(missionFileUrl, formData, {
                    headers: {
                        'Content-Type': undefined,
                    },
                    transformRequest: angular.identity,
                    uploadEventHandlers: {
                        progress: function (e) {
                            console.log(e.loaded * 100 / e.total);
                            $scope.fileprogressbar = parseInt((e.loaded / e.total) * 100); // percentage of progress
                        }
                    }
                }).then(function (data) {
                    data = data.data;
                    $(".loading-img").css("display", "none");
                    $(".loading-img-modal").css("display", "none");
                    $scope.uploadStatus = "uploaded";
                    if ($scope.isMultiple) {
                        if ($scope.inObject) {
                            $scope.model.push({
                                "image": data.data[0]
                            });
                        } else {
                            if (!$scope.model) {
                                $scope.clearOld();
                            }
                            var fileList = {};
                            fileList.file = data.data[0];
                            $scope.model.push(fileList);
                        }
                    } else {
                        if (_.endsWith(data.data[0], ".pdf")) {
                            $scope.type = "pdf";
                        } else {
                            $scope.type = "image";
                        }
                        var fileList = {};
                        fileList.file = data.data[0];
                        $scope.model = fileList;

                    }
                    $timeout(function () {
                        $scope.callback();
                    }, 15000);
                });
            };
        },
        controller: function ($scope) {
            // here you can access the controller scope by using $parent
        }
    };
});

firstapp.directive('onlyDigits', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            var digits;

            function inputValue(val) {
                if (val) {
                    var otherVal = val + "";
                    if (attr.type == "text") {
                        digits = otherVal.replace(/[^0-9\-\.\\]/g, '');
                    } else {
                        digits = otherVal.replace(/[^0-9\-\.\\]/g, '');
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

firstapp.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];

        if (angular.isArray(items)) {
            items.forEach(function (item) {
                var itemMatches = false;

                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});

firstapp.directive('img', function ($compile, $parse) {
    return {
        restrict: 'E',
        replace: false,
        link: function ($scope, element, attrs) {
            var $element = $(element);
            if (!attrs.noloading) {
                // $element.after("<img src='img/loading.gif' class='loading' />");
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

firstapp.directive('menuOptions', function ($document) {
    return {
        restrict: 'C',
        replace: false,
        link: function (scope, element, attr) {
            var $element = $(element);
            $(element).on("click", function () {
                $(".side-header.opened-menu").toggleClass('slide-menu');
                $(".main-content").toggleClass('wide-content');
                $("footer").toggleClass('wide-footer');
                $(".menu-options").toggleClass('active');
                $(".top-bar").toggleClass('top-add');
            });

        }
    };
});

firstapp.filter('serverimage', function () {
    return function (input, width, height, style) {
        if (input) {
            if (input.substr(0, 4) == "http") {
                return input;
            } else {
                image = imgpath + "?file=" + input;
                if (width) {
                    image += "&width=" + width;
                }
                if (height) {
                    image += "&height=" + height;
                }
                if (style) {
                    image += "&style=" + style;
                }
                return image;
            }

        } else {
            return "img/123.png";
        }
    };
});

firstapp.filter('convDate', function () {
    return function (input) {
        return new Date(input);
    };
});

firstapp.filter('downloadImage', function () {
    return function (input) {
        if (input) {
            return adminurl + "download/" + input;
        } else {
            return "img/123.png";
        }
    };
});

firstapp.directive('oI', function ($document) {
    return {
        restrict: 'C',
        replace: false,
        link: function (scope, element, attr) {
            var $element = $(element);
            $element.click(function () {
                $element.parent().siblings().children("ul").slideUp();
                $element.parent().siblings().removeClass("active");
                $element.parent().children("ul").slideToggle();
                $element.parent().toggleClass("active");
                return false;
            });

        }
    };
});
firstapp.directive('slimscroll', function ($document) {
    return {
        restrict: 'EA',
        replace: false,
        link: function (scope, element, attr) {
            var $element = $(element);
            $element.slimScroll({
                height: '400px',
                wheelStep: 10,
                size: '2px'
            });
        }
    };
});

firstapp.directive('addressForm', function ($document) {
    return {
        templateUrl: 'views/directive/address-form.html',
        scope: {
            formData: "=ngModel",
            demoForm: "=ngValid"
        },
        restrict: 'EA',
        replace: false,
        controller: function ($scope, NgMap, NavigationService) {

            $scope.map = {};
            $scope.change = function () {
                NgMap.getMap().then(function (map) {
                    var latLng = {
                        lat: map.markers[0].position.lat(),
                        lng: map.markers[0].position.lng()
                    };
                    _.assign($scope.formData, latLng);
                });
            };
            var LatLongi = 0;
            $scope.getLatLng = function (address) {

                NavigationService.getLatLng(address, ++LatLongi, function (data, i) {

                    if (i == LatLongi) {
                        $scope.formData = _.assign($scope.formData, data.results[0].geometry.location);
                    }
                });
                // $http.get("http://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCn9ypqFNxdXt9Zu2YqLcdD1Xdt2wNul9s&address="+address);
            };

        },
        // link: function($scope, element, attr, NgMap) {
        //     var $element = $(element);
        //     $scope.demoForm = {};
        //     $scope.demoForm.lat = 19.0760;
        //     $scope.demoForm.long = 72.8777;
        //     $scope.map = {};
        //     $scope.change = function() {
        //       NgMap.getMap().then(function(map) {
        //         console.log(map);
        //       });
        //
        //     };
        //
        // }
    };
});

// firstapp.directive('box', function ($uibModal) {
//     return {
//         templateUrl: 'views/directive/box.html',
//         scope: {
//             type: '=type',
//             model: '=ngModel'
//         },
//         link: function ($scope, element, attrs) {
//             $scope.model = {};
//             console.log($scope.model);
//             $scope.data = {};
//             $scope.eventModel = function (text) {
//                 $scope.type.state = text;
//                 var modalInstance = $uibModal.open({
//                     animation: $scope.animationsEnabled,
//                     templateUrl: '/backend/views/modal/modal.html',
//                     size: 'lg',
//                     scope: $scope
//                 });
//                 $scope.close = function (value) {
//                     callback(value);
//                     modalInstance.close("cancel");
//                 };
//             };
//             $scope.submitModal = function (moddata) {
//                 console.log(moddata);
//             };
//         }
//     };
// });

var aa = {};
firstapp.directive('multipleSelect', function ($document, $timeout) {
    return {
        templateUrl: 'views/directive/multiple-select.html',
        scope: {
            model: '=ngModel',
            api: "@api",
            url: "@url",
            name: "@name",
            required: "@required",
            filter: "@filter",
            ngName: "=ngName",
            create: "@ngCreate",
            disabled: "=ngDisabled"

        },
        restrict: 'EA',
        replace: false,
        controller: 'MultipleSelectCtrl',
        link: function (scope, element, attr, NavigationService) {
            var $element = $(element);
            scope.activeKey = 0;
            scope.isRequired = true;
            if (scope.required === undefined) {
                scope.isRequired = false;
            }
            scope.typeselect = attr.typeselect;
            // $scope.searchNew()
            aa = $element;
            var maxItemLength = 40;
            var maxBoxLength = 200;
            $timeout(function () {

                $element.find(".typeText").keyup(function (event) {
                    var scrollTop = $element.find("ul.allOptions").scrollTop();
                    var optionLength = $element.find("ul.allOptions li").length;
                    if (event.keyCode == 40) {
                        scope.activeKey++;
                    } else if (event.keyCode == 38) {
                        scope.activeKey--;
                    } else if (event.keyCode == 13) {
                        $element.find("ul.allOptions li").eq(scope.activeKey).trigger("click");
                    }
                    if (scope.activeKey < 0) {
                        scope.activeKey = optionLength - 1;
                    }
                    if (scope.activeKey >= optionLength) {
                        scope.activeKey = 0;
                    }
                    var newScroll = -1;
                    var scrollVisibility = (scrollTop + maxBoxLength) - maxItemLength;
                    var currentItemPosition = scope.activeKey * maxItemLength;
                    if (currentItemPosition < scrollTop) {
                        newScroll = (maxItemLength * scope.activeKey);

                    } else if (currentItemPosition > scrollVisibility) {
                        newScroll = (maxItemLength * scope.activeKey);

                    }
                    if (newScroll != -1) {
                        $element.find("ul.allOptions").scrollTop(newScroll);
                    }

                    scope.$apply();
                });

            }, 100);

        }
    };
});

firstapp.filter('ageFilter', function () {
    function calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return function (birthdate) {
        return calculateAge(birthdate);
    };
});
firstapp.filter('momentDate', function () {
    return function (date, format) {
        if (!format) {
            format = "Do MMM YYYY, ddd";
        }
        return moment(date).format(format);
    };
});
firstapp.filter('capitalize', function () {
    return function (input, all) {
        var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
        return (!!input) ? input.replace(reg, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) : '';
    };
});

firstapp.config(function ($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});

firstapp.directive('viewField', function ($http, $filter) {
    return {
        templateUrl: 'views/directive/viewField.html',
        scope: {
            type: '=type',
            value: "=value"
        },
        link: function ($scope, element, attrs) {
            if (!$scope.type.type) {
                $scope.type.type = "text";
            }
            $scope.form = {};
            $scope.objectDepth = function () {
                if (_.isObjectLike($scope.storeObj)) {
                    if ($scope.storeValue[$scope.storeObj.field]) {
                        $scope.form.model = $scope.storeValue[$scope.storeObj.field][$scope.storeObj.tableRef];
                        $scope.storeObj = $scope.storeObj.tableRef;
                        if (_.isObjectLike($scope.storeObj)) {
                            $scope.objectDepth();
                        }
                    }
                }
            };
            if (_.isObjectLike($scope.type.tableRef)) {
                $scope.storeObj = $scope.type.tableRef;
                $scope.storeValue = $scope.value;
                $scope.objectDepth();

            } else {
                $scope.form.model = $scope.value[$scope.type.tableRef];
            }

            $scope.template = "views/viewField/" + $scope.type.type + ".html";
        }
    };
});
firstapp.directive('dateForm', function () {
    return {
        scope: {
            ngModel: '=ngModel'
        },
        link: function ($scope, element, attrs) {
            console.log($scope.ngModel);
        }
    };
});

firstapp.directive('detailField', function ($http, $filter, JsonService) {
    return {
        templateUrl: 'views/directive/detailField.html',
        scope: {
            type: '=type',
            value: "=value",
            detailForm: "=form",
            formData: "=data",

        },
        controller: 'DetailFieldCtrl',
        link: function ($scope, element, attrs) {

        }
    };
});

firstapp.filter('urlencoder', function () {
    return function (input) {
        return window.encodeURIComponent(input);
    };
});

firstapp.directive('ngFiles', ['$parse', function ($parse) {

    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, {
                $files: event.target.files
            });
        });
    };

    return {
        link: fn_link
    }
}]);


firstapp.directive('mapBox', function ($http, $filter, JsonService, $rootScope, $uibModal) {
    return {
        restrict: 'C',
        link: function ($scope, element, attrs) {
            var locations = {};
            if ($scope.missionDetails && $scope.missionDetails.missionId) {
                locations = $scope.missionDetails.geoLocation;
            } else if ($scope.cadLineDetails) {
                locations = $scope.cadLineDetails.geoLocation;
            } else {
                locations = {   
                    upperLeft: [32.77840210218494, -117.23545173119574],
                    lowerLeft: [32.77740264966007, -117.23544909909386],
                    upperRight: [32.77840829977591, -117.23213078512207],
                    lowerRight: [32.77740884701485, -117.23212819014402],
                    center: [-117.23378995150006, 32.77790548568292]
                }
            }

            // var mapStyle = {
            //     "version": 8,
            //     "name": "Dark",
            //     "sources": {
            //         "mapbox": {
            //             "type": "vector",
            //             "url": "mapbox://mapbox.mapbox-streets-v6"
            //         },
            //         "overlay": {
            //             "type": "image",
            //             "url": "http://localhost:1337/output03.webp",
            //             "coordinates": [
            //                 locations.upperLeft, locations.upperRight, locations.lowerRight, locations.lowerLeft,
            //             ]
            //         }
            //     },
            //     "sprite": "mapbox://sprites/mapbox/dark-v9",
            //     "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
            //     "layers": [{
            //             "id": "background",
            //             "type": "background",
            //             "paint": {
            //                 "background-color": "rgb(4,7,14)"
            //             }
            //         },
            //         {
            //             "id": "water",
            //             "source": "mapbox",
            //             "source-layer": "water",
            //             "type": "fill",
            //             "paint": {
            //                 "fill-color": "#2c2c2c"
            //             }
            //         },
            //         {
            //             "id": "boundaries",
            //             "source": "mapbox",
            //             "source-layer": "admin",
            //             "type": "line",
            //             "paint": {
            //                 "line-color": "#797979",
            //                 "line-dasharray": [2, 2, 6, 2]
            //             },
            //             "filter": ["all", ["==", "maritime", 0]]
            //         },
            //         {
            //             "id": "overlay",
            //             "source": "overlay",
            //             "type": "raster",
            //             "paint": {
            //                 "raster-opacity": 0.85
            //             }
            //         },
            //         {
            //             "id": "cities",
            //             "source": "mapbox",
            //             "source-layer": "place_label",
            //             "type": "symbol",
            //             "layout": {
            //                 "text-field": "{name_en}",
            //                 "text-font": ["DIN Offc Pro Bold", "Arial Unicode MS Bold"],
            //                 "text-size": {
            //                     "stops": [
            //                         [4, 9],
            //                         [6, 12]
            //                     ]
            //                 }
            //             },
            //             "paint": {
            //                 "text-color": "#969696",
            //                 "text-halo-width": 2,
            //                 "text-halo-color": "rgba(0, 0, 0, 0.85)"
            //             }
            //         },
            //         {
            //             "id": "states",
            //             "source": "mapbox",
            //             "source-layer": "state_label",
            //             "type": "symbol",
            //             "layout": {
            //                 "text-transform": "uppercase",
            //                 "text-field": "{name_en}",
            //                 "text-font": ["DIN Offc Pro Bold", "Arial Unicode MS Bold"],
            //                 "text-letter-spacing": 0.15,
            //                 "text-max-width": 7,
            //                 "text-size": {
            //                     "stops": [
            //                         [4, 10],
            //                         [6, 14]
            //                     ]
            //                 }
            //             },
            //             "filter": [">=", "area", 80000],
            //             "paint": {
            //                 "text-color": "#969696",
            //                 "text-halo-width": 2,
            //                 "text-halo-color": "rgba(0, 0, 0, 0.85)"
            //             }
            //         }
            //     ]
            // };
            // var videoStyle = {
            //     "version": 8,
            //     "sources": {
            //         "satellite": {
            //             "type": "raster",
            //             "url": "mapbox://mapbox.streets",
            //             "tileSize": 256
            //         },
            //         "video": {
            //             "type": "image",
            //             "url": "http://localhost:1337/output03.webp",
            //             "coordinates": [
            //                 locations.upperLeft, locations.upperRight, locations.lowerRight, locations.lowerLeft,
            //             ]
            //         }
            //     },
            //     "layers": [{
            //         "id": "background",
            //         "type": "background",
            //         "paint": {
            //             "background-color": "rgb(4,7,14)"
            //         }
            //     }, {
            //         "id": "satellite",
            //         "type": "raster",
            //         "source": "satellite"
            //     }, {
            //         "id": "video",
            //         "type": "raster",
            //         "source": "video"
            //     }]
            // };
            var imageUrl;
            if ($scope.missionDetails && $scope.missionDetails.missionId) {
                // console.log("$scope.missionDetails.name", $scope.missionDetails.name);
                imageUrl = 'http://files.unifli.aero/' + $scope.missionDetails.missionId + 'google_tiles/{z}/{x}/{myY}.png';
                // imageUrl = 'http://localhost:1337/demo.jpg';
            } else if ($scope.cadLineDetails && $scope.cadLineDetails.orthoFile.file) {
                                // imageUrl = 'http://localhost:1337/demo.jpg';
                // imageUrl = 'http://localhost:1337/' + $scope.cadLineDetails.orthoFile.file.split(".")[0] + '.jpg';
                imageUrl = 'http://files.unifli.aero/' + $scope.cadLineDetails.orthoFile.file.split(".")[0] + '.jpg';
            } else if ($scope.cadLineDetails && $scope.cadLineDetails.mission) {
                                // imageUrl = 'http://localhost:1337/demo.jpg';

                imageUrl = 'http://files.unifli.aero/' + $scope.cadLineDetails.mission.missionId + 'google_tiles/{z}/{x}/{myY}.png';
                // imageUrl = 'http://35.194.248.13:80/google_tiles/{z}/{x}/{myY}.png';
            }

            // This is the trickiest part - you'll need accurate coordinates for the
            // corners of the image. You can find and create appropriate values at
            // http://maps.nypl.org/warper/ or
            // http://www.georeferencer.org/
            var imageBounds;
            if (!_.isEmpty(locations)) {
                imageBounds = L.latLngBounds([
                    locations.upperLeft.reverse(),
                    locations.lowerLeft.reverse(),
                    locations.upperRight.reverse(),
                    locations.lowerRight.reverse()
                ]);
            }
            var latlngs;
            if ($scope.cadLineDetails && !_.isEmpty($scope.cadLineDetails.points)) {
                latlngs = [
                    $scope.cadLineDetails.points[0]
                ];
            }
            var map = L.mapbox.map('map', 'mapbox.streets', {
                    infoControl: false,
                    attributionControl: false,
                    maxZoom: 22,
                    minZoom: 16
                })
                .fitBounds(imageBounds)
            var attribution = L.control.attribution();
            attribution.setPrefix('<a href="https://cloud.unifli.aero/">Unifli</a>');
            // attribution.addAttribution('<a href="https://unifli.aero/">Unifli</a>');
            attribution.addTo(map);
            // See full documentation for the ImageOverlay type:
            // http://leafletjs.com/reference.html#imageoverlay
            // console.log("gccygeruygreufheurhfuerhuerhfurhrieowuepoupwoidpiwodwoeudiewudieuifueiuferfureruhsss", $scope.slider.value);
            if ($scope.cadLineDetails && !_.isEmpty($scope.cadLineDetails.geoLocation) && !$scope.cadLineDetails.mission) {
                var overlay = L.imageOverlay(imageUrl, imageBounds)
                    .addTo(map);
            }
            // overlay.setOpacity($scope.slider.value);
            // omnivore.kml('http://localhost:1337/newM_mosaic.kml').addTo(map);
            if (($scope.missionDetails && $scope.missionDetails.missionId) || $scope.cadLineDetails.mission) {
                var TopoLayer = L.tileLayer(imageUrl, {
                    maxZoom: 22,
                    minZoom: 16,
                    myY: function (data) {
                        return (Math.pow(2, data.z) - data.y - 1);
                    }
                })
                map.addLayer(TopoLayer);
            }
            // $rootScope.$on('greeting', function (event, arg) {
            //     overlay.setOpacity(arg.value);
            // })
            var polygon;
            if ($scope.cadLineDetails && !_.isEmpty($scope.cadLineDetails.points)) {
                polygon = L.polygon(latlngs, {
                    color: 'white'
                }).addTo(map);
                map.fitBounds(polygon.getBounds());
            }

            var featureGroup = L.featureGroup().addTo(map);

            var drawControl = new L.Control.Draw({
                edit: {
                    featureGroup: featureGroup
                },
                draw: {
                    polygon: {
                        showArea: true,
                        allowIntersection: true,
                        shapeOptions: {
                            stroke: true,
                            metric: false,
                            color: '#fff',
                            weight: 4,
                            opacity: 1,
                            fill: true,
                            fillColor: null, //same as color by default
                            fillOpacity: 0.3
                        }
                    },
                    polyline: false,
                    rectangle: false,
                    circle: false,
                    marker: false
                }
            }).addTo(map);

            map.on('draw:created', showPolygonArea);
            map.on('draw:edited', showPolygonAreaEdited);

            function showPolygonAreaEdited(e) {
                e.layers.eachLayer(function (layer) {
                    showPolygonArea({
                        layer: layer
                    });
                });
            }
            var acres;

            function showPolygonArea(e) {
                featureGroup.clearLayers();
                featureGroup.addLayer(e.layer);
                var type = e.layerType;
                var layer = e.layer;
                layer.getLatLngs()[0][layer.getLatLngs()[0].length] = layer.getLatLngs()[0][0]
                console.log("e.layer", layer);
                var pointsList = [];

                _.forEach(e.layer._latlngs[0], function (val) {
                    var latLng = [];
                    latLng.push(val.lat);
                    latLng.push(val.lng)
                    console.log("val--", latLng);
                    pointsList.push(latLng);
                });
                console.log("pointsList", pointsList);
                var polygon = turf.polygon([
                    pointsList
                ]);

                area = turf.area(polygon);
                console.log("area--", area, LGeo.area(e.layer) * 0.0002471054);
                acres = LGeo.area(e.layer) * 0.0002471054;
                console.log("acres--", Number(acres).toFixed(2));
                if ($scope.cadLineDetails) {
                    $scope.cadLineDetails.acreage = Number(acres).toFixed(2);
                    $scope.cadLineDetails.points = e.layer._latlngs;
                    // $("#myModal").modal();
                    $('#myModal').on('show.bs.modal', function () {
                        console.log("inside modal")
                        $("#acreage").val(Number(acres).toFixed(2));
                    }).modal('show');
                }
                // var mapmodal = $uibModal.open({
                //     animation: $scope.animationsEnabled,
                //     templateUrl: '/backend/views/modal/cadline-name.html',
                //     size: 'sm',
                //     scope: $scope
                // });
            }


            // var featureGroup = L.featureGroup().addTo(map);

            // var drawControl = new L.Control.Draw({
            //     edit: {
            //         featureGroup: featureGroup
            //     },
            //     draw: {
            //         polygon: true,
            //         polyline: false,
            //         rectangle: false,
            //         circle: false,
            //         marker: false
            //     }
            // }).addTo(map);
            // map.on('draw:created', showPolygonArea);
            // map.on('draw:edited', showPolygonAreaEdited);

            // function showPolygonAreaEdited(e) {
            //     e.layers.eachLayer(function (layer) {
            //         showPolygonArea({
            //             layer: layer
            //         });
            //     });
            // }

            // function showPolygonArea(e) {
            //     featureGroup.clearLayers();
            //     featureGroup.addLayer(e.layer);
            //     e.layer.bindPopup((LGeo.area(e.layer) / 1000000).toFixed(2) + 'Hi');
            //     e.layer.openPopup();
            //     alert("hello")
            // }
            // var calcButton;
            // if ($scope.missionDetails && $scope.missionDetails.missionId) {
            //     calcButton = document.getElementById('missionName');
            // } else if ($scope.cadLineDetails) {
            //     calcButton = document.getElementById('contours');
            // }
            // calcButton.onclick = function () {
            //     if (acres > 0) {
            //         $scope.cadLineDetails.acreage = acres
            //     } else {
            //         alert("Use the draw tools to draw a polygon!");
            //     }
            // };

            map.on('load', function () {
                // ALL YOUR APPLICATION CODE
                slider.addEventListener('input', function (e) {
                    // Adjust the layers opacity. layer here is arbitrary - this could
                    // be another layer name found in your style or a custom layer
                    // added on the fly using `addSource`.
                    map.setPaintProperty('chicago', 'raster-opacity', parseInt(e.target.value, 10) / 100);

                    // Value indicator
                    sliderValue.textContent = e.target.value + '%';
                });
                console.log("hi,its loaded");
            });
        }
    };
});




firstapp.factory('shareMission', function () {
    var missionData = {},
        setval, getval;
    setval = function (obj) {
        missionData = obj;
    }
    getval = function () {
        return missionData;
    }
    return {
        setval: setval,
        getval: getval
    };
});

// firstapp.directive('flot', function () {
//     return {
//         restrict: 'EA',
//         template: '<div></div>',
//         scope: {
//             dataset: '=',
//             options: '=',
//             callback: '='
//         },
//         link: function (scope, element, attributes) {
//             var height, init, onDatasetChanged, onOptionsChanged, plot, plotArea, width, _ref, _ref1;
//             plot = null;
//             width = attributes.width || '100%';
//             height = attributes.height || '100%';
//             if (((_ref = scope.options) != null ? (_ref1 = _ref.legend) != null ? _ref1.container : void 0 : void 0) instanceof jQuery) {
//                 throw 'Please use a jQuery expression string with the "legend.container" option.';
//             }
//             if (!scope.dataset) {
//                 scope.dataset = [];
//             }
//             if (!scope.options) {
//                 scope.options = {
//                     legend: {
//                         show: false
//                     }
//                 };
//             }
//             plotArea = $(element.children()[0]);
//             plotArea.css({
//                 width: width,
//                 height: height
//             });
//             init = function () {
//                 var plotObj;
//                 plotObj = $.plot(plotArea, scope.dataset, scope.options);
//                 if (scope.callback) {
//                     scope.callback(plotObj);
//                 }
//                 return plotObj;
//             };
//             onDatasetChanged = function (dataset) {
//                 if (plot) {
//                     plot.setData(dataset);
//                     plot.setupGrid();
//                     return plot.draw();
//                 } else {
//                     return plot = init();
//                 }
//             };
//             scope.$watch('dataset', onDatasetChanged, true);
//             onOptionsChanged = function () {
//                 return plot = init();
//             };
//             return scope.$watch('options', onOptionsChanged, true);
//         }
//     };
// });
// <********************* dashboard common ****************************>
firstapp.directive('pagination', function () {
    return {
        restrict: 'E',
        scope: {
            // item: "=value"
        },
        templateUrl: 'views/directive/pagination.html',
        link: function () {}
    }
});
firstapp.directive('commonView', function () {
    return {
        restrict: 'E',
        scope: {
            // item: "=value"
        },
        templateUrl: 'views/directive/common-view.html',
        link: function ($scope, element, attrs) {
            console.log($scope.model);
            $scope.dataSize = function (data) {
                $scope.selectedSize = data
                // alert("hello");
                console.log("print size", $scope.selectedSize);
            };

        }
    }

});
firstapp.directive('disallowSpaces', function () {
    return {
        restrict: 'A',

        link: function ($scope, $element) {
            $element.bind('keydown', function (e) {
                if (e.which === 32) {
                    e.preventDefault();
                }
            });
        }
    }
});
/**
 * ionRangeSlider - Directive for Ion Range Slider
 */
// firstapp.directive('ionRangeSlider', function () {
//     return {
//         restrict: 'A',
//         scope: {
//             rangeOptions: '=',
//         },
//         link: function (scope, elem, attrs) {
//             elem.ionRangeSlider(scope.rangeOptions);
//         }
//     }
// });