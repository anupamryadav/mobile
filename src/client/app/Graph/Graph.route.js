(function() {
    'use strict';

    angular
        .module('app.Graph')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'Graph',
            config: {
                url: '/Graph',
                templateUrl: 'app/Graph/Graph.html',
                controller: 'GraphController',
                controllerAs: 'vm',
                title: 'Graph',
                settings: {
                    nav: 3,
                    content: '<i class="fa fa-lock"></i> Graph'
                }
            }
        }];
    }
})();