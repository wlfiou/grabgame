
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead([".",[1],"orgColor { color: #fc3a39; }\n.",[1],"t-common-font { font-weight: bold; }\n",],undefined,{path:"./pages/my/setting/setting.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/my/setting/setting.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      