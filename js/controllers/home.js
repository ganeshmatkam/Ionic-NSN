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
      'appConfig',
      function (itemsSvc, $ionicLoading, $ionicSlideBoxDelegate, appConfig) {
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
          });

        function setSliderPosts(response) {
          vm.slider_posts = vm.slider_posts.concat(response);
          $ionicSlideBoxDelegate.update();
        }
      }
    ]);

})(window.angular);
