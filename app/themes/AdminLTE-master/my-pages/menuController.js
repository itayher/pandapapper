'use strict';

/***********************************************/
/** Use this controller to customize the menu **/
/***********************************************/

angular.module('backAnd.controllers')
.controller('myMenuController', ['$scope', 'Global', '$compile', 'configService', 'menuService', '$timeout', '$rootScope', '$http', '$location', '$route',
    function ($scope, Global, $compile, configService, menuService, $timeout, $rootScope, $http, $location, $route) {


        /* Uncomment to see an example of how to add your own menu item  */
        $scope.$on('appConfigCompleted', function (event, data) {
            //this example adds a menu item to page1
            if (data && data.workspace && data.workspace.pages && data.workspace.pages.length > 1) {
                //remove the automatic menu
             //  data.workspace.pages.splice(1,1);
                // add the new one
                //data.workspace.pages.splice(1, 0, { name: "cohort", partType: "dashboard" });
                data.workspace.pages.splice(1, 0, { name: "mainDashboard", partType: "dashboard" });
               
            }
        })

        /*  Uncomment to see an example of how to navigate when menu item is selected  */
        $scope.$on('menuItemSelected', function (event, data) {
            /*  this example navigates to page1 see the routines at \themes\AdminLTE-master\backand\js\app.js */
            if (data.name == 'mainDashboard')
                $location.path("/mainDashboard");
            //if (data.name == 'demoDashboard')
            //    $location.path("/demoDashboard");

            
        })
        
    }
])
