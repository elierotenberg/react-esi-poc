import _ from 'lodash';
import url from 'url';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

// Symbols dont work well as React props keys, so we use a randomized string instead
const $renderEsi = `$__renderEsi${Math.random()}`;

function renderEsiToString(element) {
  return ReactDOMServer.renderToString(React.cloneElement(element, {
    [$renderEsi]: true,
  }));
}

function esi(src) {
  return (Component) => {
    function Esi(props) {
      if(typeof window === 'undefined') {
        if(props[$renderEsi]) {
          return <Component {...props} />;
        }
        const urlObj = url.parse(src, true);
        Object.assign(urlObj.query, _.omit(props, $renderEsi));
        return React.createElement('esi:include', { src: url.format(urlObj) });
      }
      return <Component {...props} />;
    }
    Esi.displayName = `@esi(${Component.displayName})`;
    Esi.serveFromEsi = function* serveFromEsi(next) {
      const props = Object.assign({}, this.query);
      this.body = renderEsiToString(React.createElement(Esi, props));
      yield next;
    };

    return Esi;
  };
}

export default esi;
