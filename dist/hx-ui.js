/**
 * @ngdoc module
 * @name hxDragDrop.
 *
 * Author: ivazquez@hexacta.com
 *
 * @description
 *
 */
angular.module('hx-ui', []);
/**
 * @ngdoc directive
 * @name HX-Draggable.
 *
 * Author: ivazquez@hexacta.com
 *
 * @description
 *
 */
angular.module('hx-ui').directive('hxDraggable', [
  '$parse',
  function ($parse) {
    'use strict';
    return {
      link: function ($scope, $iElement, $iAttr) {
        // Get the options object.
        // Caution: this could be shared between models!
        // Do not modify it!
        var options = $parse($iAttr.hxDraggable)($scope);
        // Get the model object.
        var model = $parse($iAttr.hxDraggableModel)($scope);
        var defaults = {};
        // Extend default with options.
        angular.extend(defaults, options);
        // Overwrite the handlers in order to call the ones defined
        // in options.
        [
          'start',
          'stop'
        ].forEach(function (handler) {
          defaults[handler] = function () {
            if (!options[handler]) {
              return;
            }
            $scope.$apply(function () {
              // Call the handler's callback with the current model.
              options[handler](model);
              return;
            });
            return;
          };
        });
        // Make the element draggable.
        $iElement.draggable(defaults);
        return;
      }
    };
  }
]);
/**
 * @ngdoc directive
 * @name HX-Droppable.
 *
 * Author: ivazquez@hexacta.com
 *
 * @description
 *
 */
angular.module('hx-ui').directive('hxDroppable', [
  '$parse',
  function ($parse) {
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
          if (!options.drop) {
            return;
          }
          $scope.$apply(function () {
            // Get the draggable's model object.
            var model = $parse(ui.draggable.attr('data-hx-draggable-model') || ui.draggable.attr('hx-draggable-model'))(ui.draggable.scope());
            // Call the handler, pass the model dropped and the $scope of the
            // droppable.
            options.drop(model, $scope);
            return;
          });
          return;
        };
        [
          'over',
          'out'
        ].forEach(function (handler) {
          defaults[handler] = function () {
            if (!options[handler]) {
              return;
            }
            $scope.$apply(function () {
              // Call the handler's callback.
              options[handler]();
              return;
            });
            return;
          };
        });
        // Make the element droppable.
        $iElement.droppable(defaults);
        return;
      }
    };
  }
]);