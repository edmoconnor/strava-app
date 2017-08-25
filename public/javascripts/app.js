var app = angular.module('myapp', ['ngMap'])

.controller('myCtrl', function($scope, $http, NgMap) {

    $scope.init = function(token, id) {
        var stravaData = {token: token, id: id}
        var config = {
            params: stravaData,
            headers : {'Accept' : 'application/json'}
        };
        
        $http.get('/data', config).then(function(res) {
            var data = JSON.parse(res.data);

            $scope.data = data;

            $scope.timeFormat = function (secs) {
                var hours = Math.floor(secs / (60 * 60));

                var divisor_for_minutes = secs % (60 * 60);
                var minutes = Math.floor(divisor_for_minutes / 60);
            
                var divisor_for_seconds = divisor_for_minutes % 60;
                var seconds = Math.ceil(divisor_for_seconds);
            
                var obj = hours + ":" + minutes + ":" + seconds
                return obj;
            }

            $scope.polypath = function(polypath){
                var path = [];
                for(var i = 1; i < polypath.path.length; i++){
                    path.push([polypath.path[i][1], polypath.path[i][0]])
                }
                var positions = path;
                var bounds = new google.maps.LatLngBounds();
                for (var i=0; i<positions.length; i++) {
                    var latlng = new google.maps.LatLng(positions[i][0], positions[i][1]);
                    bounds.extend(latlng);
                }

                NgMap.getMap().then(function(map) {
                    map.setCenter(bounds.getCenter());
                    map.fitBounds(bounds);
                });
                return path;
            }

        });
    }

    $scope.selActivity=function(activity){
        $scope.selected_activity=activity;
    }

    $scope.isSelected=function(activity){
        return $scope.selected_activity===activity;
    }

})

