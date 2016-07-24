"use strict";

var args = require('system').args;
var path = args[args.length-1].replace(/\\/g,'/').replace(/[/][^/]+[/][^/]+$/,'/example/popup-dp.html');
if(path[0]!='/'){
    path='/'+path;
}
casper.echo("path "+path);

var keys;

casper.test.begin('Setup', function(test) {
    function clickOver(id){
        var box = casper.page.evaluate(function(id) {
            return __utils__.getElementBounds(id);
        }, id);
        test.assert(!!box, id+" element found");
        casper.mouse.click(box.left+Math.floor(box.width/2),box.top+Math.floor(box.height/2));
    }
    casper.start('file://'+path, function() {
        keys = casper.page.event.key;
        this.echo(this.getTitle());
        test.assertExists('#confirm_example1', 'have the button');
        test.assertDoesntExist('.dialog_promise', 'dialog not exists');
        clickOver('#confirm_example1');
        this.capture('local-capture2.png');
        
        test.assertExists('.dialog-promise', 'dialog apears');
        test.assertVisible('.dialog-promise', 'dialog is visible');
        test.assertEval(function() {
            return __utils__.findAll('.dialog-promise button').filter(function(button){
                return button.textContent === 'Sí';
            }).length===1;
        });
        test.done();
    }).run(function() {
        test.done();
    });
});
