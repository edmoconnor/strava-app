var app = angular.module('myapp', ['uiGmapgoogle-maps'])

.service('Map', function($q) {
    

    
})
.controller('myCtrl', function($scope, $http, $q, Map) {
//$scope.req1 = $http.get('myfile.json');
//$scope.req2 = $http.get('myfile2.json');
        $scope.init = function(stringifiedArray) {
            var info = JSON.parse(stringifiedArray);
            console.log('info', info);
        
        
            //$scope.req1 = $http.get('../data');
            $http.get('../data', info).then(function(res) {
                var data = JSON.parse(res.data);
                console.log('data', data[1].activity);
                console.log("qqqqqqqqqqqqqqqqq");
                $scope.data = data;

                $scope.scoper = function (time) {
                    $scope.seconds = time;
                    $scope.hours = parseInt($scope.seconds / 3600);
                    return $scope.hours
                }
                

                $scope.map = {
                    //id: "a945919933",
                    //resource_state: 2,
                    //summary_polyline: "youcIrdjd@_Uqd@qGyXoFrD}K`Ymc@l_@ii@|Em^d\ko@oGmQtPia@nJo\th@|[eh@ja@_KxPgRfq@vHb[i[r}@uSzGldBxOdv@l@`{B~JrTIjYjFl[tCzHtIF|KsUbUgEfCyFpJ|Bx@zq@wGbcAuOnVbKp[vSrUvFdVjSjKrElQuHjx@mJhd@xIr]_FtLaKn|@_Brc@xChj@kGzw@mCpPmOf\{C~f@x@|Sm`@bdAhf@`Nx^mStGYvFxHdHkStMrF|JiFlOpGzLaC`I`H|RyPfO~Qv\zOxSxw@ArYbFrN~j@_Cp]xMjb@rC~WwG}Z~q@mYzRkLlUsT|r@ab@duBeiAj{BkFhZ`Ex}@jRr\gD~iAe{@`wAgIhZyKxO|Vyk@hz@_wAxCalA{PuU_Fu|@fGcb@vhAyyBla@isBzTit@hLaUfY{RzZmq@gXlGmb@yCa^wMwh@~CuGyO@yYqSew@_^{PiNiQ_S`QaIkHyLfCiP{GoJlFoMsFaEvQaT}E_^bSge@mNn`@wcA|Ai|@tOs\lCiPfGow@qBecA`I_z@vI{\}I}ZtJme@nHa{@cE{NeSyI}GuWmSmU{JwYrOoXtGodAqAes@wb@nKeKrUiOaBoGsb@NcXmK{Vk@i{BwOat@sGydBdd@eq@`^jQvJhVnLpH",
                    
                    //summary_polyline: [53.2, -6.12],
                    //center: {
                            //latitude: data[1].activity[0].start_latlng[0],
                            //longitude: data[1].activity[0].start_latlng[1]
                    //},
                    zoom: 12
                };

            });
        }
        /*
        //$scope.req2 = $http.get('../activity');
        
        $scope.req2 = $http.get('../activity').then(function(res) {
            var data = JSON.parse(res.data);
            console.log(data);
            console.log(data[0]);
            $scope.activity = data;
     
        });
        
        $q.all([$scope.req1, $scope.req2]).then(function(data) {
           // data is array of your files
           //$scope.data = data[0];
           //$scope.activity = data[1];
           console.log($scope.data)
           if ( JSON.stringify(data[0]) === JSON.stringify(data[1])){
              console.log('is equal');
           }
        });
        */
        $scope.selActivity=function(activity){
            //console.log(activity);
            $scope.selected_activity=activity;
        }

        $scope.isSelected=function(activity){
            return $scope.selected_activity===activity;
        }
  


})
.filter('gps', function(){
    return function(input) {
        console.log('input :', input)
        var data = input;

        var output = {
            path: data,
            //levels: decodedLevels,
            strokeColor: "#808080",
            strokeOpacity: 1.0,
            strokeWeight: 2,
            editable: false,
                draggable: false,
                geodesic: true,
                visible: true,
        }
     
        console.log(output)

    }
    return output;   

});
