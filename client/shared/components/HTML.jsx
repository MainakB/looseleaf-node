import React from 'react';

const HTML = (props) => {
  return (
    <html lang="en">
      <head>
        <title>LooseLeaf</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css"
        />
      </head>
      <body>
        <div
          id="root"
          dangerouslySetInnerHTML={{ __html: props.html }}
        />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.__SERIALIZED_STATE__ =
              JSON.stringify(${props.serverState})
          `
        }}
        />
        <script type="application/javascript" src="/browser.js" />
      </body>
    </html>
  );
};

export default HTML;
