import 'babel-polyfill';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import _ from 'lodash';
import koa from 'koa';
import createRouter from 'koa-router';

import esi from 'esi';
import c2k from 'koa-connect';

import App from './components/App';
import Bar from './components/Bar';
import Foo from './components/Foo';

const PORT = 8888;
const app = koa();
const tpl = _.template(fs.readFileSync(path.join(__dirname, '..', 'src', 'client.html'))); // eslint-disable-line no-sync
const js = fs.readFileSync(path.join(__dirname, '..', 'dist', 'c.js')); // eslint-disable-line no-sync

const router = createRouter()
  .get('/', function* main(next) {
    const appHtml = ReactDOMServer.renderToString(<App />);
    this.body = tpl({ js, appHtml });
    yield next;
  })
  .get('/esi/Foo', Foo.serveFromEsi)
  .get('/esi/Bar', Bar.serveFromEsi)
  .use(c2k(esi));

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT);
