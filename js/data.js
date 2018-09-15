var app = angular.module('httpApp', []);
        app.controller('httpController', function ($scope, $http) {
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
				$scope.pageSize = 14;
				$scope.numberOfPages=function(){
					return Math.ceil($scope.list.length/$scope.pageSize);                
    			}
				
				$scope.loadContent = function(id){
						window.location.href="tachchu.html?id="+id;
				}					
            });
        });
		app.filter('startFrom', function() {
    	return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
		