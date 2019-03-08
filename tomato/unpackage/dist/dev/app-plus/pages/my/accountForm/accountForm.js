
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead([".",[1],"btn-submit { background: #F76260; }\n",],undefined,{path:"./pages/my/accountForm/accountForm.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/my/accountForm/accountForm.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      