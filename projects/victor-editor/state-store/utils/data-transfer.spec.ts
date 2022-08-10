import { flatComponentTree } from './data-transfer';
import { DynamicComponentMetadata } from 'victor-core';

describe('data transfer', () => {

  describe('flatComponentTree', () => {

    it('null', () => {
      const tree = flatComponentTree(null);
      expect(tree).toEqual({});
    });

    it('单层级', () => {
      const metadata: DynamicComponentMetadata = {
        id: 'page',
        type: 'page'
      };
      const tree = flatComponentTree(metadata);
      expect(tree).toEqual({
        'page': { id: 'page', type: 'page', body: [] }
      });
    });

    it('多层级', () => {
      const tabs1Md: DynamicComponentMetadata = {
        id: 'tabs1',
        type: 'tabs',
        body: [
          {
            id: 'tabs1_tab1',
            type: 'tab'
          }
        ]
      };
      const tabs2Md: DynamicComponentMetadata = {
        id: 'tabs2',
        type: 'tabs',
        body: [
          {
            id: 'tabs2_tab1',
            type: 'tab'
          }
        ]
      };
      const pageMd: DynamicComponentMetadata = {
        id: 'page',
        type: 'page',
        body: [
          tabs1Md,
          tabs2Md
        ]
      };
      const tree = flatComponentTree(pageMd);
      expect(tree).toEqual({
        'page': { id: 'page', type: 'page', body: ['tabs1', 'tabs2'] },
        'tabs1': { id: 'tabs1', type: 'tabs', body: ['tabs1_tab1'], parentId: 'page' },
        'tabs1_tab1': { id: 'tabs1_tab1', type: 'tab', body: [], parentId: 'tabs1' },
        'tabs2': { id: 'tabs2', type: 'tabs', body: ['tabs2_tab1'], parentId: 'page' },
        'tabs2_tab1': { id: 'tabs2_tab1', type: 'tab', body: [], parentId: 'tabs2' },
      });
    });
  });

});