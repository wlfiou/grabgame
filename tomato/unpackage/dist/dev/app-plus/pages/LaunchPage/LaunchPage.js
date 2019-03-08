
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead(["wx-swiper{ height: 100vh; }\n.",[1],"img-skip{ width: 2.5em; height: 1.6em; position: absolute; z-index: 100; right: ",[0,15],"; top: 30px; background-color: #000000; text-align: center; border-radius: 15%; opacity: 0.4; }\n.",[1],"img-skip wx-text{ font-size: 0.8em; line-height: 1.6em; color: #FFFFFF; }\n.",[1],"img-view{ width: 100%; height: 100%; }\n",],undefined,{path:"./pages/LaunchPage/LaunchPage.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/LaunchPage/LaunchPage.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      