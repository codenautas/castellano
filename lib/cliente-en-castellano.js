"use strict";

var castellano = {};

function setClientToSpanish(modules){
    var knownModules=['DialogPromise', 'TypedControls', 'myOwn', 'TypeStore'];
    (modules||knownModules).forEach(function(moduleNameOrModule){
        var module = typeof moduleNameOrModule == "string"?window[moduleNameOrModule]:moduleNameOrModule;
        if(module){
            var internationailizables = ['messages', 'locale'];
            internationailizables.forEach(function(attrName){
                if(module[attrName]){
                    var es = module[attrName].es;
                    if(es){
                        if(!module[attrName].en){
                            module[attrName].en = module[attrName];
                        }
                        module[attrName] = es;
                    }
                }
            });
        }
    });
}

setClientToSpanish();
