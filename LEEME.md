<!--multilang v0 es:LEEME.md en:README.md -->
# castellano
Mensajes en castellano para algunos módulos de node.js asociados a backend-plus

<!-- cucardas -->
![extending](https://img.shields.io/badge/stability-extending-orange.svg)
[![npm-version](https://img.shields.io/npm/v/castellano.svg)](https://npmjs.org/package/castellano)
[![downloads](https://img.shields.io/npm/dm/castellano.svg)](https://npmjs.org/package/castellano)
[![build](https://img.shields.io/travis/codenautas/castellano/master.svg)](https://travis-ci.org/codenautas/castellano)
[![dependencies](https://img.shields.io/david/codenautas/castellano.svg)](https://david-dm.org/codenautas/castellano)
[![qa-control](http://codenautas.com/github/codenautas/castellano.svg)](http://codenautas.com/github/codenautas/castellano)


<!--multilang buttons-->

idioma: ![castellano](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-es.png)
también disponible en:
[![inglés](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-en.png)](README.md)

<!--lang:es-->
## Uso
<!--lang:en--]
## Use
[!--lang:*-->

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

<!--lang:es-->
## Licencia
<!--lang:en--]
## License
[!--lang:*-->

[MIT](LICENSE)

