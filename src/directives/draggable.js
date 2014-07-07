/**
 * @ngdoc directive
 * @name HX-Draggable.
 *
 * Author: ivazquez@hexacta.com
 *
 * @description
 *
 */
angular.module('hx-ui').directive('hxDraggable', function ($parse) {

	'use strict';

	return {
		link: function ($scope, $iElement, $iAttr) {

			// Get the options object.
			// Caution: this could be shared between models!
			// Do not modify it!
			var options = $parse($iAttr.hxDraggable)($scope);

			// Get the model object.
			var model = $parse($iAttr.hxDraggableModel)($scope);
			// Extend the model with enable/disable methods.
			if (!model.$draggable) {
				model.$draggable = {};
			}
			model.$draggable = {
				$enable: function(){
					$iElement.draggable('enable');
					return;
				},
				$disable: function(){
					$iElement.draggable('disable');
					return;
				}
			};

			var defaults = {};

			// Extend default with options.
			angular.extend(defaults, options);

			// Overwrite the handlers in order to call the ones defined
			// in options.
			['start', 'stop'].forEach(function (handler) {
				defaults[handler] = function(){
					if (!options[handler]) { return; }

					$scope.$apply(function(){
						// Call the handler's callback with the current model.
						options[handler](model);
						return;
					});

					return;
				};
			});

			// Overwrite drag handler.
			defaults.drag = function(event, ui){
				if (!options.drag) { return; }

				$scope.$apply(function(){
					options.drag(event, ui);
					return;
				});

				return;
			};

			// Make the element draggable.
			$iElement.draggable(defaults);

			return;

		}
	};

});
