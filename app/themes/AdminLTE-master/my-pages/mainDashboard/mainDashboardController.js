'use strict';

/***********************************************/
/** To customize the grid use this controller **/
/***********************************************/
angular.module('backAnd.controllers')
    .controller('mainDashboardController', ['$scope', 'dataListService', '$q', 'dataItemService', function ($scope, dataListService, $q, dataItemService) {
        $scope.filterOptions = null;
        $scope.updateFilterObject = function (len) {

            var today = new Date();
            var date = new Date();
            date = new Date(date.setDate(date.getDate() - len));
            $scope.filterOptionsInput[2].value = date;
            $scope.filterOptionsInput[3].value = today;
            $scope.filterOptionsInput[0].value = $scope.filterOptions[0].value;
            $scope.filterOptionsInput[1].value = $scope.filterOptions[1].value;
            $scope.filterOptionsInput[4].value = $scope.filterOptions[4].value;


            $scope.$emit('onfilter', $scope.filterOptionsInput);
        }

        // input: json from rest api
        // output: name value array
        var getCountriesOption = function (countries) {
            var options = [];
            options.push({ name: "All", value: "All" });
            angular.forEach(countries.data, function (country) {
                options.push({ name: country.name, value: country.name });
            })

            return options;
        };

        //use to sync async calls
        var countryOptions = $q.defer();



        dataListService.read({
            dataType: "view",
            viewName: "countries",
            withSelectOptions: false,
            filter: null,
            sort: null,
            search: null,
            pageSize: 500
        }, function (data) {
            countryOptions.resolve(data);
        });


        $q.all([countryOptions.promise]).then(function (data) {
            $scope.filterOptionsInput = [{
                "fieldName": "platform", "label": "Devices", "fieldType": "relation", "operator": "in", "value": "All", "selectOptions": [{ "name": "All", "value": "All" }, { "name": "IOS", "value": "IOS" }, { "name": "Android", "value": "Android" }]
            }
       , { "fieldName": "country", "label": "Country", "fieldType": "relation", "operator": "in", "value": "All", "selectOptions": getCountriesOption(data[0]) }//
       , { "fieldName": "fromdate", "label": "From Date", "fieldType": "date", "operator": "equals", "value": new Date('2014-11-01') }
       , { "fieldName": "todate", "label": "ToDate", "fieldType": "date", "operator": "equals", "value": new Date() }
        , { "fieldName": "app", "label": "App", "fieldType": "numeric", "operator": "equals", "value": 9 }
            ];

        });


        $scope.showFilter = true;

        $scope.$on('onfilter', function (event, filterOptionsOutput, filterScope) {
            $scope.filterScope = filterScope;
            $scope.filterOptions = filterOptionsOutput;
            $scope.setActiveUsers(70);
        });

        $scope.getChartFilterOptions = function () {
            if ($scope.filterOptionsInput) {

                if (!$scope.filterOptions)
                    $scope.filterOptions = angular.copy($scope.filterOptionsInput);
                var parts = [];
                angular.forEach($scope.filterOptions, function (item) {
                    var val = (angular.isDate(item.value)) ? $scope.getFilterDate(item.value) : item.value

                    parts.push(item.fieldName + "=" + val);
                });

                return parts.join("&");
            }
        }

        $scope.getFilterDate = function (fdate) {
            var date = new Date(fdate);
            if (date == "Invalid Date")
                return fdate;
            var dd = date.getDate();
            var mm = date.getMonth() + 1;//January is 0! 
            var yyyy = date.getFullYear();
            if (dd < 10) { dd = '0' + dd }
            if (mm < 10) { mm = '0' + mm }
            var filterDate = dd.toString() + mm.toString() + yyyy.toString();
            return filterDate;
        }

        $scope.$on('onStartChartLoad', function (event, chartScope, data) {
            $scope.chartScope = chartScope;
            var chartTotals = 0;
            for (var i = 0; i < data.Data[0].data.length; i++) {
                chartTotals = chartTotals + data.Data[0].data[i];
            };
            if (chartScope.chartId == 3)
                $scope.C3 = chartTotals;
            else if (chartScope.chartId == 21)
                $scope.C21 = chartTotals;
            else if (chartScope.chartId == 23)
                $scope.C23 = chartTotals;
            else if (chartScope.chartId == 72)
                $scope.X2 = chartTotals;

        });

        $scope.setActiveUsers = function (chartId) {
            var activeUser;
            dataItemService.read({
                // Need to change this to handle multiple tables on the same page
                dataType: "chart",
                id: chartId,
                qs: $scope.getChartFilterOptions()
            }, function (data) {
               // $scope.X70 = data;
                $scope.X70 = data.Data[0].data[0] == null ? 0 : data.Data[0].data[0];

               

            });
            return activeUser;
        }

    }]);
