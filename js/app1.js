angular.module('myApp', ['ionic','ngRoute','myService','ngSanitize'])
.config(['$routeProvider',function($routeProvider) {

    // console.log('config');
    // 配置路由规则
    $routeProvider
    .when('/all', {
        templateUrl: 'view/all.html',
        controller: 'allCtrl'
    })
    .when('/picture', {
        templateUrl: 'view/picture.html',
        controller: 'pictureCtrl'
    })
    .when('/text', {
        templateUrl: 'view/text.html',
        controller: 'textCtrl'
    })
    .when('/video', {
        templateUrl: 'view/video.html',
        controller: 'videoCtrl'
    })
    .when('/voice', {
        templateUrl: 'view/voice.html',
        controller: 'voiceCtrl'
    })
    .otherwise({
        redirectTo: '/voice'
    })
}])
.run(['$rootScope','$timeout', function($rootScope,$timeout) {

    // console.log('run');

    $rootScope.tabBtns = [
        {'name': '全部',  'isOk': false},
        {'name': '视频',  'isOk': false},
        {'name': '图片',  'isOk': false},
          {'name': '段子',  'isOk': true},
        {'name': '声音',  'isOk': false},
        {'name': '热门',  'isOk': false}
    ];

    $rootScope.change = function(index) {
        switch(index) {
            case 0:
                
                $rootScope.currentPage = 1;
                location.href = '#/all';
                break;
            case 1:
            
                $rootScope.currentPage = 1;
                location.href = '#/video';
                break;
            case 2:
              
                $rootScope.currentPage = 1;
                location.href = '#/picture';
                break;
            case 3:
            
                $rootScope.currentPage = 1;
                location.href = '#/text';
                
                break;
             case 4:
              
                $rootScope.currentPage = 1;
                location.href = '#/voice';
                
                break;
            default:
             
                $rootScope.currentPage = 1;
                location.href = '#/text';
                break;
        }

        angular.forEach($rootScope.tabBtns, function(btn, key) {
            // console.log("换色");
            btn.isOk = false;
            if (key == index) {
                btn.isOk = true;
            }
        })
    }
     $rootScope.nextpage=function(){
       $rootScope.flag=true;

       
        $rootScope.isload=true;
            $rootScope.currentPage= $rootScope.currentPage+1;
          $rootScope.load($rootScope.currentPage );
    }

    $rootScope.jump=function(i){
          $rootScope.isload=true;
        $rootScope.currentPage=i;
         $rootScope.load($rootScope.currentPage );

    }
$rootScope.currentPage = 1;

$rootScope.LoadMore=function(){
       
        $timeout(function() {
            
            // console.log( $rootScope.isload);
            $rootScope.flooer.end=$rootScope.flooer.end+4;
            $rootScope.foolerlist= $rootScope.itemlist.slice(0,$rootScope.flooer.end);
            $rootScope.$broadcast("scroll.infiniteScrollComplete");
            // console.log($rootScope.flooer.end,$rootScope.foolerlist.length);
            if($rootScope.flooer.end>=20)
                {
                   
                    $rootScope.isload=false;
                    // console.log( $rootScope.isload);
                    return;
                }
            
             //  console.log($rootScope.flooer.end,$rootScope.itemlist.length);
        }, 1500);

      
    }
}])

.controller('textCtrl', ['$scope','$rootScope', '$http','$ionicScrollDelegate','dataServ', 'btnAction', function($scope,$rootScope, $http,$ionicScrollDelegate,dataServ,btnAction) {


    $rootScope.itemlist = [];
    $rootScope.isload=false;
   

    // showapi_appid='value'  value是到我们个人中心我的应用里面 appid
    // showapi_sign='value'  value 也是个人中心我的应用里面的  密钥
    // type=29  请求段子
    // page=1   页数
    $rootScope.flag=false;
    $rootScope.pagenum=[1,2,3,4,5];

    var type=29;
  


    $rootScope.load=function(page){
    dataServ.get(type,page,$scope);
    btnAction.set();
    // console.log(1);
    $rootScope.isload=true;
    }
  
    $rootScope.load( $rootScope.currentPage);

    //  $rootScope.LoadMore=function(){
    //     flooer.end=flooer.end+5;
    //     $rootScope.foolerlist= $rootScope.itemlist.slice(0,flooer.end);
    //      $scope.$broadcast("scroll.infiniteScrollComplete");
    //      console.log($rootScope.foolerlist);
    // }
    

 //    $rootScope.load=function( page){
 //        console.log("111111")
 //        var url = "http://route.showapi.com/255-1?showapi_appid=26444&showapi_sign=e6ed68d43d734b78892a649fedd90cbe&type=29&page="+page+""
      
 //        $http.get(url).success(function(data) {

            
 //            if (data && data.showapi_res_code == 0) {
 //               $rootScope.itemlist = data.showapi_res_body.pagebean.contentlist;
 //               $rootScope.currentPage = data.showapi_res_body.pagebean.currentPage;
 //                console.log("当前页："+ $rootScope.currentPage);
 //              $rootScope.flag=false;
 //                 $ionicScrollDelegate.scrollTop(true);
 //                if(page>=4)
 //                {
 //                   $rootScope.pagenum=["1","...",page-2,page-1,page,page+1,page+2];  
 //                }
 //                if(page>=0&&page<4)
 //                {
                    
 //                      $rootScope.pagenum=[1,2,3,4,5]; 
 //                }
 //                if(spage<=parseInt(page)+2)
 //                {
                   
 //                     $rootScope.pagenum=["1","...",spage-4,spage-3,spage-2,spage-1,spage];  
 //                }
 //            }
 //        })
 //    }
 // $rootScope.load($rootScope.currentPage);
  


  


}])


.controller('pictureCtrl', ['$scope','$rootScope', '$http','$ionicScrollDelegate','dataServ', 'btnAction', function($scope,$rootScope, $http,$ionicScrollDelegate,dataServ,btnAction) {
    $rootScope.itemlist = [];
    $rootScope.flag=false;
    $rootScope.pagenum=[1,2,3,4,5];
    $rootScope.isload=false;
    var type=10;
      


    $rootScope.load=function(page){
        dataServ.get(type,page,$scope);
        btnAction.set();
        $rootScope.isload=true;
       }
      
      $rootScope.load( $rootScope.currentPage);

    }])



.controller('voiceCtrl', ['$scope','$rootScope', '$ionicScrollDelegate','dataServ', 'btnAction', function($scope,$rootScope, $ionicScrollDelegate,dataServ,btnAction) {
    $rootScope.itemlist = [];
    $rootScope.flag=false;
    $rootScope.pagenum=[1,2,3,4,5];
    $rootScope.isload=false;
    var type=31;
      


    $rootScope.load=function(page){
        dataServ.get(type,page,$scope);
        btnAction.set();
        $rootScope.isload=true;
       }
      
      $rootScope.load( $rootScope.currentPage);

    }])


.controller('videoCtrl', ['$scope','$rootScope', '$ionicScrollDelegate','dataServ', 'btnAction', function($scope,$rootScope, $ionicScrollDelegate,dataServ,btnAction) {
    $rootScope.itemlist = [];
    $rootScope.flag=false;
    $rootScope.pagenum=[1,2,3,4,5];
    $rootScope.isload=false;
    var type=41;
      


    $rootScope.load=function(page){
        dataServ.get(type,page,$scope);
        btnAction.set();
        $rootScope.isload=true;
       }
      
      $rootScope.load( $rootScope.currentPage);

    }])




.controller('allCtrl', ['$scope','$rootScope', '$ionicScrollDelegate','dataServ', 'btnAction', function($scope,$rootScope, $ionicScrollDelegate,dataServ,btnAction) {
    $rootScope.itemlist = [];
    $rootScope.flag=false;
    $rootScope.pagenum=[1,2,3,4,5];
    $rootScope.isload=false;
    var type="";
      


    $rootScope.load=function(page){
        dataServ.get(type,page,$scope);
        btnAction.set();
        $rootScope.isload=true;
       }
      
      $rootScope.load( $rootScope.currentPage);

    }])