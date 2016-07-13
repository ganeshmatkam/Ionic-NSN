/**
 * Created by Ganesh Matkam on 008 08 07 2016.
 */
(function (angular, undefined) {
  angular
    .module('invisionApp')

    .controller('HomeController', [
      'itemsService',
      '$ionicLoading',
      '$ionicSlideBoxDelegate',
      '$ionicPlatform',
      'appConfig',
      '$timeout',
      function (itemsSvc, $ionicLoading, $ionicSlideBoxDelegate, $ionicPlatform, appConfig, $timeout) {
        'use strict';

        var vm = this;

        vm.slider_posts = [];

        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });


        itemsSvc.getItems({
          'filters': {},
          'params': {'offset': 0, 'per_page': appConfig.maxSlidesAtHome}
        }).then(setSliderPosts)
          .finally(function () {
            $ionicLoading.hide();
            $ionicPlatform.ready(function(){
              if(window.analytics){
                var pr = $timeout(function(){
                  window.analytics.trackView('Home');
                  $timeout.cancel(pr);
                }, 500);
              }
            })
          });

        function setSliderPosts(response) {
          vm.slider_posts = vm.slider_posts.concat(response);
          $ionicSlideBoxDelegate.update();
        }
      }
    ]);

})(window.angular);
