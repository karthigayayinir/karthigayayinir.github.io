app
.controller('ContactsController', ['storage', '$scope', '$window', function(storage, $scope, $window){
	$scope.contacts = [];
	if( $scope.contacts.length == 0){
		$scope.contacts = JSON.parse( storage.recall( 'contacts' ) );
	}
	$scope.deleteContact = function (index) {
		var areYouSure = $window.confirm('Are you sure about deleting this contact?');
		if( areYouSure ){
			$scope.contacts.splice( index, 1);
			storage.memorize( 'contacts', JSON.stringify( $scope.contacts ) );
		}
	}
}])
.controller('ContactController', ['storage', '$scope', '$routeParams', function(storage, $scope, $routeParams){
	$scope.contact = {};
	$scope.contacts = [];
	if( $scope.contacts.length == 0){
		$scope.contacts = JSON.parse( storage.recall( 'contacts' ) );
	}
	if( typeof $routeParams.index != 'undefined' ){
		$scope.contact = $scope.contacts[$routeParams.index];
	}
}])
.controller('EditContactController', ['storage', '$scope','$window','$location','$routeParams', function(storage, $scope, $window, $location, $routeParams){
	$scope.contact = {};
	$scope.contacts = [];
	$scope.editMode = false;
	if( $scope.contacts.length == 0 && storage.recall( 'contacts' ) !== null){
		$scope.contacts = JSON.parse( storage.recall( 'contacts' ) );
	}
	if( typeof $routeParams.index != 'undefined' ){
		console.log( 'Edit Mode' );
		$scope.editMode = true;
		$scope.contact = $scope.contacts[$routeParams.index];
	}
	$scope.addContact = function () {
		if( $scope.editMode ){
			$scope.contacts[$routeParams.index] = $scope.contact;
		} else {
			$scope.contacts.push( $scope.contact );
		}
		storage.memorize( 'contacts', JSON.stringify( $scope.contacts ) );
		contactForm.reset();
		$scope.contact = {};
		var more = $window.confirm('Want to Add more Contacts?');
		if( !more ){
			$location.path('/contacts');
		} else {
			if( $scope.editMode ){
				$location.path('/add');
			}
		}
	}
}])