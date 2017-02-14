angular.module('myApp', ['ionic'])
.controller('lvCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.itemlist = [];

    $scope.currentPage = 1;

    // showapi_appid='value'  value是到我们个人中心我的应用里面 appid
    // showapi_sign='value'  value 也是个人中心我的应用里面的  密钥
    // type=29  请求段子
    // page=1   页数
    var url = 'http://route.showapi.com/255-1?showapi_appid=26444&showapi_sign=e6ed68d43d734b78892a649fedd90cbe&type=29&page=1'

    $http.get(url).success(function(data) {
        console.log(data);
        if (data && data.showapi_res_code == 0) {
            $scope.itemlist = data.showapi_res_body.pagebean.contentlist;
            $scope.currentPage = data.showapi_res_body.pagebean.currentPage;

        }
    })

    $scope.pullup=function(){
         $http.get(url).success(function(data) {
            console.log(data);
            if (data && data.showapi_res_code == 0) {
                $scope.itemlist = data.showapi_res_body.pagebean.contentlist;
                $scope.currentPage = data.showapi_res_body.pagebean.currentPage;
                 $scope.$broadcast("scroll.refreshComplete");
            }
        })
    }


    $scope.pulldown=function(){

        
        console.log($scope.currentPage);
         var url = "http://route.showapi.com/255-1?showapi_appid=26444&showapi_sign=e6ed68d43d734b78892a649fedd90cbe&type=29&page="+ $scope.currentPage+""
        $http.get(url).success(function(data) {
            console.log(data);
            if (data && data.showapi_res_code == 0) {
                $scope.itemlist =$scope.itemlist.concat( data.showapi_res_body.pagebean.contentlist);
                $scope.currentPage = data.showapi_res_body.pagebean.currentPage;
                $scope.$broadcast("scroll.infiniteScrollComplete");
                $scope.currentPage=$scope.currentPage+1;
                console.log($scope.currentPage,$scope.itemlist.length);
            }
        })
    }
}])