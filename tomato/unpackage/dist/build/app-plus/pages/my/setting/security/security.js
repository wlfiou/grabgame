
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead([".",[1],"t-common-font { font-weight: bold; }\n",],undefined,{path:"./pages/my/setting/security/security.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/my/setting/security/security.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      