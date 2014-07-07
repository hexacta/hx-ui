/*global beforeEach, describe, expect, inject, it, spyOn*/

describe('hxDraggable directive', function(){

	'use strict';

	beforeEach(module('hx-ui'));

	var $element, $scope, options;

	beforeEach(inject(function ($compile, $rootScope) {
		$scope = $rootScope.$new();
		$scope.config = {
			model: {
				foo: 'bar'
			},
			draggable: {
				drag: function(){},
				start: function(){},
				stop: function(){}
			}
		};

		$element = $compile('<div data-hx-draggable="config.draggable" data-hx-draggable-model="config.model"></div>')($scope);
		options = $element.data('ui-draggable').options;
	}));

	it('should make the element draggable', function(){
		expect($element.data('ui-draggable')).toBeDefined();
	});

	it('should call the start callback', function(){
		spyOn($scope.config.draggable, 'start');

		options.start();
		expect($scope.config.draggable.start).toHaveBeenCalledWith($scope.config.model);
	});

	it('should call the stop callback', function(){
		spyOn($scope.config.draggable, 'stop');

		options.stop();
		expect($scope.config.draggable.stop).toHaveBeenCalledWith($scope.config.model);
	});

	it('should call the drag callback', function(){
		spyOn($scope.config.draggable, 'drag');

		var event = {
				timeStamp: (new Date()).getTime()
			},
			ui = {
				position: {
					top: 234,
					left: 500
				}
			};

		options.drag(event, ui);
		expect($scope.config.draggable.drag).toHaveBeenCalledWith(event, ui);
	});

	describe('the model', function(){
		it('should be extended with $draggable.$enable and $draggable.$disable', function(){
			expect($scope.config.model.$draggable).toBeDefined();
			expect($scope.config.model.$draggable.$enable).toBeDefined();
			expect($scope.config.model.$draggable.$disable).toBeDefined();
		});

		describe('$draggable.$enable function', function(){
			beforeEach(function(){
				$scope.config.model.$draggable.$disable();

				// Assert initial state.
				expect(options.disabled).toBe(true);
			});

			it('should enable the element', function(){
				$scope.config.model.$draggable.$enable();

				expect(options.disabled).toBe(false);
			});
		});

		describe('$draggable.$disable function', function(){
			it('should disable the element', function(){
				$scope.config.model.$draggable.$disable();

				expect(options.disabled).toBe(true);
			});
		});
	});

});
