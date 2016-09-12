(function() {

    angular.module('ngCircularProgress', []).directive('ngCircularProgress', function () {       
        return {
            restrict: 'E',
            template: '<div class="circular-progress" data-percent="{{ percent }}">' +
                          '<div class="circular-progress-left">' +
                              '<span></span>' +
                          '</div>' +
                          '<div class="circular-progress-right">' +
                              '<span></span>' +
                          '</div>' +
                      '</div>',
            scope: { percent: '=' },
            link: function($scope, element, attrs) {  
                                
                var 
                    deg, sDeg, colors,
                    el = element[0],
                    ls = angular.element(el.querySelector('.circular-progress-left span')),
                    rs = angular.element(el.querySelector('.circular-progress-right span')),
                    sz = attrs.size || 50,
                    fs = Math.floor(sz / 5);
                    
                colors = (attrs.colors) ? attrs.colors.split(',') : [];
                colors[0] = (colors[0]) ? colors[0] : '#999999';
                colors[1] = (colors[1]) ? colors[1] : '#333333';
                colors[2] = (colors[2]) ? colors[2] : '#FFFFFF';
                
                angular.element(el.querySelector('.circular-progress')).css('width', sz).css('height', sz).css('font-size', fs).css('background-color', colors[0]).css('color', colors[1]);
                angular.element(el.querySelector('.circular-progress:before')).css('background-color', colors[2]);
                angular.element(el.querySelectorAll('.circular-progress span')).css('background-color', colors[1]);
                
                el.addEventListener('mouseover', function(evt) {
                    angular.element(el.querySelector('.circular-progress')).css('font-size', fs * 1.2);
                });
                
                el.addEventListener('mouseleave', function(evt) {
                    angular.element(el.querySelector('.circular-progress')).css('font-size', fs);
                });
                
                $scope.$watch('percent', function(newPercent, oldPercent){

                    if (newPercent > -1 && newPercent < 101) {
                        if(newPercent <= 50) {
                            deg = 180 - (newPercent / 100 * 360);
                           	sDeg = 'rotateZ(-' + deg + 'deg)';
                            ls.css('display','none');
                            rs.css('transform', sDeg).css('-webkit-transform', sDeg).css('-moz-transform', sDeg).css('msTransform', 'rotate(-' + deg + 'deg)');
                        } else {
                            deg = 180 - ((newPercent - 50) / 100 * 360);
                            sDeg = 'rotateZ(-' + deg + 'deg)';
                            ls.css('display','auto');
                            ls.css('transform', sDeg).css('-webkit-transform', sDeg).css('-moz-transform', sDeg).css('msTransform', 'rotate(-' + deg + 'deg)');
                            rs.css('transform', 'rotateZ(0deg)').css('-webkit-transform', 'rotateZ(0deg)').css( '-moz-transform', 'rotateZ(0deg)').css('msTransform', 'rotate(0deg)');
                        }
                    
                    } else {
                        console.error('Invalid percent!');
                    }
                });
            }
        }
    });
} ());
