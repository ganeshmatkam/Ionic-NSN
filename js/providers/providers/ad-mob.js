/**
 * SurfIT AdMob module
 */
angular.module('srfAdMob', [])

  .run([
    '$ionicPlatform',
    'appConfig',
    '$window',
    '$rootScope',
    'events',
    function ($ionicPlatform, appConfig, $window, $rootScope, events) {
      'use strict';

      function createBanner() {
        admob.createBannerView();
        window.analytics.startTrackerWithId(appConfig.GoogleAnalytics.id);
      }

      function createFullScreenAd() {
        try {
          admob.showInterstitial();
        } catch (e) {
        }
        ;
      }

      function AdMobInit() {
        if (appConfig.AdMob.enable && admob) {

          var AdMob = admob,
            platform = ionic.Platform.isAndroid() ? 'Android' : 'IOS',
            AdMobOptions = {
              publisherId: appConfig.AdMob[platform].banner,
              interstitialAdId: appConfig.AdMob[platform].interstitial,
              isTesting: appConfig.AdMob.isTesting,
              autoShowBanner: appConfig.AdMob.autoShow,
              adSize : admob.AD_SIZE.SMART_BANNER
            };
          admob.setOptions(AdMobOptions);

          createBanner();
        }
      }

      $ionicPlatform.ready(AdMobInit);
      $rootScope.$on(events.createBanner, createBanner);
      $rootScope.$on(events.createFullScreenAd, createFullScreenAd);
    }
  ]);
