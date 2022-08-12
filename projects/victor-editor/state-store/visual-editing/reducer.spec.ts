import { Action, createReducer } from '@ngrx/store';
import { VictorDesignerState, VICTOR_DESIGNER_INITIAL_STATE } from '../state';
import { ons } from './reducer';
import * as fromAction from './action';
import { DynamicComponentMetadata } from 'victor-core';
import { flatComponentTree } from '../utils/data-transfer';

const formDesignerReducer = createReducer<VictorDesignerState, Action>(VICTOR_DESIGNER_INITIAL_STATE, ...ons);

describe('Visual Editing Reducer', () => {

  describe('moveComponent', () => {

    it('同层级移动', () => {
      const pageMd: DynamicComponentMetadata = {
        id: 'page',
        type: 'page',
        body: [
          {
            id: 'tabs1',
            type: 'tabs',
            body: [
              {
                id: 'tabs1_tab1',
                type: 'tab'
              }
            ]
          },
          {
            id: 'tabs2',
            type: 'tabs',
            body: [
              {
                id: 'tabs2_tab1',
                type: 'tab'
              }
            ]
          }
        ]
      };
      const state: VictorDesignerState = {
        componentMetadata: {},
        componentTree: flatComponentTree(pageMd)
      };
      const action = fromAction.moveComponent({ id: 'tabs2', parentId: 'page', index: 0, source: 'test' });
      const newState = formDesignerReducer(state, action);
      const pageTree = newState.componentTree['page'];
      expect(pageTree.body).toEqual(['tabs2', 'tabs1']);
      const tabs2Tree = newState.componentTree['tabs2'];
      expect(tabs2Tree.parentId).toBe('page');
    });

    it('跨层级向前移动', () => {
      const pageMd: DynamicComponentMetadata = {
        id: 'page',
        type: 'page',
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
                    id: 'tabs2',
                    type: 'tabs',
                    body: [
                      {
                        id: 'tabs2_tab1',
                        type: 'tab'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      };
      const state: VictorDesignerState = {
        componentMetadata: {},
        componentTree: flatComponentTree(pageMd)
      };
      const action = fromAction.moveComponent({ id: 'tabs2', parentId: 'page', index: 0, source: 'test' });
      const newState = formDesignerReducer(state, action);
      const pageTree = newState.componentTree['page'];
      expect(pageTree.body).toEqual(['tabs2', 'tabs1']);
      const tabs2Tree = newState.componentTree['tabs2'];
      expect(tabs2Tree.parentId).toBe('page');
    });

    it('跨层级向后移动', () => {
      const pageMd: DynamicComponentMetadata = {
        id: 'page',
        type: 'page',
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
                    id: 'tabs2',
                    type: 'tabs',
                    body: [
                      {
                        id: 'tabs2_tab1',
                        type: 'tab'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      };
      const state: VictorDesignerState = {
        componentMetadata: {},
        componentTree: flatComponentTree(pageMd)
      };
      const action = fromAction.moveComponent({ id: 'tabs2', parentId: 'page', index: 1, source: 'test' });
      const newState = formDesignerReducer(state, action);
      const pageTree = newState.componentTree['page'];
      expect(pageTree.body).toEqual(['tabs1', 'tabs2']);
      const tabs2Tree = newState.componentTree['tabs2'];
      expect(tabs2Tree.parentId).toBe('page');
    });
  });
});