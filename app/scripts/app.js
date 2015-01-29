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

  .config(function ($routeProvider) {$routeProvider

      .when('/', {
        templateUrl: 'views/posts.html',
        controller: 'PostsCtrl'
      })

      .when('/newest', {
        templateUrl: 'views/newest.html',
        controller: 'PostsCtrl'
      })

      .when('/comments', {
        templateUrl: 'views/comments.html',
        controller: 'CommentsCtrl'
      })

      .when('/posts/:postId', {
        templateUrl: 'views/showpost.html',
        controller: 'PostViewCtrl'
      })

      .when('/submit', {
        templateUrl: 'views/submit.html',
        controller: 'SubmitCtrl'
      })

      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl',
        resolve: {
          user: function (Auth) {
            return Auth.resolveUser();
          }
        }
      })

      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl',
        resolve: {
          user: function (Auth) {
            return Auth.resolveUser();
          }
        }
      })

      .when('/users/:userId', {
        templateUrl: 'views/profile.html',
        controller: 'UserCtrl'
      })

      .otherwise({
        redirectTo: '/'
      });
  })

  .constant('FIREBASE_URL', 'https://slacker-news.firebaseio.com/')
  .constant("moment", moment);
