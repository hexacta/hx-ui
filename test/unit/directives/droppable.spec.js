/*global beforeEach, describe, expect, inject, it, spyOn*/

describe('hxDroppable directive', function(){

	'use strict';

	beforeEach(module('hx-ui'));

	var $draggable, $droppable,
		$draggableScope, $droppableScope;

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
				start: function(){},
				stop: function(){}
			}
		};

		$draggable = $compile('<div data-hx-draggable="config.draggable" data-hx-draggable-model="config.model"></div>')($draggableScope);
		$droppable = $compile('<div data-hx-droppable="config.droppable"></div>')($droppableScope);
	}));

	it('should make the element droppable', function(){
		expect($droppable.data('ui-droppable')).toBeDefined();
	});

	it('should call the drop callback and pass the draggable', function (done) {
		spyOn($droppableScope.config.droppable, 'stop');

		$droppable.trigger('drop');
		setTimeout(function(){
			expect($droppableScope.config.droppable.stop).toHaveBeenCalledWith($draggableScope.config.model);
			done();
		}, 250);
	});

});
