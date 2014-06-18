/**
 * @ngdoc directive
 * @name HX-Droppable.
 *
 * Author: ivazquez@hexacta.com
 *
 * @description
 *
 */
angular.module('hx-ui').directive('hxDroppable', function ($parse) {

	'use strict';

	return {
		link: function ($scope, $iElement, $iAttr) {

			// Get the options object.
			// Caution: this could be shared between models!
			// Do not modify it!
			var options = $parse($iAttr.hxDroppable)($scope);

			var defaults = {};

			angular.extend(defaults, options);

			// Overwrite the handlers in order to call the ones defined
			// in options.
			defaults.drop = function (event, ui) {

				// Get the draggable's model object.
				var model = $parse(
					// Get the object name from the draggable-model attribute.
					ui.draggable.attr('data-hx-draggable-model') ||
					ui.draggable.attr('hx-draggable-model')
					// And evaluate it against the draggable's object scope.
				)(ui.draggable.scope());

				// Call the handler.
				options.drop(model);

				$scope.$apply();

				return;

			};

			// Make the element droppable.
			$iElement.droppable(defaults);

			return;

		}
	};

});
