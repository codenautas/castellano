# castellano

Mensajes en castellano para módulos de node.js asociados a backend-plus. Traduce al
castellano librerías bilingües que exponen sus frases en inglés y castellano.

## Qué hace la librería

[lib/cliente-en-castellano.js](lib/cliente-en-castellano.js) corre en el navegador. Recorre
módulos conocidos (`DialogPromise`, `TypedControls`, `myOwn`, `TypeStore`) y, para cada
atributo internacionalizable (`messages`, `locale`), si el módulo tiene `module.i18n[attr].es`:

1. guarda el inglés actual en `module.i18n[attr].en` (si no estaba),
2. reemplaza `module[attr]` por la versión `es`.

Resultado concreto con `dialog-promise`: el botón `Yes` pasa a decir `Sí`. Esa es la
traducción que verifica el test.

## Tests

`npm test` corre [test/puppeteer-test.js](test/puppeteer-test.js) con `node --test` + Puppeteer:
abre [example/popup-dp.html](example/popup-dp.html) por `file://`, clickea el botón, espera
`.dialog-promise` y asserta que hay exactamente un botón con texto `Sí`.

Antes los tests eran de CasperJS/PhantomJS/SlimerJS (ya inexistentes). Además las aserciones
reales de Casper estaban en **código muerto** (atrás de un `return`), así que el diálogo nunca
se probó de verdad. El test de Puppeteer reconstruye esa aserción que se quería hacer.

## Cómo se carga el ejemplo en el navegador (importante)

`dialog-promise@0.10.5` es un módulo **CommonJS**: en su línea 3 hace
`require("best-globals")` (usa `simplifiedLetters` / `simplifyText`, la tabla de
normalización de caracteres). Por eso **no se puede cargar como `<script>` plano sin ayuda**:
`require` no existe en el navegador y la inicialización se corta (deja `DialogPromise`
`undefined`).

La solución adoptada (opción A): `require-bro` provee `define`/`require` para módulos UMD en
el navegador. El orden de scripts en [example/popup-dp.html](example/popup-dp.html) es:

1. `require-bro` (provee `require`/`define`)
2. `best-globals` (require-bro lo registra por nombre de archivo → módulo `"best-globals"`;
   debe incluirse manualmente, require-bro no lo trae solo)
3. `dialog-promise` (su `require("best-globals")` ahora resuelve)
4. `cliente-en-castellano` (hace la traducción)

## Pendientes / futuro

- **SSOT de la tabla de normalización**: `simplifiedLetters` (mapeo Unicode→ASCII) vive solo
  en `best-globals` y la consumen varias librerías (`dialog-promise`, etc.). Se decidió ir por
  la **opción A** (cada lib depende de un origen común vía require + require-bro para el
  navegador), pero el SSOT en sí no se implementó: hoy `dialog-promise` la toma por `require`.
  Lo que se descartó: codegen que inline la tabla (opción B) y copia manual con test de
  sincronía (opción C). Tensión de fondo: SSOT vs. independencia entre paquetes vs. cargable
  como `<script>` plano; no se maximizan los tres a la vez.
- **Dependencias a declarar explícitas en package.json**: el ejemplo/test ahora usan
  `best-globals` y `require-bro` por `<script>`, pero no están listadas como devDependencies
  (vienen transitivas). Conviene declararlas para que `npm install` en limpio las traiga.
- **CI**: [.github/workflows/publish.yml](.github/workflows/publish.yml) solo publica; no corre
  tests. Falta un workflow que haga `npm install` + `npm test`. Ahí decidir si el runner usa el
  "Chrome for Testing" que baja Puppeteer (reproducible) o un navegador del sistema.
