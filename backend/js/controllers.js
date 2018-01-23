// var globalfunction = {};
angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', "jsonservicemod", 'ui.bootstrap', 'ui.select', 'toastr', 'angular-flexslider', 'ui.tinymce', 'imageupload', 'ngMap', 'toggle-switch', 'cfp.hotkeys', 'ui.sortable', 'ngFileUpload'])
// .run([function () {
//     mapboxgl.accessToken = 'pk.eyJ1IjoibmFpbWlrYW4iLCJhIjoiY2lraXJkOXFjMDA0OXdhbTYzNTE0b2NtbiJ9.O64XgZQHNHcV2gwNLN2a0Q';
// }])
firstapp


    .controller('DashboardCtrl', function ($scope, $stateParams, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.toolsvalue = 0;

        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];
        var userId;
        console.log("inside else****");
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
            userId = $.jStorage.get("user")._id;
            currentSubscriptionId = $.jStorage.get("user").currentSubscription
        }


        // ***************for tooltip***********************
        $scope.onEventExampleClicked = function (event, pos, item) {
            // alert('Click! ' + event.timeStamp + ' ' + pos.pageX + ' ' + pos.pageY);
            // highlight('Hover! ' + event.timeStamp + ' ' + pos.pageX + ' ' + pos.pageY);
            console.log(event, pos, item, "click");
            chart - use
            console.log(item.dataIndex, item.series.label);
            hoverShow(item.dataIndex, item.series.label, pos.pageX, pos.pageY);
        };

        $scope.onEventExampleHover = function (event, pos, item) {
            // console.log('Hover! ' + event.timeStamp + ' ' + pos.pageX + ' ' + pos.pageY);
            if (item != null) {
                hoverShow(item.dataIndex, item.series.label, pos.pageX, pos.pageY);
            }


        };

        function hoverShow(index, label, x, y) {
            if (label == "Payments") {
                var a = $scope.data1[index][0];
                var k = new Date(a);
                var b = $scope.data1[index][1];
                $scope.toolsvalue = "x: " + k.toUTCString() + " y: " + b + label;
            } else {
                var a = $scope.data2[index][0];
                var k = new Date(a);
                var b = $scope.data2[index][1];

                $scope.toolsvalue = "x: " + k.toUTCString() + " y: " + b + label;

            }
            $('#a').css("top", y);
            $('#a').css("left", x);

        }
        // ***************for tooltip***********************
        //
        // Pie Chart Example
        //

        $scope.pieDataset = [{
            label: "Total CAD Amount",
            // data: 20,
            color: '#48b5d5',
        }, {
            label: "Total DFM Amount",
            // data: 30,
            color: '#82ddcb'
        }, {
            label: "Total Drones Amount",
            // data: 90,
            color: '#979fd2'
        },

        ];
        $scope.pieOptions = {
            series: {
                pie: {
                    innerRadius: 0.5,
                    show: true,
                    textinfo: "none",
                    label: {
                        show: true,
                        formatter: function (label, point) {
                            return (label + point.percent.toFixed(2) + '');

                        }
                    }
                }
            },
            legend: {
                show: false
            },
            grid: {
                hoverable: true
            }
        };

        // Standard Chart Example
        //

        // ***************for tooltip***********************
        $scope.onEventExampleClicked1 = function (event, pos, item) {
            // alert('Click! ' + event.timeStamp + ' ' + pos.pageX + ' ' + pos.pageY);
            // highlight('Hover! ' + event.timeStamp + ' ' + pos.pageX + ' ' + pos.pageY);
            console.log(event, pos, item, "click");
            chart - use
            console.log(item.dataIndex, item.series.label);
            hoverShow1(item.dataIndex, item.series.label, pos.pageX, pos.pageY);
        };

        $scope.onEventExampleHover1 = function (event, pos, item) {
            // console.log('Hover! ' + event.timeStamp + ' ' + pos.pageX + ' ' + pos.pageY);
            if (item != null) {
                hoverShow1(item.dataIndex, item.series.label, pos.pageX, pos.pageY);
            }

        };

        function hoverShow1(index, label, x, y) {
            if (label == "Internal CAD") {
                var a = $scope.data3[index][0];
                var s = new Date(a);
                var b = $scope.data3[index][1];
                $scope.toolsvalue1 = "x: " + s.toUTCString() + " y: " + b + label;
            } else {
                var a = $scope.data4[index][0];
                var s = new Date(a);
                var b = $scope.data4[index][1];
                $scope.toolsvalue1 = "x: " + s.toUTCString() + " y: " + b + label;

            }
            $('#c').css("top", y);
            $('#d').css("left", x);

        }
        // ***************for tooltip***********************
        //
        // Pie Chart Example of order
        //

        $scope.pieDatasetRevenue = [{
            label: "CAD",
            data: 200,
            color: '#48b5d5',
        }, {
            label: "DFM",
            data: 120,
            color: '#82ddcb'
        }, {
            label: "DRONE",
            data: 50,
            color: '#979fd2'
        },

        ];
        $scope.pieOptionsRevenue = {
            series: {
                pie: {
                    innerRadius: 0.5,
                    show: true,
                    textinfo: "none",
                    label: {
                        show: true,
                        formatter: function (label, point) {
                            return (point.percent.toFixed(2) + '$');

                        }
                    }
                }
            },
            legend: {
                show: false
            },
            grid: {
                hoverable: true
            }
        };
        //
        // Pie Chart Example Revenue
        //

        $scope.pieDatasetOrder = [{
            label: "CAD",
            // data: 120,
            color: '#48b5d5',
        }, {
            label: "DFM",
            // data: 30,
            color: '#82ddcb'
        }, {
            label: "DRONE",
            // data: 90,
            color: '#979fd2'
        },

        ];
        $scope.pieOptionsOrder = {
            series: {
                pie: {
                    innerRadius: 0.5,
                    show: true,
                    textinfo: "none",
                    label: {
                        show: true,
                        formatter: function (label, point) {
                            return (label + ' ' + point.percent.toFixed(2));

                        }
                    }
                }
            },
            legend: {
                show: false
            },
            grid: {
                hoverable: true
            }
        };


        //
        // Pie Chart Example2
        //

        $scope.pieDatasetRevenue = [{
            label: "CAD",
            // data: 200,
            color: '#48b5d5',
        }, {
            label: "DFM",
            // data: 120,
            color: '#82ddcb'
        }, {
            label: "DRONE",
            // data: 50,
            color: '#979fd2'
        },

        ];
        $scope.pieOptionsRevenue = {
            series: {
                pie: {
                    innerRadius: 0.5,
                    show: true,
                    textinfo: "none",
                    label: {
                        show: true,
                        formatter: function (label, point) {

                            return (label + ' $' + point.percent.toFixed(2));

                        }
                    }
                }
            },
            legend: {
                show: false
            },
            grid: {
                hoverable: true
            }
        };
        // *************************************************end of chart for Admin**********************************************************************************************************
        // *************************************************start of chart for vendor**********************************************************************************************************
        //
        // Pie Chart Example Cad
        //

        $scope.pieDatasetCad = [{
            label: "Cancel CAD Files",
            // data: 120,
            color: '#48b5d5',
        }, {
            label: "Completed CAD Files",
            // data: 30,
            color: '#82ddcb'
        }, {
            label: "Processing CAD Files",
            // data: 90,
            color: '#979fd2'
        }, {
            label: "QC CAD Files",
            // data: 90,
            color: '#979fd2'
        },];
        $scope.pieOptionsCad = {
            series: {
                pie: {
                    innerRadius: 0.5,
                    show: true,
                    textinfo: "none",
                    label: {
                        show: true,
                        formatter: function (label, point) {
                            return (point.percent.toFixed(2) + '');

                        }
                    }
                }
            },
            legend: {
                show: false
            },
            grid: {
                hoverable: true
            }
        };
        //
        // Pie Chart Month
        //

        $scope.pieDatasetMonth = [{
            label: "Outstanding Amount",
            // data: 120,
            color: '#82ddcb'
        }, {
            label: "Paid Amount",
            // data: 50,
            color: '#979fd2'
        },

        ];
        $scope.pieOptionsMonth = {
            series: {
                pie: {
                    innerRadius: 0.5,
                    show: true,
                    textinfo: "none",
                    label: {
                        show: true,
                        formatter: function (label, point) {
                            return (point.percent.toFixed(2) + '');

                        }
                    }
                }
            },
            legend: {
                show: false
            },
            grid: {
                hoverable: true
            }
        };
        // *************************************************end of chart for vendor**********************************************************************************************************


        if ($scope.accessLevel == "Admin") {

            //-------------------dashboard for admin api call---------------------------//


            NavigationService.apiCallWithoutData("User/getTotalUsers", function (data) {
                if (data.value === true) {
                    $scope.totalUsers = data.data;
                }
            });

            NavigationService.apiCallWithoutData("User/getTotalDronesSold", function (data) {
                if (data.value === true) {
                    $scope.totalDronesSold = data.data;
                }
            });

            NavigationService.apiCallWithoutData("User/getTotalCadRequest", function (data) {
                if (data.value === true) {
                    $scope.totalCad = data.data;
                }
            });

            NavigationService.apiCallWithoutData("User/getTotalMissions", function (data) {
                if (data.value === true) {
                    $scope.totalMission = data.data;
                }
            });

            NavigationService.apiCallWithoutData("User/getLastTenCad", function (data) {
                if (data.value === true) {
                    $scope.totalTenCad = data.data;
                }
            });


            $scope.getAllData = function (data) {
                var sendData = {};
                sendData.timeData = data;
                NavigationService.apiCallWithData("User/getCadOrderDetails", sendData, function (data) {
                    if (data.value === true && data.data != 'noData') {
                        $scope.totalCadSum = data.data.totalCadSum;
                        $scope.totalDfmSum = data.data.totalDfmSum;
                        $scope.totalProductSum = data.data.totalProductSum;
                        $scope.totalSum = data.data.totalSum;
                    } else {
                        $scope.totalCadSum = 0;
                        $scope.totalDfmSum = 0;
                        $scope.totalProductSum = 0;
                        $scope.totalSum = 0;
                    }
                });
            };

            $scope.getAllData('Today');


            NavigationService.apiCallWithoutData("User/getTotalProductOrdersData", function (data) {
                if (data.value === true) {
                    $scope.pieDatasetOrder[0].data = data.data.totalCadCount;
                    $scope.pieDatasetRevenue[0].data = data.data.totalCadSum;
                    $scope.pieDatasetOrder[1].data = data.data.totalDfmCount;
                    $scope.pieDatasetRevenue[1].data = data.data.totalDfmSum;
                    $scope.pieDatasetOrder[2].data = data.data.totalProductCount;
                    $scope.pieDatasetRevenue[2].data = data.data.totalProductSum;
                }
            });

            NavigationService.apiCallWithoutData("CadLineWork/getGraphDataForAdmin", function (data) {
                if (data.value === true) {
                    $scope.data4 = data.data.InternalData;
                    $scope.data3 = data.data.ExternalData;

                    var i = 0
                    _.forEach($scope.data4, function (x) {
                        $scope.data4[i][0] = new Date($scope.data4[i][0]).getTime();
                        $scope.data4[i][1] = $scope.data4[i][1] * 100
                        i++;
                    });
                    var i = 0
                    _.forEach($scope.data3, function (x) {
                        $scope.data3[i][0] = new Date($scope.data3[i][0]).getTime();
                        // $scope.data3[i][1] = $scope.data3[i][1] * 100
                        i++;
                    });

                    $scope.datasetadmin = [{
                        label: "Exterrnal CAD",
                        grow: {
                            stepMode: "linear"
                        },
                        data: $scope.data4,
                        color: "#41d0c8",
                        bars: {
                            show: true,
                            align: "center",
                            barWidth: 24 * 60 * 60 * 600,
                            lineWidth: 0
                        }

                    }, {
                        label: " Internal CAD",
                        grow: {
                            stepMode: "linear"
                        },
                        data: $scope.data3,
                        yaxis: 2,
                        color: "#2a2a2a",
                        lines: {
                            lineWidth: 1,
                            show: true,
                            fill: true,
                            fillColor: {
                                colors: [{
                                    opacity: 0.2
                                }, {
                                    opacity: 0.2
                                }]
                            }
                        }
                    }

                    ];
                    $scope.template = TemplateService.changecontent("dashboard");
                    $scope.menutitle = NavigationService.makeactive("Dashboard");
                } else {
                    $scope.template = TemplateService.changecontent("dashboard");
                    $scope.menutitle = NavigationService.makeactive("Dashboard");
                }
            });

            $scope.optionsadmin = {
                grid: {
                    hoverable: true,
                    clickable: true,
                    tickColor: "#d5d5d5",
                    borderWidth: 0,
                    color: '#d5d5d5'
                },
                colors: ["#29aba4", "#464f88"],
                tooltip: true,
                xaxis: {
                    mode: "time",
                    tickSize: [3, "day"],
                    tickLength: 0,
                    axisLabel: "Date",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Arial',
                    axisLabelPadding: 10,
                    color: "#d5d5d5"
                },
                yaxes: [{
                    position: "left",
                    max: 1070,
                    color: "#d5d5d5",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Arial',
                    axisLabelPadding: 3
                }, {
                    position: "right",
                    color: "#d5d5d5",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: ' Arial',
                    axisLabelPadding: 67
                }],
                legend: {
                    noColumns: 1,
                    labelBoxBorderColor: "#d5d5d5",
                    position: "nw"
                }
            };

            //-------------------dashboard for admin api call End---------------------------//

        } else if ($scope.accessLevel == "User") {

            var dataToSend = {}
            dataToSend.userId = userId;
            NavigationService.apiCallWithData("User/getAllMission", dataToSend, function (data) {
                if (data.value === true) {
                    $scope.totalMissionsForUser = data.data;
                }
            });

            NavigationService.apiCallWithData("User/getTotalCadFile", dataToSend, function (data) {
                if (data.value === true) {
                    $scope.totalCadForUser = data.data;
                }
            });

            var sendId = {};
            sendId._id = currentSubscriptionId;
            NavigationService.apiCallWithData("DFMSubscription/getOne", sendId, function (data) {
                if (data.value === true) {
                    $scope.dfmDateAndStatusOfUser = data.data;
                }
            });

            NavigationService.apiCallWithData("User/getOrdersDetails", dataToSend, function (data) {
                if (data.value === true) {
                    $scope.last1Month = data.data.last1Month;
                    $scope.last1MonthData = data.data.last1MonthData;
                    $scope.last2Month = data.data.last2Month;
                    $scope.last2MonthData = data.data.last2MonthData;
                    $scope.lastMonth = data.data.lastMonth;
                    $scope.lastMonthData = data.data.lastMonthData;
                }
            });

            NavigationService.apiCallWithData("User/getStatsForPie", dataToSend, function (data) {
                if (data.value === true && data.data != 'noData') {
                    $scope.pieDataset[0].data = data.data.totalCadSum;
                    $scope.pieDataset[1].data = data.data.totalDfmSum;
                    $scope.pieDataset[2].data = data.data.totalProductSum;
                } else {
                    $scope.pieDataset[0].data = 20;
                    $scope.pieDataset[1].data = 30;
                    $scope.pieDataset[2].data = 90;
                }
            });
            var dataToSend1 = {}
            dataToSend1.userId = userId;
            NavigationService.apiCallWithData("CadLineWork/getGraphDataForUser", dataToSend1, function (data) {
                if (data.value === true) {
                    $scope.data2 = data.data.OrderData;
                    $scope.data1 = data.data.Payment;

                    var i = 0
                    _.forEach($scope.data2, function (x) {
                        $scope.data2[i][0] = new Date($scope.data2[i][0]).getTime();
                        // $scope.data2[i][1] = $scope.data2[i][1] * 100
                        i++;
                    });
                    var i = 0
                    _.forEach($scope.data1, function (x) {
                        $scope.data1[i][0] = new Date($scope.data1[i][0]).getTime();
                        // $scope.data1[i][1] = $scope.data1[i][1] * 100
                        i++;
                    });


                    $scope.dataset = [{
                        label: "Number of orders",
                        grow: {
                            stepMode: "linear"
                        },
                        data: $scope.data2,
                        color: "#41d0c8",
                        bars: {
                            show: true,
                            align: "center",
                            barWidth: 24 * 60 * 60 * 600,
                            lineWidth: 0
                        }

                    }, {
                        label: "Payments",
                        grow: {
                            stepMode: "linear"
                        },
                        data: $scope.data1,
                        yaxis: 2,
                        color: "#2a2a2a",
                        lines: {
                            lineWidth: 1,
                            show: true,
                            fill: true,
                            fillColor: {
                                colors: [{
                                    opacity: 0.2
                                }, {
                                    opacity: 0.2
                                }]
                            }
                        }
                    }

                    ];
                    $scope.template = TemplateService.changecontent("dashboard");
                    $scope.menutitle = NavigationService.makeactive("Dashboard");
                } else {
                    $scope.template = TemplateService.changecontent("dashboard");
                    $scope.menutitle = NavigationService.makeactive("Dashboard");
                }
            });

            $scope.options = {
                grid: {
                    hoverable: true,
                    clickable: true,
                    tickColor: "#d5d5d5",
                    borderWidth: 0,
                    color: '#d5d5d5'
                },
                colors: ["#29aba4", "#464f88"],
                tooltip: true,
                xaxis: {
                    mode: "time",
                    tickSize: [3, "day"],
                    tickLength: 0,
                    axisLabel: "Date",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Arial',
                    axisLabelPadding: 10,
                    color: "#d5d5d5"
                },
                yaxes: [{
                    position: "left",
                    max: 1070,
                    color: "#d5d5d5",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Arial',
                    axisLabelPadding: 3
                }, {
                    position: "right",
                    color: "#d5d5d5",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: ' Arial',
                    axisLabelPadding: 67
                }],
                legend: {
                    noColumns: 1,
                    labelBoxBorderColor: "#d5d5d5",
                    position: "nw"
                }
            };

        } else if ($scope.accessLevel == "Vendor") {

            var dataToSend = {}
            dataToSend.vendorId = userId;
            NavigationService.apiCallWithData("User/getTotalCadForVendor", dataToSend, function (data) {
                if (data.value === true) {
                    $scope.totalCadForVendor = data.data;
                }
            });

            NavigationService.apiCallWithData("User/getTotalCompletedCadForVendor", dataToSend, function (data) {
                if (data.value === true && data.data != 'No Data Found') {
                    $scope.totalCadCompletedForVendor = data.data;
                } else {
                    $scope.totalCadCompletedForVendor = 0;
                }
            });

            NavigationService.apiCallWithData("User/getTotalIncompletedCadForVendor", dataToSend, function (data) {
                if (data.value === true) {
                    $scope.totalCadIncompletedForVendor = data.data;
                }
            });

            NavigationService.apiCallWithData("User/getTotalEarningData", dataToSend, function (data) {
                if (data.value === true) {
                    $scope.totalEarningForVendor = data.data.totalAmount;
                }
            });

            NavigationService.apiCallWithData("User/getCurrentMonthCadStats", dataToSend, function (data) {
                if (data.value === true && data.data != 'noData') {
                    $scope.pieDatasetCad[0].data = data.data.totalCancelledCount;
                    $scope.pieDatasetCad[1].data = data.data.totalCompletedCount;
                    $scope.pieDatasetCad[2].data = data.data.totalProcessingCount;
                    $scope.pieDatasetCad[3].data = data.data.totalQcCount;
                } else {
                    $scope.pieDatasetCad[0].data = 30;
                    $scope.pieDatasetCad[1].data = 2;
                    $scope.pieDatasetCad[2].data = 4;
                    $scope.pieDatasetCad[3].data = 5;
                }
            });

            NavigationService.apiCallWithData("User/getCurrentMonthCadEarningStats", dataToSend, function (data) {
                if (data.value === true && data.data != 'noData') {
                    $scope.pieDatasetMonth[0].data = data.data.totalOutstandingCount;
                    $scope.pieDatasetMonth[1].data = data.data.totalPaidCount;
                } else {
                    $scope.pieDatasetMonth[0].data = 30;
                    $scope.pieDatasetMonth[1].data = 20;
                }
            });
            $scope.template = TemplateService.changecontent("dashboard");
            $scope.menutitle = NavigationService.makeactive("Dashboard");
        }

    })

    .controller('ProductDetailCtrl', function ($scope, $stateParams, TemplateService, NavigationService, $timeout, $state, toastr, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("product-detail");
        $scope.menutitle = NavigationService.makeactive("ProductDetail");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
        }


        $scope._id = {
            _id: $stateParams.productId
        };
        NavigationService.apiCallWithData("Products/getProduct", $scope._id, function (data) {
            $scope.productInfo = data.data;
        });

        $scope.userId = $.jStorage.get("user")._id;
        console.log("inside product Details", $scope.userId);
        $scope.dt = new Date();
        $scope.dt.setDate($scope.dt.getDate() + 30);
        if ($.jStorage.get("user")) {
            $scope.dfmData = [{
                name: "TRIAL",
                invitations: "0",
                missions: "3",
                UploadPhoto: "200",
                UploadSize: "1GB",
                Mosaic: "12cm",
                exportKMZ: " 15",
                exportOrthophoto: "USAGE LIMIT",
                exportDEM: "USAGE LIMIT",
                exportPointCloud: "false",
                status: "Active",
                amount: "0",
                expiryDate: $scope.dt,
            }, {
                id: 1,
                user: $.jStorage.get("user")._id,
                name: "STANDARD",
                invitations: "15",
                missions: "Unlimited",
                UploadPhoto: " 500",
                UploadSize: "2.5GB",
                Mosaic: "2cm",
                exportKMZ: "15",
                exportOrthophoto: "USAGE LIMIT",
                exportDEM: "USAGE LIMIT",
                exportPointCloud: "USAGE LIMIT",
                status: "Active",
                amount: "$149",
                expiryDate: $scope.dt,
            }, {

                id: 2,
                user: $.jStorage.get("user")._id,
                name: "PREMIUM",
                invitations: "25",
                missions: "Unlimited",
                UploadPhoto: "1000",
                UploadSize: "5GB",
                Mosaic: "2cm",
                exportKMZ: " 25",
                exportOrthophoto: "USAGE LIMIT",
                exportDEM: "USAGE LIMIT",
                exportPointCloud: "USAGE LIMIT",
                status: "Active",
                amount: "$299",
                expiryDate: $scope.dt,
            }]
        } else {
            var dfmData = [];
        }

        // $scope.saveFreeTrial = function () {
        //     if ($.jStorage.get("user")) {
        //         $scope.dfmData[0].user = $.jStorage.get("user")._id;
        //         NavigationService.apiCallWithData("DFMSubscription/save", $scope.dfmData[0], function (dfm) {
        //             $scope.dfmId = dfm.data._id;
        //             if (dfm.data._id) {
        //                 var formdata = {};
        //                 formdata._id = $.jStorage.get("user")._id;
        //                 formdata.currentSubscription = $scope.dfmId;
        //                 console.log("formdata data is", formdata)
        //                 NavigationService.apiCallWithData("User/save", formdata, function (dfmData) {});
        //             }
        //         });
        //         $uibModal.open({
        //             animation: true,
        //             templateUrl: 'views/modal/freetrial.html',
        //             scope: $scope,
        //             size: 'sm',

        //         });
        //     } else {
        //         $state.go("member")
        //     }
        // }

    })

    .controller('TicketHistoryCtrl', function ($scope, $stateParams, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("ticket-history");
        $scope.menutitle = NavigationService.makeactive("TicketHistory");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
        }
        var ticket = {};
        ticket._id = $stateParams.ticketId;
        NavigationService.apiCallWithData("Ticket/getOne", ticket, function (data) {
            if (data.value == true) {
                $scope.ticket = data.data;
            }
        });
    })

    .controller('SupportCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("support");
        $scope.menutitle = NavigationService.makeactive("Support");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];


        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
            var userId = $.jStorage.get("user")._id;
        }
        excelName = {
            name: "support",
            _id: $.jStorage.get("user")._id
        }

        $scope.csvFileForUser = function () {
            console.log("inside csvFile ")
            NavigationService.generateCsvithName("Ticket/generatecsvForUser", excelName, function (data) {
                console.log("ater api called", data);
            });
        };
        $scope.csvFile = function () {
            console.log("inside csvFile ")
            NavigationService.generateCsvithName("Ticket/generatecsv", excelName, function (data) {
                console.log("ater api called", data);
            });
        };
        $scope.generatePdfForUser = function () {
            console.log("inside generatePdf ")
            NavigationService.generatepdfwithName("Ticket/generatePdfForUser", excelName, function (data) {
                console.log("ater api called", data);
            });
        };
        $scope.generatePdf = function () {
            console.log("inside generatePdf ")
            NavigationService.generatepdfwithName("Ticket/generatePdf", excelName, function (data) {
                console.log("ater api called", data);
            });
        };
        $scope.generateExcel = function () {
            NavigationService.generateExcelWithName("Ticket/exceltotalTicket", excelName, function (data) { });
        };


        $scope.generateExcelforUser = function () {
            NavigationService.generateExcelWithName("Ticket/exceltotalTicketforUser", excelName, function (data) { });
        };
        if ($scope.accessLevel == "User") {

            //pagination user
            var formdata = {};
            formdata.user = userId;
            var i = 0;
            if ($stateParams.page && !isNaN(parseInt($stateParams.page))) {
                $scope.currentPage = $stateParams.page;
            } else {
                $scope.currentPage = 1;
            }

            $scope.search = {
                keyword: ""
            };
            if ($stateParams.keyword) {
                $scope.search.keyword = $stateParams.keyword;
            }
            $scope.changePage = function (page) {
                var goTo = "support";
                $scope.currentPage = page;
                if ($scope.search.keyword) {
                    goTo = "support";
                }
                $state.go(goTo, {
                    page: page
                });
                $scope.getAllItems();
            };

            $scope.getAllItems = function (keywordChange, count) {
                if (keywordChange != undefined && keywordChange != true) {
                    $scope.maxCount = keywordChange;
                    $scope.totalItems = undefined;
                    if (keywordChange) { }
                    NavigationService.searchCall("Ticket/getTicket", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword,
                        count: $scope.maxCount,
                        user: formdata.user
                    }, ++i,
                        function (data, ini) {
                            if (ini == i) {
                                $scope.ticketInfo = data.data.results;
                                $scope.totalItems = data.data.total;
                                $scope.maxRow = data.data.options.count;
                            }
                        });
                } else {
                    $scope.totalItems = undefined;
                    if (keywordChange) { }
                    NavigationService.searchCall("Ticket/getTicket", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword,
                        count: $scope.maxCount,
                        user: formdata.user
                    }, ++i,
                        function (data, ini) {
                            if (ini == i) {
                                $scope.ticketInfo = data.data.results;
                                $scope.totalItems = data.data.total;
                                $scope.maxRow = data.data.options.count;
                            }
                        });
                }

            };
            //  JsonService.refreshView = $scope.getAllItems;
            $scope.getAllItems();

            //pagination end user

        } else if ($scope.accessLevel == "Admin") {

            //pagination admin
            var i = 0;
            if ($stateParams.page && !isNaN(parseInt($stateParams.page))) {
                $scope.currentPage = $stateParams.page;
            } else {
                $scope.currentPage = 1;
            }

            $scope.search = {
                keyword: ""
            };
            if ($stateParams.keyword) {
                $scope.search.keyword = $stateParams.keyword;
            }
            $scope.changePage = function (page) {
                var goTo = "support";
                $scope.currentPage = page;
                if ($scope.search.keyword) {
                    goTo = "support";
                }
                $state.go(goTo, {
                    page: page
                });
                $scope.getAllItems();
            };

            $scope.getAllItems = function (keywordChange, count) {
                if (keywordChange != undefined && keywordChange != true) {
                    $scope.maxCount = keywordChange;
                    $scope.totalItems = undefined;
                    if (keywordChange) { }
                    NavigationService.searchCall("Ticket/getAllTickets", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword,
                        count: $scope.maxCount
                    }, ++i,
                        function (data, ini) {
                            if (ini == i) {
                                $scope.allTicketData = data.data.results;
                                $scope.totalItems = data.data.total;
                                $scope.maxRow = data.data.options.count;
                            }
                        });
                } else {
                    $scope.totalItems = undefined;
                    if (keywordChange) { }
                    NavigationService.searchCall("Ticket/getAllTickets", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword,
                        count: $scope.maxCount
                    }, ++i,
                        function (data, ini) {
                            if (ini == i) {
                                $scope.allTicketData = data.data.results;
                                $scope.totalItems = data.data.total;
                                $scope.maxRow = data.data.options.count;
                            }
                        });
                }

            };
            //  JsonService.refreshView = $scope.getAllItems;
            $scope.getAllItems();

            //pagination end admin
        }


    })

    .controller('MissionsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("missions");
        $scope.menutitle = NavigationService.makeactive("Missions");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];
        $scope.isMissionPresent = [];
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
        }
        excelName = {
            name: "Mission",
            _id: $.jStorage.get("user")._id
        }
        $scope.csvFileForUser = function () {
            console.log("inside csvFile ")
            NavigationService.generateCsvithName("Mission/generatecsvForUser", excelName, function (data) {
                console.log("ater api called", data);
            });
        };
        $scope.csvFile = function () {
            console.log("inside csvFile ")
            NavigationService.generateCsvithName("Mission/generatecsv", excelName, function (data) {
                console.log("ater api called", data);
            });
        };
        $scope.generatePdf = function () {
            console.log("inside generatePdf ")
            NavigationService.generatepdfwithName("Mission/generatePdf", excelName, function (data) {
                console.log("ater api called", data);
            });
        };
        $scope.generatePdfForUser = function () {
            console.log("inside generatePdf ")
            NavigationService.generatepdfwithName("Mission/generatePdfForUser", excelName, function (data) {
                console.log("ater api called", data);
            });
        };

        $scope.generateExcel = function () {
            NavigationService.generateExcelWithName("Mission/exceltotalMission", excelName, function (data) { });
        };

        $scope.generateExcelforUser = function () {
            NavigationService.generateExcelWithName("Mission/exceltotalMissionforUser", excelName, function (data) { });
        };

        if ($scope.accessLevel == "Admin") {

            //pagination admin

            var i = 0;
            if ($stateParams.page && !isNaN(parseInt($stateParams.page))) {
                $scope.currentPage = $stateParams.page;
            } else {
                $scope.currentPage = 1;
            }

            $scope.search = {
                keyword: ""
            };
            if ($stateParams.keyword) {
                $scope.search.keyword = $stateParams.keyword;
            }
            $scope.changePage = function (page) {
                var goTo = "missions";
                $scope.currentPage = page;
                if ($scope.search.keyword) {
                    TemplateService.mainClass = ['page-sidebar-closed', 'active'];
                    goTo = "missions";
                }
                $state.go(goTo, {
                    page: page
                });
                $scope.getAllItems();
            };

            $scope.getAllItems = function (keywordChange, count) {
                if (keywordChange != undefined && keywordChange != true) {
                    $scope.maxCount = keywordChange;
                    $scope.totalItems = undefined;
                    if (keywordChange) { }
                    NavigationService.searchCall("Mission/getMission", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword,
                        count: $scope.maxCount
                    }, ++i,
                        function (data, ini) {
                            if (ini == i) {
                                $scope.allMissionData = data.data.results;
                                $scope.totalItems = data.data.total;
                                $scope.maxRow = data.data.options.count;
                            }
                        });
                } else {
                    $scope.totalItems = undefined;
                    if (keywordChange) { }
                    TemplateService.mainClass = ['page-sidebar-closed', 'active'];
                    NavigationService.searchCall("Mission/getMission", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword,
                        count: $scope.maxCount
                    }, ++i,
                        function (data, ini) {
                            if (ini == i) {
                                $scope.allMissionData = data.data.results;
                                $scope.totalItems = data.data.total;
                                $scope.maxRow = data.data.options.count;
                            }
                        });
                }

            };
            //  JsonService.refreshView = $scope.getAllItems;
            $scope.getAllItems();

            //pagination end admin

        } else if ($scope.accessLevel == "User") {

            //pagination user

            var formdata = {};
            formdata.user = $.jStorage.get("user")._id;

            var userId = $.jStorage.get("user")._id;

            var i = 0;
            if ($stateParams.page && !isNaN(parseInt($stateParams.page))) {
                $scope.currentPage = $stateParams.page;
            } else {
                $scope.currentPage = 1;
            }

            $scope.search = {
                keyword: ""
            };
            if ($stateParams.keyword) {
                $scope.search.keyword = $stateParams.keyword;
            }
            $scope.changePage = function (page) {
                var goTo = "missions";
                $scope.currentPage = page;
                if ($scope.search.keyword) {
                    goTo = "missions";
                }
                $state.go(goTo, {
                    page: page
                });
                $scope.getAllItems();
            };

            $scope.getAllItems = function (keywordChange, count) {
                if (keywordChange != undefined && keywordChange != true) {
                    $scope.maxCount = keywordChange;
                    $scope.totalItems = undefined;
                    if (keywordChange) { }
                    NavigationService.searchCall("Mission/getMissionUser", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword,
                        count: $scope.maxCount,
                        user: formdata.user
                    }, ++i,
                        function (data, ini) {
                            if (ini == i) {
                                $scope.missionInfo = data.data.results;
                                $scope.totalItems = data.data.total;
                                $scope.maxRow = data.data.options.count;
                            }
                        });
                } else {
                    $scope.totalItems = undefined;
                    if (keywordChange) { }
                    NavigationService.searchCall("Mission/getMissionUser", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword,
                        user: formdata.user,
                        count: $scope.maxCount
                    }, ++i,
                        function (data, ini) {
                            if (ini == i) {
                                $scope.missionInfo = data.data.results;
                                $scope.totalItems = data.data.total;
                                $scope.maxRow = data.data.options.count;
                            }
                        });
                }

            };
            //  JsonService.refreshView = $scope.getAllItems;
            $scope.getAllItems();
        }
        //pagination end user

    })

    .controller('MissionsDetailsCtrl', function ($scope, $rootScope, TemplateService, $http, NavigationService, $uibModal, $timeout, $state, toastr, $stateParams) {
        TemplateService.mainClass = ['page-sidebar-closed', 'active'];
        $scope.demo6 = {
            valueA: 5000,
            valueB: 3000
        };

        $scope.profileDetails = $.jStorage.get("user");
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
        }
        var missionIdForDownload = {};
        $scope.cadLineDetails = {}
        var mission = {};
        var missionID = {};
        mission._id = $stateParams.missionId;
        NavigationService.apiCall("Mission/getOne", mission, function (data) {
            if (data.value === true) {
                $scope.missionDetails = data.data;
                missionID.filename = $scope.missionDetails.missionId;
                missionIdForDownload = $scope.missionDetails.missionId;
                idForDownload = $scope.missionDetails._id;
                $scope.template = TemplateService.changecontent("mission-details");
                $scope.menutitle = NavigationService.makeactive("MissionDetails");
                TemplateService.title = $scope.menutitle;
                $scope.navigation = NavigationService.getnav();
                $scope.cadLineDetails = {};
            }
        });
        $scope.priceListForNDB = [{
            "from": 0,
            "to": 1,
            "density": {
                "low": 77.63,
                "medium": 95.88,
                "high": 112.13
            },
            "contoursDensity": {
                "low": 103.50,
                "medium": 120.75,
                "high": 138
            }
        }, {
            "from": 1.1,
            "to": 2,
            "density": {
                "low": 80.50,
                "medium": 100.63,
                "high": 120.75
            },
            "contoursDensity": {
                "low": 120.75,
                "medium": 140.88,
                "high": 161.00
            }
        }, {
            "from": 2,
            "to": 3.5,
            "density": {
                "low": 100.63,
                "medium": 120.75,
                "high": 140.88
            },
            "contoursDensity": {
                "low": 140.88,
                "medium": 161.00,
                "high": 181.13
            }
        }, {
            "from": 3.6,
            "to": 5,
            "density": {
                "low": 187.20,
                "medium": 210.60,
                "high": 234.00
            },
            "contoursDensity": {
                "low": 257.40,
                "medium": 280.80,
                "high": 304.20
            }
        }, {
            "from": 5.1,
            "to": 8,
            "density": {
                "low": 288.00,
                "medium": 312.00,
                "high": 333.00
            },
            "contoursDensity": {
                "low": 396.00,
                "medium": 420.00,
                "high": 444.00
            }
        }, {
            "from": 8.1,
            "to": 12,
            "density": {
                "low": 360.00,
                "medium": 384.00,
                "high": 408.00
            },
            "contoursDensity": {
                "low": 504.00,
                "medium": 528.00,
                "high": 672.00
            }
        }, {
            "from": 12.1,
            "to": 17,
            "density": {
                "low": 520.00,
                "medium": 546.00,
                "high": 572.00
            },
            "contoursDensity": {
                "low": 715.00,
                "medium": 741.00,
                "high": 767.00
            }
        }, {
            "from": 17.1,
            "to": 22,
            "density": {
                "low": 598.00,
                "medium": 624.00,
                "high": 650.00
            },
            "contoursDensity": {
                "low": 832.00,
                "medium": 858.00,
                "high": 884.00
            }
        }, {
            "from": 22.1,
            "to": 27,
            "density": {
                "low": 624.00,
                "medium": 650.00,
                "high": 676.00
            },
            "contoursDensity": {
                "low": 858.00,
                "medium": 884.00,
                "high": 910.00
            }
        }, {
            "from": 27.1,
            "to": 32,
            "density": {
                "low": 655.20,
                "medium": 682.50,
                "high": 709.80
            },
            "contoursDensity": {
                "low": 900.90,
                "medium": 920.20,
                "high": 955.50
            }
        }, {
            "from": 32.1,
            "to": 40,
            "density": {
                "low": 682.50,
                "medium": 709.80,
                "high": 737.10
            },
            "contoursDensity": {
                "low": 928.20,
                "medium": 955.50,
                "high": 982.80
            }
        }];
        $scope.priceListForUDB = [{
            "from": 0,
            "to": 1,
            "density": {
                "low": 67.50,
                "medium": 82.50,
                "high": 97.50
            },
            "contoursDensity": {
                "low": 90.00,
                "medium": 105.00,
                "high": 120.00
            }
        }, {
            "from": 1.1,
            "to": 2,
            "density": {
                "low": 70.00,
                "medium": 87.50,
                "high": 105.00
            },
            "contoursDensity": {
                "low": 105.00,
                "medium": 122.50,
                "high": 140.00
            }
        }, {
            "from": 2,
            "to": 3.5,
            "density": {
                "low": 87.50,
                "medium": 105.00,
                "high": 122.50
            },
            "contoursDensity": {
                "low": 122.50,
                "medium": 140.00,
                "high": 157.50
            }
        }, {
            "from": 3.6,
            "to": 5,
            "density": {
                "low": 156.00,
                "medium": 175.50,
                "high": 195.00
            },
            "contoursDensity": {
                "low": 214.50,
                "medium": 234.00,
                "high": 253.50
            }
        }, {
            "from": 5.1,
            "to": 8,
            "density": {
                "low": 240.00,
                "medium": 260.00,
                "high": 280.00
            },
            "contoursDensity": {
                "low": 330.00,
                "medium": 350.00,
                "high": 370.00
            }
        }, {
            "from": 8.1,
            "to": 12,
            "density": {
                "low": 300.00,
                "medium": 320.00,
                "high": 340.00
            },
            "contoursDensity": {
                "low": 420.00,
                "medium": 440.00,
                "high": 560.00
            }
        }, {
            "from": 12.1,
            "to": 17,
            "density": {
                "low": 400.00,
                "medium": 420.00,
                "high": 440.00
            },
            "contoursDensity": {
                "low": 550.00,
                "medium": 570.00,
                "high": 590.00
            }
        }, {
            "from": 17.1,
            "to": 22,
            "density": {
                "low": 460.00,
                "medium": 480.00,
                "high": 500.00
            },
            "contoursDensity": {
                "low": 640.00,
                "medium": 660.00,
                "high": 680.00
            }
        }, {
            "from": 22.1,
            "to": 27,
            "density": {
                "low": 480.00,
                "medium": 500.00,
                "high": 520.00
            },
            "contoursDensity": {
                "low": 660.00,
                "medium": 680.00,
                "high": 700.00
            }
        }, {
            "from": 27.1,
            "to": 32,
            "density": {
                "low": 504.00,
                "medium": 525.00,
                "high": 546.00
            },
            "contoursDensity": {
                "low": 693.00,
                "medium": 714.00,
                "high": 735.00
            }
        }, {
            "from": 32.1,
            "to": 40,
            "density": {
                "low": 525.00,
                "medium": 546.00,
                "high": 567.00
            },
            "contoursDensity": {
                "low": 714.00,
                "medium": 735.00,
                "high": 756.00
            }
        }];
        $scope.calculateAmount = function (data) {
            console.log("inside calculateAmount", data)
            if (data.contoursDensity || data.draftingDensity) {
                var priceList;
                if ($scope.profileDetails.lisence == 'UDB') {
                    priceList = $scope.priceListForUDB;
                } else {
                    priceList = $scope.priceListForNDB;

                }
                _.forEach(priceList, function (val) {
                    var checkRange = _.inRange(data.acreage, val.from, val.to);
                    if (checkRange == true) {
                        if (data.contoursDensity && _.isEqual(data.contours, 'true')) {
                            $scope.cadLineDetails.amount = val.contoursDensity[data.contoursDensity]
                        } else {
                            $scope.cadLineDetails.amount = val.density[data.draftingDensity]
                        }
                        // NavigationService.apiCall("CadLineWork/save", data, function (data) {
                        //     if (data.value === true) {
                        //         console.log("data.value", data.value);
                        //     } else {
                        //         //  toastr.warning('Error submitting the form', 'Please try again');
                        //     }
                        // });
                        return false;
                    }
                })
            }

        }

        var cardDetails;
        $scope.cadSave = function (data) {
            $scope.cadLineDetails.mission = $scope.missionDetails._id;
            $scope.cadLineDetails.geoLocation = $scope.missionDetails.geoLocation
            $scope.cadLineDetails.user = $.jStorage.get("user")._id;
            NavigationService.apiCall("CadLineWork/createCad", $scope.cadLineDetails, function (data) {
                if (data.value === true) {
                    var formdata = {}
                    formdata.cadLineWork = data.data._id;
                    formdata.user = $scope.profileDetails._id;
                    formdata.totalAmount = $scope.cadLineDetails.amount;
                    NavigationService.apiCall("ProductOrders/createInvoice", formdata, function (data) {
                        if (data.value === true) {
                            $scope.productOrder = data.data;
                            var invoiceNumber = data.data.invoiceNo;

                            window.location.href = adminurl + "ProductOrders/acceptPaymentPage?amount=" + $scope.cadLineDetails.amount + "&invoiceNumber=" + invoiceNumber;
                        } else {
                            //  toastr.warning('Error submitting the form', 'Please try again');
                        }
                    });
                } else {
                    //  toastr.warning('Error submitting the form', 'Please try again');
                }
            });
            // cardDetails = $uibModal.open({
            //     animation: true,
            //     templateUrl: 'views/modal/card-detail.html',
            //     scope: $scope,
            //     size: 'sm',

            // });
        };
        // $scope.cadpayment = function (data) {
        //     var formdata = {};
        //     formdata = data;
        //     formdata.expirationDate = "0819"
        //     formdata.amount = $scope.productOrder.totalAmount;
        //     formdata.productOrder = $scope.productOrder._id;
        //     NavigationService.apiCall("ProductOrders/chargeCreditCard", formdata, function (data) {
        //         if (data.data.resultCode === "Ok") {
        //             cardDetails.close();
        //             $scope.productOrder.status = "Paid";
        //             NavigationService.apiCall("ProductOrders/save", $scope.productOrder, function (data) {
        //                 if (data.value === true) {
        //                     $state.go("cadfile-request");
        //                 } else {
        //                     //  toastr.warning('Error submitting the form', 'Please try again');
        //                 }
        //             });
        //         } else {
        //             //  toastr.warning('Error submitting the form', 'Please try again');
        //         }
        //     });
        // }
        //slider 
        // var slider = document.getElementById('slider');
        // var sliderValue = document.getElementById('slider-value');
        // slider.addEventListener('input', function (e) {
        // Adjust the layers opacity. layer here is arbitrary - this could
        // be another layer name found in your style or a custom layer
        // added on the fly using `addSource`.
        // map.setPaintProperty('chicago', 'raster-opacity', parseInt(e.target.value, 10) / 100);

        // Value indicator
        // sliderValue.textContent = e.target.value + '%';
        // });
        $scope.value = 0.5;
        $scope.slider = {
            value: $scope.value,
            options: {
                floor: 0,
                ceil: 1,
                step: 0.1,
                precision: 1
            }
        };

        $scope.afterChange = function (newValue) {
            $scope.value = newValue;
            $scope.slider.value = newValue;
            $rootScope.$broadcast('greeting', $scope.slider);
            // console.log("afterChange $scope.slider.value", $scope.slider.value);
            // console.log("afterChange $scope.slider.value", $scope.slider);
        }


        $scope.downloadThree = function () {
            window.open(adminurl + 'Mission/generateZipForMissionFiles?filename=' + missionID.filename + '&id=' + idForDownload, '_self');
            window.close();
        }

        $scope.downloadAutocadDXF = function (missionId) {
            window.open(adminurl + 'getAutocad/' + idForDownload + "/" + missionIdForDownload + ".dxf", '_self');
        }

        $scope.downloadContoursLines = function (missionId) {
            window.open(adminurl + 'getContourLines/' + idForDownload + "/" + missionIdForDownload + ".shp", '_self');
        }

        $scope.downloadContoursPdf = function (missionId) {
            window.open(adminurl + 'getContourPdf/' + idForDownload + "/" + missionIdForDownload + ".pdf", '_self');
        }
        $scope.downloadTFW = function (missionId) {
            window.open(adminurl + 'getTfw/' + idForDownload + "/" + missionIdForDownload + ".tfw", '_self');
        }

        $scope.downloadOrthoM = function () {
            window.open(adminurl + 'getOrthoM/' + idForDownload + "/" + missionIdForDownload + ".tif", '_self');
        }

        $scope.downloadDsm = function () {
            window.open(adminurl + 'getDsm/' + idForDownload + "/" + missionIdForDownload + ".tif", '_self');
        }

        $scope.downloadMeshFbx = function () {
            window.open(adminurl + 'getMeshFbx/' + idForDownload + "/" + missionIdForDownload + ".fbx", '_self');
        }

        $scope.downloadMeshObj = function () {
            window.open(adminurl + 'getMeshObj/' + idForDownload + "/" + missionIdForDownload + ".Obj", '_self');
        }

        $scope.listPointCloud = function () {
            console.log("listPointCloud--->")
            var pointCloud = {};
            pointCloud.filename = missionIdForDownload;
            pointCloud.id = idForDownload;
            NavigationService.apiCallWithData("Mission/generateZipForPointCloudFiles", pointCloud, function (data) {
                if (data.value === true) {
                    $scope.fileList = data.data;
                    $("#myAlertModal").modal();
                } else {
                    $scope.fileList = null;
                    $("#myAlertModal").modal();
                }
            });
            // window.open('http://cloud.unifli.aero/api/getPointCloud/' + missionIdForDownload + ".las", '_self');
            // window.open(adminurl + 'Mission/generateZipForPointCloudFiles?filename=' + missionID.filename, '_self');
            // window.close();
        }
        $scope.downloadPointCloud = function (file) {
            // window.open('http://cloud.unifli.aero/api/getPointCloud/' + missionIdForDownload + ".las", '_self');
            window.open(adminurl + 'getPointCloud/' + missionIdForDownload + '/' + idForDownload + "/" + file, '_self');
            window.close();
        }
        // $scope.downloadQualityReports = function () {
        //     window.open('http://cloud.unifli.aero/api/getQualityReports/' + missionIdForDownload + ".pdf", '_self');
        // }
        $scope.downloadQualityReports = function () {
            var path = {}
            path.path = missionIdForDownload;
            path.id = idForDownload;
            NavigationService.apiCallWithData("Plan/pdfEditor1", path, function (data) {
                // console.log("data", data.data.html);
                // $.get('http://files.unifli.aero/report/' + missionIdForDownload + '_report.html', function (data) {
                // $("#data1").html(data);

                $('#render-pdfholder').html(data.data.html);
                var demo1 = '<style type="text/css"> .pdf-bg-holder{ background: #fff; width: 14%; position: absolute; height: 45px;top: 0; right: 0; z-index: 1;} .pdf-img-holder{width: 100%; height: 100%; position: relative;} .pdf-logo-img{ width:50%; height: auto; position: absolute; bottom: 0; left: 0; } @media print{.printleft{} .x2{left:440px} .p_right{display: block;width: 100vh;position: absolute; text-align: right;} .pdf-bg-holder{ background: #fff; width: 14%; position: absolute; height: 100px;top: 0; right: 0; z-index: 1;} .pdf-img-holder{ width: 100%; height: 100%; position: relative;} .pdf-logo-img{width:50%; height: auto; position: absolute; bottom: 0; left: 0;}}</style><div class="pdf-bg-holder"><div class="pdf-img-holder"><img src="https://cloud.unifli.aero/orthoFiles/unifli.png" class="pdf-logo-img"></img> </div></div>';
                $('.h1').after(demo1);
                $('.t.m0.x2.h3.y2.ff1.fs0.fc0.sc0.ls0.ws0').val("")
                $('.t.m0.x2.h3.y2.ff1.fs0.fc0.sc0.ls0.ws0').html('<span class="p_right">Generated with UNIFLI-Drone File Management(DFM) System Version 2.0.0</span>');
                var right = $("img.bi.x0.y0.w1.h1").css('right')
                $(".pdf-bg-holder").css("right", right);
                $(".printleft").css("right", right);
                $(".pdf-bg-holder").addClass("printleft");
                var sendHtmlData = {};

                sendHtmlData.htmlData = $('#render-pdfholder').html();
                sendHtmlData.path = missionIdForDownload;
                sendHtmlData.id = idForDownload;
                console.log("sendHtmlData", sendHtmlData);
                NavigationService.apiCallWithData("Plan/generatePdf", sendHtmlData, function (data) {
                    window.open(adminurl + 'getQualityReports/' + idForDownload + "/" + missionIdForDownload + ".pdf", '_self');

                    // console.log("data", data);
                });

                // });

            });
        }
        $scope.downloadProcessingLog = function () {
            window.open(adminurl + 'getProcessingLog/' + idForDownload + "/" + missionIdForDownload + ".log", '_self');
        }
        $scope.mapOpen = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'views/modal/map.html',
                scope: $scope,
                size: 'lg',
                windowClass: 'modalwidth'

            });
        };

        ///map//
        // var slider = document.getElementById('slider');
        // var sliderValue = document.getElementById('slider.value');

        // map.on('load', function () {

        //     map.addLayer({
        //         "id": "chicago",
        //         "source": {
        //             "type": "raster",
        //             "url": "mapbox://mapbox.u8yyzaor"
        //         },
        //         "type": "raster"
        //     });

        //     slider.addEventListener('input', function (e) {
        //         // Adjust the layers opacity. layer here is arbitrary - this could
        //         // be another layer name found in your style or a custom layer
        TemplateService.title = $scope.menutitle; //         // added on the fly using `addSource`.
        //         map.setPaintProperty('chicago', 'raster-opacity', parseInt(e.target.value, 10) / 100);

        //         // Value indicator
        //         sliderValue.textContent = e.target.value + '%';
        //     });
        // });
        ///map//
    })

    .controller('MailDetailCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("mail-detail");
        $scope.menutitle = NavigationService.makeactive("MailDetail");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
        }
    })

    .controller('MailComposeCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("mail-compose");
        $scope.menutitle = NavigationService.makeactive("MailCompose");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
        }
        $scope.submitTicket = function (data1) {
            console.log("inside submitTicket", data1);
            $scope.data = {
                status: "active",
            }
            data1.status = "active"
            data1.user = $.jStorage.get("user")._id;
            NavigationService.apiCallWithData("Ticket/createTicketForUser", data1, function (data2) {
                if (data2.value == true) {
                    $scope.data = data2.data;
                    $state.go('support')
                }
            });
        }

    })
    // .controller('LightboxGalleryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
    //     //Used to name the .html file
    //     $scope.template = TemplateService.changecontent("lightbox-gallery");
    //     $scope.menutitle = NavigationService.makeactive("LightboxGallery");
    //     TemplateService.title = $scope.menutitle;
    //     $scope.navigation = NavigationService.getnav();
    // })

    .controller('IssueTrackerCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("issue-tracker");
        $scope.menutitle = NavigationService.makeactive("IssueTracker");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
        }
    })

    .controller('InvoiceViewCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("invoice-view");
        $scope.menutitle = NavigationService.makeactive("InvoiceView");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
        }
    })


    .controller('InvoiceCtrl', function ($scope, TemplateService, $stateParams, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("invoice");
        $scope.menutitle = NavigationService.makeactive("Invoice");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
            var userId = $.jStorage.get("user")._id;
        }
        excelName = {
            name: "InvoiceList",
            _id: $.jStorage.get("user")._id
        },
            $scope.csvFileForUser = function () {
                console.log("inside csvFile ")
                NavigationService.generateCsvithName("ProductOrders/generatecsvForUser", excelName, function (data) {
                    console.log("ater api called", data);
                });
            };
        $scope.generatePdfForUser = function () {
            console.log("inside generatePdf ");
            NavigationService.generatepdfwithName("ProductOrders/generatePdfForUser", excelName, function (data) {
                console.log("ater api called", data);
            });
        };
        $scope.generateExcelforUser = function () {
            NavigationService.generateExcelWithName("ProductOrders/exceltotalProductOrdersforUser", excelName, function (data) { });
        };
        //pagination user
        var formdata = {};
        formdata.user = userId;
        var i = 0;
        if ($stateParams.page && !isNaN(parseInt($stateParams.page))) {
            $scope.currentPage = $stateParams.page;
        } else {
            $scope.currentPage = 1;
        }

        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.changePage = function (page) {
            var goTo = "invoice";
            $scope.currentPage = page;
            if ($scope.search.keyword) {
                goTo = "invoice";
            }
            $state.go(goTo, {
                page: page
            });
            $scope.getAllItems();
        };

        $scope.getAllItems = function (keywordChange, count) {
            if (keywordChange != undefined && keywordChange != true) {
                $scope.maxCount = keywordChange;
                $scope.totalItems = undefined;
                if (keywordChange) { }
                NavigationService.searchCall("ProductOrders/getProductData", {
                    page: $scope.currentPage,
                    keyword: $scope.search.keyword,
                    count: $scope.maxCount,
                    user: formdata.user
                }, ++i,
                    function (data, ini) {
                        if (ini == i) {
                            $scope.productData = data.data.results;
                            console.log("data is", $scope.productData)
                            _.forEach($scope.productData, function (pg) {
                                if (pg.products[0]) {
                                    var myVal = '';
                                    _.forEach(pg.products, function (pro) {
                                        console.log("pro", pro.product.name)
                                        myVal = pro.product.name + ',' + myVal;
                                        $scope.foo = myVal.substring(0, myVal.length - 1);
                                        console.log("foo valueis ", $scope.foo)
                                    })
                                    pg.name = $scope.foo;
                                }

                            });
                            console.log("final data is", $scope.productData)
                            console.log("$scope.productData***", $scope.productData);
                            $scope.totalItems = data.data.total;
                            $scope.maxRow = data.data.options.count;
                        }
                    });
            } else {
                $scope.totalItems = undefined;
                if (keywordChange) { }
                NavigationService.searchCall("ProductOrders/getProductData", {
                    page: $scope.currentPage,
                    keyword: $scope.search.keyword,
                    user: userId,
                    count: $scope.maxCount
                }, ++i,
                    function (data, ini) {
                        if (ini == i) {
                            $scope.productData = data.data.results;
                            console.log("data is", $scope.productData)
                            _.forEach($scope.productData, function (pg) {
                                if (pg.products[0]) {
                                    var myVal = '';
                                    _.forEach(pg.products, function (pro) {
                                        console.log("pro", pro.product.name)
                                        myVal = pro.product.name + ',' + myVal;
                                        $scope.foo = myVal.substring(0, myVal.length - 1);
                                        console.log("foo valueis ", $scope.foo)
                                    })
                                    pg.name = $scope.foo;
                                }

                            });
                            console.log("final data is", $scope.productData)
                            // for (var i=0;i<$scope.productData.length;i++){
                            //     if($scope.productData[i].products[0]){
                            //         var myVal="";
                            //         for(var j=0;j<=$scope.productData[i].products.length;j++){
                            //             myVal = $scope.productData[i].products[j].name + ',' + myVal;
                            //         }
                            //     }
                            //     $scope.productData[i].productName=mayVal;
                            // }
                            $scope.totalItems = data.data.total;
                            $scope.maxRow = data.data.options.count;
                        }
                    });
            }

        };
        //  JsonService.refreshView = $scope.getAllItems;
        $scope.getAllItems();

        //pagination end user

        $scope.downloadInvoice = function (data) {
            // window.open(adminurl + 'upload/readFileFromFolder?name=' + data, '_self');
            // console.log("data", data);
            // if (data) {
            console.log("data", data);
            window.open(realhosturl + '/orthoFiles/invoice/' + data, '_self');
            // } else {
            //     toastr.error("No PDF Found");
            // }
        }

        $scope.getInvoice = function () {
            NavigationService.apiCallWithData("ProductOrders/getuser", $scope.formData, function (data) {
                $scope.productData = data.data;
                window.open(adminurl + 'pdf/' + data.data.pdf, '_self');
            })
        }

    })

    .controller('ForgotPasswordCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("forgot-password");
        $scope.menutitle = NavigationService.makeactive("ForgotPassword");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
        }
    })

    .controller('CreatemissionCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("create-mission");
        $scope.menutitle = NavigationService.makeactive("CreateMission");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
            var userId = $.jStorage.get("user")._id;
            $scope.profile = $.jStorage.get("user");
        }
        $scope.date = new Date();
        $scope.mission = {};
        $scope.mission.selected = true
        $scope.saveMission = function (missiondata) {
            console.log("inisde mission ctrl", missiondata);
            missiondata.user = userId;
            missiondata.DFMSubscription = $scope.profile.currentSubscription;
            NavigationService.apiCall("Mission/createMission", missiondata, function (data) {
                $("#modal-4").modal();
                if (data.value === true) {
                    $state.go("missions");
                } else {
                    toastr.warning('Failed to create a mission');
                }
            });
        }

        //pagination start

        // var i = 0;
        // if ($stateParams.page && !isNaN(parseInt($stateParams.page))) {
        //     $scope.currentPage = $stateParams.page;
        // } else {
        //     $scope.currentPage = 1;
        // }

        // $scope.search = {
        //     keyword: ""
        // };
        // if ($stateParams.keyword) {
        //     $scope.search.keyword = $stateParams.keyword;
        // }
        // $scope.changePage = function (page) {
        //     console.log("heello",page);
        //     var goTo = "missions";
        //     $scope.currentPage = page;
        //     if ($scope.search.keyword) {
        //         TemplateService.mainClass = ['page-sidebar-closed', 'active'];
        //         goTo = "missions";
        //     }
        //     $state.go(goTo, {
        //         page: page
        //     });
        //     $scope.getAllItems();
        // };

        // $scope.getAllItems = function (keywordChange, count) {
        // $scope.maxCount = keywordChange;
        // $scope.totalItems = undefined;
        // if (keywordChange) {}
        // NavigationService.searchCall("Mission/getMission", {
        //         page: $scope.currentPage,
        //         keyword: $scope.search.keyword,
        //         count: $scope.maxCount
        //     }, ++i,
        //     function (data, ini) {
        //         if (ini == i) {
        //             $scope.allMissionData = data.data.results;
        //             $scope.totalItems = data.data.total;
        //             $scope.maxRow = data.data.options.count;
        //         }
        //     });

        // $scope.totalItems = data.data.total;

        // };
        //  JsonService.refreshView = $scope.getAllItems;
        // $scope.getAllItems();

        //pagination end 
    })

    .controller('CadfileDetailsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams, $uibModal) {
        //Used to name the .html file
        TemplateService.mainClass = [];
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
            $scope.profileDetails = $.jStorage.get("user");
        }
        $scope.formData = {};
        var cad = {};
        cad._id = $stateParams.cadId;
        NavigationService.apiCallWithData("CadLineWork/getSingleCadData", cad, function (data) {
            if (data.value == true) {
                $scope.cadLineDetails = data.data;
                $scope.template = TemplateService.changecontent("cadfile-details");
                $scope.menutitle = NavigationService.makeactive("CadfileDetails");
                TemplateService.title = $scope.menutitle;
                $scope.navigation = NavigationService.getnav();
            }
        });

        $scope.priceListForNDB = [{
            "from": 0,
            "to": 1,
            "density": {
                "low": 77.63,
                "medium": 95.88,
                "high": 112.13
            },
            "contoursDensity": {
                "low": 103.50,
                "medium": 120.75,
                "high": 138
            }
        }, {
            "from": 1.1,
            "to": 2,
            "density": {
                "low": 80.50,
                "medium": 100.63,
                "high": 120.75
            },
            "contoursDensity": {
                "low": 120.75,
                "medium": 140.88,
                "high": 161.00
            }
        }, {
            "from": 2,
            "to": 3.5,
            "density": {
                "low": 100.63,
                "medium": 120.75,
                "high": 140.88
            },
            "contoursDensity": {
                "low": 140.88,
                "medium": 161.00,
                "high": 181.13
            }
        }, {
            "from": 3.6,
            "to": 5,
            "density": {
                "low": 187.20,
                "medium": 210.60,
                "high": 234.00
            },
            "contoursDensity": {
                "low": 257.40,
                "medium": 280.80,
                "high": 304.20
            }
        }, {
            "from": 5.1,
            "to": 8,
            "density": {
                "low": 288.00,
                "medium": 312.00,
                "high": 333.00
            },
            "contoursDensity": {
                "low": 396.00,
                "medium": 420.00,
                "high": 444.00
            }
        }, {
            "from": 8.1,
            "to": 12,
            "density": {
                "low": 360.00,
                "medium": 384.00,
                "high": 408.00
            },
            "contoursDensity": {
                "low": 504.00,
                "medium": 528.00,
                "high": 672.00
            }
        }, {
            "from": 12.1,
            "to": 17,
            "density": {
                "low": 520.00,
                "medium": 546.00,
                "high": 572.00
            },
            "contoursDensity": {
                "low": 715.00,
                "medium": 741.00,
                "high": 767.00
            }
        }, {
            "from": 17.1,
            "to": 22,
            "density": {
                "low": 598.00,
                "medium": 624.00,
                "high": 650.00
            },
            "contoursDensity": {
                "low": 832.00,
                "medium": 858.00,
                "high": 884.00
            }
        }, {
            "from": 22.1,
            "to": 27,
            "density": {
                "low": 624.00,
                "medium": 650.00,
                "high": 676.00
            },
            "contoursDensity": {
                "low": 858.00,
                "medium": 884.00,
                "high": 910.00
            }
        }, {
            "from": 27.1,
            "to": 32,
            "density": {
                "low": 655.20,
                "medium": 682.50,
                "high": 709.80
            },
            "contoursDensity": {
                "low": 900.90,
                "medium": 920.20,
                "high": 955.50
            }
        }, {
            "from": 32.1,
            "to": 40,
            "density": {
                "low": 682.50,
                "medium": 709.80,
                "high": 737.10
            },
            "contoursDensity": {
                "low": 928.20,
                "medium": 955.50,
                "high": 982.80
            }
        }];
        $scope.priceListForUDB = [{
            "from": 0,
            "to": 1,
            "density": {
                "low": 67.50,
                "medium": 82.50,
                "high": 97.50
            },
            "contoursDensity": {
                "low": 90.00,
                "medium": 105.00,
                "high": 120.00
            }
        }, {
            "from": 1.1,
            "to": 2,
            "density": {
                "low": 70.00,
                "medium": 87.50,
                "high": 105.00
            },
            "contoursDensity": {
                "low": 105.00,
                "medium": 122.50,
                "high": 140.00
            }
        }, {
            "from": 2,
            "to": 3.5,
            "density": {
                "low": 87.50,
                "medium": 105.00,
                "high": 122.50
            },
            "contoursDensity": {
                "low": 122.50,
                "medium": 140.00,
                "high": 157.50
            }
        }, {
            "from": 3.6,
            "to": 5,
            "density": {
                "low": 156.00,
                "medium": 175.50,
                "high": 195.00
            },
            "contoursDensity": {
                "low": 214.50,
                "medium": 234.00,
                "high": 253.50
            }
        }, {
            "from": 5.1,
            "to": 8,
            "density": {
                "low": 240.00,
                "medium": 260.00,
                "high": 280.00
            },
            "contoursDensity": {
                "low": 330.00,
                "medium": 350.00,
                "high": 370.00
            }
        }, {
            "from": 8.1,
            "to": 12,
            "density": {
                "low": 300.00,
                "medium": 320.00,
                "high": 340.00
            },
            "contoursDensity": {
                "low": 420.00,
                "medium": 440.00,
                "high": 560.00
            }
        }, {
            "from": 12.1,
            "to": 17,
            "density": {
                "low": 400.00,
                "medium": 420.00,
                "high": 440.00
            },
            "contoursDensity": {
                "low": 550.00,
                "medium": 570.00,
                "high": 590.00
            }
        }, {
            "from": 17.1,
            "to": 22,
            "density": {
                "low": 460.00,
                "medium": 480.00,
                "high": 500.00
            },
            "contoursDensity": {
                "low": 640.00,
                "medium": 660.00,
                "high": 680.00
            }
        }, {
            "from": 22.1,
            "to": 27,
            "density": {
                "low": 480.00,
                "medium": 500.00,
                "high": 520.00
            },
            "contoursDensity": {
                "low": 660.00,
                "medium": 680.00,
                "high": 700.00
            }
        }, {
            "from": 27.1,
            "to": 32,
            "density": {
                "low": 504.00,
                "medium": 525.00,
                "high": 546.00
            },
            "contoursDensity": {
                "low": 693.00,
                "medium": 714.00,
                "high": 735.00
            }
        }, {
            "from": 32.1,
            "to": 40,
            "density": {
                "low": 525.00,
                "medium": 546.00,
                "high": 567.00
            },
            "contoursDensity": {
                "low": 714.00,
                "medium": 735.00,
                "high": 756.00
            }
        }];

        $scope.downloadOrthoForAdmin = function (data) { //admin cad download uploaded by vendor
            if (!_.isEmpty(data)) {
                window.open(adminurl + 'CadLineWork/generateZipForAdmin?id=' + data, '_self');
                window.close();
            } else {
                toastr.error("No Files For download");
            }
            // window.open(adminurl + 'downloadWithName/' + data, '_self');
            // window.open(adminurl + 'upload/readFileFromFolder?name=' + data[0], '_self');
        }

        $scope.calculateAmount = function (data) {
            if (data.contoursDensity || data.draftingDensity) {
                var priceList;
                if ($scope.profileDetails.lisence == 'UDB') {
                    priceList = $scope.priceListForUDB;
                } else {
                    priceList = $scope.priceListForNDB;

                }
                _.forEach(priceList, function (val) {
                    var checkRange = _.inRange(data.acreage, val.from, val.to);
                    if (checkRange == true) {
                        console.log("data.contoursDensity", data.contours);
                        if (data.contoursDensity && _.isEqual(data.contours, 'true')) {
                            $scope.cadLineDetails.amount = val.contoursDensity[data.contoursDensity]
                        } else {
                            $scope.cadLineDetails.amount = val.density[data.draftingDensity]
                        }

                        return false;
                    }
                })
            }

        }

        $scope.cadSave = function (formdata) {
            NavigationService.apiCall("CadLineWork/save", formdata, function (data) {
                if (data.value === true) {
                    var formdata = {}
                    formdata.cadLineWork = data.data._id;
                    formdata.user = $scope.profileDetails._id;
                    formdata.totalAmount = $scope.cadLineDetails.amount;
                    NavigationService.apiCall("ProductOrders/createInvoice", formdata, function (data) {
                        if (data.value === true) {
                            $scope.productOrder = data.data;
                            var invoiceNumber = data.data.invoiceNo;

                            window.location.href = adminurl + "ProductOrders/acceptPaymentPage?amount=" + $scope.cadLineDetails.amount + "&invoiceNumber=" + invoiceNumber;

                        } else {
                            //  toastr.warning('Error submitting the form', 'Please try again');
                        }
                    });
                } else {
                    //  toastr.warning('Error submitting the form', 'Please try again');
                }
            });
            // var cardDetails = $uibModal.open({
            //     animation: true,
            //     templateUrl: 'views/modal/card-detail.html',
            //     scope: $scope,
            //     size: 'sm',

            // });
        };

        $scope.cadpayment = function (data) {
            var formdata = {};
            formdata = data;
            formdata.expirationDate = "0819"
            formdata.amount = $scope.productOrder.totalAmount;
            formdata.productOrder = $scope.productOrder._id;
            NavigationService.apiCall("ProductOrders/chargeCreditCard", formdata, function (data) {
                if (data.resultCode === "OK") {
                    console.log("productOrder.value", data);
                    cardDetails.close();
                    $scope.productOrder.status = "Paid";
                    NavigationService.apiCall("ProductOrders/save", $scope.productOrder, function (data) {
                        if (data.value === true) {
                            console.log("payment successful");
                            $state.go("cadfile-request");
                        } else {
                            //  toastr.warning('Error submitting the form', 'Please try again');
                        }
                    });
                } else {
                    //  toastr.warning('Error submitting the form', 'Please try again');
                }
            });
        }

        NavigationService.apiCallWithoutData("User/getVendor", function (data) {
            console.log("after calling api data is", data)
            if (data.value == true) {
                $scope.allVendorsForRequest = data.data.results;
            }
        });

        $scope.cadVendorUpdate = function (data) {
            data._id = $stateParams.cadId;
            NavigationService.apiCallWithData("CadLineWork/save", data, function (data) {
                if (data.value == true) {
                    toastr.success("Request send successfully");
                    $state.go("cadfile-request");
                }
            });
        }

        $scope.vendorPay = function (data) {
            var data1 = {};
            data.cad = $stateParams.cadId;
            data.vendor = $scope.cadLineDetails.vendor._id;
            data.earning = $scope.cadLineDetails.vendorCharges;
            NavigationService.apiCallWithData("VendorBill/save", data, function (data) {
                if (data.value == true) {
                    data1._id = $stateParams.cadId;
                    data1.vendorPaymentStatus = 'Paid';
                    NavigationService.apiCallWithData("CadLineWork/save", data1, function (data1) {
                        if (data1.value == true) { }
                    });
                    toastr.success("Payment in progress");
                    $state.go("cadfile-request");
                }
            });
        }

        $scope.uploadCadForAdmin = function (data) {
            data._id = $stateParams.cadId;
            data.completionDate = new Date();
            NavigationService.apiCallWithData("CadLineWork/save", data, function (data) {
                if (data.value == true) {
                    var sendDataForMail = {};
                    sendDataForMail._id = $stateParams.cadId;
                    NavigationService.apiCallWithData("CadLineWork/sendCadCompletedMail", sendDataForMail, function (data) { });
                    toastr.success("File uploaded successfully");
                    $state.reload();
                }
            });
        }

        //vendor 

        var cad = {};
        cad._id = $stateParams.cadId;
        NavigationService.apiCallWithData("CadLineWork/getSingleCadData", cad, function (data) {
            if (data.value == true) {
                $scope.cadForVendorData = data.data;
                console.log("$scope.cadForVendorData.vendorCharges", $scope.cadForVendorData.vendorCharges)
                if ($scope.cadForVendorData.vendorCharges == undefined) {
                    console.log("inside if")

                    $scope.hidebutton = false;

                } else {
                    console.log("inside else")
                    $scope.hidebutton = true;
                }
            }
        });


        $scope.vendorPriceSet = function (data) {
            $scope.hidebutton = true;
            console.log("inside vendorPriceSet", data)
            data._id = $stateParams.cadId;
            data.vendorPaymentStatus = 'Unpaid';
            NavigationService.apiCallWithData("CadLineWork/saveVendorDetails", data, function (data) {
                console.log("after vendorPriceSet api", data);
                if (data.value == true) {
                    toastr.success("Amount set");
                    $state.reload();
                }
            });
        }

        $scope.uploadCadForVendor = function (data) {
            data._id = $stateParams.cadId;
            NavigationService.apiCallWithData("CadLineWork/save", data, function (data) {
                if (data.value == true) {
                    toastr.success("File uploaded successfully");
                    $state.reload();
                }
            });
        }


        // download ortho

        $scope.downloadOrtho = function (data) {
            window.open(adminurl + 'getOrtho/' + data, '_self');
        }
        $scope.downloadOrthoMission = function (idForDownload, missionIdForDownload) {
            window.open(adminurl + 'getOrthoM/' + idForDownload + "/" + missionIdForDownload + ".tif", '_self');
        }


        //vendor end

        $scope.earningOpen = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'views/modal/earning-modal.html',
                scope: $scope,
                size: 'sm',

            });
        };
        $scope.uploadOpen = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'views/modal/upload-file.html',
                scope: $scope,
                size: 'sm',

            });
        };


        $scope.uploadvendorOpen = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'views/modal/upload-vendor.html',
                scope: $scope,
                size: 'sm',

            });
        };
    })

    .controller('CadFileRequestCtrl', function ($scope, TemplateService, Upload, NavigationService, $timeout, $state, toastr, $stateParams, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("cadfile-request");
        $scope.menutitle = NavigationService.makeactive("CadFileRequest");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
            var userId = $.jStorage.get("user")._id;
        }

        $scope.cadLineDetails = {};
        excelName = {
            name: "CadFileRequest",
            _id: $.jStorage.get("user")._id
        }

        $scope.csvFileForVendor = function () {
            console.log("inside csvFile ")
            NavigationService.generateCsvithName("CadLineWork/generatecsvForVendor", excelName, function (data) {
                console.log("ater api called", data);
            });
        };
        $scope.csvFileForUser = function () {
            console.log("inside csvFile ")
            NavigationService.generateCsvithName("CadLineWork/generatecsvForUser", excelName, function (data) {
                console.log("ater api called", data);
            });
        };
        $scope.csvFile = function () {
            console.log("inside csvFile ")
            NavigationService.generateCsvithName("CadLineWork/generatecsv", excelName, function (data) {
                console.log("ater api called", data);
            });
        };
        $scope.generatePdfForVendor = function () {
            console.log("inside generatePdf ")
            NavigationService.generatepdfwithName("CadLineWork/generatePdfForVendor", excelName, function (data) {
                console.log("ater api called", data);
            });
        };
        $scope.generatePdf = function () {
            console.log("inside generatePdf ")
            NavigationService.generatepdfwithName("CadLineWork/generatePdf", excelName, function (data) {
                console.log("ater api called", data);
            });
        };

        $scope.generatePdfForUser = function () {
            console.log("inside generatePdf ")
            NavigationService.generatepdfwithName("CadLineWork/generatePdfForUser", excelName, function (data) {
                console.log("ater api called", data);
            });
        };
        $scope.generateExcelForVendor = function () {
            NavigationService.generateExcelWithName("CadLineWork/exceltotalCadforVendor", excelName, function (data) { });
        };
        $scope.generateExcel = function () {
            NavigationService.generateExcelWithName("CadLineWork/exceltotalCad", excelName, function (data) { });
        };
        $scope.generateExcelforUser = function () {
            NavigationService.generateExcelWithName("CadLineWork/exceltotalCadforUser", excelName, function (data) { });
        };



        $scope.cadOpen = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'views/modal/cad-internal.html',
                scope: $scope,
                size: 'sm',

            });
        };
        $scope.upload = function (file) {
            $(".loading-img").css("display", "block");
            $(".loading-img-modal").css("display", "block");
            Upload.upload({
                url: missionFileUrl,
                data: {
                    file: file
                },
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity,
                uploadEventHandlers: {
                    progress: function (e) {
                        console.log("--------------...", e.loaded * 100 / e.total);
                        $scope.fileprogressbar = parseInt((e.loaded / e.total) * 100); // percentage of progress
                    }
                }
            }).then(function (resp) {
                console.log('Success ' + resp.data + 'uploaded. ');
                data = resp.data;
                $(".loading-img").css("display", "none");
                $(".loading-img-modal").css("display", "none");
                $scope.uploadStatus = "uploaded";
                var fileList = {};
                fileList.file = data.data[0];
                $scope.cadLineDetails.orthoFile = fileList;
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            });
        };

        //*****************user CadFileRequest start*****************************

        $scope.date = new Date();
        var formdata = {};
        formdata.user = userId;
        NavigationService.apiCallWithData("Mission/getMissionForCad", formdata, function (data) {
            $scope.misssonInfo = data.data;
        })

        $scope.saveExtcadfile = function (cadLineDetails) {
            cadLineDetails.orthoFile = $scope.cadLineDetails.orthoFile
            cadLineDetails.user = userId;
            NavigationService.apiCallWithData("CadLineWork/createCad", cadLineDetails, function (data) {
                $scope.cadLineDetails = data.data.results;

                $state.reload();
            })
        };


        if ($scope.accessLevel == "User") {

            //pagination user

            var i = 0;
            if ($stateParams.page && !isNaN(parseInt($stateParams.page))) {
                $scope.currentPage = $stateParams.page;
            } else {
                $scope.currentPage = 1;
            }

            $scope.search = {
                keyword: ""
            };
            if ($stateParams.keyword) {
                $scope.search.keyword = $stateParams.keyword;
            }
            $scope.changePage = function (page) {
                var goTo = "cadfile-request";
                $scope.currentPage = page;
                if ($scope.search.keyword) {
                    goTo = "cadfile-request";
                }
                $state.go(goTo, {
                    page: page
                });
                $scope.getAllItems();
            };

            $scope.getAllItems = function (keywordChange, count) {
                if (keywordChange != undefined && keywordChange != true) {
                    $scope.maxCount = keywordChange;
                    $scope.totalItems = undefined;
                    if (keywordChange) { }
                    NavigationService.searchCall("CadLineWork/getCadByUSer", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword,
                        count: $scope.maxCount,
                        user: userId
                    }, ++i,
                        function (data, ini) {
                            if (ini == i) {
                                $scope.cadUserDetail = data.data.results;
                                $scope.totalItems = data.data.total;
                                $scope.maxRow = data.data.options.count;
                            }
                        });
                } else {
                    $scope.totalItems = undefined;
                    if (keywordChange) { }
                    NavigationService.searchCall("CadLineWork/getCadByUSer", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword,
                        count: $scope.maxCount,
                        user: userId
                    }, ++i,
                        function (data, ini) {
                            if (ini == i) {
                                $scope.cadUserDetail = data.data.results;
                                $scope.totalItems = data.data.total;
                                $scope.maxRow = data.data.options.count;
                            }
                        });
                }

            };
            //  JsonService.refreshView = $scope.getAllItems;
            $scope.getAllItems();

            //pagination end user


        } else if ($scope.accessLevel == "Admin") {

            //pagination admin

            var i = 0;
            if ($stateParams.page && !isNaN(parseInt($stateParams.page))) {
                $scope.currentPage = $stateParams.page;
            } else {
                $scope.currentPage = 1;
            }

            $scope.search = {
                keyword: ""
            };
            if ($stateParams.keyword) {
                $scope.search.keyword = $stateParams.keyword;
            }
            $scope.changePage = function (page) {
                var goTo = "cadfile-request";
                $scope.currentPage = page;
                if ($scope.search.keyword) {
                    goTo = "cadfile-request";
                }
                $state.go(goTo, {
                    page: page
                });
                $scope.getAllItems();
            };

            $scope.getAllItems = function (keywordChange) {
                console.log("getAllItems", keywordChange);
                if (keywordChange != undefined && keywordChange != true) {
                    console.log("inside if")
                    $scope.maxCount = keywordChange;
                    $scope.totalItems = undefined;
                    if (keywordChange) { }
                    NavigationService.searchCall("CadLineWork/getCad", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword,
                        count: $scope.maxCount
                    }, ++i,
                        function (data, ini) {
                            if (ini == i) {
                                $scope.allCadLineData = data.data.results;
                                $scope.totalItems = data.data.total;
                                $scope.maxRow = data.data.options.count;
                            }
                        });
                } else {
                    console.log("inside else")
                    $scope.totalItems = undefined;
                    if (keywordChange) { }
                    NavigationService.searchCall("CadLineWork/getCad", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword,
                        count: $scope.maxCount
                    }, ++i,
                        function (data, ini) {
                            if (ini == i) {
                                $scope.allCadLineData = data.data.results;
                                $scope.totalItems = data.data.total;
                                $scope.maxRow = data.data.options.count;
                            }
                        });
                }
            };
            //  JsonService.refreshView = $scope.getAllItems;
            $scope.getAllItems();

            //pagination end admin

        } else if ($scope.accessLevel == "Vendor") {

            //pagination vendor

            var i = 0;
            if ($stateParams.page && !isNaN(parseInt($stateParams.page))) {
                $scope.currentPage = $stateParams.page;
            } else {
                $scope.currentPage = 1;
            }
            $scope.search = {
                keyword: ""
            };
            if ($stateParams.keyword) {
                $scope.search.keyword = $stateParams.keyword;
            }
            $scope.changePage = function (page) {
                var goTo = "cadfile-request";
                $scope.currentPage = page;
                if ($scope.search.keyword) {
                    goTo = "cadfile-request";
                }
                $state.go(goTo, {
                    page: page
                });
                $scope.getAllItems();
            };

            $scope.getAllItems = function (keywordChange) {
                if (keywordChange != undefined && keywordChange != true) {
                    $scope.maxCount = keywordChange;
                    $scope.totalItems = undefined;
                    if (keywordChange) { }
                    NavigationService.searchCall("CadLineWork/getCadForVendor", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword,
                        count: $scope.maxCount
                        // vendorId: userId //replace it with jstorage ID
                    }, ++i,
                        function (data, ini) {
                            if (ini == i) {
                                $scope.allCadLineVendorData = data.data.results;
                                $scope.totalItems = data.data.total;
                                $scope.maxRow = data.data.options.count;
                            }
                        });
                } else {
                    $scope.totalItems = undefined;
                    if (keywordChange) { }
                    NavigationService.searchCall("CadLineWork/getCadForVendor", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword,
                        count: $scope.maxCount
                        // vendorId: userId //replace it with jstorage ID
                    }, ++i,
                        function (data, ini) {
                            if (ini == i) {
                                $scope.allCadLineVendorData = data.data.results;
                                $scope.totalItems = data.data.total;
                                $scope.maxRow = data.data.options.count;
                            }
                        });
                }

            };
            //  JsonService.refreshView = $scope.getAllItems;
            $scope.getAllItems();

            //pagination end vendor
        }

    })


    .controller('AccandSubCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("acc-and-sub");
        $scope.menutitle = NavigationService.makeactive("AccandSub");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
        }
        $scope.userId = $.jStorage.get("user")._id;
        $scope.formdata = {};
        $scope.formdata.data = $.jStorage.get("user");
        $scope.formdata1 = {};
        $scope.formdata2 = {};
        $scope.formdata1.user = $.jStorage.get("user")._id;
        $scope.formdata2._id = $.jStorage.get("user")._id;

        $scope.updateUser = function (data) {
            NavigationService.apiCallWithData("User/Updateuser", data, function (data2) {
                $scope.data = data2;
                $.jStorage.set("user", $scope.data.data);

            });
        }
        $scope.updateProfile = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'views/modal/update-profile.html',
                scope: $scope,
                size: 'sm',

            });
        };
        $scope.showerrmsg = true

        $scope.updatePassword = function (password) {
            var check = _.isEqual(password.forgotPassword, password.password);
            if (check == true) {
                $scope.showerrmsg = true
                console.log("hdbxjwhe", password);
                password._id = $.jStorage.get("user")._id;
                NavigationService.apiCallWithData("User/findUserForUpdatePass", password, function (data) {
                    console.log("insideupdatePassword ", data);
                    if (data.value == true) {
                        $scope.data = data.data;
                        $uibModal.open({
                            animation: true,
                            templateUrl: 'views/modal/updatepassword.html',
                            scope: $scope,
                            size: 'sm',
                        });
                        // $state.go("dashboard");


                    } else {
                        toastr.error('Check Entered Current Password');

                    }
                })
            } else {

                $scope.showerrmsg = false
            }
        }

        $scope.statechnage = function () {
            console.log("inside statechnage")
            $state.go("dashboard");

        }

        $scope.dfmDeatils = {}
        $scope.dfmDeatils._id = $.jStorage.get("user").currentSubscription;
        NavigationService.apiCallWithData("DFMSubscription/getOne", $scope.dfmDeatils, function (dfm) {
            $scope.dfmData = dfm.data;
            if (dfm.value == true) {
                NavigationService.apiCallWithData("Mission/totalMission", $scope.formdata1, function (mission) {
                    if (mission.value == true) {
                        $scope.totalMission = mission.data;
                        $scope.dfmData.missions = $scope.totalMission + "/" + $scope.dfmData.missions
                    } else {
                        $scope.dfmData.missions = "0" + "/" + $scope.dfmData.missions
                    }
                })
                $scope.formdata1.currentSubscriptionDate = dfm.data.createdAt;
                NavigationService.apiCallWithData("Mission/totalMissionCount", $scope.formdata1, function (mission1) {
                    console.log("*****mission1****", mission1)
                    if (mission1.value == false) {
                        $scope.dfmData.UploadPhoto = "0";
                        $scope.foldersize = "0";
                    } else {
                        $scope.foldersize = mission1.data.folderSize + "/" + $scope.dfmData.UploadSize;
                        $scope.dfmData.UploadPhoto = mission1.data.fileSize + "/" + $scope.dfmData.UploadPhoto;
                    }

                })
            } else {
                $scope.dfmData = {};
                $scope.dfmData.user = {};
                $scope.dfmData.user.lisence = "Not Available";
                $scope.dfmData.name = "Not Available";
                $scope.dfmData.status = "Not Available"
                $scope.dfmData.missions = "0";
                $scope.dfmData.UploadPhoto = "0";
                $scope.foldersize = "0";
                $scope.dfmData.Mosaic = "0";
                $scope.dfmData.updatedAt = "Not Available";
                $scope.dfmData.expiryDate = "Not Available";
            }
        })

        //autorenewal

        // $scope.renew = function () {
        //     if (document.getElementById('ischecked').checked) {
        //         var getUserData = {}
        //         getUserData._id = $scope.userId
        //         NavigationService.apiCallWithData("User/getOne", getUserData, function (data) {
        //             if (data.value == true) {
        //                 var changeDfmRenewal = {};
        //                 changeDfmRenewal._id = data.data.currentSubscription;
        //                 NavigationService.apiCallWithData("DFMSubscription/arbSubReqest", changeDfmRenewal, function (dfmData) {
        //                     if (dfmData.value == true) {
        //                         console.log("values changed");
        //                     }
        //                 })
        //             }
        //         })
        //     } else {
        //         var getUserData = {}
        //         getUserData._id = $scope.userId
        //         NavigationService.apiCallWithData("User/getOne", getUserData, function (data) {
        //             if (data.value == true) {
        //                 var changeDfmRenewal = {};
        //                 changeDfmRenewal._id = data.data.currentSubscription;
        //                 NavigationService.apiCallWithData("DFMSubscription/arbSubCancelReqest", changeDfmRenewal, function (dfmData) {
        //                     if (dfmData.value == true) {
        //                         console.log("values changed");
        //                     }
        //                 })
        //             }
        //         })
        //     }
        // }

    })

    .controller('500Ctrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("500");
        $scope.menutitle = NavigationService.makeactive("500");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })

    .controller('404Ctrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("404");
        $scope.menutitle = NavigationService.makeactive("404");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })


    // ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** FOR ADMIN ONLY ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** *

    .controller('ProductsPlansCtrl', function ($scope, $stateParams, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("products-plans");
        $scope.menutitle = NavigationService.makeactive("ProductsPlans");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        ac
        TemplateService.mainClass = [];
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
        }

        //pagination admin

        var i = 0;
        if ($stateParams.page && !isNaN(parseInt($stateParams.page))) {
            $scope.currentPage = $stateParams.page;
        } else {
            $scope.currentPage = 1;
        }

        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.changePage = function (page) {
            var goTo = "products-plans";
            $scope.currentPage = page;
            if ($scope.search.keyword) {
                goTo = "products-plans";
            }
            $state.go(goTo, {
                page: page
            });
            $scope.getAllItems();
        };

        $scope.getAllItems = function (keywordChange, count) {
            if (keywordChange != undefined && keywordChange != true) {
                $scope.maxCount = keywordChange;
                $scope.totalItems = undefined;
                if (keywordChange) { }
                NavigationService.searchCall("Products/getAllProducts", {
                    page: $scope.currentPage,
                    keyword: $scope.search.keyword,
                    count: $scope.maxCount
                }, ++i,
                    function (data, ini) {
                        if (ini == i) {
                            $scope.Products = data.data.results;
                            $scope.totalItems = data.data.total;
                            $scope.maxRow = data.data.options.count;
                        }
                    });
            } else {
                $scope.totalItems = undefined;
                if (keywordChange) { }
                NavigationService.searchCall("Products/getAllProducts", {
                    page: $scope.currentPage,
                    keyword: $scope.search.keyword,
                    count: $scope.maxCount
                }, ++i,
                    function (data, ini) {
                        if (ini == i) {
                            $scope.Products = data.data.results;
                            $scope.totalItems = data.data.total;
                            $scope.maxRow = data.data.options.count;
                        }
                    });
            }
        };
        //  JsonService.refreshView = $scope.getAllItems;
        $scope.getAllItems();

        //pagination end admin

        $scope.deleteProduct = function (id) {
            $scope._id = {
                _id: id
            };
            NavigationService.apiCallWithData("Products/delete", $scope._id, function (data) {
                $scope.product = data;
            });
            $state.reload();
        }

        NavigationService.apiCallWithoutData("Products/search", function (data) {
            $scope.Products = data.data.results;
            $scope.Products1 = data;
        });

    })

    .controller('UsersCtrl', function ($scope, $stateParams, TemplateService, NavigationService, $timeout, $state, toastr, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("users");
        $scope.menutitle = NavigationService.makeactive("Users");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];
        $scope.template = TemplateService.changecontent("users");
        $scope.menutitle = NavigationService.makeactive("Users");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
        }
        excelName = {
            name: "UserList"
        }

        $scope.csvFile = function () {
            console.log("inside csvFile ")
            NavigationService.generateCsvithName("User/generatecsv", excelName, function (data) {
                console.log("ater api called", data);
            });
        };
        $scope.generatePdf = function () {
            console.log("inside generatePdf ")
            NavigationService.generatepdfwithName("User/generatePdf", excelName, function (data) {
                console.log("ater api called", data);
            });
        };

        $scope.generateExcel = function () {
            NavigationService.generateExcelWithName("User/exceltotalUser", excelName, function (data) { });
        };


        //pagination admin

        var i = 0;
        if ($stateParams.page && !isNaN(parseInt($stateParams.page))) {
            $scope.currentPage = $stateParams.page;
        } else {
            $scope.currentPage = 1;
        }

        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.changePage = function (page) {
            var goTo = "users";
            $scope.currentPage = page;
            if ($scope.search.keyword) {
                goTo = "users";
            }
            $state.go(goTo, {
                page: page
            });
            $scope.getAllItems();
        };

        $scope.getAllItems = function (keywordChange, count) {
            if (keywordChange != undefined && keywordChange != true) {
                $scope.maxCount = keywordChange;
                $scope.totalItems = undefined;
                if (keywordChange) { }
                NavigationService.searchCall("User/getUser", {
                    page: $scope.currentPage,
                    keyword: $scope.search.keyword,
                    count: $scope.maxCount
                }, ++i,
                    function (data, ini) {
                        if (ini == i) {
                            $scope.userInfo = data.data.results;
                            $scope.totalItems = data.data.total;
                            $scope.maxRow = data.data.options.count;
                        }
                    });
            } else {
                $scope.totalItems = undefined;
                if (keywordChange) { }
                NavigationService.searchCall("User/getUser", {
                    page: $scope.currentPage,
                    keyword: $scope.search.keyword,
                    count: $scope.maxCount
                }, ++i,
                    function (data, ini) {
                        if (ini == i) {
                            $scope.userInfo = data.data.results;
                            $scope.totalItems = data.data.total;
                            $scope.maxRow = data.data.options.count;
                        }
                    });
            }

        };
        //  JsonService.refreshView = $scope.getAllItems;
        $scope.getAllItems();

        //pagination end admin
        $scope.userOpen = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'views/modal/create-user.html',
                scope: $scope,
                size: 'lg'

            });
        };
        $scope.saveUser = function (data) {
            if (data.password == data.confirmPassword) {
                $scope.dt = new Date();
                $scope.dt.setDate($scope.dt.getDate() + 30);
                console.log("data-------", data);
                if (data.accessLevel == 'User') {
                    $scope.dmfData = {
                        name: "TRIAL",
                        invitations: "0",
                        missions: "3",
                        UploadPhoto: "200",
                        UploadSize: "1GB",
                        Mosaic: "12cm",
                        exportKMZ: "15",
                        exportOrthophoto: "USAGE LIMIT",
                        exportDEM: "USAGE LIMIT",
                        exportPointCloud: "false",
                        status: "Active",
                        amount: "0",
                        expiryDate: $scope.dt,
                    }
                    data.status = 'Active';
                    console.log(" $scope.dmfData", $scope.dmfData)
                    NavigationService.apiCallWithData("User/createUser", data, function (data) {
                        if (data.value == true) {
                            $scope.user = {}
                            $scope.user._id = data.data._id;
                            $scope.product = data;
                            $scope.dmfData.user = data.data._id;;
                            NavigationService.apiCallWithData("DFMSubscription/save", $scope.dmfData, function (dfm) {
                                $scope.dfmId = dfm.data._id;
                                if (dfm.value == true) {
                                    $scope.user.currentSubscription = $scope.dfmId;
                                    NavigationService.apiCallWithData("User/save", $scope.user, function (data) {
                                        $state.reload();
                                    })

                                }
                            })


                        } else {
                            $scope.showerr = "";
                            $scope.showerr = true;
                            // toastr.warning('Error submitting the form', 'Please try again');

                        }
                    });

                } else {
                    data.status = 'Active';
                    NavigationService.apiCallWithData("User/createVendor", data, function (data) {
                        if (data.value == true) {
                            $scope.product = data;
                            $state.reload();


                        } else {
                            $scope.showerr = "";
                            $scope.showerr = true;
                            // toastr.warning('Error submitting the form', 'Please try again');

                        }
                    });
                }

            } else {
                toastr.warning('Check your Password');

            }
        }

    })

    .controller('EcommerceCtrl', function ($scope, TemplateService, $stateParams, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("ecommerce");
        $scope.menutitle = NavigationService.makeactive("Ecommerce");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
        }
        excelName = {
            name: "ecommerce"
        }
        $scope.csvFile = function () {
            console.log("inside csvFile ")
            NavigationService.generateCsvithName("ProductOrders/generatecsv", excelName, function (data) {
                console.log("ater api called", data);
            });
        };
        $scope.generatePdf = function () {
            console.log("inside generatePdf ")
            NavigationService.generatepdfwithName("ProductOrders/generatePdf", excelName, function (data) {
                console.log("ater api called", data);
            });
        };

        $scope.generateExcel = function () {
            NavigationService.generateExcelWithName("ProductOrders/exceltotalProductOrders", excelName, function (data) { });
        };

        //pagination ecommerce

        var i = 0;
        if ($stateParams.page && !isNaN(parseInt($stateParams.page))) {
            $scope.currentPage = $stateParams.page;
        } else {
            $scope.currentPage = 1;
        }

        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.changePage = function (page) {
            var goTo = "ecommerce";
            $scope.currentPage = page;
            if ($scope.search.keyword) {
                goTo = "ecommerce";
            }
            $state.go(goTo, {
                page: page
            });
            $scope.getAllItems();
        };

        $scope.getAllItems = function (keywordChange, count) {
            if (keywordChange != undefined && keywordChange != true) {
                $scope.maxCount = keywordChange;
                $scope.totalItems = undefined;
                if (keywordChange) { }
                NavigationService.searchCall("ProductOrders/getProductOrders", {
                    page: $scope.currentPage,
                    keyword: $scope.search.keyword,
                    count: $scope.maxCount
                }, ++i,
                    function (data, ini) {
                        if (ini == i) {
                            $scope.allOrderData = data.data.results;
                            $scope.totalItems = data.data.total;
                            $scope.maxRow = data.data.options.count;
                            _.forEach($scope.allOrderData, function (pg) {
                                if (pg.products[0]) {
                                    var myVal = '';
                                    _.forEach(pg.products, function (pro) {
                                        myVal = pro.product.name + ',' + myVal;
                                        $scope.foo = myVal.substring(0, myVal.length - 1);
                                    })
                                    pg.name = $scope.foo;

                                }
                            });
                        }
                    });
            } else {
                $scope.totalItems = undefined;
                if (keywordChange) { }
                NavigationService.searchCall("ProductOrders/getProductOrders", {
                    page: $scope.currentPage,
                    keyword: $scope.search.keyword,
                    count: $scope.maxCount
                }, ++i,
                    function (data, ini) {
                        if (ini == i) {
                            $scope.allOrderData = data.data.results;
                            $scope.totalItems = data.data.total;
                            $scope.maxRow = data.data.options.count;
                            console.log(" $scope.allOrderData", $scope.allOrderData);
                            _.forEach($scope.allOrderData, function (pg) {
                                if (pg.products[0]) {
                                    var myVal = '';
                                    _.forEach(pg.products, function (pro) {
                                        myVal = pro.product.name + ',' + myVal;
                                        $scope.foo = myVal.substring(0, myVal.length - 1);
                                    })
                                    pg.name = $scope.foo;

                                }
                            });
                        }
                    });
            }

        };
        //  JsonService.refreshView = $scope.getAllItems;
        $scope.getAllItems();

        //pagination end ecommerce

        $scope.downloadInvoiceEcommerce = function (data) {
            // window.open(adminurl + 'downloadWithName/' + data, '_self');
            // console.log("data-------", data);
            console.log("data", data);
            window.open(realhosturl + '/orthoFiles/' + data, '_self');
            // if (data) {
            //     window.open(adminurl + '../pdf/' + data, '_self');
            // } else {
            //     toastr.error("No PDF Found");
            // }
        }
    })

    .controller('EditProductCtrl', function ($scope, $stateParams, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("edit-product");
        $scope.menutitle = NavigationService.makeactive("EditProduct");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
        }
        $scope._id = {
            _id: $stateParams.productId
        };
        NavigationService.apiCallWithData("Products/getProduct", $scope._id, function (data) {

            $scope.data = data.data;

            $scope.updateProduct = function (data) {
                NavigationService.apiCallWithData("Products/UpdateProduct", data, function (data2) {
                    if (data2.value == true) {
                        $scope.data = data2;
                        $state.go('products-plans');
                    }
                });
            }
        });

    })

    .controller('ReportsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("reports");
        $scope.menutitle = NavigationService.makeactive("Reports");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
        }
        // ***FOR DATEPICKER****
        $scope.popup1 = {
            opened: false
        };
        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };
        $scope.popup2 = {
            opened: false
        };
        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };
        // ***FOR DATEPICKER****

        $scope.excelGenerateData = function (data) {
            var getByDate = {};
            getByDate.fromDate = moment(data.fromDate).format();
            getByDate.toDate = moment(data.toDate).format();
            if (data.type == 'Mission') {
                NavigationService.generateExcelWithData("VendorBill/exceltotalMission", getByDate, function (data) { });
            } else if (data.type == 'Cad') {
                NavigationService.generateExcelWithData("VendorBill/exceltotalCadRequest", getByDate, function (data) { });
            } else if (data.type == 'DroneSales') {
                NavigationService.generateExcelWithData("VendorBill/droneSales", getByDate, function (data) { });
            } else if (data.type == 'DfmSales') {
                NavigationService.generateExcelWithData("VendorBill/dfmSales", getByDate, function (data) { });
            } else if (data.type == 'DfmSub') {
                NavigationService.generateExcelWithData("VendorBill/allDfmSub", getByDate, function (data) { });
            } else if (data.type == 'CadRev') {
                NavigationService.generateExcelWithData("VendorBill/cadRevenue", getByDate, function (data) { });
            } else if (data.type == 'VendorBill') {
                NavigationService.generateExcelWithData("VendorBill/vendorBill", getByDate, function (data) { });
            }
        }
    })

    .controller('VendorsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("vendors");
        $scope.menutitle = NavigationService.makeactive("Vendors");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];
        // $scope.accessLevel = "Admin";
        // $scope.accessLevel = "Vendor";
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
        }
        excelName = {
            name: "vendorList"
        }

        $scope.csvFile = function () {
            console.log("inside csvFile ")
            NavigationService.generateCsvithName("User/generatecsvForVendor", excelName, function (data) {
                console.log("ater api called", data);
            });
        };
        $scope.generatePdf = function () {
            console.log("inside generatePdf ")
            NavigationService.generatepdfwithName("User/generatePdfforVendor", excelName, function (data) {
                console.log("ater api called", data);
            });
        };

        $scope.generateExcel = function () {
            NavigationService.generateExcelWithName("User/exceltotalVendor", excelName, function (data) { });
        };

        //pagination

        var i = 0;
        if ($stateParams.page && !isNaN(parseInt($stateParams.page))) {
            $scope.currentPage = $stateParams.page;
        } else {
            $scope.currentPage = 1;
        }

        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.changePage = function (page) {
            var goTo = "vendors";
            $scope.currentPage = page;
            if ($scope.search.keyword) {
                goTo = "vendors";
            }
            $state.go(goTo, {
                page: page
            });
            $scope.getAllItems();
        };

        $scope.getAllItems = function (keywordChange, count) {
            if (keywordChange != undefined && keywordChange != true) {
                $scope.maxCount = keywordChange;
                $scope.totalItems = undefined;
                if (keywordChange) { }
                NavigationService.searchCall("User/getVendor", {
                    page: $scope.currentPage,
                    keyword: $scope.search.keyword,
                    count: $scope.maxCount
                }, ++i,
                    function (data, ini) {
                        if (ini == i) {
                            $scope.allVendors = data.data.results;
                            $scope.totalItems = data.data.total;
                            $scope.maxRow = data.data.options.count;
                        }
                    });
            } else {
                $scope.totalItems = undefined;
                if (keywordChange) { }
                NavigationService.searchCall("User/getVendor", {
                    page: $scope.currentPage,
                    keyword: $scope.search.keyword,
                    count: $scope.maxCount
                }, ++i,
                    function (data, ini) {
                        if (ini == i) {
                            $scope.allVendors = data.data.results;
                            $scope.totalItems = data.data.total;
                            $scope.maxRow = data.data.options.count;
                        }
                    });
            }

        };
        //  JsonService.refreshView = $scope.getAllItems;
        $scope.getAllItems();

        //pagination end

        $scope.removeVendor = function (vendorid) {
            var vendor = {};
            vendor._id = vendorid;
            NavigationService.apiCallWithData("User/delete", vendor, function (data) {
                if (data.value == true) {
                    toastr.success("Vendor deleted successfully");
                    $state.reload();
                }
            });

        }

    })

    .controller('CreateVendorCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("create-vendor");
        $scope.menutitle = NavigationService.makeactive("CreateVendor");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        console.log("this is create vendor ctrl");
        TemplateService.mainClass = [];
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
        }
        $scope.saveVendor = function (data) {
            console.log("saveVendor", data)
            if (data.password == data.confirmPassword) {
                console.log("data-------", data);
                data.accessLevel = 'Vendor';
                data.status = 'Active';
                console.log("data acesslevel", data);
                NavigationService.apiCallWithData("User/createVendor", data, function (data) {
                    if (data.value == true) {
                        $scope.product = data;
                        $state.go('vendors');


                    } else {
                        $scope.showerr = "";
                        $scope.showerr = true;
                        // toastr.warning('Error submitting the form', 'Please try again');

                    }
                });


            } else {
                toastr.warning('Check your Password');
                $state.go('vendors');

            }
        }
        $scope.close = function () {
            console.log("inside close function")
            $state.go('vendors');

        }

    })

    .controller('AddProductCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("add-product");
        $scope.menutitle = NavigationService.makeactive("AddProduct");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];
        /**
         * summernoteText - used for Summernote plugin
         */
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
        }
        this.summernoteText = [].join('');
        $scope.submitProduct = function (data) {
            NavigationService.apiCallWithData("Products/save", data, function (data2) {
                if (data2.value == true) {
                    $scope.data = data2;
                    $state.go('products-plans');

                }
            });
        }



    })

    .controller('EcomDetailsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("ecom-details");
        $scope.menutitle = NavigationService.makeactive("EcomDetails");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
        }
    })

    .controller('EditVendorCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams) {

        //Used to name the .html file
        $scope.template = TemplateService.changecontent("edit-vendor");
        $scope.menutitle = NavigationService.makeactive("EditVendor");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
        }
        $scope.vendor = {};
        $scope.vendor._id = $stateParams.vendorId;
        console.log("$scope.formData._id", $scope.vendor._id);
        NavigationService.apiCallWithData("User/getOne", $scope.vendor, function (data) {
            console.log("after callinf api for find one vendor", data);
            $scope.formData = data.data;
        })
        $scope.updateVendor = function (formData) {
            formData._id = $stateParams.vendorId;
            NavigationService.apiCallWithData("User/save", formData, function (data) {
                if (data.value == true) {
                    $state.go("vendors");
                }
            });
        }

    })

    .controller('AdminProfileCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("admin-profile");
        $scope.menutitle = NavigationService.makeactive("AdminProfile");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
        }
    })

    .controller('SupportDetailsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("support-details");
        $scope.menutitle = NavigationService.makeactive("SupportDetails");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
        }
        var ticketId = {};
        ticketId._id = $stateParams.ticketId;
        NavigationService.apiCallWithData("Ticket/getTicketData", ticketId, function (data) {
            if (data.value == true) {
                $scope.ticketData = data.data;
            }
        });



        $scope.saveReply = function (ticketData) {
            ticketData.replyDate = new Date();
            NavigationService.apiCallWithData("Ticket/save", ticketData, function (data) {
                if (data.value == true) {
                    $state.go("support");
                }
            });
        }

    })

    .controller('UserDetailsCtrl', function ($scope, $stateParams, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("user-details");
        $scope.menutitle = NavigationService.makeactive("UsersDetails");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
            $scope.formdata1 = {};
            $scope.formdata1.user = $stateParams.userId;
            $scope.formdata = {};
            $scope.formdata._id = $stateParams.userId;
            NavigationService.apiCallWithData("ProductOrders/getuserwiseProduct", $scope.formdata, function (data) {
                console.log(" $scope.formdata  $scope.formdata ", data);
                if (data.value == true) {
                    $scope.dfmCount = 0;
                    $scope.cadCount = 0;
                    $scope.proCount = 0;
                    _.forEach(data.data, function (value) {
                        if (value.products[0]) {
                            $scope.proCount = parseInt($scope.proCount) + parseInt(value.totalAmount)
                        } else if (value.dfmSubscription && !value.products[0]) {
                            $scope.dfmCount = parseInt($scope.dfmCount) + parseInt(value.totalAmount)
                        } else if (value.cadLineWork) {
                            $scope.cadCount = parseInt($scope.cadCount) + parseInt(value.totalAmount)
                        }
                    });

                } else {
                    console.log("inside else dfm not found")
                }
            });


            NavigationService.apiCallWithData("Mission/totalMission", $scope.formdata1, function (mission) {
                if (mission.value == true) {
                    $scope.totalMission = mission.data;
                } else {
                    $scope.totalMission = "0"
                }
            });
            NavigationService.apiCallWithData("CadLineWork/totalCadReq", $scope.formdata1, function (cadReq) {
                console.log("cadReq", cadReq)
                if (cadReq.value == true) {
                    $scope.totalCadReq = cadReq.data;
                } else {
                    $scope.totalCadReq = "0"
                }

            });
            NavigationService.apiCallWithData("User/getOne", $scope.formdata, function (user) {
                console.log("user", user);
                if (user.value == true) {
                    $scope.user = user.data;
                    $scope.dfmDeatils = {}
                    $scope.dfmDeatils._id = user.data.currentSubscription;
                    NavigationService.apiCallWithData("DFMSubscription/getOne", $scope.dfmDeatils, function (dfm) {
                        console.log("dfm info is", dfm);
                        if (dfm.value == true) {
                            $scope.dfmData = dfm.data;
                            $scope.createdAt = dfm.data.createdAt;
                            console.log("*********************", $scope.createdAt)
                            console.log("$scope.createdAt$scope.createdAt", $scope.createdAt)
                            $scope.formdata1.currentSubscriptionDate = $scope.createdAt,
                                console.log(" $scope.formdata1 $scope.formdata1", $scope.formdata1)
                            NavigationService.apiCallWithData("Mission/totalMissionCount", $scope.formdata1, function (mission1) {
                                console.log("*****mission1****", mission1)
                                if (mission1.value == false) {
                                    $scope.UploadSize = "0";
                                    $scope.foldersize = "0";
                                } else {
                                    $scope.foldersize = mission1.data.folderSize + "/" + $scope.dfmData.UploadSize;
                                    $scope.UploadSize = mission1.data.fileSize + "/" + $scope.dfmData.UploadPhoto;
                                }

                            })
                        } else {
                            $scope.foldersize = "0"
                            $scope.UploadSize = "0"
                            console.log("inside else dfm not found")
                        }
                    });
                } else {
                    // $scope.totalCadReq = "0"
                }
            });



            $scope.setStatus = function (status1) {
                console.log("inside setStatus", status1)
                $scope.formdata.status = status1.status
                console.log("inside setStatus*****", $scope.formdata);

                NavigationService.apiCallWithData("User/save", $scope.formdata, function (dfm) {
                    // console.log("dfm is",dmf)

                });

            }
            $scope.setAccLevel = function (accessLevel1) {
                console.log("inside setAccLevel", accessLevel1)
                $scope.formdata.accessLevel = accessLevel1.accessLevel
                NavigationService.apiCallWithData("User/save", $scope.formdata, function (dfm) { });
            }
        }
    })
    // ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** FOR ADMIN ONLY ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** *
    // ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** FOR VENDOR ONLY ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ****//
    .controller('BillingCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("billing");
        $scope.menutitle = NavigationService.makeactive("Billing");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        TemplateService.mainClass = [];
        if ($.jStorage.get("user")) {
            $scope.accessLevel = $.jStorage.get("user").accessLevel;
        }
        excelName = {
            name: "Billing",
            _id: $.jStorage.get("user")._id
        }
        $scope.csvFile = function () {
            console.log("inside csvFile ")
            NavigationService.generateCsvithName("VendorBill/generatecsv", excelName, function (data) {
                console.log("ater api called", data);
            });
        };
        $scope.generatePdf = function () {
            console.log("inside generatePdf ")
            NavigationService.generatepdfwithName("VendorBill/generatePdf", excelName, function (data) {
                console.log("ater api called", data);
            });
        };
        $scope.generateExcelforVendor = function () {
            NavigationService.generateExcelWithName("VendorBill/exceltotalVendorBill", excelName, function (data) { });
        };
        //pagination
        var i = 0;
        if ($stateParams.page && !isNaN(parseInt($stateParams.page))) {
            $scope.currentPage = $stateParams.page;
        } else {
            $scope.currentPage = 1;
        }

        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.changePage = function (page) {
            var goTo = "billing";
            $scope.currentPage = page;
            if ($scope.search.keyword) {
                goTo = "billing";
            }
            $state.go(goTo, {
                page: page
            });
            $scope.getAllItems();
        };

        $scope.getAllItems = function (keywordChange, count) {
            if (keywordChange != undefined && keywordChange != true) {
                $scope.maxCount = keywordChange;
                $scope.totalItems = undefined;
                if (keywordChange) { }
                NavigationService.searchCall("VendorBill/getBill", {
                    page: $scope.currentPage,
                    keyword: $scope.search.keyword,
                    count: $scope.maxCount
                }, ++i,
                    function (data, ini) {
                        if (ini == i) {
                            $scope.allBillData = data.data.results;
                            $scope.totalItems = data.data.total;
                            $scope.maxRow = data.data.options.count;
                        }
                    });
            } else {
                $scope.totalItems = undefined;
                if (keywordChange) { }
                NavigationService.searchCall("VendorBill/getBill", {
                    page: $scope.currentPage,
                    keyword: $scope.search.keyword,
                    count: $scope.maxCount
                }, ++i,
                    function (data, ini) {
                        if (ini == i) {
                            $scope.allBillData = data.data.results;
                            $scope.totalItems = data.data.total;
                            $scope.maxRow = data.data.options.count;
                        }
                    });
            }

        };
        //  JsonService.refreshView = $scope.getAllItems;
        $scope.getAllItems();

        //pagination end


    })
    // ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** FOR VENDOR ONLY ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ***//
    //     .controller('missionCtrl', function ($scope, TemplateService, NavigationService, shareMission, $timeout, $state) {
    //         //Used to name the .html file
    //         $scope.template = TemplateService.changecontent("missions");
    //         $scope.menutitle = NavigationService.makeactive("missions");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();
    //         var formData = {}
    //         $scope.missionData = {};

    //         $scope.today = function () {
    //             // $scope.dt = new Date();
    //         };
    //         $scope.today();

    //         $scope.clear = function () {
    //             $scope.dt = null;
    //         };
    //         // Disable weekend selection
    //         function disabled(data) {
    //             var date = data.date,
    //                 mode = data.mode;
    //             return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    //         }
    //         $scope.open1 = function () {
    //             $scope.popup1.opened = true;
    //         };

    //         $scope.open2 = function () {
    //             $scope.popup2.opened = true;
    //         };

    //         $scope.popup1 = {
    //             opened: false
    //         };

    //         $scope.popup2 = {
    //             opened: false
    //         };


    //         function getDayClass(data) {
    //             var date = data.date,
    //                 mode = data.mode;
    //             if (mode === 'day') {
    //                 var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

    //                 for (var i = 0; i < $scope.events.length; i++) {
    //                     var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

    //                     if (dayToCheck === currentDay) {
    //                         return $scope.events[i].status;
    //                     }
    //                 }
    //             }

    //             return '';
    //         }
    //         if ($.jStorage.get("profile")) {
    //             var formData = {};
    //             formData.user = $.jStorage.get("profile")._id;
    //             NavigationService.apiCall("Mission/getByUser", formData, function (data) {
    //                 if (data.value === true) {
    //                     $scope.missionData = data.data;
    //                     console.log("data found successfully", $scope.missionData);

    //                 } else {
    //                     //  toastr.warning('Error submitting the form', 'Please try again');
    //                 }
    //             });
    //         }
    //         NavigationService.apiCall("ServiceList/search", formData, function (data) {
    //             if (data.value === true) {
    //                 $scope.serviceListData = data.data.results;
    //             } else {
    //                 //  toastr.warning('Error submitting the form', 'Please try again');
    //             }
    //         });


    //     })
    //     .controller('CadlineworkappCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
    //         //Used to name the .html file
    //         $scope.template = TemplateService.changecontent("cad-linework-app");
    //         $scope.menutitle = NavigationService.makeactive("cadlineworkapp");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();
    //         var formData = {}
    //         $scope.today = function () {
    //             // $scope.dt = new Date();
    //         };
    //         $scope.today();

    //         $scope.clear = function () {
    //             $scope.dt = null;
    //         };
    //         // Disable weekend selection
    //         function disabled(data) {
    //             var date = data.date,
    //                 mode = data.mode;
    //             return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    //         }
    //         $scope.open1 = function () {
    //             $scope.popup1.opened = true;
    //         };

    //         $scope.open2 = function () {
    //             $scope.popup2.opened = true;
    //         };

    //         $scope.popup1 = {
    //             opened: false
    //         };

    //         $scope.popup2 = {
    //             opened: false
    //         };
    //         NavigationService.apiCall("CadLineWork/search", formData, function (data) {
    //             if (data.value === true) {
    //                 $scope.cadLineWorkData = data.data.results;
    //                 console.log("data found successfully", $scope.missionData);
    //             } else {
    //                 //  toastr.warning('Error submitting the form', 'Please try again');
    //             }
    //         });
    //     })
    //     .controller('Dfmsubscription', function ($scope, TemplateService, NavigationService, $timeout, $state) {
    //         //Used to name the .html file
    //         $scope.template = TemplateService.changecontent("dfm-subscription");
    //         $scope.menutitle = NavigationService.makeactive("dfmsubscription");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();
    //         $scope.today = function () {
    //             // $scope.dt = new Date();
    //         };
    //         $scope.today();

    //         $scope.clear = function () {
    //             $scope.dt = null;
    //         };
    //         // Disable weekend selection
    //         function disabled(data) {
    //             var date = data.date,
    //                 mode = data.mode;
    //             return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    //         }
    //         $scope.open1 = function () {
    //             $scope.popup1.opened = true;
    //         };

    //         $scope.open2 = function () {
    //             $scope.popup2.opened = true;
    //         };

    //         $scope.popup1 = {
    //             opened: false
    //         };

    //         $scope.popup2 = {
    //             opened: false
    //         };
    //         if ($.jStorage.get("profile")) {
    //             var formData = {};
    //             formData.user = $.jStorage.get("profile")._id;
    //             NavigationService.apiCall("DFMSubscription/getByUser", formData, function (data) {
    //                 if (data.value === true) {
    //                     $scope.subscriptionData = data.data;
    //                     console.log("subscriptionData found successfully", $scope.subscriptionData);

    //                 } else {
    //                     //  toastr.warning('Error submitting the form', 'Please try again');
    //                 }
    //             });
    //         };
    //         $scope.getDetails = function (id) {
    //             var formData = {};
    //             formData._id = id;
    //             NavigationService.apiCall("DFMSubscription/getOne", formData, function (data) {
    //                 if (data.value === true) {
    //                     $scope.subscriptionDetails = data.data;
    //                     console.log("subscriptionDetails found successfully", $scope.subscriptionDetails);
    //                     $("#modal-6").modal();
    //                 } else {
    //                     //  toastr.warning('Error submitting the form', 'Please try again');
    //                 }
    //             });
    //         }
    //     })

    //     .controller('ProfileCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
    //         //Used to name the .html file
    //         $scope.template = TemplateService.changecontent("profile");
    //         $scope.menutitle = NavigationService.makeactive("profile");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();
    //         NavigationService.profile(function () {
    //             $scope.profileDetails = $.jStorage.get("profile");
    //         }, function () {
    //             $state.go("login");
    //         });
    //         $scope.saveProfile = function (profileDetails) {
    //             NavigationService.apiCall("User/save", profileDetails, function (data) {
    //                 if (data.value === true) {
    //                     console.log("data saved successfully");
    //                     toastr.success("Profile updated successfully");
    //                 } else {
    //                     //  toastr.warning('Error submitting the form', 'Please try again');
    //                 }
    //             });

    //         }

    //     })
    //     .controller('MapCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams, $uibModal) {
    //         //Used to name the .html file

    //         TemplateService.title = $scope.menutitle;

    //         $scope.navigation = NavigationService.getnav();
    //         NavigationService.profile(function () {
    //             $scope.profileDetails = $.jStorage.get("profile");
    //         }, function () {
    //             $state.go("login");
    //         });
    //         $scope.missionDetails = {};
    //         if ($stateParams.cadId) {
    //             var formdata = {};
    //             formdata._id = $stateParams.cadId;
    //             NavigationService.apiCall("CadLineWork/getOne", formdata, function (data) {
    //                 if (data.value === true) {
    //                     if (data.data.mission) {
    //                         $scope.missionDetails = data.data.mission;
    //                     }
    //                     $scope.cadLineDetails = data.data;
    //                     $scope.template = TemplateService.changecontent("cadlinemap");
    //                     $scope.menutitle = NavigationService.makeactive("cadlinemap");
    //                 } else {
    //                     //  toastr.warning('Error submitting the form', 'Please try again');
    //                 }
    //             });
    //         }
    //         $scope.priceListForNDB = [{
    //                 "from": 0,
    //                 "to": 1,
    //                 "density": {
    //                     "low": 30,
    //                     "medium": 40,
    //                     "high": 50
    //                 },
    //                 "contoursDensity": {
    //                     "low": 45,
    //                     "medium": 55,
    //                     "high": 65
    //                 }
    //             },
    //             {
    //                 "from": 1.1,
    //                 "to": 2,
    //                 "density": {
    //                     "low": 40,
    //                     "medium": 50,
    //                     "high": 60
    //                 },
    //                 "contoursDensity": {
    //                     "low": 60,
    //                     "medium": 70,
    //                     "high": 80
    //                 }
    //             },
    //             {
    //                 "from": 2,
    //                 "to": 3.5,
    //                 "density": {
    //                     "low": 50,
    //                     "medium": 60,
    //                     "high": 70
    //                 },
    //                 "contoursDensity": {
    //                     "low": 70,
    //                     "medium": 80,
    //                     "high": 90
    //                 }
    //             }, {
    //                 "from": 3.6,
    //                 "to": 5,
    //                 "density": {
    //                     "low": 80,
    //                     "medium": 90,
    //                     "high": 100
    //                 },
    //                 "contoursDensity": {
    //                     "low": 110,
    //                     "medium": 120,
    //                     "high": 130
    //                 }
    //             }, {
    //                 "from": 5.1,
    //                 "to": 8,
    //                 "density": {
    //                     "low": 120,
    //                     "medium": 130,
    //                     "high": 140
    //                 },
    //                 "contoursDensity": {
    //                     "low": 165,
    //                     "medium": 175,
    //                     "high": 185
    //                 }
    //             }, {
    //                 "from": 8.1,
    //                 "to": 12,
    //                 "density": {
    //                     "low": 150,
    //                     "medium": 160,
    //                     "high": 170
    //                 },
    //                 "contoursDensity": {
    //                     "low": 210,
    //                     "medium": 220,
    //                     "high": 280
    //                 }
    //             }, {
    //                 "from": 12.1,
    //                 "to": 17,
    //                 "density": {
    //                     "low": 200,
    //                     "medium": 210,
    //                     "high": 220
    //                 },
    //                 "contoursDensity": {
    //                     "low": 275,
    //                     "medium": 285,
    //                     "high": 295
    //                 }
    //             }, {
    //                 "from": 17.1,
    //                 "to": 22,
    //                 "density": {
    //                     "low": 230,
    //                     "medium": 240,
    //                     "high": 250
    //                 },
    //                 "contoursDensity": {
    //                     "low": 320,
    //                     "medium": 330,
    //                     "high": 340
    //                 }
    //             }, {
    //                 "from": 22.1,
    //                 "to": 27,
    //                 "density": {
    //                     "low": 240,
    //                     "medium": 250,
    //                     "high": 260
    //                 },
    //                 "contoursDensity": {
    //                     "low": 330,
    //                     "medium": 340,
    //                     "high": 350
    //                 }
    //             }, {
    //                 "from": 27.1,
    //                 "to": 32,
    //                 "density": {
    //                     "low": 240,
    //                     "medium": 250,
    //                     "high": 260
    //                 },
    //                 "contoursDensity": {
    //                     "low": 330,
    //                     "medium": 340,
    //                     "high": 350
    //                 }
    //             }, {
    //                 "from": 32.1,
    //                 "to": 40,
    //                 "density": {
    //                     "low": 250,
    //                     "medium": 260,
    //                     "high": 270
    //                 },
    //                 "contoursDensity": {
    //                     "low": 340,
    //                     "medium": 350,
    //                     "high": 360
    //                 }
    //             }
    //         ];
    //         $scope.priceListForUDB = [{
    //                 "from": 0,
    //                 "to": 1,
    //                 "density": {
    //                     "low": 67.50,
    //                     "medium": 82.50,
    //                     "high": 97.50
    //                 },
    //                 "contoursDensity": {
    //                     "low": 90.00,
    //                     "medium": 105.00,
    //                     "high": 120.00
    //                 }
    //             },
    //             {
    //                 "from": 1.1,
    //                 "to": 2,
    //                 "density": {
    //                     "low": 70.00,
    //                     "medium": 87.50,
    //                     "high": 105.00
    //                 },
    //                 "contoursDensity": {
    //                     "low": 105.00,
    //                     "medium": 122.50,
    //                     "high": 140.00
    //                 }
    //             },
    //             {
    //                 "from": 2,
    //                 "to": 3.5,
    //                 "density": {
    //                     "low": 50,
    //                     "medium": 60,
    //                     "high": 70
    //                 },
    //                 "contoursDensity": {
    //                     "low": 70,
    //                     "medium": 80,
    //                     "high": 90
    //                 }
    //             }, {
    //                 "from": 3.6,
    //                 "to": 5,
    //                 "density": {
    //                     "low": 80,
    //                     "medium": 90,
    //                     "high": 100
    //                 },
    //                 "contoursDensity": {
    //                     "low": 110,
    //                     "medium": 120,
    //                     "high": 130
    //                 }
    //             }, {
    //                 "from": 5.1,
    //                 "to": 8,
    //                 "density": {
    //                     "low": 120,
    //                     "medium": 130,
    //                     "high": 140
    //                 },
    //                 "contoursDensity": {
    //                     "low": 165,
    //                     "medium": 175,
    //                     "high": 185
    //                 }
    //             }, {
    //                 "from": 8.1,
    //                 "to": 12,
    //                 "density": {
    //                     "low": 150,
    //                     "medium": 160,
    //                     "high": 170
    //                 },
    //                 "contoursDensity": {
    //                     "low": 210,
    //                     "medium": 220,
    //                     "high": 280
    //                 }
    //             }, {
    //                 "from": 12.1,
    //                 "to": 17,
    //                 "density": {
    //                     "low": 200,
    //                     "medium": 210,
    //                     "high": 220
    //                 },
    //                 "contoursDensity": {
    //                     "low": 275,
    //                     "medium": 285,
    //                     "high": 295
    //                 }
    //             }, {
    //                 "from": 17.1,
    //                 "to": 22,
    //                 "density": {
    //                     "low": 230,
    //                     "medium": 240,
    //                     "high": 250
    //                 },
    //                 "contoursDensity": {
    //                     "low": 320,
    //                     "medium": 330,
    //                     "high": 340
    //                 }
    //             }, {
    //                 "from": 22.1,
    //                 "to": 27,
    //                 "density": {
    //                     "low": 240,
    //                     "medium": 250,
    //                     "high": 260
    //                 },
    //                 "contoursDensity": {
    //                     "low": 330,
    //                     "medium": 340,
    //                     "high": 350
    //                 }
    //             }, {
    //                 "from": 27.1,
    //                 "to": 32,
    //                 "density": {
    //                     "low": 240,
    //                     "medium": 250,
    //                     "high": 260
    //                 },
    //                 "contoursDensity": {
    //                     "low": 330,
    //                     "medium": 340,
    //                     "high": 350
    //                 }
    //             }, {
    //                 "from": 32.1,
    //                 "to": 40,
    //                 "density": {
    //                     "low": 250,
    //                     "medium": 260,
    //                     "high": 270
    //                 },
    //                 "contoursDensity": {
    //                     "low": 340,
    //                     "medium": 350,
    //                     "high": 360
    //                 }
    //             }
    //         ];
    //         $scope.calLineName = function (data) {
    //             console.log("data----", data);
    //             if (data.contoursDensity || data.density) {
    //                 console.log("inside contoursDensity");
    //                 var priceList;
    //                 if ($scope.profileDetails.lisence == 'UDB') {
    //                     priceList = $scope.priceListForUDB;
    //                 } else {
    //                     priceList = $scope.priceListForNDB;

    //                 }
    //                 _.forEach(priceList, function (val) {
    //                     console.log("density", val.density);
    //                     var checkRange = _.inRange(data.acreage, val.from, val.to);
    //                     if (checkRange == true) {
    //                         console.log("found", val);
    //                         if (data.contoursDensity) {
    //                             data.amount = val.contoursDensity[data.contoursDensity]
    //                             console.log("contoursDensity  ", val.contoursDensity[data.contoursDensity]);
    //                         } else {
    //                             data.amount = val.contoursDensity[data.contoursDensity]
    //                             console.log("contoursDensity  ", val.density[data.contoursDensity]);
    //                         }
    //                         NavigationService.apiCall("CadLineWork/save", data, function (data) {
    //                             if (data.value === true) {
    //                                 console.log("data.value", data.value);
    //                             } else {
    //                                 //  toastr.warning('Error submitting the form', 'Please try again');
    //                             }
    //                         });
    //                         return false;
    //                     }
    //                 })
    //             }

    //         }


    //     })
    //     .controller('RequestCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
    //         //Used to name the .html file
    //         $scope.template = TemplateService.changecontent("request");
    //         $scope.menutitle = NavigationService.makeactive("request");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();
    //         if ($stateParams.workType) {
    //             $scope.workType = $stateParams.workType;
    //         }
    //         NavigationService.profile(function () {
    //             $scope.profileDetails = $.jStorage.get("profile");
    //         }, function () {
    //             $state.go("login");
    //         });
    //         if ($.jStorage.get("profile")) {
    //             var formData = {};
    //             formData.user = $.jStorage.get("profile")._id;
    //             NavigationService.apiCall("Mission/getByUser", formData, function (data) {
    //                 if (data.value === true) {
    //                     $scope.missionData = data.data;
    //                     console.log("data found successfully", $scope.missionData);

    //                 } else {
    //                     //  toastr.warning('Error submitting the form', 'Please try again');
    //                 }
    //             });
    //         };
    //         $scope.processCad = function (formdata) {
    //             console.log("formdata", formdata.mission.split('|'))
    //             var missionData = formdata.mission.split('|');
    //             formdata.mission = missionData[0];
    //             formdata.geoLocation = JSON.parse(missionData[1]);
    //             formdata.name = missionData[2];
    //             NavigationService.apiCall("CadLineWork/save", formdata, function (data) {
    //                 if (data.value === true) {
    //                     $state.go('cadlinemap', {
    //                         cadId: data.data._id
    //                     });
    //                 } else {
    //                     //  toastr.warning('Error submitting the form', 'Please try again');
    //                 }
    //             });

    //         }
    //     })
    //     .controller('InsidecadCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
    //         //Used to name the .html file
    //         $scope.template = TemplateService.changecontent("insidecad");
    //         $scope.menutitle = NavigationService.makeactive("insidecad");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();
    //         NavigationService.profile(function () {
    //             $scope.profileDetails = $.jStorage.get("profile");
    //         }, function () {
    //             $state.go("login");
    //         });
    //         var formData = {}
    //         $scope.missionData = {};

    //         $scope.today = function () {
    //             // $scope.dt = new Date();
    //         };
    //         $scope.today();

    //         $scope.clear = function () {
    //             $scope.dt = null;
    //         };
    //         // Disable weekend selection
    //         function disabled(data) {
    //             var date = data.date,
    //                 mode = data.mode;
    //             return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    //         }
    //         $scope.open1 = function () {
    //             $scope.popup1.opened = true;
    //         };

    //         $scope.open2 = function () {
    //             $scope.popup2.opened = true;
    //         };

    //         $scope.popup1 = {
    //             opened: false
    //         };

    //         $scope.popup2 = {
    //             opened: false
    //         };
    //     })
    //     .controller('InvoicingreceiptsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
    //         //Used to name the .html file
    //         $scope.template = TemplateService.changecontent("invoicingreceipts");
    //         $scope.menutitle = NavigationService.makeactive("invoicingreceipts");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();
    //         var formData = {}
    //         $scope.missionData = {};

    //         $scope.today = function () {
    //             // $scope.dt = new Date();
    //         };
    //         $scope.today();

    //         $scope.clear = function () {
    //             $scope.dt = null;
    //         };
    //         // Disable weekend selection
    //         function disabled(data) {
    //             var date = data.date,
    //                 mode = data.mode;
    //             return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    //         }
    //         $scope.open1 = function () {
    //             $scope.popup1.opened = true;
    //         };

    //         $scope.open2 = function () {
    //             $scope.popup2.opened = true;
    //         };

    //         $scope.open3 = function () {
    //             $scope.popup3.opened = true;
    //         };

    //         $scope.popup1 = {
    //             opened: false
    //         };

    //         $scope.popup2 = {
    //             opened: false
    //         };

    //         $scope.popup3 = {
    //             opened: false
    //         };

    //     })
    //     .controller('BillinginsideCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
    //         //Used to name the .html file
    //         $scope.template = TemplateService.changecontent("billinginside");
    //         $scope.menutitle = NavigationService.makeactive("billinginside");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();
    //         var formData = {}
    //         $scope.missionData = {};

    //         $scope.today = function () {
    //             // $scope.dt = new Date();
    //         };
    //         $scope.today();

    //         $scope.clear = function () {
    //             $scope.dt = null;
    //         };
    //         // Disable weekend selection
    //         function disabled(data) {
    //             var date = data.date,
    //                 mode = data.mode;
    //             return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    //         }
    //         $scope.open1 = function () {
    //             $scope.popup1.opened = true;
    //         };

    //         $scope.open2 = function () {
    //             $scope.popup2.opened = true;
    //         };

    //         $scope.open3 = function () {
    //             $scope.popup3.opened = true;
    //         };

    //         $scope.popup1 = {
    //             opened: false
    //         };

    //         $scope.popup2 = {
    //             opened: false
    //         };

    //         $scope.popup3 = {
    //             opened: false
    //         };
    //     })
    //     .controller('SupportCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
    //         //Used to name the .html file
    //         $scope.template = TemplateService.changecontent("support");
    //         $scope.menutitle = NavigationService.makeactive("support");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();
    //         var formData = {}
    //         $scope.missionData = {};

    //         $scope.today = function () {
    //             // $scope.dt = new Date();
    //         };
    //         $scope.today();

    //         $scope.clear = function () {
    //             $scope.dt = null;
    //         };
    //         // Disable weekend selection
    //         function disabled(data) {
    //             var date = data.date,
    //                 mode = data.mode;
    //             return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    //         }
    //         $scope.open1 = function () {
    //             $scope.popup1.opened = true;
    //         };

    //         $scope.open2 = function () {
    //             $scope.popup2.opened = true;
    //         };

    //         $scope.popup1 = {
    //             opened: false
    //         };

    //         $scope.popup2 = {
    //             opened: false
    //         };

    //     })
    //     .controller('Raise-ticketCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
    //         //Used to name the .html file
    //         $scope.template = TemplateService.changecontent("raise-ticket");
    //         $scope.menutitle = NavigationService.makeactive("raise-ticket");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();
    //         var formData = {}
    //         $scope.missionData = {};

    //         $scope.today = function () {
    //             // $scope.dt = new Date();
    //         };
    //         $scope.today();

    //         $scope.clear = function () {
    //             $scope.dt = null;
    //         };
    //         // Disable weekend selection
    //         function disabled(data) {
    //             var date = data.date,
    //                 mode = data.mode;
    //             return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    //         }
    //         $scope.open1 = function () {
    //             $scope.popup1.opened = true;
    //         };

    //         $scope.open2 = function () {
    //             $scope.popup2.opened = true;
    //         };

    //         $scope.popup1 = {
    //             opened: false
    //         };

    //         $scope.popup2 = {
    //             opened: false
    //         };

    //     })
    //     .controller('DronsaleCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
    //         //Used to name the .html file
    //         $scope.template = TemplateService.changecontent("dronsale");
    //         $scope.menutitle = NavigationService.makeactive("dronsale");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();
    //         var formData = {}
    //         $scope.missionData = {};

    //         $scope.today = function () {
    //             // $scope.dt = new Date();
    //         };
    //         $scope.today();

    //         $scope.clear = function () {
    //             $scope.dt = null;
    //         };
    //         // Disable weekend selection
    //         function disabled(data) {
    //             var date = data.date,
    //                 mode = data.mode;
    //             return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    //         }
    //         $scope.open1 = function () {
    //             $scope.popup1.opened = true;
    //         };

    //         $scope.open2 = function () {
    //             $scope.popup2.opened = true;
    //         };

    //         $scope.popup1 = {
    //             opened: false
    //         };

    //         $scope.popup2 = {
    //             opened: false
    //         };

    //     })
    //     .controller('InsidedronsaleCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
    //         //Used to name the .html file
    //         $scope.template = TemplateService.changecontent("insidedronsale");
    //         $scope.menutitle = NavigationService.makeactive("insidedronsale");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();
    //         var formData = {}
    //         $scope.missionData = {};

    //         $scope.today = function () {
    //             // $scope.dt = new Date();
    //         };
    //         $scope.today();

    //         $scope.clear = function () {
    //             $scope.dt = null;
    //         };
    //         // Disable weekend selection
    //         function disabled(data) {
    //             var date = data.date,
    //                 mode = data.mode;
    //             return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    //         }
    //         $scope.open1 = function () {
    //             $scope.popup1.opened = true;
    //         };

    //         $scope.open2 = function () {
    //             $scope.popup2.opened = true;
    //         };

    //         $scope.popup1 = {
    //             opened: false
    //         };

    //         $scope.popup2 = {
    //             opened: false
    //         };

    //     })
    //     .controller('AdminuserCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
    //         //Used to name the .html file
    //         $scope.template = TemplateService.changecontent("adminuser");
    //         $scope.menutitle = NavigationService.makeactive("adminuser");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();
    //         var formData = {}
    //         $scope.missionData = {};

    //         $scope.today = function () {
    //             // $scope.dt = new Date();
    //         };
    //         $scope.today();

    //         $scope.clear = function () {
    //             $scope.dt = null;
    //         };
    //         // Disable weekend selection
    //         function disabled(data) {
    //             var date = data.date,
    //                 mode = data.mode;
    //             return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    //         }
    //         $scope.open1 = function () {
    //             $scope.popup1.opened = true;
    //         };

    //         $scope.open2 = function () {
    //             $scope.popup2.opened = true;
    //         };

    //         $scope.popup1 = {
    //             opened: false
    //         };

    //         $scope.popup2 = {
    //             opened: false
    //         };

    //     })
    //     .controller('Dfm-subscriptionCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
    //         //Used to name the .html file
    //         $scope.template = TemplateService.changecontent("dfm-subscription");
    //         $scope.menutitle = NavigationService.makeactive("dfm-subscription");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();
    //         var formData = {}
    //         $scope.missionData = {};

    //         $scope.today = function () {
    //             // $scope.dt = new Date();
    //         };
    //         $scope.today();

    //         $scope.clear = function () {
    //             $scope.dt = null;
    //         };
    //         // Disable weekend selection
    //         function disabled(data) {
    //             var date = data.date,
    //                 mode = data.mode;
    //             return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    //         }
    //         $scope.open1 = function () {
    //             $scope.popup1.opened = true;
    //         };

    //         $scope.open2 = function () {
    //             $scope.popup2.opened = true;
    //         };

    //         $scope.popup1 = {
    //             opened: false
    //         };

    //         $scope.popup2 = {
    //             opened: false
    //         };

    //     })
    //     .controller('SettingCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
    //         //Used to name the .html file
    //         $scope.template = TemplateService.changecontent("setting");
    //         $scope.menutitle = NavigationService.makeactive("setting");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();
    //         var formData = {}
    //         $scope.missionData = {};

    //         $scope.today = function () {
    //             // $scope.dt = new Date();
    //         };
    //         $scope.today();

    //         $scope.clear = function () {
    //             $scope.dt = null;
    //         };
    //         // Disable weekend selection
    //         function disabled(data) {
    //             var date = data.date,
    //                 mode = data.mode;
    //             return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    //         }
    //         $scope.open1 = function () {
    //             $scope.popup1.opened = true;
    //         };

    //         $scope.open2 = function () {
    //             $scope.popup2.opened = true;
    //         };

    //         $scope.popup1 = {
    //             opened: false
    //         };

    //         $scope.popup2 = {
    //             opened: false
    //         };

    //     })
    //     .controller('BillingCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
    //         //Used to name the .html file
    //         $scope.template = TemplateService.changecontent("billing");
    //         $scope.menutitle = NavigationService.makeactive("billing");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();
    //         // $scope.parle = function () {
    //         //     $scope.loginModal = $uibModal.open({
    //         //         animation: true,
    //         //         templateUrl: 'views/modal/parle.html',
    //         //         scope: $scope,
    //         //         size: 'lg',
    //         //         windowClass: "parle-modal"


    //         //     });
    //         // };
    //         var formData = {}
    //         $scope.missionData = {};

    //         $scope.today = function () {
    //             // $scope.dt = new Date();
    //         };
    //         $scope.today();

    //         $scope.clear = function () {
    //             $scope.dt = null;
    //         };
    //         // Disable weekend selection
    //         function disabled(data) {
    //             var date = data.date,
    //                 mode = data.mode;
    //             return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    //         }
    //         $scope.open1 = function () {
    //             $scope.popup1.opened = true;
    //         };

    //         $scope.open2 = function () {
    //             $scope.popup2.opened = true;
    //         };

    //         $scope.open3 = function () {
    //             $scope.popup3.opened = true;
    //         };
    //         $scope.popup1 = {
    //             opened: false
    //         };

    //         $scope.popup2 = {
    //             opened: false
    //         };


    //         $scope.popup3 = {
    //             opened: false
    //         };
    //     })
    //     .controller('MissiondetailCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
    //         //Used to name the .html file
    //         $scope.template = TemplateService.changecontent("missiondetail");
    //         $scope.menutitle = NavigationService.makeactive("missiondetail");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();

    //     })
    //     .controller('AccountCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
    //         //Used to name the .html file
    //         $scope.template = TemplateService.changecontent("account");
    //         $scope.menutitle = NavigationService.makeactive("account");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();
    //         NavigationService.profile(function () {
    //             $scope.profileDetails = $.jStorage.get("profile");
    //         }, function () {
    //             $state.go("login");
    //         });
    //     })
    //     .controller('UseraccountCtrl', function ($scope, TemplateService, toastr, NavigationService, $timeout, $state) {
    //         //Used to name the .html file
    //         $scope.template = TemplateService.changecontent("useraccount");
    //         $scope.menutitle = NavigationService.makeactive("useraccount");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();
    //         $scope.profileDetails = {};
    //         NavigationService.profile(function () {
    //             $scope.profileDetails = $.jStorage.get("profile");
    //         }, function () {
    //             $state.go("login");
    //         });
    //         $scope.addCard = function (card) {
    //             if (card && card.cardNumber) {
    //                 $scope.profileDetails.cardDetails.push(card);
    //                 NavigationService.apiCall("User/save", $scope.profileDetails, function (data) {
    //                     if (data.value === true) {
    //                         $('#modal-6').modal('hide');
    //                         $scope.cardDetails = null;
    //                         card = null;
    //                         console.log("data saved successfully");
    //                         toastr.success("Card added successfully");
    //                     } else {
    //                         //  toastr.warning('Error submitting the form', 'Please try again');
    //                     }
    //                 });
    //             } else {
    //                 toastr.warning('Error submitting the form', 'Please Provide card details');
    //             }
    //         };
    //         $scope.removeCard = function (index) {
    //             $scope.profileDetails.cardDetails.splice(index, 1);
    //             NavigationService.apiCall("User/save", $scope.profileDetails, function (data) {
    //                 if (data.value === true) {
    //                     $('#modal-6').modal('hide');
    //                     $scope.cardDetails = {};
    //                     console.log("data saved successfully");
    //                     toastr.success("Card added successfully");
    //                 } else {
    //                     //  toastr.warning('Error submitting the form', 'Please try again');
    //                 }
    //             });
    //         }
    //     })
    //     .controller('createmissionCtrl', function ($scope, $http, TemplateService, NavigationService, $timeout, $state) {
    //         //Used to name the .html file
    //         $scope.template = TemplateService.changecontent("create-mission");
    //         $scope.menutitle = NavigationService.makeactive("createmission");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();

    //         // $timeout(function () {
    //         //     var map = mapboxService.getMapInstances()[0];
    //         //     //mapboxService.fitMapToMarkers(map);
    //         // }, 100);
    //         $scope.uploadMe = function (data) {
    //             if ($.jStorage.get("profile")) {
    //                 data.user = $.jStorage.get("profile")._id;
    //                 NavigationService.apiCall("Mission/createMission", data, function (data) {
    //                     // if (data.value === true) {
    //                     console.log("data saved successfully");
    //                     $("#modal-4").modal();
    //                     // } else {
    //                     //     //  toastr.warning('Error submitting the form', 'Please try again');
    //                     // }
    //                 });
    //             }
    //         }
    //     })

    //     .controller('missionanalyzeCtrl', function ($scope, $stateParams, shareMission, TemplateService, NavigationService, $timeout, $state) {
    //         //Used to name the .html file
    //         $scope.template = TemplateService.changecontent("mission-analyze");
    //         $scope.menutitle = NavigationService.makeactive("missions");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();
    //         var formData = {}
    //         formData._id = $stateParams.missionId;
    //         NavigationService.apiCall("Mission/getOne", formData, function (data) {
    //             if (data.value === true) {
    //                 $scope.missionDetails = data.data;
    //                 shareMission.setval($scope.missionDetails)
    //                 console.log("data found successfully", $scope.missionDetails);
    //             } else {
    //                 //  toastr.warning('Error submitting the form', 'Please try again');
    //             }
    //         });
    //         NavigationService.apiCall("ServiceList/getByMission", formData, function (data) {
    //             if (data.value === true) {
    //                 $scope.serviceListData = data.data;
    //                 $scope.serviceListData = _.chunk($scope.serviceListData, 2);
    //                 console.log("data found successfully", $scope.serviceListData);
    //             } else {
    //                 //  toastr.warning('Error submitting the form', 'Please try again');
    //             }
    //         });
    //         $scope.serviceRequest = function (serviceReq) {
    //             others = {};
    //             others.serviceId = serviceReq._id;
    //             others.name = serviceReq.name;
    //             others.status = "requested";
    //             $scope.missionDetails.others.push(others);
    //             NavigationService.apiCall("Mission/save", $scope.missionDetails, function (data) {
    //                 if (data.value === true) {
    //                     console.log("data saved successfully");
    //                     $state.reload();
    //                 } else {
    //                     //  toastr.warning('Error submitting the form', 'Please try again');
    //                 }
    //             });

    //         }

    //     })
    //     .controller('missiondetailCtrl', function ($scope, $stateParams, TemplateService, NavigationService, $timeout, $state) {
    //         var formData = {}
    //         formData._id = $stateParams.missionId;
    //         if ($stateParams.missionId) {
    //             NavigationService.apiCall("Mission/getOne", formData, function (data) {
    //                 console.log("**** insdie apiCall mission getone ****");
    //                 if (data.value === true) {
    //                     $scope.missionDetails = data.data;
    //                     $scope.display = true;
    //                     $scope.template = TemplateService.changecontent("missiondetail");
    //                     $scope.menutitle = NavigationService.makeactive("missions");
    //                     TemplateService.title = $scope.menutitle;
    //                     console.log("data found successfully111", $scope.missionDetails);
    //                     console.log("data template", $scope.template);

    //                 } else {
    //                     //  toastr.warning('Error submitting the form', 'Please try again');
    //                 }
    //             });
    //         }

    //         //Used to name the .html file
    //         // $scope.template = TemplateService.changecontent("missiondetail");
    //         // $scope.menutitle = NavigationService.makeactive("missions");
    //         // TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();
    //         console.log("------", $stateParams.missionId);
    //         var formData = {}
    //         formData._id = $stateParams.missionId;
    //         // if ($stateParams.missionId) {
    //         //     NavigationService.apiCall("Mission/getOne", formData, function (data) {
    //         //         if (data.value === true) {
    //         //             $scope.missionDetails = data.data;
    //         //             $scope.display = true;
    //         //             console.log("data found successfully", $scope.missionDetails);
    //         //         } else {
    //         //             //  toastr.warning('Error submitting the form', 'Please try again');
    //         //         }
    //         //     });
    //         // }


    //     })
    .controller('AccessController', function ($scope, TemplateService, NavigationService, $timeout, $state) {
        if ($.jStorage.get("accessToken")) {

        } else {
            $state.go("login");
        }
    })

    //     .controller('JagzCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $interval) {

    //         function toColor(num, red) {
    //             num >>>= 0;
    //             var b = num & 0xFF,
    //                 g = (num & 0xFF00) >>> 8,
    //                 r = (num & 0xFF0000) >>> 16,
    //                 a = ((num & 0xFF000000) >>> 24) / 255;
    //             if (red == "red") {
    //                 r = 255;
    //                 b = 0;
    //                 g = 0;
    //             }
    //             return "rgba(" + [r, g, b, a].join(",") + ")";
    //         }

    //         $scope.circles = _.times(360, function (n) {

    //             var radius = _.random(0, 10);
    //             return {
    //                 width: radius,
    //                 height: radius,
    //                 background: toColor(_.random(-12525360, 12525360)),
    //                 top: _.random(0, $(window).height()),
    //                 left: _.random(0, $(window).width())
    //             };
    //         });

    //         function generateCircle() {
    //             _.each($scope.circles, function (n, index) {
    //                 var radius = _.random(0, 10);
    //                 n.width = radius;
    //                 n.height = radius;
    //                 n.background = toColor(_.random(-12525360, 12525360));
    //                 if (count % 7 === 0 || count % 7 === 5 || count % 7 === 6) {
    //                     if (count % 7 === 6) {
    //                         n.background = toColor(_.random(-12525360, 12525360), "red");
    //                         // n.width = 3;
    //                         // n.height = 3;
    //                     }
    //                     var t = index * Math.PI / 180;
    //                     var x = (4.0 * Math.pow(Math.sin(t), 3));
    //                     var y = ((3.0 * Math.cos(t)) - (1.3 * Math.cos(2 * t)) - (0.6 * Math.cos(3 * t)) - (0.2 * Math.cos(4 * t)));
    //                     n.top = -50 * y + 300;
    //                     n.left = 50 * x + $(window).width() / 2;
    //                 } else {
    //                     n.top = _.random(0, $(window).height());
    //                     n.left = _.random(0, $(window).width());
    //                 }
    //             });
    //         }

    //         var count = 0;

    //         $interval(function () {
    //             count++;
    //             console.log("Version 1.1");
    //             generateCircle();
    //         }, 5000);

    //     })

    //     .controller('MultipleSelectCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, $filter, toastr) {
    //         var i = 0;
    //         $scope.getValues = function (filter, insertFirst) {
    //             var dataSend = {
    //                 keyword: $scope.search.modelData,
    //                 filter: filter,
    //                 page: 1
    //             };
    //             if (dataSend.keyword === null || dataSend.keyword === undefined) {
    //                 dataSend.keyword = "";
    //             }
    //             NavigationService[$scope.api]($scope.url, dataSend, ++i, function (data) {
    //                 if (data.value) {
    //                     $scope.list = data.data.results;
    //                     if ($scope.search.modelData) {
    //                         $scope.showCreate = true;
    //                         _.each($scope.list, function (n) {
    //                             // if (n.name) {
    //                             if (_.lowerCase(n.name) == _.lowerCase($scope.search.modelData)) {
    //                                 $scope.showCreate = false;
    //                                 return 0;
    //                             }
    //                             // }else{
    //                             //     if (_.lowerCase(n.officeCode) == _.lowerCase($scope.search.modelData)) {
    //                             //       $scope.showCreate = false;
    //                             //       return 0;
    //                             //   }
    //                             // }

    //                         });
    //                     } else {
    //                         $scope.showCreate = false;

    //                     }
    //                     if (insertFirst) {
    //                         if ($scope.list[0] && $scope.list[0]._id) {
    //                             // if ($scope.list[0].name) {
    //                             $scope.sendData($scope.list[0]._id, $scope.list[0].name);
    //                             // }else{
    //                             //   $scope.sendData($scope.list[0]._id, $scope.list[0].officeCode);
    //                             // }
    //                         } else {
    //                             console.log("Making this happen");
    //                             // $scope.sendData(null, null);
    //                         }
    //                     }
    //                 } else {
    //                     console.log("Making this happen2");
    //                     $scope.sendData(null, null);
    //                 }


    //             });
    //         };

    //         $scope.$watch('model', function (newVal, oldVal) {
    //             if (newVal && oldVal === undefined) {
    //                 $scope.getValues({
    //                     _id: $scope.model
    //                 }, true);
    //             }
    //         });


    //         $scope.$watch('filter', function (newVal, oldVal) {
    //             var filter = {};
    //             if ($scope.filter) {
    //                 filter = JSON.parse($scope.filter);
    //             }
    //             var dataSend = {
    //                 keyword: $scope.search.modelData,
    //                 filter: filter,
    //                 page: 1
    //             };

    //             NavigationService[$scope.api]($scope.url, dataSend, ++i, function (data) {
    //                 if (data.value) {
    //                     $scope.list = data.data.results;
    //                     $scope.showCreate = false;

    //                 }
    //             });
    //         });


    //         $scope.search = {
    //             modelData: ""
    //         };
    //         if ($scope.model) {
    //             $scope.getValues({
    //                 _id: $scope.model
    //             }, true);
    //         } else {
    //             $scope.getValues();
    //         }

    //         $scope.listview = false;
    //         $scope.showCreate = false;
    //         $scope.typeselect = "";
    //         $scope.showList = function () {
    //             $scope.listview = true;
    //             $scope.searchNew(true);
    //         };
    //         $scope.closeList = function () {
    //             $scope.listview = false;
    //         };
    //         $scope.closeListSlow = function () {
    //             $timeout(function () {
    //                 $scope.closeList();
    //             }, 500);
    //         };
    //         $scope.searchNew = function (dontFlush) {
    //             if (!dontFlush) {
    //                 $scope.model = "";
    //             }
    //             var filter = {};
    //             if ($scope.filter) {
    //                 filter = JSON.parse($scope.filter);
    //             }
    //             $scope.getValues(filter);
    //         };
    //         $scope.createNew = function (create) {
    //             var newCreate = $filter("capitalize")(create);
    //             var data = {
    //                 name: newCreate
    //             };
    //             if ($scope.filter) {
    //                 data = _.assign(data, JSON.parse($scope.filter));
    //             }
    //             console.log(data);
    //             NavigationService[$scope.create](data, function (data) {
    //                 if (data.value) {
    //                     toastr.success($scope.name + " Created Successfully", "Creation Success");
    //                     $scope.model = data.data._id;
    //                     $scope.ngName = data.data.name;
    //                 } else {
    //                     toastr.error("Error while creating " + $scope.name, "Error");
    //                 }
    //             });
    //             $scope.listview = false;
    //         };
    //         $scope.sendData = function (val, name) {
    //             $scope.search.modelData = name;
    //             $scope.ngName = name;
    //             $scope.model = val;
    //             $scope.listview = false;
    //         };
    //     })

    //     .controller('PageJsonCtrl', function ($scope, TemplateService, NavigationService, JsonService, $timeout, $state, $stateParams, $uibModal) {
    //         $scope.json = JsonService;
    //         $scope.template = TemplateService.changecontent("none");
    //         $scope.menutitle = NavigationService.makeactive("Country List");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();
    //         JsonService.getJson($stateParams.id, function () {});

    //         globalfunction.confDel = function (callback) {
    //             var modalInstance = $uibModal.open({
    //                 animation: $scope.animationsEnabled,
    //                 templateUrl: '/backend/views/modal/conf-delete.html',
    //                 size: 'sm',
    //                 scope: $scope
    //             });
    //             $scope.close = function (value) {
    //                 callback(value);
    //                 modalInstance.close("cancel");
    //             };
    //         };

    //         globalfunction.openModal = function (callback) {
    //             var modalInstance = $uibModal.open({
    //                 animation: $scope.animationsEnabled,
    //                 templateUrl: '/backend/views/modal/modal.html',
    //                 size: 'lg',
    //                 scope: $scope
    //             });
    //             $scope.close = function (value) {
    //                 callback(value);
    //                 modalInstance.close("cancel");
    //             };
    //         };

    //         // globalfunction.confDel(function (value) {
    //         //     console.log(value);
    //         //     if (value) {
    //         //         NavigationService.apiCall(id, function (data) {
    //         //             if (data.value) {
    //         //                 $scope.showAllCountries();
    //         //                 toastr.success("Country deleted successfully.", "Country deleted");
    //         //             } else {
    //         //                 toastr.error("There was an error while deleting country", "Country deleting error");
    //         //             }
    //         //         });
    //         //     }
    //         // });

    //     })

    //     .controller('ViewCtrl', function ($scope, TemplateService, NavigationService, JsonService, $timeout, $state, $stateParams) {
    //         $scope.json = JsonService;
    //         $scope.template = TemplateService;
    //         var i = 0;
    //         if ($stateParams.page && !isNaN(parseInt($stateParams.page))) {
    //             $scope.currentPage = $stateParams.page;
    //         } else {
    //             $scope.currentPage = 1;
    //         }

    //         $scope.search = {
    //             keyword: ""
    //         };
    //         if ($stateParams.keyword) {
    //             $scope.search.keyword = $stateParams.keyword;
    //         }
    //         $scope.changePage = function (page) {
    //             var goTo = "page";
    //             if ($scope.search.keyword) {
    //                 goTo = "page";
    //             }
    //             $state.go(goTo, {
    //                 id: $stateParams.id,
    //                 page: page,
    //                 keyword: $scope.search.keyword
    //             });
    //         };

    //         $scope.getAllItems = function (keywordChange) {
    //             $scope.totalItems = undefined;
    //             if (keywordChange) {
    //                 $scope.currentPage = 1;
    //             }
    //             NavigationService.search($scope.json.json.apiCall.url, {
    //                     page: $scope.currentPage,
    //                     keyword: $scope.search.keyword
    //                 }, ++i,
    //                 function (data, ini) {
    //                     if (ini == i) {
    //                         $scope.items = data.data.results;
    //                         $scope.totalItems = data.data.total;
    //                         $scope.maxRow = data.data.options.count;
    //                     }
    //                 });
    //         };
    //         JsonService.refreshView = $scope.getAllItems;
    //         $scope.getAllItems();

    //     })

    //     .controller('DetailCtrl', function ($scope, TemplateService, NavigationService, JsonService, $timeout, $state, $stateParams, toastr) {
    //         $scope.json = JsonService;
    //         JsonService.setKeyword($stateParams.keyword);
    //         $scope.template = TemplateService;
    //         $scope.data = {};
    //         console.log("detail controller");
    //         console.log($scope.json);

    //         //  START FOR EDIT
    //         if ($scope.json.json.preApi) {

    //             NavigationService.apiCall($scope.json.json.preApi.url, {
    //                 [$scope.json.json.preApi.params]: $scope.json.keyword._id
    //             }, function (data) {
    //                 $scope.data = data.data;
    //                 $scope.generateField = true;

    //             });
    //         } else {
    //             $scope.generateField = true;
    //         }
    //         //  END FOR EDIT

    //         $scope.onCancel = function (sendTo) {
    //             $scope.json.json.action[1].stateName.json.keyword = "";
    //             $scope.json.json.action[1].stateName.json.page = "";
    //             $state.go($scope.json.json.action[1].stateName.page, $scope.json.json.action[1].stateName.json);
    //         };

    //         $scope.saveData = function (formData) {

    //             _.each($scope.json.json.fields, function (n) {
    //                 if (n.type == "tags" && n.dropDownType == "multiple") {
    //                     console.log(formData[n.tableRef]);
    //                     $scope.newTags = [];
    //                     _.each(formData[n.tableRef], function (m) {
    //                         $scope.newTags.push(m._id);
    //                     })
    //                     console.log($scope.newTags);
    //                     formData[n.tableRef] = $scope.newTags;

    //                 }
    //             })
    //             if ($scope.json.json.name == "User") {
    //                 // if (formData.password != formData.confirmpassword) {
    //                 //     console.log(formData)
    //                 //     toastr.error("Password mismatched ");
    //                 // } else {
    //                 NavigationService.apiCall($scope.json.json.apiCall.url, formData, function (data) {

    //                     if (data.value === true) {
    //                         $scope.json.json.action[0].stateName.json.keyword = "";
    //                         $scope.json.json.action[0].stateName.json.page = "";
    //                         $state.go($scope.json.json.action[0].stateName.page, $scope.json.json.action[0].stateName.json);
    //                         var messText = "created";
    //                         if ($scope.json.keyword._id) {
    //                             messText = "edited";
    //                         }
    //                         toastr.success($scope.json.json.name + " " + formData.name + " " + messText + " successfully.");
    //                     } else {
    //                         var messText = "creating";
    //                         if ($scope.json.keyword._id) {
    //                             messText = "editing";
    //                         }
    //                         toastr.error("Failed " + messText + " " + $scope.json.json.name);
    //                     }
    //                 });
    //                 // }
    //             } else {
    //                 NavigationService.apiCall($scope.json.json.apiCall.url, formData, function (data) {

    //                     if (data.value === true) {
    //                         $scope.json.json.action[0].stateName.json.keyword = "";
    //                         $scope.json.json.action[0].stateName.json.page = "";
    //                         $state.go($scope.json.json.action[0].stateName.page, $scope.json.json.action[0].stateName.json);
    //                         var messText = "created";
    //                         if ($scope.json.keyword._id) {
    //                             messText = "edited";
    //                         }
    //                         toastr.success($scope.json.json.name + " " + formData.name + " " + messText + " successfully.");
    //                     } else {
    //                         var messText = "creating";
    //                         if ($scope.json.keyword._id) {
    //                             messText = "editing";
    //                         }
    //                         toastr.error("Failed " + messText + " " + $scope.json.json.name);
    //                     }
    //                 });
    //             }
    //         };
    //     })

    //     .controller('DetailFieldCtrl', function ($scope, TemplateService, NavigationService, JsonService, $timeout, $state, $stateParams, $uibModal, toastr) {
    //         if (!$scope.type.type) {
    //             $scope.type.type = "text";
    //         }
    //         $scope.json = JsonService;
    //         $scope.tags = {};
    //         $scope.model = [];
    //         $scope.tagNgModel = {};
    //         // $scope.boxModel
    //         $scope.tinymceOptions = {
    //             selector: 'textarea',
    //             height: 500,
    //             theme: 'modern',
    //             plugins: [
    //                 'advlist autolink lists link image charmap print preview hr anchor pagebreak',
    //                 'searchreplace wordcount visualblocks visualchars code fullscreen',
    //                 'insertdatetime media nonbreaking save table contextmenu directionality',
    //                 'emoticons template paste textcolor colorpicker textpattern imagetools '
    //             ],
    //             toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    //             toolbar2: 'print preview media | forecolor backcolor emoticons',
    //             image_advtab: true,
    //             readonly: $scope.type.disabled,
    //             templates: [{
    //                 title: 'Test template 1',
    //                 content: 'Test 1'
    //             }, {
    //                 title: 'Test template 2',
    //                 content: 'Test 2'
    //             }],
    //             content_css: [
    //                 '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
    //                 '//www.tinymce.com/css/codepen.min.css'
    //             ]
    //         };
    //         if ($scope.type.validation) {
    //             var isRequired = _.findIndex($scope.type.validation, function (n) {
    //                 return n == "required";
    //             });
    //             if (isRequired >= 0) {
    //                 $scope.type.required = true;
    //             }
    //         }
    //         $scope.form = {};
    //         if ($scope.value && $scope.value[$scope.type.tableRef]) {
    //             $scope.form.model = $scope.value[$scope.type.tableRef];
    //         }

    //         $scope.template = "views/field/" + $scope.type.type + ".html";

    //         // BOX
    //         if ($scope.type.type == "date") {
    //             $scope.formData[$scope.type.tableRef] = moment($scope.formData[$scope.type.tableRef]).toDate();
    //         }
    //         if ($scope.type.type == "password") {
    //             $scope.formData[$scope.type.tableRef] = "";
    //         }
    //         if ($scope.type.type == "youtube") {
    //             $scope.youtube = {};

    //             function getJsonFromUrl(string) {
    //                 var obj = _.split(string, '?');
    //                 var returnval = {};
    //                 if (obj.length >= 2) {
    //                     obj = _.split(obj[1], '&');
    //                     _.each(obj, function (n) {
    //                         var newn = _.split(n, "=");
    //                         returnval[newn[0]] = newn[1];
    //                         return;
    //                     });
    //                     return returnval;
    //                 }

    //             }
    //             $scope.changeYoutubeUrl = function (string) {
    //                 if (string) {
    //                     $scope.formData[$scope.type.tableRef] = "";
    //                     var result = getJsonFromUrl(string);
    //                     console.log(result);
    //                     if (result && result.v) {
    //                         $scope.formData[$scope.type.tableRef] = result.v;
    //                     }
    //                 }

    //             };
    //         }
    //         if ($scope.type.type == "box") {

    //             if (!_.isArray($scope.formData[$scope.type.tableRef]) && $scope.formData[$scope.type.tableRef] === '') {
    //                 $scope.formData[$scope.type.tableRef] = [];
    //                 $scope.model = [];
    //             } else {
    //                 if ($scope.formData[$scope.type.tableRef]) {
    //                     $scope.model = $scope.formData[$scope.type.tableRef];
    //                 }
    //             }
    //             $scope.search = {
    //                 text: ""
    //             };
    //         }
    //         $scope.state = "";
    //         $scope.createBox = function (state) {
    //             $scope.state = state;
    //             $scope.model.push({});
    //             $scope.editBox("Create", $scope.model[$scope.model.length - 1]);
    //         };
    //         $scope.editBox = function (state, data) {
    //             $scope.state = state;
    //             $scope.data = data;
    //             var modalInstance = $uibModal.open({
    //                 animation: $scope.animationsEnabled,
    //                 templateUrl: '/backend/views/modal/modal.html',
    //                 size: 'lg',
    //                 scope: $scope
    //             });
    //             $scope.close = function (value) {
    //                 callback(value);
    //                 modalInstance.close("cancel");
    //             };
    //         };
    //         $scope.deleteBox = function (index, data) {
    //             console.log(data);
    //             data.splice(index, 1);
    //         };

    //         //  TAGS STATIC AND FROM TABLE
    //         $scope.refreshTags = function (search) {
    //             if ($scope.type.url !== "") {
    //                 NavigationService.searchCall($scope.type.url, {
    //                     keyword: search
    //                 }, 1, function (data1) {
    //                     $scope.tags[$scope.type.tableRef] = data1.data.results;
    //                 });
    //             } else {
    //                 $scope.tags[$scope.type.tableRef] = $scope.type.dropDown;
    //             }
    //         };
    //         if ($scope.type.type == "tags") {
    //             $scope.refreshTags();
    //         }

    //         $scope.tagClicked = function (select, index) {
    //             if ($scope.type.fieldType === "array") {
    //                 $scope.formData[$scope.type.tableRef] = [];
    //                 _.each(select, function (n) {
    //                     $scope.formData[$scope.type.tableRef].push(n._id);
    //                 });
    //             } else {
    //                 $scope.formData[$scope.type.tableRef] = select;
    //             }
    //         };
    //     })

    .controller('LoginCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("login");
        $scope.menutitle = NavigationService.makeactive("Login");
        TemplateService.title = $scope.menutitle;
        $scope.currentHost = window.location.origin;
        console.log("******************inside login")
        // if ($stateParams.id) {
        //     if ($stateParams.id === "AccessNotAvailable") {
        //         toastr.error("You do not have access for the Backend.");
        //     } else {
        //         NavigationService.parseAccessToken($stateParams.id, function () {
        //             NavigationService.profile(function () {
        //                 $state.go("dashboard");
        //             }, function () {
        //                 $state.go("login");
        //             });
        //         });
        //     }
        // } else {
        //     NavigationService.removeAccessToken();
        // }
        // $scope.loginUser = function (formData) {
        //     NavigationService.apiCall("User/login", formData, function (data) {
        //         if (data.value === true) {
        //             $scope.profileDetails = data.data;
        //             NavigationService.parseAccessToken(data.data._id, function () {
        //                 NavigationService.profile(function () {
        //                     $scope.template.profile = data.data;
        //                     $state.go("dashboard");
        //                 }, function () {
        //                     $state.go("login");
        //                 });
        //             });
        //             console.log("profileDetails found successfully", $scope.profileDetails);
        //         } else {
        //             //  toastr.warning('Error submitting the form', 'Please try again');
        //         }
        //     });
        // }

        // $scope.logout = function () {
        //     NavigationService.removeAccessToken("", function () {
        //         $state.go("login");
        //     });
        //     $.jStorage.flush();
        // }

    })

    //     .controller('CountryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
    //         //Used to name the .html file
    //         $scope.template = TemplateService.changecontent("country-list");
    //         $scope.menutitle = NavigationService.makeactive("Country List");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();
    //         $scope.currentPage = $stateParams.page;
    //         var i = 0;
    //         $scope.search = {
    //             keyword: ""
    //         };
    //         if ($stateParams.keyword) {
    //             $scope.search.keyword = $stateParams.keyword;
    //         }
    //         $scope.showAllCountries = function (keywordChange) {
    //             $scope.totalItems = undefined;
    //             if (keywordChange) {
    //                 $scope.currentPage = 1;
    //             }
    //             NavigationService.searchCountry({
    //                 page: $scope.currentPage,
    //                 keyword: $scope.search.keyword
    //             }, ++i, function (data, ini) {
    //                 if (ini == i) {
    //                     $scope.countries = data.data.results;
    //                     $scope.totalItems = data.data.total;
    //                     $scope.maxRow = data.data.options.count;
    //                 }
    //             });
    //         };

    //         $scope.changePage = function (page) {
    //             var goTo = "country-list";
    //             if ($scope.search.keyword) {
    //                 goTo = "country-list";
    //             }
    //             $state.go(goTo, {
    //                 page: page,
    //                 keyword: $scope.search.keyword
    //             });
    //         };
    //         $scope.showAllCountries();
    //         $scope.deleteCountry = function (id) {
    //             globalfunction.confDel(function (value) {
    //                 console.log(value);
    //                 if (value) {
    //                     NavigationService.deleteCountry(id, function (data) {
    //                         if (data.value) {
    //                             $scope.showAllCountries();
    //                             toastr.success("Country deleted successfully.", "Country deleted");
    //                         } else {
    //                             toastr.error("There was an error while deleting country", "Country deleting error");
    //                         }
    //                     });
    //                 }
    //             });
    //         };
    //     })

    //     .controller('CreateCountryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
    //         //Used to name the .html file

    //         $scope.template = TemplateService.changecontent("country-detail");
    //         $scope.menutitle = NavigationService.makeactive("Country");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();

    //         $scope.header = {
    //             "name": "Create Country"
    //         };
    //         $scope.formData = {};
    //         $scope.saveCountry = function (formData) {
    //             console.log($scope.formData);
    //             NavigationService.countrySave($scope.formData, function (data) {
    //                 if (data.value === true) {
    //                     $state.go('country-list');
    //                     toastr.success("Country " + formData.name + " created successfully.", "Country Created");
    //                 } else {
    //                     toastr.error("Country creation failed.", "Country creation error");
    //                 }
    //             });
    //         };

    //     })

    //     .controller('CreateAssignmentCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams, $uibModal) {
    //         //Used to name the .html file

    //         $scope.template = TemplateService.changecontent("assignment-detail");
    //         $scope.menutitle = NavigationService.makeactive("Assignment");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();

    //         $scope.header = {
    //             "name": "Create Assignment"
    //         };
    //         $scope.formData = {};
    //         $scope.formData.status = true;
    //         $scope.formData.invoice = [];
    //         $scope.formData.products = [];
    //         $scope.formData.LRs = [];
    //         $scope.formData.vehicleNumber = [];
    //         $scope.formData.others = [];
    //         $scope.formData.shareWith = [];
    //         $scope.modalData = {};
    //         $scope.modalIndex = "";
    //         $scope.wholeObj = [];
    //         $scope.addModels = function (dataArray, data) {
    //             dataArray.push(data);
    //         };

    //         // NavigationService.searchNatureLoss(function(data) {
    //         //     $scope.natureLoss = data.data.results;
    //         // });

    //         $scope.refreshShareWith = function (data, office) {
    //             var formdata = {};
    //             formdata.search = data;
    //             formdata.filter = {
    //                 "postedAt": office
    //             };
    //             NavigationService.searchEmployee(formdata, 1, function (data) {
    //                 $scope.shareWith = data.data.results;
    //             });
    //         };
    //         $scope.refreshNature = function (data, causeloss) {
    //             var formdata = {};
    //             formdata.search = data;
    //             formdata.filter = {
    //                 "_id": causeloss
    //             };
    //             NavigationService.getNatureLoss(formdata, 1, function (data) {
    //                 $scope.natureLoss = data.data.results;
    //             });
    //         };

    //         $scope.addModal = function (filename, index, holdobj, data, current, wholeObj) {
    //             if (index !== "") {
    //                 $scope.modalData = data;
    //                 $scope.modalIndex = index;
    //             } else {
    //                 $scope.modalData = {};
    //                 $scope.modalIndex = "";
    //             }
    //             $scope.wholeObj = wholeObj;
    //             $scope.current = current;
    //             $scope.holdObject = holdobj;
    //             var modalInstance = $uibModal.open({
    //                 scope: $scope,
    //                 templateUrl: 'views/modal/' + filename + '.html',
    //                 size: 'lg'
    //             });
    //         };

    //         $scope.addElements = function (moddata) {
    //             if ($scope.modalIndex !== "") {
    //                 $scope.wholeObj[$scope.modalIndex] = moddata;
    //             } else {
    //                 $scope.newjson = moddata;
    //                 var a = moddata;
    //                 switch ($scope.holdObject) {
    //                     case "invoice":
    //                         {
    //                             var newmod = a.invoiceNumber.split(',');
    //                             _.each(newmod, function (n) {
    //                                 $scope.newjson.invoiceNumber = n;
    //                                 $scope.wholeObj.push($scope.newjson);
    //                             });
    //                         }
    //                         break;
    //                     case "products":
    //                         {
    //                             var newmod1 = a.item.split(',');
    //                             _.each(newmod1, function (n) {
    //                                 $scope.newjson.item = n;
    //                                 $scope.wholeObj.push($scope.newjson);
    //                             });
    //                         }
    //                         break;
    //                     case "LRs":
    //                         var newmod2 = a.lrNumber.split(',');
    //                         _.each(newmod2, function (n) {
    //                             $scope.newjson.lrNumber = n;
    //                             $scope.wholeObj.push($scope.newjson);
    //                         });
    //                         break;
    //                     case "Vehicle":
    //                         var newmod3 = a.vehicleNumber.split(',');
    //                         _.each(newmod3, function (n) {
    //                             $scope.newjson.vehicleNumber = n;
    //                             $scope.wholeObj.push($scope.newjson);
    //                         });
    //                         break;

    //                     default:
    //                         {
    //                             $scope.wholeObj.push($scope.newjson);
    //                         }

    //                 }

    //             }
    //         };

    //         $scope.deleteElements = function (index, data) {
    //             data.splice(index, 1);
    //         };


    //         $scope.submit = function (formData) {
    //             console.log($scope.formData);
    //             NavigationService.assignmentSave($scope.formData, function (data) {
    //                 if (data.value === true) {
    //                     $state.go('assignment-list');
    //                     toastr.success("Assignment " + formData.name + " created successfully.", "Assignment Created");
    //                 } else {
    //                     toastr.error("Assignment creation failed.", "Assignment creation error");
    //                 }
    //             });
    //         };

    //     })

    //     .controller('EditAssignmentCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams, $uibModal) {
    //         //Used to name the .html file

    //         $scope.template = TemplateService.changecontent("assignment-detail");
    //         $scope.menutitle = NavigationService.makeactive("Assignment");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();

    //         $scope.header = {
    //             "name": "Edit Assignment"
    //         };
    //         $scope.formData = {};
    //         $scope.formData.status = true;
    //         $scope.formData.invoice = [];
    //         $scope.formData.products = [];
    //         $scope.formData.LRs = [];
    //         $scope.formData.vehicleNumber = [];
    //         $scope.formData.others = [];
    //         $scope.formData.shareWith = [];
    //         $scope.modalData = {};
    //         $scope.modalIndex = "";
    //         $scope.wholeObj = [];
    //         $scope.addModels = function (dataArray, data) {
    //             dataArray.push(data);
    //         };

    //         NavigationService.getOneModel("Assignment", $stateParams.id, function (data) {
    //             $scope.formData = data.data;
    //             $scope.formData.dateOfIntimation = new Date(data.data.dateOfIntimation);
    //             $scope.formData.dateOfAppointment = new Date(data.data.dateOfAppointment);
    //             $scope.formData.country = data.data.city.district.state.zone.country._id;
    //             $scope.formData.zone = data.data.city.district.state.zone._id;
    //             $scope.formData.state = data.data.city.district.state._id;
    //             $scope.formData.district = data.data.city.district._id;
    //             $scope.formData.city = data.data.city._id;
    //             $scope.formData.insuredOfficer = data.data.insuredOfficer._id;
    //             console.log($scope.formData.policyDoc);
    //             console.log($scope.formData);
    //         });


    //         $scope.refreshShareWith = function (data, office) {
    //             var formdata = {};
    //             formdata.search = data;
    //             formdata.filter = {
    //                 "postedAt": office
    //             };
    //             NavigationService.searchEmployee(formdata, 1, function (data) {
    //                 $scope.shareWith = data.data.results;
    //             });
    //         };
    //         $scope.refreshNature = function (data, causeloss) {
    //             var formdata = {};
    //             formdata.search = data;
    //             formdata.filter = {
    //                 "_id": causeloss
    //             };
    //             NavigationService.getNatureLoss(formdata, 1, function (data) {
    //                 $scope.natureLoss = data.data.results;
    //             });
    //         };

    //         $scope.addModal = function (filename, index, holdobj, data, current, wholeObj) {
    //             if (index !== "") {
    //                 $scope.modalData = data;
    //                 $scope.modalIndex = index;
    //             } else {
    //                 $scope.modalData = {};
    //                 $scope.modalIndex = "";
    //             }
    //             $scope.wholeObj = wholeObj;
    //             $scope.current = current;
    //             $scope.holdObject = holdobj;
    //             var modalInstance = $uibModal.open({
    //                 scope: $scope,
    //                 templateUrl: 'views/modal/' + filename + '.html',
    //                 size: 'lg'
    //             });
    //         };

    //         $scope.addElements = function (moddata) {
    //             if ($scope.modalIndex !== "") {
    //                 $scope.wholeObj[$scope.modalIndex] = moddata;
    //             } else {
    //                 $scope.newjson = moddata;
    //                 var a = moddata;
    //                 switch ($scope.holdObject) {
    //                     case "invoice":
    //                         {
    //                             var newmod = a.invoiceNumber.split(',');
    //                             _.each(newmod, function (n) {
    //                                 $scope.newjson.invoiceNumber = n;
    //                                 $scope.wholeObj.push($scope.newjson);
    //                             });
    //                         }
    //                         break;
    //                     case "products":
    //                         {
    //                             var newmod1 = a.item.split(',');
    //                             _.each(newmod1, function (n) {
    //                                 $scope.newjson.item = n;
    //                                 $scope.wholeObj.push($scope.newjson);
    //                             });
    //                         }
    //                         break;
    //                     case "LRs":
    //                         var newmod2 = a.lrNumber.split(',');
    //                         _.each(newmod2, function (n) {
    //                             $scope.newjson.lrNumber = n;
    //                             $scope.wholeObj.push($scope.newjson);
    //                         });
    //                         break;
    //                     case "Vehicle":
    //                         var newmod3 = a.vehicleNumber.split(',');
    //                         _.each(newmod3, function (n) {
    //                             $scope.newjson.vehicleNumber = n;
    //                             $scope.wholeObj.push($scope.newjson);
    //                         });
    //                         break;

    //                     default:
    //                         {
    //                             $scope.wholeObj.push($scope.newjson);
    //                         }

    //                 }

    //             }
    //         };

    //         $scope.deleteElements = function (index, data) {
    //             data.splice(index, 1);
    //         };


    //         $scope.submit = function (formData) {
    //             console.log($scope.formData);
    //             NavigationService.assignmentSave($scope.formData, function (data) {
    //                 if (data.value === true) {
    //                     $state.go('assignment-list');
    //                     toastr.success("Assignment " + formData.name + " created successfully.", "Assignment Created");
    //                 } else {
    //                     toastr.error("Assignment creation failed.", "Assignment creation error");
    //                 }
    //             });
    //         };

    //     })

    //     .controller('EditCountryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
    //         //Used to name the .html file

    //         $scope.template = TemplateService.changecontent("country-detail");
    //         $scope.menutitle = NavigationService.makeactive("Country");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();

    //         $scope.header = {
    //             "name": "Edit Country"
    //         };

    //         NavigationService.getOneCountry($stateParams.id, function (data) {
    //             $scope.formData = data.data;
    //             console.log('$scope.oneCountry', $scope.oneCountry);

    //         });

    //         $scope.saveCountry = function (formValid) {
    //             NavigationService.countryEditSave($scope.formData, function (data) {
    //                 if (data.value === true) {
    //                     $state.go('country-list');
    //                     console.log("Check this one");
    //                     toastr.success("Country " + $scope.formData.name + " edited successfully.", "Country Edited");
    //                 } else {
    //                     toastr.error("Country edition failed.", "Country editing error");
    //                 }
    //             });
    //         };

    //     })

    //     .controller('SchemaCreatorCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
    //         //Used to name the .html file
    //         $scope.template = TemplateService.changecontent("schema-creator");
    //         $scope.menutitle = NavigationService.makeactive("Schema Creator");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();
    //         $scope.collectionTypes = ["Table View", "Table View Drag and Drop", "Grid View", "Grid View Drag and Drop"];
    //         $scope.schema = [{
    //             "schemaType": "Boolean",
    //             "Input1": "",
    //             "Input2": ""
    //         }, {
    //             "schemaType": "Color",
    //             "Input1": "",
    //             "Input2": ""
    //         }, {
    //             "schemaType": "Date",
    //             "Input1": "",
    //             "Input2": ""
    //         }, {
    //             "schemaType": "Email",
    //             "Input1": "",
    //             "Input2": ""
    //         }, {
    //             "schemaType": "File",
    //             "Input1": "MB Limit",
    //             "Input2": ""
    //         }, {
    //             "schemaType": "Image",
    //             "Input1": "pixel x",
    //             "Input2": "pixel y "
    //         }, {
    //             "schemaType": "Location",
    //             "Input1": "",
    //             "Input2": ""
    //         }, {
    //             "schemaType": "Mobile",
    //             "Input1": "",
    //             "Input2": ""
    //         }, {
    //             "schemaType": "Multiple Select",
    //             "Input1": "Enum",
    //             "Input2": ""
    //         }, {
    //             "schemaType": "Multiple Select From Table",
    //             "Input1": "Collection",
    //             "Input2": "Field"
    //         }, {
    //             "schemaType": "Number",
    //             "Input1": "min ",
    //             "Input2": "max"
    //         }, {
    //             "schemaType": "Single Select ",
    //             "Input1": "Enum",
    //             "Input2": ""
    //         }, {
    //             "schemaType": "Single Select From Table",
    //             "Input1": "Collection",
    //             "Input2": "Field"
    //         }, {
    //             "schemaType": "Telephone",
    //             "Input1": "",
    //             "Input2": ""
    //         }, {
    //             "schemaType": "Text",
    //             "Input1": "min length",
    //             "Input2": "max length"
    //         }, {
    //             "schemaType": "TextArea",
    //             "Input1": "min length",
    //             "Input2": "max length"
    //         }, {
    //             "schemaType": "URL",
    //             "Input1": "",
    //             "Input2": ""
    //         }, {
    //             "schemaType": "WYSIWYG",
    //             "Input1": "",
    //             "Input2": ""
    //         }, {
    //             "schemaType": "Youtube",
    //             "Input1": "",
    //             "Input2": ""
    //         }];


    //         $scope.inputTypes = [{
    //             value: '',
    //             name: 'Select type of input'
    //         }, {
    //             value: 'Text',
    //             name: 'Text'
    //         }, {
    //             value: 'Date',
    //             name: 'Date'
    //         }, {
    //             value: 'Textarea',
    //             name: 'Textarea'
    //         }];

    //         $scope.formData = {};
    //         $scope.formData.status = true;

    //         $scope.formData.forms = [{
    //             head: '',
    //             items: [{}, {}]
    //         }];

    //         $scope.addHead = function () {
    //             $scope.formData.forms.push({
    //                 head: $scope.formData.forms.length + 1,
    //                 items: [{}]
    //             });
    //         };
    //         $scope.removeHead = function (index) {
    //             if ($scope.formData.forms.length > 1) {
    //                 $scope.formData.forms.splice(index, 1);
    //             } else {
    //                 $scope.formData.forms = [{
    //                     head: '',
    //                     items: [{}, {}]
    //                 }];
    //             }
    //         };

    //         $scope.addItem = function (obj) {
    //             var index = $scope.formData.forms.indexOf(obj);
    //             $scope.formData.forms[index].items.push({});
    //         };

    //         $scope.removeItem = function (obj, indexItem) {
    //             var indexHead = $scope.formData.forms.indexOf(obj);
    //             if ($scope.formData.forms[indexHead].items.length > 1) {
    //                 $scope.formData.forms[indexHead].items.splice(indexItem, 1);
    //             } else {
    //                 $scope.formData.forms[indexHead].items = [{}];
    //             }
    //         };

    //     })

    //     .controller('ExcelUploadCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
    //         //Used to name the .html file
    //         $scope.template = TemplateService.changecontent("excel-upload");
    //         $scope.menutitle = NavigationService.makeactive("Excel Upload");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.navigation = NavigationService.getnav();
    //         $scope.form = {
    //             file: null,
    //             model: $stateParams.model
    //         };

    //         $scope.excelUploaded = function () {
    //             console.log("Excel is uploaded with name " + $scope.form.file);
    //             NavigationService.uploadExcel($scope.form, function (data) {
    //                 $scope.data = data.data;
    //             });
    //         };
    //     })

    .controller('login1ctrl', function ($scope, NavigationService, TemplateService, $uibModal, $stateParams, $state, toastr) {
        $scope.template = TemplateService;
        $scope.template = TemplateService;
        // var temp = $location.search();
        // console.log("inside else*****", temp);
        $scope.userID = {
            _id: $stateParams.userId
        };
        console.log("userId", $scope.userID)
        NavigationService.apiCallWithData("User/getOne", $scope.userID, function (data) {
            if (data.value == true) {
                NavigationService.parseAccessToken(data.data._id, function () {
                    NavigationService.profile(function () {
                        $scope.template.profile = data.data;
                        // $scope.name1 = data.data.name;
                        console.log(" $scope.template.profile", $scope.template.profile)
                        $state.go("dashboard");
                    }, function () {
                        $state.go("login");
                    });
                });
            }
        });


    })


    .controller('headerctrl', function ($scope, $location, NavigationService, TemplateService, $uibModal, $stateParams, $state, toastr) {
        $scope.template = TemplateService;

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $(window).scrollTop(0);
        });

        $scope.loginUser = function (info) {
            console.log(info);
            information = {};
            information.email = info.email1;
            information.password = info.password1;
            console.log("information for sending is", information);
            NavigationService.apiCallWithData("User/login", information, function (data) {
                if (data.value == true) {
                    NavigationService.parseAccessToken(data.data._id, function () {
                        NavigationService.profile(function () {
                            $scope.template.profile = data.data;
                            // $scope.name1 = data.data.name;
                            // console.log(" $scope.template.profile", $scope.name1)
                            $state.go("dashboard");
                        }, function () {
                            $state.go("login");
                        });
                    });
                } else {
                    toastr.error('Incorrect credentials');
                }
            });
        }
        if ($.jStorage.get("user")) {
            $scope.name1 = $.jStorage.get("user").name;
            $scope.acessLevel = $.jStorage.get("user").accessLevel;
        }
        $scope.logout = function (info) {
            $.jStorage.flush();
            $state.go("login");
        }
        $scope.forgotPassword = function () {
            $scope.forgotPwd = true;
            $scope.otpPwd = false;
            $scope.resetPwd = false;
            $scope.displayThanksBox = false;
            $scope.forgotPasswordModal = $uibModal.open({
                animation: true,
                templateUrl: 'views/modal/forgetpassword.html',
                scope: $scope
            });

        }
        $scope.verifyAndSendEmail = function (formdata) {

            console.log("dataForsendOtp", formdata);
            $scope.data = {
                email: formdata
            }
            console.log(" $scope.data********", $scope.data);

            NavigationService.apiCallWithData("User/sendOtp", $scope.data, function (data) {
                console.log("after sendotp excution", data)
                if (data.value == true) {
                    console.log("data.data._id****", data.data._id);
                    $scope.id = data.data._id;
                    console.log("data.data._id", $scope.id);

                    $scope.forgotPwd = false;
                    $scope.otpPwd = true
                    $scope.resetPwd = false;
                    $scope.displayThanksBox = false;
                    $scope.showotp = true;
                } else {
                    toastr.error('Incorrect email!');

                }
            });
        };
        $scope.resendOtp = function () {
            console.log(" $scope.data", $scope.data);
            NavigationService.apiCallWithData("User/sendOtp", $scope.data, function (data) {
                console.log("after sendotp excution", data)
                if (data.value == true) {
                    $scope.showotp = false;
                    console.log("data.data._id****", data.data._id);
                    $scope.id = data.data._id;
                    console.log("data.data._id", $scope.id);

                    $scope.forgotPwd = false;
                    $scope.otpPwd = true
                    $scope.resetPwd = false;
                    $scope.displayThanksBox = false;

                } else {
                    toastr.error('Incorrect email!');

                }
            });
        }

        $scope.checkOTP = function (data1) {

            console.log("inside check otp", data1);

            NavigationService.apiCallWithData("User/verifyOTPForResetPass", data1, function (data) {
                console.log("data is after verifyOTPForResetPass called", data);
                if (data.value == true) {
                    $scope.forgotPwd = false;
                    $scope.otpPwd = false;
                    $scope.resetPwd = true;
                    $scope.displayThanksBox = false;

                } else {
                    toastr.error('Incorrect OTP!');
                }
            });
        }
        $scope.resetPass = function (formdata) {
            console.log("inside restePassword", formdata);
            if (_.isEqual(formdata.password, formdata.forgotPassword)) {
                // $scope.id = $.jStorage.get("user")._id;
                console.log("inside restePassword user id is*******", $scope.id);
                $scope.data = {
                    _id: $scope.id,
                    password: formdata.password
                }
                NavigationService.apiCallWithData("User/Updatepassword", $scope.data, function (data1) {
                    console.log("doneFormDatadata", data1);
                    if (data1.value) {
                        $scope.forgotPwd = false;
                        $scope.otpPwd = false;
                        $scope.resetPwd = false;
                        $scope.displayThanksBox = true;

                    }
                });
            } else {
                toastr.error('Check password');
            }
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
        };
    });