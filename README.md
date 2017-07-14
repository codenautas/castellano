# castellano
Mensajes en castellano para algunos módulos de node.js

![extending](https://img.shields.io/badge/stability-extending-orange.svg)
[![npm-version](https://img.shields.io/npm/v/castellano.svg)](https://npmjs.org/package/castellano)
[![downloads](https://img.shields.io/npm/dm/castellano.svg)](https://npmjs.org/package/castellano)
[![build](https://img.shields.io/travis/codenautas/castellano/master.svg)](https://travis-ci.org/codenautas/castellano)
[![climate](https://img.shields.io/codeclimate/github/codenautas/castellano.svg)](https://codeclimate.com/github/codenautas/castellano)
[![dependencies](https://img.shields.io/david/codenautas/castellano.svg)](https://david-dm.org/codenautas/castellano)
[![qa-control](http://codenautas.com/github/codenautas/castellano.svg)](http://codenautas.com/github/codenautas/castellano)



language: ![English](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-en.png)
also available in:
[![Spanish](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-es.png)](LEEME.md)

## Use

```html
<script src="dialog-promise.js"></script>
<script src="cliente-en-castellano.js"></script>
<button onclick='el_ejemplo(this)'>ejemplo</button>
<script>
function el_ejemplo(button){
    confirmPromise("¿Se ven las respuestas en castellano?").then(function(name){
        // gracias a "cliente-en-castellano"
        // los botones Yes y No ahora dicen Sí y No
        return alertPromise("¡Claro que sí!");
    }).then(function(){
        button.textContent='¡vovler a probar!';
    });
}
</script>
```

## License

[MIT](LICENSE)

