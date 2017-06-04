import Koa from 'koa';

import middleware from './middleware/index';
import routes from './routes/index';

const app = new Koa();
app.keys = ['my-secret-key'];

app.use(middleware());
app.use(routes());
app.use(ctx => ctx.status = 404);

export default app;