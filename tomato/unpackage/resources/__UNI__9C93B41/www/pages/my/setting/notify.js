
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead([".",[1],"t-common-font { font-weight: bold; }\n",],undefined,{path:"./pages/my/setting/notify.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/my/setting/notify.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      