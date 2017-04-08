var initMap = function () {};
var codeAddress = function () {};
//var deleteMarkers=function(){};
angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', , 'ngSanitize', 'angular-flexslider', 'ksSwiper', 'ngMap'])

    .controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
        $scope.template = TemplateService.changecontent("home"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Home"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.subscribe = function (formData) {
            console.log("email", formData);
            if (formData.email) {
                NavigationService.apiCallWithData("NewsLetter/save", formData, function (data) {
                    if (data.value === true) {
                        console.log("data saved successfully", data)
                        $state.go('home');
                    } else {
                        //  toastr.warning('Error submitting the form', 'Please try again');
                    }
                });
                $scope.show = true;
                $timeout(function () {
                    $scope.show = false;
                    $scope.subscribeForm = {};
                }, 2000);
            }
        }

        // $scope.mySlides = [
        //     'http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg',
        //     'http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg',
        //     'http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg',
        //     'http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg'
        // ];
        $scope.section = {
            one: "frontend/views/content/section/section1.html",
            two: "frontend/views/content/section/section2.html",
            three: "frontend/views/content/section/section3.html",
            four: "frontend/views/content/section/section4.html",
            five: "frontend/views/content/section/section5.html",
            six: "frontend/views/content/section/section6.html"
        };

    })

    .controller('headerctrl', function ($scope, $uibModal, $state, $window, TemplateService, NavigationService) {
        $scope.template = TemplateService;
        $scope.profile = {};
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $(window).scrollTop(0);
        });
        $.fancybox.close(true);
        $scope.login = function () {
            $scope.loginModal = $uibModal.open({
                animation: true,
                templateUrl: 'frontend/views/content/Modal/login.html',
                scope: $scope,
                windowClass: "login-modal"

            });
        };




        $scope.loginclose = function (formData) {
            console.log(formData);
            if (formData) {
                NavigationService.profile("User/login", formData, function (data) {
                    if (data.value === true) {
                        console.log("login", data.data)
                        $scope.loginModal.close();
                        $.jStorage.set("user", data.data);
                        $scope.template.userProfile = data.data;
                        // toastr.success('You have been successfully logged in', 'Login Success';

                    } else if (data.value === false) {
                        // toastr.warning(data.error.message, 'Login Failure');
                    } else {
                        // toastr.warning('Something went wrong', 'Please try again');
                    }
                });
            }
        };
        $scope.accessToken = $.jStorage.get("accessToken");
        if ($.jStorage.get('user')) {
            $scope.template.userProfile = $.jStorage.get('user');
        }
        $scope.logout = function () {
            $.jStorage.flush();
            $scope.template.userProfile = null;
        };

        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            if (scroll >= 100) {
                $(".img-logo").addClass("small-logo");
            } else {
                $(".img-logo").removeClass("small-logo");
            }
        });


    })
    .controller('FormCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("form"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Form"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }
    })



    .controller('ProductCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("product"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Product"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.tab = "design";
        $scope.classa = 'active';
        $scope.classb = '';
        $scope.classc = '';


        $scope.tabchange = function (tab, a) {
            $scope.tab = tab;
            if (a == 1) {
                $scope.classa = 'active-tab';
                $scope.classb = '';
                $scope.classc = '';


            }
            if (a == 2) {
                $scope.classb = 'active-tab';
                $scope.classa = '';
                $scope.classc = '';


            }
            if (a == 3) {
                $scope.classc = 'active-tab';
                $scope.classb = '';
                $scope.classa = '';
            }
        };
    })

    .controller('AboutCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("about"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("About"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }


    })
    .controller('AboutusCtrl', function ($scope, TemplateService, NavigationService, $timeout, $anchorScroll, $location) {
        $scope.template = TemplateService.changecontent("aboutus"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Aboutus"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.gotoBottom = function () {
            // set the location.hash to the id of
            // the element you wish to scroll to.
            $location.hash('at-footer');
            // call $anchorScroll() 
            $anchorScroll();
        };
        $timeout(function () {
            $scope.gotoBottom();
        }, 100);

    })

    .controller('Google-Map-2Ctrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("google-map-2"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Google-Map-2"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }
    })
    .controller('Google-MapCtrl', function ($scope, TemplateService, $uibModal, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("google-map"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Google-Map"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;
        $scope.mapData = {};
        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }
        $scope.login = function (formData) {
            $scope.mapData = formData;
            $scope.loginModal = $uibModal.open({
                animation: true,
                templateUrl: 'frontend/views/content/Modal/login.html',
                scope: $scope,
                windowClass: "login-modal"

            });
        };
        $scope.submitMapCalc = function (formData) {
            console.log(formData);
            if (formData) {
                NavigationService.profile("GoogleAreaCalc/save", formData, function (data) {
                    if (data.value === true) {
                        console.log("GoogleAreaCalc saved successfully");
                        $state.go("home");
                        // toastr.success('You have been successfully logged in', 'Login Success';
                    } else if (data.value === false) {
                        // toastr.warning(data.error.message, 'Login Failure');
                    } else {
                        // toastr.warning('Something went wrong', 'Please try again');
                    }
                });
            }

        }
        $scope.loginclose = function (formData) {
            console.log(formData);
            if (formData) {
                NavigationService.profile("User/login", formData, function (data) {
                    if (data.value === true) {
                        console.log("login", data.data)
                        $scope.loginModal.close();
                        $.jStorage.set("user", data.data);
                        $scope.template.userProfile = data.data;
                        // toastr.success('You have been successfully logged in', 'Login Success';
                    } else if (data.value === false) {
                        // toastr.warning(data.error.message, 'Login Failure');
                    } else {
                        // toastr.warning('Something went wrong', 'Please try again');
                    }
                });
            }
        };
        if ($.jStorage.get('user')) {
            $scope.template.userProfile = $.jStorage.get('user');
        }


        var geocoder;
        var map
        var markers = [];

        function initMap() {
            if (typeof google === 'object' && typeof google.maps === 'object') {
                map = new google.maps.Map(document.getElementById('map'), {
                    center: {
                        lat: -34.397,
                        lng: 150.644
                    },
                    zoom: 8
                });
                geocoder = new google.maps.Geocoder();
                var drawingManager = new google.maps.drawing.DrawingManager({
                    drawingMode: google.maps.drawing.OverlayType.MARKER,
                    drawingControl: true,
                    drawingControlOptions: {
                        position: google.maps.ControlPosition.TOP_CENTER,
                        drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
                    },
                    markerOptions: {
                        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
                    },
                    circleOptions: {
                        fillColor: '#ffff00',
                        fillOpacity: 1,
                        strokeWeight: 5,
                        clickable: false,
                        editable: true,
                        zIndex: 1
                    }
                });
                drawingManager.setMap(map);
            }
            google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {
                var coordinates = (polygon.getPath().getArray());
                var z = google.maps.geometry.spherical.computeArea(polygon.getPath().getArray());
                var area = google.maps.geometry.spherical.computeArea(polygon.getPath());
                console.log("area", area);
                $scope.mapData.sqft = Number(area) * Number(10.763910417);
                $scope.mapData.acreage = Number(area) * Number(0.00024711);
                console.log("area", $scope.mapData.sqft);
                var vertices = polygon.getPath();
                var contentString;
                for (var i = 0; i < vertices.getLength(); i++) {
                    var xy = vertices.getAt(i);
                    contentString += '<br>' + 'Coordinate ' + i + ':<br>' + xy.lat() + ',' +
                        xy.lng();
                }
                console.log("contentString", contentString)
            });
            /////////////////////////////////////////////////////////////////////////
            // Create the search box and link it to the UI element.
            var input = document.getElementById('pac-input');
            var searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            // Bias the SearchBox results towards current map's viewport.
            map.addListener('bounds_changed', function () {
                searchBox.setBounds(map.getBounds());
            });


            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener('places_changed', function () {
                var places = searchBox.getPlaces();

                if (places.length == 0) {
                    return;
                }

                // Clear out the old markers.
                markers.forEach(function (marker) {
                    marker.setMap(null);
                });
                markers = [];

                // For each place, get the icon, name and location.
                var bounds = new google.maps.LatLngBounds();
                places.forEach(function (place) {
                    if (!place.geometry) {
                        console.log("Returned place contains no geometry");
                        return;
                    }
                    var icon = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    };

                    // Create a marker for each place.
                    markers.push(new google.maps.Marker({
                        map: map,
                        icon: icon,
                        title: place.name,
                        position: place.geometry.location
                    }));

                    if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                map.fitBounds(bounds);
            });
        }

        // function deleteMarkers() {
        //     markers = [];
        // }
        // $scope.codeAddress = function () {
        //     console.log("hey m in codeAddress()");
        //     var address = document.getElementById('address').value;
        //     geocoder.geocode({
        //         'address': address
        //     }, function (results, status) {
        //         if (status == 'OK') {
        //             map.setCenter(results[0].geometry.location);
        //             var marker = new google.maps.Marker({
        //                 map: map,
        //                 position: results[0].geometry.location
        //             });
        //         } else {
        //             alert('Geocode was not successful for the following reason: ' + status);
        //         }
        //     });
        // }
        setTimeout(function () {
            initMap();
        }, 1000);


        $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCGSUwk7KdhoDlwzq7CSpeJDcOjKzu-xRA";
        var vm = this;
        vm.onMapOverlayCompleted = function (e) {
            console.log("hey")
            console.log(e.type);
        };

    })

    .controller('Support-DfmCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        $scope.template = TemplateService.changecontent("support-dfm"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Support-Dfm"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }

        $scope.login = function () {
            $scope.loginModal = $uibModal.open({
                animation: true,
                templateUrl: 'frontend/views/content/Modal/login.html',
                scope: $scope,
                windowClass: "login-modal"

            });
        };
        $scope.loginclose = function () {
            $scope.loginModal.close();
        };
    })
    .controller('supportDfm2Ctrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("support-dfm-2"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Support Dfm 2"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }
    })
    .controller('ServiceCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("service"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Service"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }
    })
    .controller('How-We-WorkCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("how-we-work"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("How-We-Work"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }
    })
    .controller('MycartCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("mycart"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Mycart"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }
    })
    .controller('PrivacyPolicyCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("privacypolicy"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("PrivacyPolicy"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }
    })
    .controller('TermsandConditionsCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("terms"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("TermsandConditions"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }
    })
    .controller('MemberPageCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("member-page"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("MemberPage"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }

    })
    .controller('ContactUsCtrl', function ($scope, $state, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("contactus"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("ContactUs"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;
        $scope.saveContact = function (formData) {
            NavigationService.apiCallWithData("ContactUs/save", formData, function (data) {
                if (data.value === true) {
                    console.log("data saved successfully", data)
                    $state.go('home');
                } else {
                    //  toastr.warning('Error submitting the form', 'Please try again');
                }
            });
        }


    })
    .controller('MemberCtrl', function ($scope, TemplateService, $state, NavigationService, $timeout, $uibModal) {
        $scope.template = TemplateService.changecontent("member"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Member"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.formData = {};
        $scope.test = function (size, formData) {
            NavigationService.apiCallWithData("User/registerUser", formData, function (data) {
                if (data.value === true) {
                    console.log("data saved successfully", data)
                    $scope.formData = {};
                    $scope.testModal = $uibModal.open({
                        animation: true,
                        templateUrl: 'frontend/views/content/Modal/modsub.html',
                        scope: $scope,
                        size: size,
                        windowClass: "test-modal"

                    });
                } else {
                    //  toastr.warning('Error submitting the form', 'Please try again');
                }
            });
        };


        //         $scope.dropdownList=[{
        //             plan:'Trial'
        //         },{
        //             plan:'premium'
        //         }, {
        //             plan:'standard'
        //         }]
        //         $scope.checkselection = function () {
        // if ($scope.userSelect != "" && $scope.userSelect != undefined)
        // $scope.msg = 'Selected Value: '+$scope.userSelect;
        // else
        // $scope.msg = 'Please Select Dropdown Value';
        // }

    })

    .controller('Blog-IndividualCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("blog-individual"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Blog-Individual"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }
    })

    .controller('BlogCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("blog"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Blog"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }
    })


    .controller('languageCtrl', function ($scope, TemplateService, $translate, $rootScope) {

        $scope.changeLanguage = function () {
            console.log("Language CLicked");

            if (!$.jStorage.get("language")) {
                $translate.use("hi");
                $.jStorage.set("language", "hi");
            } else {
                if ($.jStorage.get("language") == "en") {
                    $translate.use("hi");
                    $.jStorage.set("language", "hi");
                } else {
                    $translate.use("en");
                    $.jStorage.set("language", "en");
                }
            }
            //  $rootScope.$apply();
        };


    })

;