var app = angular.module( 'contactApp', ['ngRoute'] );

app
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/contacts', {
          templateUrl: 'js/partials/contacts.html',
          controller: 'ContactsController'
        })
        .when('/contacts/:index', {
          templateUrl: 'js/partials/contact.html',
          controller: 'ContactController'
        })
        .when('/add', {
          templateUrl: 'js/partials/contact.new.html',
          controller: 'EditContactController'
        })
        .when('/edit/:index', {
          templateUrl: 'js/partials/contact.new.html',
          controller: 'EditContactController'
        })
        .otherwise({
          redirectTo: '/contacts'
        });
    }])
  .factory('storage', ['$window', function( $window ){
    return {
      memorize: function( key, value ){
        try{
          if( $window.Storage ){
            $window.sessionStorage.setItem( key, $window.JSON.stringify( value ) );
            return true;
          } else {
            return false;
          }
        } catch( error ){
          console.error( error, error.message );
        }
        return false;
      },
      recall: function( key ){
        try{
          if( $window.Storage ){
            return $window.JSON.parse( $window.sessionStorage.getItem( key ) )
          } else {
            return false;
          }
        } catch( error ){
          console.error( error, error.message );
        }
        return false;
      }
    }
  }])