/* global app:true */
/* exported app */

'use strict';

/**
 * @ngdoc overview
 * @name slackernewsApp
 * @description
 * # slackernewsApp
 *
 * Main module of the application.
 */
var app = angular
  .module('slackernewsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/posts.html',
        controller: 'PostsCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
