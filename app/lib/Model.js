/*
 * @Author: lijianzhang
 * @Date: 2017-04-21 22:30:12
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2017-04-22 00:53:41
 * @flow
 */

import mongorito from 'mongorito';
import is from 'is_js';

export default class Model extends mongorito.Model {

  constructor(attrs?: Object, options?: Object) {
    super(attrs, options);
    this.initSchema();
    this.initVirtuals();
  }

  configure() {
    super.configure();
  }

  /**
   * 初始化的时,处理计算属性
   * @memberOf Model
   */

  initVirtuals() {
    const attributes = this.attributes;
    Object.keys(attributes).forEach((key) => {
      /**
       * 对attributes的 set get 设置代理;
       */
      if (Object.getOwnPropertyDescriptor(this.constructor.prototype, key)) {
        this[key] = attributes[key];
        delete attributes[key];
      } else if (!Object.getOwnPropertyDescriptor(this, key)) {
        this.setProperty(key);
      }
    });
  }

  /**
   *
   * 设置attributes的set, get代理方法
   *
   * @memberOf Model
   */

  initSchema() {
    const schema = this.constructor.schema;
    if (schema) {
      let keys: Array<string> = [];
      if (is.array(schema)) {
        keys = schema;
        keys.forEach(key => this.setProperty(key));
      } else if (is.object(schema)) {
        keys = Object.keys(schema);
        keys.forEach((key) => {
          if (this.attributes[key]) {
            this.attributes[key] = schema[key];
          }
          keys.forEach(key => this.setProperty(key));
        });
      } else {
        throw new Error('schema must be object or array');
      }
    }
  }

  setProperty(key: string) {
    Object.defineProperty(this, key, {
      get() {
        return this.get(key);
      },
      set(value) {
        return this.set(key, value);
      },
    });
  }


  /**
   * 对虚拟属性赋值
   * 过滤初始化时不符合模型的数据
   * @memberOf Model
   */
  filtersArgs() {
    const virtuals = this.constructor.virtuals;
    const schema = this.constructor.schema;
    const attrs = this.attributes;

    Object.keys(attrs).forEach((key) => {
      if (virtuals[key]) {
        this[key] = attrs[key];
        delete attrs[key];
      } else if (!schema[key]) {
        delete attrs[key];
      }
    });

    this.attributes = attrs;
  }

  beforeCreate(fn: Function) {
    this.before('create', fn);
  }

  beforeSave(fn: Function) {
    this.before('save', fn);
  }

  beforeUpdate(fn: Function) {
    this.before('update', fn);
  }

  beforeRemove(fn: Function) {
    this.before('remove', fn);
  }

  afterCreate(fn: Function) {
    this.after('create', fn);
  }

  afterSave(fn: Function) {
    this.after('save', fn);
  }

  afterUpdate(fn: Function) {
    this.after('update', fn);
  }

  afterRemove(fn: Function) {
    this.after('remove', fn);
  }
}
