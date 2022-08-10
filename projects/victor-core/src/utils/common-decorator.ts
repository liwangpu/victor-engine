import { AbstractType, InjectFlags, InjectionToken, Type } from '@angular/core';
import * as _ from 'lodash';

/**
 * 懒加载服务,使用LazyService装饰器的时候,构造函数必须要注入injector:Injector,名称一模一样
 * @param token token
 * @param notFoundValue notFoundValue
 * @param flags flags
 */
export function LazyService(token: Type<any> | InjectionToken<any> | AbstractType<any>, notFoundValue?: any, flags?: InjectFlags): any {
  return function (target: object, propertyKey: string): any {
    const getter: any = function (): any {
      let service: any = this[`__LazyService_${propertyKey}`];
      if (!this.injector) {
        console.error(`组件需要使用LazyService装饰器的时候,构造函数必须要注入injector:Injector,名称一模一样`);
        return null;
      }
      if (service === undefined) {
        service = this.injector.get(token, notFoundValue, flags);
        this[`__LazyService_${propertyKey}`] = service;
      }
      return service;
    };
    Object.defineProperty(target, propertyKey, {
      get: getter,
      enumerable: true
    });
  };
}

/**
 * 快捷属性访问器
 * 其响应效率很快速,所以在this上存储了一个__ProperyEntry__path作为缓存
 * 默认情况下,ProperyEntry返回的是源属性的一个快照,如果需要动态每次都获取,可以设置dynamic参数为true,不过在angular中,如果该属性是变更性很强,最好别用
 * 需要很注意的是,ProperyEntry返回的永远不是源属性对象的地址数据,所以不能通过这个快捷属性访问器修改源属性数据
 * @param path 源属性路径
 * @param defaultValue 默认值
 * @param dynamic 每次都动态获取(慎用)
 */
export function PropertyEntry(path: string, defaultValue?: any): Function {
  return function (target: object, propertyName: string): any {
    function getter(): any {
      const hiddenValuePath: string = `__PropertyEntry__${path}`;
      if (typeof this[hiddenValuePath] !== 'undefined') {
        return this[hiddenValuePath];
      }
      let value: any = _.get(this, path);
      this[hiddenValuePath] = value === undefined ? defaultValue : _.cloneDeep(value);
      return this[hiddenValuePath];
    }

    Object.defineProperty(target, propertyName, {
      get: getter,
      enumerable: true,
      configurable: false
    });
  };
}