# castellano
Mensajes en castellano para algunos módulos de node.js asociados a backend-plus

[![npm-version](https://img.shields.io/npm/v/castellano.svg)](https://npmjs.org/package/castellano)
[![downloads](https://img.shields.io/npm/dm/castellano.svg)](https://npmjs.org/package/castellano)
[![build](https://github.com/codenautas/castellano/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/codenautas/castellano/actions/workflows/build-and-test.yml)
[![security](https://socket.dev/api/badge/npm/package/castellano)](https://socket.dev/npm/package/castellano)
[![qa-control](https://github.com/codenautas/castellano/actions/workflows/qa-control.yml/badge.svg)](https://github.com/codenautas/castellano/actions/workflows/qa-control.yml)


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
