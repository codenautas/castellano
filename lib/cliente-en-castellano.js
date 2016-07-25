"use strict";
/*jshint eqnull:true */
/*jshint browser:true */

var castellano = {};

function setClientToSpanish(){
    var knownModules=['DialogPromise', 'TypedControls', 'myOwn'];
    knownModules.forEach(function(moduleName){
        var module = window[moduleName];
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
