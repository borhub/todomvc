/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
angular.module('todomvc', ['ngRoute'])
	.config(function ($routeProvider, $provide) {
		'use strict';

	    $provide.decorator("$exceptionHandler", ["$delegate", "$window", function($delegate, $window) {
	      return function (exception, cause) {
	        if ($window.trackJs) {
	          $window.trackJs.track(exception);
	        }
	        // (Optional) Pass the error through to the delegate formats it for the console
	        // $delegate(exception, cause);
	      };
	    }]);

		var routeConfig = {
			controller: 'TodoCtrl',
			templateUrl: 'todomvc-index.html',
			resolve: {
				store: function (todoStorage) {
					// Get the correct module (API or localStorage).
					return todoStorage.then(function (module) {
						module.get(); // Fetch the todo records in the background.
						return module;
					});
				}
			}
		};

		$routeProvider
			.when('/', routeConfig)
			.when('/:status', routeConfig)
			.otherwise({
				redirectTo: '/'
			});
	});
