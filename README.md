# notes-node

实现了类似flask的蓝图

```JavaScript
const api = Blueprint('/api');

@api.class
export default class API {
  @api.get('/')
  index(ctx) {
    ctx.body = 'api';
  }
}
```

#### start
```shell
npm start
```
