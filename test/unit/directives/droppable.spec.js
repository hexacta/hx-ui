/*global beforeEach, describe, expect, inject, it, spyOn*/

describe('hxDroppable directive', function(){

	'use strict';

	beforeEach(module('hx-ui'));

	var $draggable, $droppable,
		$draggableScope, $droppableScope,
		droppableOptions;

	beforeEach(inject(function ($compile, $rootScope) {
		// Use different scopes for testing.
		$draggableScope = $rootScope.$new();
		$draggableScope.config = {
			model: {
				foo: 'bar'
			},
			draggable: {
				start: function(){},
				stop: function(){}
			}
		};

		$droppableScope = $rootScope.$new();
		$droppableScope.config = {
			droppable: {
				drop: function(){}
			}
		};

		$draggable = $compile('<div data-hx-draggable="config.draggable" data-hx-draggable-model="config.model"></div>')($draggableScope);
		$droppable = $compile('<div data-hx-droppable="config.droppable"></div>')($droppableScope);
		droppableOptions = $droppable.data('ui-droppable').options;
	}));

	it('should make the element droppable', function(){
		expect($droppable.data('ui-droppable')).toBeDefined();
	});

	it('should call the drop callback and pass the draggable and the droppable $scope', function(){
		spyOn($droppableScope.config.droppable, 'drop');

		droppableOptions.drop({}, {draggable: $draggable});
		expect($droppableScope.config.droppable.drop).toHaveBeenCalledWith($draggableScope.config.model, $droppableScope);
	});

});
