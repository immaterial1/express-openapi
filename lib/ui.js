'use strict'
const path = require('path')
const serve = require('serve-static')

module.exports.serveSwaggerUI = function serveSwaggerUI (documentUrl) {
  return [serve(path.resolve(require.resolve('swagger-ui-dist'), '..'), { index: false }), function renderSwaggerHtml (req, res) {
    res.type('html').send(renderHtmlPage('Swagger UI', `
      <link rel="stylesheet" type="text/css" href="./swagger-ui.css" >
    `, `
      <div id="swagger-ui"></div>
      <script src="./swagger-ui-bundle.js"></script>
      <script src="./swagger-ui-standalone-preset.js"></script>
      <script>
        window.onload = function () {
          window.ui = SwaggerUIBundle({
            url: "${documentUrl}",
            dom_id: '#swagger-ui'
          })
        }
      </script>
    `))
  }]
}

function renderHtmlPage (title, head, body) {
  return `<!DOCTYPE html>
<html>
  <head>
    <title>${title}</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      html {
          box-sizing: border-box;
          overflow: -moz-scrollbars-vertical;
          overflow-y: scroll;
      }
      *,
      *:before,
      *:after {
          box-sizing: inherit;
      }
      body {
        margin: 0;
        padding: 0;
        background: #fafafa;
      }
    </style>
    ${head}
  </head>
  <body>
    ${body}
  </body>
</html>
  `
}
