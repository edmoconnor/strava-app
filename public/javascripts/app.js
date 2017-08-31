var app = angular.module('myapp', ['ngMap', 'fixed.table.header'])

.controller('mainController', function($scope, $http, NgMap) {

    $scope.init = function(token, id) {
        var stravaData = {token: token, id: id}
        var config = {
            params: stravaData,
            headers : {'Accept' : 'application/json'}
        };

        var athlete = function() {
            var promise = new Promise(function(resolve, reject){
                $http.get('/athlete', config).then(function(res) {
                    if(res.data) {
                        var atlt = JSON.parse(res.data);
                        $scope.athlete = atlt;
                        resolve(atlt);
                    }else{
                        reject(err);
                    }
                });
            });
            return promise;
        }
        
        var activity = function (){
            var promise = new Promise(function(resolve, reject){
                $http.get('/activity', config).then(function(res) {
                    if(res.data) {
                        var actv = JSON.parse(res.data);
                        $scope.activity = actv;
                        resolve(actv);
                    }else{
                        reject(err);
                    }
                });
            });
            return promise;
        }

        var stats = function (){
            var promise = new Promise(function(resolve, reject){
                $http.get('/stats', config).then(function(res) {
                    if(res.data) {
                        var stts = JSON.parse(res.data); 
                        $scope.stats = stts;
                        resolve(stts);
                    }else{
                        reject(err);
                    }
                });
            });
            return promise;
        }

        athlete()
        .then(activity)
        .then(stats);

    }

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
        
        var bounds = new google.maps.LatLngBounds();
        for (var i=0; i<path.length; i++) {
            var latlng = new google.maps.LatLng(path[i][0], path[i][1]);
            bounds.extend(latlng);
        }

        NgMap.getMap().then(function(map) {
            map.setCenter(bounds.getCenter());
            map.fitBounds(bounds);
        });
        return path;
    }

    $scope.selActivity=function(activity){
        $scope.selected_activity=activity;
    }

    $scope.isSelected=function(activity){
        return $scope.selected_activity===activity;
    }

})

