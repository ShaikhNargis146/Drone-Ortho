var imgurl = adminurl + "upload/";

var imgpath = imgurl + "readFile";
var uploadurl = imgurl;

var navigationservice = angular.module('navigationservice', [])

    .factory('NavigationService', function ($http) {
        var navigation = [{
                name: "Users",
                classis: "active",
                sref: "#!/page/viewUser//",
                icon: "phone"
            },
            {
                name: "Products",
                classis: "active",
                sref: "#!/page/viewProducts//",
                icon: "phone"
            },

            // {
            //     name: "ProductOrders",
            //     classis: "active",
            //     sref: "#!/page/viewProductOrders//",
            //     icon: "phone"
            // },

            {
                name: "CadLineWork",
                classis: "active",
                sref: "#!/cadlineworkapp",
                icon: "phone"
            },

            {
                name: "DFMSubscription",
                classis: "active",
                sref: "#!/dfmsubscription",
                icon: "phone"
            },

            {
                name: "Mission",
                classis: "active",
                sref: "#!/mission",
                icon: "phone"
            },

            {
                name: "Plan",
                classis: "active",
                sref: "#!/page/viewPlan//",
                icon: "phone"
            },
            {
                name: "CouponCode",
                classis: "active",
                sref: "#!/page/viewCouponCode//",
                icon: "phone"
            },

            {
                name: "Enquiry",
                classis: "active",
                sref: "#!/page/viewEnquiry//",
                icon: "phone"
            },
            {
                name: "News Letter",
                classis: "active",
                sref: "#!/page/viewNewsLetter//",
                icon: "phone"
            },

            // {
            //     name: "Pages",
            //     classis: "active",
            //     sref: "#!/page/viewPages//",
            //     icon: "phone"
            // },

            {
                name: "Slider",
                classis: "active",
                sref: "#!/page/viewSlider//",
                icon: "phone"
            },

            // ,
            // {
            //     name: "User Form",
            //     classis: "active",
            //     sref: "#!/page/viewUserForm//",
            //     icon: "phone"
            // }
        ];

        return {
            getnav: function () {
                return navigation;
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
                    accessToken: $.jStorage.get("accessToken")
                };
                $http.post(adminurl + 'user/profile', data).then(function (data) {
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
                for (var i = 0; i < navigation.length; i++) {
                    if (navigation[i].name == menuname) {
                        navigation[i].classis = "active";
                    } else {
                        navigation[i].classis = "";
                    }
                }
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