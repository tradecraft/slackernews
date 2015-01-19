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
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/posts.html',
        controller: 'PostsCtrl'
      })
      .when('/posts/:postId', {
        templateUrl: 'views/showpost.html',
        controller: 'PostViewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('FIREBASE_URL', 'https://blistering-torch-4094.firebaseio.com/');
