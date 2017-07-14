"use strict";

var castellano = {};

function setClientToSpanish(modules){
    var knownModules=['DialogPromise', 'TypedControls', 'myOwn'];
    (modules||knownModules).forEach(function(moduleNameOrModule){
        var module = typeof moduleNameOrModule == "string"?window[moduleNameOrModule]:moduleNameOrModule;
        if(module && module.messages){
            var es=module.castellano || module.es;
            if(es){
                if(!module.en){
                    module.en = module.messages;
                }
                module.messages = es;
            }
        }
    });
}

setClientToSpanish();
