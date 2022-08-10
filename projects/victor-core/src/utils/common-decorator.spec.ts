import { PropertyEntry } from './common-decorator';


describe('common-decorator', () => {
  describe('PropertyEntry', () => {

    fit('config未赋值,一级entry取值为空', () => {
      class Component {

        @PropertyEntry('config')
        configEntry: string;
        config: any;
      }
      const instance = new Component();
      // console.log('configEntry:',instance.configEntry);
      // expect(instance.configEntry).toEqual(undefined);
    });

    it('config赋值,一级entry能正确取值', () => {
      class Component {

        @PropertyEntry('config')
        configEntry: string;
        config: any;
      }
      const instance = new Component();
      instance.config = { name: '小明', age: 18 };
      console.log('configEntry:',instance.configEntry);
    });
  });

});
