export const PRIMARY_PACKAGES: Array<ComponentPackageDetail> = [
  {
    type: 'button',
    title: '按钮',
    group: 'button',
    package: 'dynamic-button',
    runTime: true,
    designTime: true,
    canDesign: true
  },
  {
    type: 'page',
    title: '页面',
    package: 'dynamic-page',
    runTime: true,
    designTime: true,
    canDesign: false
  },
  {
    type: 'tabs',
    title: '页签',
    group: 'container',
    package: 'dynamic-tabs',
    runTime: true,
    designTime: true,
    canDesign: true
  },
  {
    type: 'text',
    title: '文本',
    group: 'form',
    package: 'dynamic-form',
    runTime: true,
    designTime: true,
    canDesign: true
  }
];

export interface ComponentPackageDetail {
  type: string;
  title: string;
  package: string;
  runTime: boolean;
  designTime: boolean;
  canDesign: boolean;
  group?: string;
}