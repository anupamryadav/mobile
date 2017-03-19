(function() {
    'use strict';

    angular
        .module('app.Grid')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'Grid',
            config: {
                url: '/Grid',
                templateUrl: 'app/Grid/Grid.html',
                controller: 'GridController',
                controllerAs: 'vm',
                title: 'Grid',
                settings: {
                    nav: 4,
                    content: '<i class="fa fa-lock"></i> Grid'
                }
            }
        }];
    }
})();