// var globalfunction = {};
angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', "jsonservicemod", 'ui.bootstrap', 'ui.select', 'ngAnimate', 'toastr', 'ngSanitize', 'angular-flexslider', 'ui.tinymce', 'imageupload', 'ngMap', 'toggle-switch', 'cfp.hotkeys', 'ui.sortable'])
// .run([function () {
//     mapboxgl.accessToken = 'pk.eyJ1IjoibmFpbWlrYW4iLCJhIjoiY2lraXJkOXFjMDA0OXdhbTYzNTE0b2NtbiJ9.O64XgZQHNHcV2gwNLN2a0Q';
// }])
firstapp

    .controller('DashboardCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("dashboard");
        $scope.menutitle = NavigationService.makeactive("Dashboard");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        // $scope.accessLevel = "user";
        // $scope.accessLevel = "admin";
        $scope.accessLevel = "vendor";
        // *************************************************chart for user**********************************************************************************************************
        //
        // Standard Chart Example
        //
        $scope.data1 = [
            [gd(2012, 1, 1), 7],
            [gd(2012, 1, 2), 6],
            [gd(2012, 1, 3), 4],
            [gd(2012, 1, 4), 8],
            [gd(2012, 1, 5), 9],
            [gd(2012, 1, 6), 7],
            [gd(2012, 1, 7), 5],
            [gd(2012, 1, 8), 4],
            [gd(2012, 1, 9), 7],
            [gd(2012, 1, 10), 8],
            [gd(2012, 1, 11), 9],
            [gd(2012, 1, 12), 6],
            [gd(2012, 1, 13), 4],
            [gd(2012, 1, 14), 5],
            [gd(2012, 1, 15), 11],
            [gd(2012, 1, 16), 8],
            [gd(2012, 1, 17), 8],
            [gd(2012, 1, 18), 11],
            [gd(2012, 1, 19), 11],
            [gd(2012, 1, 20), 6],
            [gd(2012, 1, 21), 6],
            [gd(2012, 1, 22), 8],
            [gd(2012, 1, 23), 11],
            [gd(2012, 1, 24), 13],
            [gd(2012, 1, 25), 7],
            [gd(2012, 1, 26), 9],
            [gd(2012, 1, 27), 9],
            [gd(2012, 1, 28), 8],
            [gd(2012, 1, 29), 5],
            [gd(2012, 1, 30), 8],
            [gd(2012, 1, 31), 25]
        ];
        $scope.data2 = [
            [gd(2012, 1, 1), 800],
            [gd(2012, 1, 2), 500],
            [gd(2012, 1, 3), 600],
            [gd(2012, 1, 4), 700],
            [gd(2012, 1, 5), 500],
            [gd(2012, 1, 6), 456],
            [gd(2012, 1, 7), 800],
            [gd(2012, 1, 8), 589],
            [gd(2012, 1, 9), 467],
            [gd(2012, 1, 10), 876],
            [gd(2012, 1, 11), 689],
            [gd(2012, 1, 12), 700],
            [gd(2012, 1, 13), 500],
            [gd(2012, 1, 14), 600],
            [gd(2012, 1, 15), 700],
            [gd(2012, 1, 16), 786],
            [gd(2012, 1, 17), 345],
            [gd(2012, 1, 18), 888],
            [gd(2012, 1, 19), 888],
            [gd(2012, 1, 20), 888],
            [gd(2012, 1, 21), 987],
            [gd(2012, 1, 22), 444],
            [gd(2012, 1, 23), 999],
            [gd(2012, 1, 24), 567],
            [gd(2012, 1, 25), 786],
            [gd(2012, 1, 26), 666],
            [gd(2012, 1, 27), 888],
            [gd(2012, 1, 28), 900],
            [gd(2012, 1, 29), 178],
            [gd(2012, 1, 30), 555],
            [gd(2012, 1, 31), 993]
        ];
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

            },
            {
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
                            },
                            {
                                opacity: 0.2
                            }
                        ]
                    }
                }
            }

        ];


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
                },
                {
                    position: "right",
                    color: "#d5d5d5",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: ' Arial',
                    axisLabelPadding: 67
                }
            ],
            legend: {
                noColumns: 1,
                labelBoxBorderColor: "#d5d5d5",
                position: "nw"
            }
        };

        function gd(year, month, day) {
            return new Date(year, month - 1, day).getTime();
        }

        //
        // Pie Chart Example
        //

        $scope.pieDataset = [{
                label: "Total Missions",
                data: 20,
                color: '#48b5d5',
            },
            {
                label: "Total CAD Requested",
                data: 30,
                color: '#82ddcb'
            },
            {
                label: "Total Amount Paid",
                data: 90,
                color: '#979fd2'
            },

        ];
        $scope.pieOptions = {
            series: {
                pie: {
                    innerRadius: 0.5,
                    show: true,
                    textinfo: "none"
                }
            },
            legend: {
                show: false
            },
            grid: {
                hoverable: true
            }
        };
        // *************************************************end of chart for user**********************************************************************************************************

        // *************************************************start of chart for Admin**********************************************************************************************************
        //
        // Standard Chart Example
        //
        $scope.data1 = [
            [gd(2012, 1, 1), 7],
            [gd(2012, 1, 2), 6],
            [gd(2012, 1, 3), 4],
            [gd(2012, 1, 4), 8],
            [gd(2012, 1, 5), 9],
            [gd(2012, 1, 6), 7],
            [gd(2012, 1, 7), 5],
            [gd(2012, 1, 8), 4],
            [gd(2012, 1, 9), 7],
            [gd(2012, 1, 10), 8],
            [gd(2012, 1, 11), 9],
            [gd(2012, 1, 12), 6],
            [gd(2012, 1, 13), 4],
            [gd(2012, 1, 14), 5],
            [gd(2012, 1, 15), 11],
            [gd(2012, 1, 16), 8],
            [gd(2012, 1, 17), 8],
            [gd(2012, 1, 18), 11],
            [gd(2012, 1, 19), 11],
            [gd(2012, 1, 20), 6],
            [gd(2012, 1, 21), 6],
            [gd(2012, 1, 22), 8],
            [gd(2012, 1, 23), 11],
            [gd(2012, 1, 24), 13],
            [gd(2012, 1, 25), 7],
            [gd(2012, 1, 26), 9],
            [gd(2012, 1, 27), 9],
            [gd(2012, 1, 28), 8],
            [gd(2012, 1, 29), 5],
            [gd(2012, 1, 30), 8],
            [gd(2012, 1, 31), 25]
        ];
        $scope.data2 = [
            [gd(2012, 1, 1), 21],
            [gd(2012, 1, 2), 13],
            [gd(2012, 1, 3), 25],
            [gd(2012, 1, 4), 50],
            [gd(2012, 1, 5), 50],
            [gd(2012, 1, 6), 45],
            [gd(2012, 1, 7), 80],
            [gd(2012, 1, 8), 58],
            [gd(2012, 1, 9), 46],
            [gd(2012, 1, 10), 86],
            [gd(2012, 1, 11), 69],
            [gd(2012, 1, 12), 70],
            [gd(2012, 1, 13), 50],
            [gd(2012, 1, 14), 60],
            [gd(2012, 1, 15), 70],
            [gd(2012, 1, 16), 78],
            [gd(2012, 1, 17), 34],
            [gd(2012, 1, 18), 88],
            [gd(2012, 1, 19), 88],
            [gd(2012, 1, 20), 88],
            [gd(2012, 1, 21), 98],
            [gd(2012, 1, 22), 44],
            [gd(2012, 1, 23), 99],
            [gd(2012, 1, 24), 56],
            [gd(2012, 1, 25), 78],
            [gd(2012, 1, 26), 66],
            [gd(2012, 1, 27), 88],
            [gd(2012, 1, 28), 90],
            [gd(2012, 1, 29), 17],
            [gd(2012, 1, 30), 55],
            [gd(2012, 1, 31), 99]
        ];
        $scope.dataset = [{
                label: "Internal CAD",
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

            },
            {
                label: "Exterrnal CAD",
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
                            },
                            {
                                opacity: 0.2
                            }
                        ]
                    }
                }
            }

        ];


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
                },
                {
                    position: "right",
                    color: "#d5d5d5",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: ' Arial',
                    axisLabelPadding: 67
                }
            ],
            legend: {
                noColumns: 1,
                labelBoxBorderColor: "#d5d5d5",
                position: "nw"
            }
        };

        function gd(year, month, day) {
            return new Date(year, month - 1, day).getTime();
        }

        //
        // Pie Chart Example of order
        //

        $scope.pieDatasetRevenue = [{
                label: "CAD",
                data: 200,
                color: '#48b5d5',
            },
            {
                label: "DFM",
                data: 120,
                color: '#82ddcb'
            },
            {
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
                    textinfo: "none"
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
                data: 120,
                color: '#48b5d5',
            },
            {
                label: "DFM",
                data: 30,
                color: '#82ddcb'
            },
            {
                label: "DRONE",
                data: 90,
                color: '#979fd2'
            },

        ];
        $scope.pieOptionsOrder = {
            series: {
                pie: {
                    innerRadius: 0.5,
                    show: true,
                    textinfo: "none"
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
                data: 200,
                color: '#48b5d5',
            },
            {
                label: "DFM",
                data: 120,
                color: '#82ddcb'
            },
            {
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
                    textinfo: "none"
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
                label: "Total CAD Files",
                data: 120,
                color: '#48b5d5',
            },
            {
                label: "Completed CAD Files",
                data: 30,
                color: '#82ddcb'
            },
            {
                label: "Incomplete CAD Files",
                data: 90,
                color: '#979fd2'
            },

        ];
        $scope.pieOptionsCad = {
            series: {
                pie: {
                    innerRadius: 0.5,
                    show: true,
                    textinfo: "none"
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
                label: "Total Earning",
                data: 20,
                color: '#48b5d5',
            },
            {
                label: "Paid",
                data: 120,
                color: '#82ddcb'
            },
            {
                label: "Balance",
                data: 50,
                color: '#979fd2'
            },

        ];
        $scope.pieOptionsMonth = {
            series: {
                pie: {
                    innerRadius: 0.5,
                    show: true,
                    textinfo: "none"
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

    })

    .controller('ProductDetailCtrl', function ($scope, $stateParams, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("product-detail");
        $scope.menutitle = NavigationService.makeactive("ProductDetail");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        // $scope.accessLevel = "user";
        $scope.accessLevel = "admin";

        $scope._id = {
            _id: $stateParams.productId
        };
        console.log("id is", $scope._id)
        NavigationService.apiCallWithData("Products/getProduct", $scope._id, function (data) {

            $scope.productInfo = data.data;
            console.log("data is*****", $scope.productInfo);


        });


    })
    .controller('TicketHistoryCtrl', function ($scope, $stateParams, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("ticket-history");
        $scope.menutitle = NavigationService.makeactive("TicketHistory");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        var ticket = {};
        ticket._id = $stateParams.ticketId;
        NavigationService.apiCallWithData("Ticket/getOne", ticket, function (data) {
            if (data.value == true) {
                $scope.ticket = data.data;
                console.log("ticketdata is", $scope.ticket)
            }
        });
    })

    .controller('SupportCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("support");
        $scope.menutitle = NavigationService.makeactive("Support");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.accessLevel = "user";
        // $scope.accessLevel = "admin";
        $scope.formData = {
            user: "59b8cf1fcae2b004106453aa"
        }
        NavigationService.apiCallWithData("Ticket/getTicketUser", $scope.formData, function (data2) {

            $scope.ticketInfo = data2.data;
            console.log("****data is**********************", data2);
            console.log("****data is**********************", $scope.ticketInfo);

        });


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
            //  console.log("changePage: ", page);
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
                if (keywordChange) {}
                NavigationService.searchCall("Ticket/getAllTickets", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword,
                        count: $scope.maxCount
                    }, ++i,
                    function (data, ini) {
                        //  console.log("Data: ", data);
                        if (ini == i) {
                            $scope.allTicketData = data.data.results;
                            $scope.totalItems = data.data.total;
                            $scope.maxRow = data.data.options.count;
                        }
                    });
            } else {
                $scope.totalItems = undefined;
                if (keywordChange) {}
                NavigationService.searchCall("Ticket/getAllTickets", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword
                    }, ++i,
                    function (data, ini) {
                        //  console.log("Data: ", data);
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

        //pagination end

    })

    .controller('MissionsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("missions");
        $scope.menutitle = NavigationService.makeactive("Missions");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.accessLevel = "user";
        // $scope.accessLevel = "admin";

        $scope.dataSize = function (id) {
            console.log("inside size function", id);
        }

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
            //  console.log("changePage: ", page);
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
                if (keywordChange) {}
                NavigationService.searchCall("Mission/getMission", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword,
                        count: $scope.maxCount
                    }, ++i,
                    function (data, ini) {
                        //  console.log("Data: ", data);
                        if (ini == i) {
                            $scope.allMissionData = data.data.results;
                            $scope.totalItems = data.data.total;
                            $scope.maxRow = data.data.options.count;
                        }
                    });
            } else {
                $scope.totalItems = undefined;
                if (keywordChange) {}
                NavigationService.searchCall("Mission/getMission", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword
                    }, ++i,
                    function (data, ini) {
                        //  console.log("Data: ", data);
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

        //pagination end


        $scope.formData = {
            user: "59b8cf1fcae2b004106453aa"
        }
        NavigationService.apiCallWithData("Mission/getMissionUser", $scope.formData, function (data2) {

            $scope.missionInfo = data2.data;
            console.log("****data is**********************", $scope.missionInfo);

        });

    })

    .controller('MissionsDetailsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("mission-details");
        $scope.menutitle = NavigationService.makeactive("MissionDetails");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        // $scope.accessLevel = "user";
        $scope.accessLevel = "admin";
        console.log("aaaaaaaaaaaaaa");
        var mission = {};
        mission._id = $stateParams.missionId;
        NavigationService.apiCallWithData("Mission/getSingleMissionData", mission, function (data) {
            if (data.value == true) {
                $scope.MissionData = data.data;

            }
        });

        $scope.getData = function () {
            console.log("aaaaaaaaaaaaaa");
        }
    })

    .controller('MailDetailCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("mail-detail");
        $scope.menutitle = NavigationService.makeactive("MailDetail");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })

    .controller('MailComposeCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("mail-compose");
        $scope.menutitle = NavigationService.makeactive("MailCompose");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.submitTicket = function (data1) {
            console.log("data in ticket", data1)
            $scope.data = {
                status: "active",
            }
            data1.status = "active"
            data1.user = "59b8cf1fcae2b004106453aa"
            NavigationService.apiCallWithData("Ticket/save", data1, function (data2) {

                $scope.data = data2.data;
                console.log("data is**********************", $scope.data);


            });
            $state.go('support')
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
    })

    .controller('InvoiceViewCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("invoice-view");
        $scope.menutitle = NavigationService.makeactive("InvoiceView");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })


    .controller('InvoiceCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("invoice");
        $scope.menutitle = NavigationService.makeactive("Invoice");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();


        $scope.formData = {
            user: "59b8cf1fcae2b004106453aa"
        }
        NavigationService.apiCallWithData("ProductOrders/getreciptData", $scope.formData, function (data) {
            $scope.productData = data.data;
            console.log("inside invoice ctrl", $scope.productData)


        })

        $scope.downloadInvoice = function () {
            console.log("************************");
            NavigationService.apiCallWithData("ProductOrders/getuser", $scope.formData, function (data) {
                $scope.productData = data.data;

                console.log("*(999999data is getuser*****", $scope.productData)
                window.open(adminurl + 'upload/readFileFromFolder', '_self');

                // window.open(adminurl + 'pdf/'+data.data.pdf,'_self');
            })
        }

        $scope.getInvoice = function () {
            console.log("************************");
            NavigationService.apiCallWithData("ProductOrders/getuser", $scope.formData, function (data) {
                $scope.productData = data.data;

                console.log("*(999999data is getuser*****", $scope.productData)
                //  window.open(adminurl + 'upload/readFile?file=' + data.data.pdf, '_self');

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
    })

    .controller('CreatemissionCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("create-mission");
        $scope.menutitle = NavigationService.makeactive("CreateMission");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();


        $scope.date = new Date();



        $scope.saveMission = function (missiondata) {
            missiondata.date = $scope.today
            console.log("Mission is$$$$$$", missiondata)



        }

    })
    .controller('CadfileDetailsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("cadfile-details");
        $scope.menutitle = NavigationService.makeactive("CadfileDetails");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.accessLevel = "user";
        // $scope.accessLevel = "admin";
        // $scope.accessLevel = "vendor";
        $scope.formData = {};
        var cad = {};
        cad._id = $stateParams.cadId;
        NavigationService.apiCallWithData("CadLineWork/getSingleCadData", cad, function (data) {
            if (data.value == true) {
                $scope.cadData = data.data;
            }
        });

        NavigationService.apiCallWithoutData("User/getVendor", function (data) {
            if (data.value == true) {
                $scope.allVendors = data.data.results;
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
            console.log("data", data);
            data.cad = $stateParams.cadId;
            NavigationService.apiCallWithData("VendorBill/save", data, function (data) {
                if (data.value == true) {
                    toastr.success("Payment in progress");
                    $state.go("cadfile-details");
                }
            });
        }

        $scope.uploadCadForAdmin = function (data) {
            data._id = $stateParams.cadId;
            NavigationService.apiCallWithData("CadLineWork/save", data, function (data) {
                if (data.value == true) {
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
                console.log("$scope.cadForVendorData", $scope.cadForVendorData);
            }
        });


        $scope.vendorPriceSet = function (data) {
            console.log("data", data);
            data._id = $stateParams.cadId;
            NavigationService.apiCallWithData("CadLineWork/save", data, function (data) {
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
    .controller('CadFileRequestCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("cadfile-request");
        $scope.menutitle = NavigationService.makeactive("CadFileRequest");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.accessLevel = "user";
        // $scope.accessLevel = "admin";
        // $scope.accessLevel = "vendor";

        //*****************user CadFileRequest start*****************************
        $scope.date = new Date();
        var formdata = {};
        formdata.user = $.jStorage.get("user")._id;
        console.log(" formdata._id", formdata)
        NavigationService.apiCallWithData("Mission/getMissionUser", formdata, function (data) {
            $scope.misssonInfo = data.data;
            console.log("*******data is*****", $scope.misssonInfo)
        })

        $scope.saveExtcadfile = function (data) {
            console.log("form: ", data);
        };
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&", formdata)
        NavigationService.apiCallWithData("CadLineWork/getCadbyeUser", formdata, function (data) {
            $scope.cadUserDetail = data.data;
            // console.log("*******cad file data is*****", $scope.cadUserDetail)
        })

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
            //  console.log("changePage: ", page);
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
                if (keywordChange) {}
                NavigationService.searchCall("CadLineWork/getCad", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword,
                        count: $scope.maxCount
                    }, ++i,
                    function (data, ini) {
                        //  console.log("Data: ", data);
                        if (ini == i) {
                            $scope.allCadLineData = data.data.results;
                            $scope.totalItems = data.data.total;
                            $scope.maxRow = data.data.options.count;
                        }
                    });
            } else {
                $scope.totalItems = undefined;
                if (keywordChange) {}
                NavigationService.searchCall("CadLineWork/getCad", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword
                    }, ++i,
                    function (data, ini) {
                        //  console.log("Data: ", data);
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


        $scope.cadOpen = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'views/modal/cad-internal.html',
                scope: $scope,
                size: 'sm',

            });
        };

        //vendor page

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
            //  console.log("changePage: ", page);
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
                if (keywordChange) {}
                NavigationService.searchCall("CadLineWork/getCadForVendor", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword,
                        count: $scope.maxCount,
                        vendorId: "59bcf455b27db70b15a1c86a" //replace it with jstorage ID
                    }, ++i,
                    function (data, ini) {
                        //  console.log("Data: ", data);
                        if (ini == i) {
                            $scope.allCadLineVendorData = data.data.results;
                            $scope.totalItems = data.data.total;
                            $scope.maxRow = data.data.options.count;
                        }
                    });
            } else {
                $scope.totalItems = undefined;
                if (keywordChange) {}
                NavigationService.searchCall("CadLineWork/getCadForVendor", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword,
                        vendorId: "59bcf455b27db70b15a1c86a" //replace it with jstorage ID
                    }, ++i,
                    function (data, ini) {
                        //  console.log("Data: ", data);
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


    })
    .controller('AccandSubCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("acc-and-sub");
        $scope.menutitle = NavigationService.makeactive("AccandSub");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.formData = {
            _id: "59bd025880214537e2d40dcc"
        }

        NavigationService.apiCallWithData("User/getOne", $scope.formData, function (data) {
            $scope.data = data.data;
            console.log("*******data is*****", $scope.data)
            if ($scope.data.accessLevel == "User") {
                console.log("inside if condition")
                $scope.accessLevel = {
                    user: "59bd025880214537e2d40dcc"
                }
                NavigationService.apiCallWithData("DFMSubscription/getDfm", $scope.accessLevel, function (data) {
                    $scope.dfmData = data.data
                    console.log("data is  dfa data isthe following*****", $scope.dfmData)

                });

            }

        });
        $scope.updateUser = function (data) {
            console.log("&&&777data is&&&&&&&&& ", data);
            NavigationService.apiCallWithData("User/Updateuser", data, function (data2) {
                $scope.data = data2;

                console.log("data is**********************", $scope.data);
                console.log("mini-----11111");
                NavigationService.apiCallWithData("User/getOne", $scope.formData, function (data) {
                    $scope.data = data.data;
                    $scope.dataid = data.data._id;
                    console.log("data is*****", $scope.data)

                });

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
        $scope.addCardDetail = function (data2) {

            console.log("&&&777data is &&&&&", data2);
            console.log(" $scope.dataid*********", $scope.dataid)
            data2._id = "59b8cf1fcae2b004106453aa";
            NavigationService.apiCallWithData("User/addCardDetails", data2, function (data) {
                $scope.data = data.data;
                console.log("data is*****", $scope.data)
                NavigationService.apiCallWithData("User/getOne", $scope.formData, function (data) {
                    $scope.data = data.data;
                    console.log("data is*****", $scope.data)
                });
            });
        }


        $scope.updatePassword = function (password) {

            console.log("&&&777data is &&&&&", password);
            $scope.data = {
                _id: "59b8cf1fcae2b004106453aa",
                password: password
            }
            console.log("&&&777data is &&&&&", $scope.data);
            NavigationService.apiCallWithData("User/save", $scope.data, function (data) {
                $scope.data = data.data;
            });
        }

        NavigationService.apiCallWithData("User/getDfmSub", $scope.formData, function (dfm) {
            console.log("dfmis$$$$$44", dfm)
        });


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

    .controller('ProductsPlansCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("products-plans");
        $scope.menutitle = NavigationService.makeactive("ProductsPlans");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

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
            //  console.log("changePage: ", page);
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
                if (keywordChange) {}
                NavigationService.searchCall("Products/getAllProducts", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword,
                        count: $scope.maxCount
                    }, ++i,
                    function (data, ini) {
                        //  console.log("Data: ", data);
                        if (ini == i) {
                            $scope.Products = data.data.results;
                            $scope.totalItems = data.data.total;
                            $scope.maxRow = data.data.options.count;
                        }
                    });
            } else {
                $scope.totalItems = undefined;
                if (keywordChange) {}
                NavigationService.searchCall("Products/getAllProducts", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword
                    }, ++i,
                    function (data, ini) {
                        //  console.log("Data: ", data);
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
            console.log("inside delete function", id);
            $scope._id = {
                _id: id
            };
            NavigationService.apiCallWithData("Products/delete", $scope._id, function (data) {

                $scope.product = data;
                console.log("data is", data);
            });
            $state.reload();
        }

        NavigationService.apiCallWithoutData("Products/search", function (data) {
            $scope.Products = data.data.results;
            $scope.Products1 = data;
            console.log("ABCD******", $scope.Products1);
        });

    })
    .controller('UsersCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("users");
        $scope.menutitle = NavigationService.makeactive("Users");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template = TemplateService.changecontent("users");
        $scope.menutitle = NavigationService.makeactive("Users");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        console.log("hello pranay");
        NavigationService.apiCallWithoutData("User/search", function (data) {

            $scope.userInfo = data.data.results;


        });
        console.log("hello saili");
    })
    .controller('EcommerceCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("ecommerce");
        $scope.menutitle = NavigationService.makeactive("Ecommerce");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

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
            //  console.log("changePage: ", page);
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
                if (keywordChange) {}
                NavigationService.searchCall("ProductOrders/getProductOrders", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword,
                        count: $scope.maxCount
                    }, ++i,
                    function (data, ini) {
                        //  console.log("Data: ", data);
                        if (ini == i) {
                            $scope.allOrderData = data.data.results;
                            $scope.totalItems = data.data.total;
                            $scope.maxRow = data.data.options.count;
                        }
                    });
            } else {
                $scope.totalItems = undefined;
                if (keywordChange) {}
                NavigationService.searchCall("ProductOrders/getProductOrders", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword
                    }, ++i,
                    function (data, ini) {
                        //  console.log("Data: ", data);
                        if (ini == i) {
                            $scope.allOrderData = data.data.results;
                            $scope.totalItems = data.data.total;
                            $scope.maxRow = data.data.options.count;
                        }
                    });
            }

        };
        //  JsonService.refreshView = $scope.getAllItems;
        $scope.getAllItems();

        //pagination end ecommerce

        $scope.downloadInvoice = function (data) {
            console.log("************************", data);
            window.open(adminurl + 'upload/readFileFromFolder?name=' + data, '_self');
        }

    })

    .controller('EditProductCtrl', function ($scope, $stateParams, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("edit-product");
        $scope.menutitle = NavigationService.makeactive("EditProduct");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope._id = {
            _id: $stateParams.productId
        };
        console.log("id is", $scope._id)
        NavigationService.apiCallWithData("Products/getProduct", $scope._id, function (data) {

            $scope.data = data.data;
            console.log("data is*****", $scope.data);

            $scope.updateProduct = function (data) {
                console.log("data is ", data);
                NavigationService.apiCallWithData("Products/UpdateProduct", data, function (data2) {

                    $scope.data = data2;
                    console.log("data is**********************", $scope.data);
                    console.log("mini-----11111");

                });
                $state.go('products-plans');
            }
        });

    })
    .controller('ReportsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("reports");
        $scope.menutitle = NavigationService.makeactive("Reports");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

    })

    .controller('VendorsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("vendors");
        $scope.menutitle = NavigationService.makeactive("Vendors");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.accessLevel = "admin";
        // $scope.accessLevel = "vendor";


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
            //  console.log("changePage: ", page);
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
                if (keywordChange) {}
                NavigationService.searchCall("User/getVendor", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword,
                        count: $scope.maxCount
                    }, ++i,
                    function (data, ini) {
                        //  console.log("Data: ", data);
                        if (ini == i) {
                            $scope.allVendors = data.data.results;
                            $scope.totalItems = data.data.total;
                            $scope.maxRow = data.data.options.count;
                        }
                    });
            } else {
                $scope.totalItems = undefined;
                if (keywordChange) {}
                NavigationService.searchCall("User/getVendor", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword
                    }, ++i,
                    function (data, ini) {
                        //  console.log("Data: ", data);
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
    })
    .controller('AddProductCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("add-product");
        $scope.menutitle = NavigationService.makeactive("AddProduct");
        TemplateService.title = $scope.menutitle;
        console.log("add product!!!!!");
        $scope.navigation = NavigationService.getnav();
        /**
         * summernoteText - used for Summernote plugin
         */
        this.summernoteText = [].join('');
        $scope.submitProduct = function (data) {
            NavigationService.apiCallWithData("Products/save", data, function (data2) {
                if (data2.value == true) {
                    $scope.data = data2;
                    console.log("&&&&&&&data is**********************", $scope.data);
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
    })



    .controller('EditVendorCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams) {

        //Used to name the .html file
        $scope.template = TemplateService.changecontent("edit-vendor");
        $scope.menutitle = NavigationService.makeactive("EditVendor");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();


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
    })
    .controller('SupportDetailsCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("support-details");
        $scope.menutitle = NavigationService.makeactive("SupportDetails");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        var ticketId = {};
        ticketId._id = $stateParams.ticketId;
        NavigationService.apiCallWithData("Ticket/getTicketData", ticketId, function (data) {
            if (data.value == true) {
                $scope.ticketData = data.data;
            }
        });



        $scope.saveReply = function (ticketData) {
            ticketData.replyDate = new Date();
            console.log("replyData", ticketData);
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

        $scope._id = {
            _id: $stateParams.userId
        };
        console.log("&&inside userctrl***", $scope._id);
        NavigationService.apiCallWithData("User/getUser", $scope._id, function (data) {

            $scope.UserDetailInfo = data.data;
            console.log("data is", $scope.data);


        });
    })
    // ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** FOR ADMIN ONLY ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** *
    // ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** FOR VENDOR ONLY ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ****//
    .controller('BillingCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("billing");
        $scope.menutitle = NavigationService.makeactive("Billing");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

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
            //  console.log("changePage: ", page);
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
                if (keywordChange) {}
                NavigationService.searchCall("VendorBill/getBill", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword,
                        count: $scope.maxCount
                    }, ++i,
                    function (data, ini) {
                        //  console.log("Data: ", data);
                        if (ini == i) {
                            $scope.allBillData = data.data.results;
                            $scope.totalItems = data.data.total;
                            $scope.maxRow = data.data.options.count;
                        }
                    });
            } else {
                $scope.totalItems = undefined;
                if (keywordChange) {}
                NavigationService.searchCall("VendorBill/getBill", {
                        page: $scope.currentPage,
                        keyword: $scope.search.keyword
                    }, ++i,
                    function (data, ini) {
                        //  console.log("Data: ", data);
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
        // if ($.jStorage.get("accessToken")) {

        // } else {
        //     $state.go("login");
        // }
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

    //     .controller('LoginCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
    //         //Used to name the .html file
    //         $scope.template = TemplateService.changecontent("login");
    //         $scope.menutitle = NavigationService.makeactive("Login");
    //         TemplateService.title = $scope.menutitle;
    //         $scope.currentHost = window.location.origin;
    //         // if ($stateParams.id) {
    //         //     if ($stateParams.id === "AccessNotAvailable") {
    //         //         toastr.error("You do not have access for the Backend.");
    //         //     } else {
    //         //         NavigationService.parseAccessToken($stateParams.id, function () {
    //         //             NavigationService.profile(function () {
    //         //                 $state.go("dashboard");
    //         //             }, function () {
    //         //                 $state.go("login");
    //         //             });
    //         //         });
    //         //     }
    //         // } else {
    //         //     NavigationService.removeAccessToken();
    //         // }
    //         $scope.login = function (formData) {
    //             console.log("login", formData);
    //             NavigationService.apiCall("User/login", formData, function (data) {
    //                 if (data.value === true) {
    //                     $scope.profileDetails = data.data;
    //                     NavigationService.parseAccessToken(data.data._id, function () {
    //                         NavigationService.profile(function () {
    //                             $scope.template.profile = data.data;
    //                             $state.go("dashboard");
    //                         }, function () {
    //                             $state.go("login");
    //                         });
    //                     });
    //                     console.log("profileDetails found successfully", $scope.profileDetails);
    //                 } else {
    //                     //  toastr.warning('Error submitting the form', 'Please try again');
    //                 }
    //             });
    //         }


    //     })

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

    .controller('headerctrl', function ($scope, NavigationService, TemplateService, $uibModal) {
        $scope.template = TemplateService;
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $(window).scrollTop(0);
        });
        console.log("$$$$$inside header ctrl*****************")
        $scope.loginUser = function (info) {
            console.log("inside login", info);
            NavigationService.apiCallWithData("User/login", info, function (data) {
                $scope.user = data.data;
                console.log("data is*****", $scope.user);
                $.jStorage.set("user", data.data);
            });

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