'use strict';

angular.module('frontEndApp')
    .directive('returnPage', [ function() {
            return {
                restrict: 'E',
                scope: {},
                controller: ['$scope', '$location', 'apiModel', function($scope, $location, apiModel) {
                    $scope.model = apiModel;
                    $scope.model.queryParams = $location.search();
                    $scope.model.getPaymentDetails();
            }],
                templateUrl: '/js/return-page/template.html',
        };
    }]);