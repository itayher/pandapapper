'use strict';

/***********************************************/
/** To customize the grid use this controller **/
/***********************************************/
angular.module('backAnd.controllers')
    .controller('cohortController', ['$scope', function ($scope) {
      
        $scope.filterOptionsInput = [{ "fieldName": "platform", "label": "Devices", "fieldType": "relation", "operator": "in", "value": "", "selectOptions": [{ "name": "", "value": "" }, { "name": "IOS", "value": "%IOS%" }, { "name": "Android", "value": "%Android%" }
        , { "name": "(Empty)", "value": "[null]"}]
        }
        // ,{"fieldName":"counties","label":"Counties","fieldType":"relation","operator":"in","value":"","selectOptions":[{"name":"","value":""},{"name":"US","value":"us"},{"name":"Israel","value":"israel"},{"name":"All","value":"all"},{"name":"(Empty)","value":"[null]"}]}
        // ,{"fieldName":"week","label":"Week","fieldType":"numeric","operator":"equals","value":""}
       ];
        $scope.showFilter = true;

        $scope.$on('onfilter', function (event, filterOptionsOutput, filterScope) {
            $scope.filterScope = filterScope;
            $scope.filterOptions = filterOptionsOutput;

        });
    }
])
