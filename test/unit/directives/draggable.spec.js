/*global beforeEach, describe, expect, inject, it, spyOn*/

describe('hxDraggable directive', function(){

	'use strict';

	beforeEach(module('hx-ui'));

	var $element,
		$scope;

	beforeEach(inject(function ($compile, $rootScope) {
		$scope = $rootScope.$new();
		$scope.config = {
			model: {
				foo: 'bar'
			},
			draggable: {
				start: function(){},
				stop: function(){}
			}
		};

		$element = $compile('<div data-hx-draggable="config.draggable" data-hx-draggable-model="config.model"></div>')($scope);
	}));

	it('should make the element draggable', function(){
		expect($element.data('ui-draggable')).toBeDefined();
	});

	it('should call the start callback', function (done) {
		spyOn($scope.config.draggable, 'start');

		$element.trigger('dragstart');
		setTimeout(function(){
			expect($scope.config.draggable.start).toHaveBeenCalledWith($scope.config.model);
			done();
		}, 250);
	});

	it('should call the stop callback', function (done) {
		spyOn($scope.config.draggable, 'stop');

		$element.trigger('dragstop');
		setTimeout(function(){
			expect($scope.config.draggable.stop).toHaveBeenCalledWith($scope.config.model);
			done();
		}, 250);
	});

});
