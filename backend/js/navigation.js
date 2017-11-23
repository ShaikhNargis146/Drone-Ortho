var imgurl = adminurl + "upload/";
var missionFileUrl = imgurl + "customisedUpload"
var imgpath = imgurl + "readFile";
var imgpath1 = imgurl + "readFileFromLocal"
var uploadurl = imgurl;
var navigationservice = angular.module('navigationservice', [])

    .factory('NavigationService', function ($http) {
        var navigation1 = [{
                name: "Dashboard",
                classis: "active",
                sref: "dashboard",
                icon: "th-large"
            }, {
                name: "Missions",
                classis: "active",
                sref: "missions",
                icon: "diamond"
            },
            {
                name: "CAD File Requests",
                classis: "active",
                sref: "cadfile-request",
                icon: "picture-o"
            },
            // <---for admin only--->
            {
                name: "Users",
                classis: "active",
                sref: "users",
                icon: "address-book-o"
            },
            {
                name: "Ecommerce",
                classis: "active",
                sref: "ecommerce",
                icon: "shopping-cart"
            },
            {
                name: "Products & Plans",
                classis: "active",
                sref: "products-plans",
                icon: "list"
            },
            {
                name: "Reports",
                classis: "active",
                sref: "reports",
                icon: "book"
            },
            {
                name: "Vendors",
                classis: "active",
                sref: "vendors",
                icon: "plus-square-o"
            },

            // <---for admin only--->
            {
                name: "​Create Mission",
                classis: "active",
                sref: "create-mission",
                icon: " icon-paper-plane"
            },
            {
                name: "Account & Subscriptions",
                classis: "active",
                sref: "acc-and-sub",
                icon: " icon-layers"
            },
            {
                name: "Receipts",
                classis: "active",
                sref: "invoice",
                icon: " icon-layers"
            },
            {
                name: "Buy",
                classis: "active",
                sref: "product-detail",
                icon: "shopping-cart"
            },
            {
                name: "Support",
                classis: "active",
                sref: "support",
                icon: "support"
            },

            // <*************** START OF VENDOR ONLY **************>

            {
                name: "Billing",
                classis: "active",
                sref: "billing",
                icon: "calculator",
            }
            // <***************END OF VENDOR ONLY **************>

        ];


        return {
            getnav: function () {
                var navigation = [];
                if ($.jStorage.get("user") && $.jStorage.get("user").accessLevel == 'Admin') {
                    _.forEach(_.cloneDeep(navigation1), function (val) {
                        if (_.isEqual(val.name, 'Dashboard') || _.isEqual(val.name, 'Missions') || _.isEqual(val.name, 'CAD File Requests') || _.isEqual(val.name, 'Users') || _.isEqual(val.name, 'Ecommerce') || _.isEqual(val.name, 'Support') || _.isEqual(val.name, 'Vendors') || _.isEqual(val.name, 'Reports')) {
                            navigation.push(val);
                        }
                    });
                    return navigation;
                } else if ($.jStorage.get("user") && $.jStorage.get("user").accessLevel == 'User') {
                    _.forEach(_.cloneDeep(navigation1), function (val) {
                        if (_.isEqual(val.name, 'Dashboard') || _.isEqual(val.name, 'Missions') || _.isEqual(val.name, 'CAD File Requests') || _.isEqual(val.name, '​Create Mission') || _.isEqual(val.name, 'Account & Subscriptions') || _.isEqual(val.name, 'Receipts') || _.isEqual(val.name, 'Support') || _.isEqual(val.name, 'Buy')) {
                            navigation.push(val);
                        }
                    });
                    return navigation;
                } else if ($.jStorage.get("user") && $.jStorage.get("user").accessLevel == 'Vendor') {
                    _.forEach(_.cloneDeep(navigation1), function (val) {
                        if (_.isEqual(val.name, 'Dashboard') || _.isEqual(val.name, 'Billing') || _.isEqual(val.name, 'CAD File Requests')) {
                            navigation.push(val);
                        }
                    });
                    return navigation;
                }
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
                        $.jStorage.set("user", data.data);
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

            apiCallWithData: function (url, formData, callback) {
                $http.post(adminurl + url, formData).then(function (data) {
                    data = data.data;
                    callback(data);

                });
            },

            apiCallWithoutData: function (url, callback) {
                $http.post(adminurl + url).then(function (data) {
                    data = data.data;
                    callback(data);

                });
            },

            generateExcelWithData: function (url, data, callback) {
                $http.post(adminurl + url, data, {
                    responseType: 'arraybuffer'
                }).then(function (response) {
                    var header = response.headers('Content-Disposition')
                    var fileName = "CADREPORT" + "-" + moment().format("MMM-DD-YYYY-hh-mm-ss-a") + ".xlsx";
                    var blob = new Blob([response.data], {
                        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation;charset=UTF-8'
                    });
                    var objectUrl = (window.URL || window.webkitURL).createObjectURL(blob);
                    var link = angular.element('<a/>');
                    link.attr({
                        href: objectUrl,
                        download: fileName
                    })[0].click();
                })
            },


            generatepdfwithName: function (url, data, callback) {
                $http.post(adminurl + url, data, {
                    responseType: 'arraybuffer'
                }).then(function (response) {
                    var header = response.headers('Content-Disposition')
                    var fileName = data.name + "-" + moment().format("MMM-DD-YYYY-hh-mm-ss-a") + ".pdf";
                    var blob = new Blob([response.data], {
                        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation;charset=UTF-8'
                    });
                    var objectUrl = (window.URL || window.webkitURL).createObjectURL(blob);
                    var link = angular.element('<a/>');
                    link.attr({
                        href: objectUrl,
                        download: fileName
                    })[0].click();
                })
            },
            generateCsvithName: function (url, data, callback) {
                $http.post(adminurl + url, data, {
                    responseType: 'arraybuffer'
                }).then(function (response) {
                    var header = response.headers('Content-Disposition')
                    var fileName = data.name + "-" + moment().format("MMM-DD-YYYY-hh-mm-ss-a") + ".csv";
                    var blob = new Blob([response.data], {
                        type: 'text/csv;charset=utf-8;'
                    });
                    var objectUrl = (window.URL || window.webkitURL).createObjectURL(blob);
                    var link = angular.element('<a/>');
                    link.attr({
                        href: objectUrl,
                        download: fileName
                    })[0].click();
                })
            },
            generateExcelWithName: function (url, data, callback) {
                $http.post(adminurl + url, data, {
                    responseType: 'arraybuffer'
                }).then(function (response) {
                    var header = response.headers('Content-Disposition')
                    var fileName = data.name + "-" + moment().format("MMM-DD-YYYY-hh-mm-ss-a") + ".xlsx";
                    var blob = new Blob([response.data], {
                        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation;charset=UTF-8'
                    });
                    var objectUrl = (window.URL || window.webkitURL).createObjectURL(blob);
                    var link = angular.element('<a/>');
                    link.attr({
                        href: objectUrl,
                        download: fileName
                    })[0].click();
                })
            },

        };
    });