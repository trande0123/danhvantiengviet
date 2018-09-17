var app = angular.module('httpApp', []);
        app.controller('httpController', function ($scope, $http) {
			$scope.idN = -1;
            $http.get("data/tiengviet.xml",
                    {
                        transformResponse: function (cnv) {
                            var x2js = new X2JS();
                            var aftCnv = x2js.xml_str2json(cnv);
                            return aftCnv;
                        }
                    })
            .success(function (response) {				
                $scope.list = response.listdata.tv;		
                console.log(response);	
				
				$scope.currentPage = 0;
				$scope.pageSize = 15;
				$scope.numberOfPages=function(){
					return Math.ceil($scope.list.length/$scope.pageSize);                
    			}
				
				$scope.loadContent = function(id){
						window.location.href="tapdoc.html?id="+id;
						
				}
				var idN = window.location.href.split('=')[1];
					angular.forEach($scope.list, function(value) {
						if(value.id === idN){
							$scope.data = value;
						}
					});
				
								
            });
        });
		app.filter('startFrom', function() {
    	return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
		
function setCookie(c_name, value) {
    localStorage[c_name] = value;
}
function getCookie(c_name) {
    return localStorage[c_name];
}