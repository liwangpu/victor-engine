import { flatComponentTree, generateDesignState, nestComponentTree } from './data-transfer';
import { DynamicComponentMetadata } from 'victor-core';
import { VictorDesignerState, VICTOR_DESIGNER_INITIAL_STATE } from '../state';

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

  describe('nestComponentTree', () => {
    it('null', () => {
      const metadata = nestComponentTree(null);
      expect(metadata).toEqual(null);
    });

    it('initial state', () => {
      const metadata = nestComponentTree(VICTOR_DESIGNER_INITIAL_STATE);
      expect(metadata).toEqual({
        id: 'page',
        type: 'page'
      });
    });

    it('仅有page且有配置', () => {
      const state: VictorDesignerState = {
        componentMetadata: {
          'page': { id: 'page', type: 'page', title: '我是页面标题' }
        },
        componentTree: {
          'page': { id: 'page', type: 'page' }
        }
      };
      const metadata = nestComponentTree(state);
      expect(metadata).toEqual({
        id: 'page',
        type: 'page',
        title: '我是页面标题'
      });
    });

    it('多层级组件', () => {
      const state: VictorDesignerState = {
        componentMetadata: {
          'page': { id: 'page', type: 'page', title: '我是页面标题' },
          'text1': { id: 'text1', type: 'text', title: '姓名' },
        },
        componentTree: {
          'page': { id: 'page', type: 'page', body: ['tabs1'] },
          'tabs1': { id: 'tabs1', type: 'tabs', parentId: 'page', body: ['tabs1_tab1'] },
          'tabs1_tab1': { id: 'tabs1_tab1', type: 'tab', parentId: 'tabs1', body: ['text1'] },
          'text1': { id: 'text1', type: 'text', parentId: 'tabs1_tab1' }
        }
      };
      const metadata = nestComponentTree(state);
      console.log('metadata:', metadata);
      expect(metadata).toEqual({
        id: 'page',
        type: 'page',
        title: '我是页面标题',
        body: [
          {
            id: 'tabs1',
            type: 'tabs',
            body: [
              {
                id: 'tabs1_tab1',
                type: 'tab',
                body: [
                  {
                    id: 'text1',
                    type: 'text',
                    title: '姓名'
                  }
                ]
              }
            ]
          }
        ]
      });
    });
  });

  describe('generateDesignState', () => {

    it('null', () => {
      const state = generateDesignState(null);
      expect(state).toEqual(VICTOR_DESIGNER_INITIAL_STATE);
    });

    fit('多层级', () => {
      const metadata: DynamicComponentMetadata = {
        id: 'page',
        type: 'page',
        title: '我是页面标题',
        body: [
          {
            id: 'tabs1',
            type: 'tabs',
            body: [
              {
                id: 'tabs1_tab1',
                type: 'tab',
                body: [
                  {
                    id: 'text1',
                    type: 'text',
                    title: '姓名'
                  }
                ]
              }
            ]
          }
        ]
      };
      const state = generateDesignState(metadata);
      console.log('state:', state);
      // expect(state).toEqual(VICTOR_DESIGNER_INITIAL_STATE);
    });

  });
});