"use strict";

var assert = require('assert').strict;

function botones(dialogo){
    return Array.prototype.slice.call(dialogo.querySelectorAll('button'));
}

describe('castellano', function(){
    it('al cargarse traduce los mensajes de dialog-promise y guarda los originales en inglés', function(){
        assert.equal(DialogPromise.messages.Yes, 'Sí');
        assert.equal(DialogPromise.i18n.messages.en.Yes, 'Yes');
    });
    it('los diálogos se ven en castellano', async function(){
        var respuesta = confirmPromise('¿Seguimos?', {rejectFalse: false});
        var dialogo = document.querySelector('.dialog-promise');
        var textos = botones(dialogo).map(function(boton){ return boton.textContent; });
        assert.equal(textos.filter(function(texto){ return texto === 'Sí'; }).length, 1, "hay exactamente un botón que dice 'Sí'");
        assert.equal(textos.filter(function(texto){ return texto === 'No'; }).length, 1, "hay exactamente un botón que dice 'No'");
        botones(dialogo).find(function(boton){ return boton.textContent === 'No'; }).click();
        assert.equal(await respuesta, false);
    });
    it('traduce un módulo recibido como objeto y conserva el inglés si ya estaba guardado', function(){
        var modulo = {
            messages: {hello: 'hello!'},
            locale: {decimal: '.'},
            i18n: {
                messages: {en: {hello: 'hello'}, es: {hello: 'hola'}},
                locale: {es: {decimal: ','}},
            },
        };
        setClientToSpanish([modulo]);
        assert.deepEqual(modulo.messages, {hello: 'hola'});
        assert.deepEqual(modulo.i18n.messages.en, {hello: 'hello'});
        assert.deepEqual(modulo.locale, {decimal: ','});
        assert.deepEqual(modulo.i18n.locale.en, {decimal: '.'});
    });
    it('deja como están los módulos sin traducción y los que no existen', function(){
        var sinI18n = {messages: {hello: 'hello'}};
        var sinCastellano = {messages: {hello: 'hello'}, i18n: {messages: {fr: {hello: 'bonjour'}}}};
        setClientToSpanish([sinI18n, sinCastellano, 'ModuloQueNoExiste']);
        assert.deepEqual(sinI18n.messages, {hello: 'hello'});
        assert.deepEqual(sinCastellano.messages, {hello: 'hello'});
    });
});
