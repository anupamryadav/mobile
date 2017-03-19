(function() {
    'use strict';

    angular
        .module('app.Grid')
        .controller('GridController', GridController);

    GridController.$inject = ['logger', '$scope'];
    /* @ngInject */
    function GridController(logger, $scope) {
        var vm = this;
        vm.title = 'Grid';

        activate();

        function activate() {
            logger.info('Activated Grid View');
        }

        var columnDefs = [
            { headerName: "Make", field: "make" },
            { headerName: "Model", field: "model" },
            { headerName: "Price", field: "price" }
        ];

        var rowData = [
            { make: "Toyota", model: "Celica", price: 35000 },
            { make: "Ford", model: "Mondeo", price: 32000 },
            { make: "Porsche", model: "Boxter", price: 72000 }
        ];

        $scope.gridOptions = {
            columnDefs: columnDefs,
            rowData: rowData
        };
    }
})();