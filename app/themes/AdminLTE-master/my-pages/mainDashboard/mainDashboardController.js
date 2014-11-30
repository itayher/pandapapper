'use strict';

/***********************************************/
/** To customize the grid use this controller **/
/***********************************************/
angular.module('backAnd.controllers')
    .controller('mainDashboardController', ['$scope', 'dataListService','$q', function ($scope, dataListService,$q) {

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
            $scope.filterOptionsInput = [{ "fieldName": "platform", "label": "Devices", "fieldType": "relation", "operator": "in", "value": "All", "selectOptions": [{ "name": "All", "value": "All" }, { "name": "IOS", "value": "%IOS%" }, { "name": "Android", "value": "%Android%" }
        , { "name": "(Empty)", "value": "[null]"}]
            }
       , { "fieldName": "country", "label": "Country", "fieldType": "relation", "operator": "in", "value": "All", "selectOptions":getCountriesOption(data[0])  }//
        ];
           
        });


        $scope.showFilter = true;

        $scope.$on('onfilter', function (event, filterOptionsOutput, filterScope) {
            $scope.filterScope = filterScope;
            $scope.filterOptions = filterOptionsOutput;

        });
    }
])
