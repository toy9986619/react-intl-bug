import path from 'path';

const PROJECT_ROOT = path.resolve(__dirname, '../../');
const PUBLIC_PATH = path.resolve(PROJECT_ROOT, 'public');

export const headSetting = {
  headTitle: 'project',
  metaList: {
    propertyTitle: { property: 'og:title', content: 'project' },
    propertyImg: { property: 'og:image', content: '' },
    propertyDescription: { property: 'og:description', content: '' },
  },
  applicationName: 'project',
};