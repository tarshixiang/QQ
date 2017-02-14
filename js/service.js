angular.module('myService', [])

.service('dataServ', ['$http', '$rootScope','$ionicScrollDelegate','$timeout','$sce', function($http, $rootScope,$ionicScrollDelegate,$timeout,$sce){

    /*
        type      请求类型
        page        当前请求的页
      
        scope       就是控制器当前那个的 $scope
    */
 
     $rootScope.getsrc=function(url){
        return $sce.trustAsResourceUrl(url);
    }

    this.get = function(type, page, scope) {
        
        $rootScope.flooer={"end":4};
        var url =  "http://route.showapi.com/255-1?showapi_appid=26444&showapi_sign=e6ed68d43d734b78892a649fedd90cbe&type="+type+"&page="+page+""
        $http.get(url).success(function(data) {
            
             $rootScope.itemlist = data.showapi_res_body.pagebean.contentlist;
               $rootScope.currentPage = data.showapi_res_body.pagebean.currentPage;
                // console.log("当前页："+ $rootScope.currentPage);
              $rootScope.flag=false;

              // console.log(data,type);
              $rootScope.foolerlist= $rootScope.itemlist.slice(0,$rootScope.flooer.end);
              var spage=data.showapi_res_body.pagebean.allPages;
               // console.log( $rootScope.foolerlist);
                 $ionicScrollDelegate.scrollTop(true);
                 // if( $rootScope.foolerlist[0].image0&&$rootScope.foolerlist[0].image0!="")
                 // {
                 //    $rootScope.pictureok=true;
                 // }
                 //  if( $rootScope.foolerlist[0].video_uri&& $rootScope.foolerlist[0].video_uri!="")
                 // {
                 //    $rootScope.videook=true;
                 // }
                 //   if( $rootScope.foolerlist[0].voice_uri&&$rootScope.foolerlist[0].voice_uri)
                 // {
                 //    $rootScope.voiceok=true;
                 // }



                if(page>=4)
                {
                   $rootScope.pagenum=["1","...",page-2,page-1,page,page+1,page+2];  
                }
                if(page>=0&&page<4)
                {
                    
                      $rootScope.pagenum=[1,2,3,4,5]; 
                }
                if(spage<=parseInt(page)+2)
                {
                   
                     $rootScope.pagenum=["1","...",spage-4,spage-3,spage-2,spage-1,spage];  
                }
        })
    }


    //  $rootScope.LoadMore=function(){
       
    //     $timeout(function() {
    //          if(flooer.end>=$rootScope.itemlist.length)
    //             {
    //                 $rootScope.$broadcast("scroll.infiniteScrollComplete");
    //                 return;
    //             }
             
    //         flooer.end=flooer.end+5;
    //         $rootScope.foolerlist= $rootScope.itemlist.slice(0,flooer.end);
    //          $rootScope.$broadcast("scroll.infiniteScrollComplete");
    //          console.log($rootScope.foolerlist);
    //           console.log(flooer.end,$rootScope.itemlist.length);
    //     }, 1500);

      
    // }

}])


.service('btnAction', ['$rootScope', function($rootScope){
    this.index = 0;
    this.light = function(index) {
        angular.forEach($rootScope.tabBtns, function(btn, key) {
            btn.isOk = false;
            if (key == index) {
                btn.isOk = true;
            }
        })
    };
    this.set = function() {
        var ll = location.hash;
        switch (ll) {
            case '#/all':
                this.index = 0;
                this.light(this.index);
                break;
            case '#/video':
                this.index = 1;
                this.light(this.index);
                break;
            case '#/picture':
                this.index = 2;
                this.light(this.index);
                break;
             case '#/text':
                this.index = 3;
                this.light(this.index);
                break;
             case '#/voice':
                this.index = 4;
                this.light(this.index);
                break;
            
        }
    }
}])