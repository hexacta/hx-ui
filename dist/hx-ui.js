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
        defaults.start = function () {
          options.start(model);
          $scope.$apply();
          return;
        };
        defaults.stop = function () {
          options.stop(model);
          $scope.$apply();
          return;
        };
        // Overwrite the helper if its value is 'multiple'.
        if (defaults.helper === 'multiple') {
          defaults.helper = defaults.getMultipleHelper;
        }
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
          // Get the draggable's model object.
          var model = $parse(ui.draggable.attr('data-hx-draggable-model') || ui.draggable.attr('hx-draggable-model'))(ui.draggable.scope());
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
  }
]);