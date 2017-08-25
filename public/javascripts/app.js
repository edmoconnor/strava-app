var app = angular.module('myapp', ['uiGmapgoogle-maps'])

.controller('myCtrl', function($scope, $http) {

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
            
            $scope.models = [];
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

    $scope.selActivity=function(activity){
        $scope.selected_activity=activity;
    }

    $scope.isSelected=function(activity){
        return $scope.selected_activity===activity;
    }

})
.filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}]);
