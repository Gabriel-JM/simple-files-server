# Simple Files Server

An easy to use, static files server made in Node.js

## Use case
Its focused on serve static files like front-end files.

## How to use

### CLI
```bash
  <command> <sourceFolder> <options>
```
- command: the command to execute the server, you can use one of those, `simple-files-server`, `sf-server`, `sfs`.
- sourceFolder: `optional` folder to serve, the server will search for the `index.html` in this folder. `Default: ./`
- options:
  - port: `optional` the port to start the server. `Default: 3500`.
  - spa: `optional` a boolean value, if its is true the server will serve the index.html file if the request path wasn't for a file, for example /about. `Default: false`.

### Programmatically
```js
const filesServer = require('simple-files-server')
const port = process.env.PORT || 3500

const server = filesServer({
  //Server Options
})

server.listen(port, /* Custom Log */)
```
### Server Options
- **sourceFolder**: equal to `sourceFolder` cli option.
- **spa**: equal to `spa` cli option.
- **mimeTypes**: `optional` mime types of files to serve, can be override with an `object` or use a `function` that will receive the default mime types as first parameter and the return of this function will be the new mime types options.

**Default MIME types:**
```js
{
  txt: 'text/plain',
  html: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  xml: 'application/xml',
  ts: 'application/typescript',
  json: 'application/json',
  pdf: 'application/pdf',
  jpg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  ico: 'image/x-icon',
  otf: 'font/otf',
  ttf: 'font/ttf'
}
```

### Custom Log
By default, this function is `optional` and will show the default logs when start the server. But you can provide a function, which receive the `port` as first parameter, and write your own logs.
