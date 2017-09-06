var imgurl = adminurl + "upload/";
var missionFileUrl = imgurl + "customisedUpload"
var imgpath = imgurl + "readFile";
var uploadurl = imgurl;

var navigationservice = angular.module('navigationservice', [])

    .factory('NavigationService', function ($http) {
        var navigation1 = [{
                name: "Dashboard",
                classis: "active",
                sref: "#!/dashboard",
                icon: "th-large"
            }, {
                name: "Missions",
                classis: "active",
                sref: "#!/missions",
                icon: "diamond"
            },
            {
                name: "CAD File Requests",
                classis: "active",
                sref: "#!/lightbox-gallery",
                icon: "picture-o"
            },

            {
                name: "​Create Mission",
                classis: "active",
                sref: "#!/create-mission",
                icon: " icon-paper-plane"
            },
            {
                name: "Account & Subscriptions",
                classis: "active",
                sref: "#!/acc-and-sub",
                icon: " icon-layers"
            },
            {
                name: "Receipts",
                classis: "active",
                sref: "#!/invoice",
                icon: " icon-layers"
            },
            {
                name: "Buy",
                classis: "active",
                sref: "#!/product-detail",
                icon: "shopping-cart"
            },
            {
                name: "Support",
                classis: "active",
                sref: "#!/support",
                icon: "support"
            },
            // {
            //     name: "Users",
            //     classis: "active",
            //     sref: "#!/adminuser",
            //     icon: "user"
            // },
            // {
            //     name: "DFM Subscription",
            //     classis: "active",
            //     sref: "#!/dfmsubscription",
            //     icon: "register"
            // },
            // {
            //     name: "DRONE sale Application",
            //     classis: "active",
            //     sref: "#!/dronsale",
            //     icon: "power"
            // },
            // {
            //     name: "Products",
            //     classis: "active",
            //     sref: "#!/page/viewProducts//",
            //     icon: "tags"
            // },
            // {
            //     name: "Billing",
            //     classis: "active",
            //     sref: "#!/billing",
            //     icon: "tags"
            // },

            // {
            //     name: "ProductOrders",
            //     classis: "active",
            //     sref: "#!/page/viewProductOrders//",
            //     icon: "phone"
            // },


            // {
            //     name: "Setting",
            //     classis: "active",
            //     sref: "#!/setting",
            //     icon: "ticket"
            // },

            //admin
            //    {
            //         name: "Support Ticket",
            //         classis: "active",
            //         sref: "#!/support",
            //         icon: "picture"
            //     },


            // {
            //     name: "ServiceList",
            //     classis: "active",
            //     sref: "#!/page/viewServiceList//",
            //     icon: "file"
            // },

            // {
            //     name: "CouponCode",
            //     classis: "active",
            //     sref: "#!/page/viewCouponCode//",
            //     icon: "lock"
            // },

            // {
            //     name: "Enquiry",
            //     classis: "active",
            //     sref: "#!/page/viewEnquiry//",
            //     icon: "phone"
            // },
            // {
            //     name: "News Letter",
            //     classis: "active",
            //     sref: "#!/page/viewNewsLetter//",
            //     icon: "news"
            // },
            // {
            //     name: "Profile",
            //     classis: "active",
            //     sref: "#!/profile",
            //     icon: "profile"
            // },


            // {
            //     name: "Pages",
            //     classis: "active",
            //     sref: "#!/page/viewPages//",
            //     icon: "phone"
            // },

            // {
            //     name: "Slider",
            //     classis: "active",
            //     sref: "#!/page/viewSlider//",
            //     icon: "recycle"
            // }
        ];


        return {
            getnav: function () {
                var navigation = [];
                return navigation1;

                // if ($.jStorage.get("profile") && $.jStorage.get("profile").accessLevel == 'User') {
                //     _.forEach(_.cloneDeep(navigation1), function (val) {
                //         if (_.isEqual(val.name, 'CadLineWork') || _.isEqual(val.name, 'DFMSubscription') || _.isEqual(val.name, 'Mission') || _.isEqual(val.name, 'Profile')) {
                //             console.log("val.name", val.name);
                //             navigation.push(val);
                //         }
                //     });
                //     return navigation;
                // } else if ($.jStorage.get("profile") && $.jStorage.get("profile").accessLevel == 'Admin') {
                //     return navigation1;

                // }
            },

            parseAccessToken: function (data, callback) {
                if (data) {
                    $.jStorage.set("accessToken", data);
                    callback();
                }
            },
            removeAccessToken: function (data, callback) {
                $.jStorage.flush();
            },
            profile: function (callback, errorCallback) {
                var data = {
                    _id: $.jStorage.get("accessToken")
                };
                $http.post(adminurl + 'user/getOne', data).then(function (data) {
                    data = data.data;
                    if (data.value === true) {
                        $.jStorage.set("profile", data.data);
                        callback();
                    } else {
                        errorCallback(data.error);
                    }
                });
            },
            makeactive: function (menuname) {
                for (var i = 0; i < navigation1.length; i++) {
                    if (navigation1[i].name == menuname) {
                        navigation1[i].classis = "active";
                    } else {
                        navigation1[i].classis = "";
                    }
                }
                console.log("--------------- menuname -----------------", menuname);
                return menuname;
            },

            search: function (url, formData, i, callback) {
                $http.post(adminurl + url, formData).then(function (data) {
                    data = data.data;
                    callback(data, i);
                });
            },
            delete: function (url, formData, callback) {
                $http.post(adminurl + url, formData).then(function (data) {
                    data = data.data;
                    callback(data);
                });
            },
            countrySave: function (formData, callback) {
                $http.post(adminurl + 'country/save', formData).then(function (data) {
                    data = data.data;
                    callback(data);

                });
            },

            apiCall: function (url, formData, callback) {
                $http.post(adminurl + url, formData).then(function (data) {
                    data = data.data;
                    callback(data);

                });
            },
            searchCall: function (url, formData, i, callback) {
                $http.post(adminurl + url, formData).then(function (data) {
                    data = data.data;
                    callback(data, i);
                });
            },

            getOneCountry: function (id, callback) {
                $http.post(adminurl + 'country/getOne', {
                    _id: id
                }).then(function (data) {
                    data = data.data;
                    callback(data);

                });
            },
            getLatLng: function (address, i, callback) {
                $http({
                    url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyC62zlixVsjaq4zDaL4cefNCubjCgxkte4",
                    method: 'GET',
                    withCredentials: false,
                }).then(function (data) {
                    data = data.data;
                    callback(data, i);
                });
            },
            uploadExcel: function (form, callback) {
                $http.post(adminurl + form.model + '/import', {
                    file: form.file
                }).then(function (data) {
                    data = data.data;
                    callback(data);

                });

            },

        };
    });