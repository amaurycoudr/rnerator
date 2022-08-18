const component = `const component =
"import React from 'react'" +
"\nimport { View } from 'react-native'" +
'\ntype {{name}}Props = {};' +
'\nconst {{name}} = (props: {{name}}Props) => {' +
'\nreturn (' +
'\n  <View>' +
'\n  </View>' +
'\n)}' +
'\nexport default {{name}}';

export const config = {
location: 'components',
sandboxDisabled: false,
};

export default component;`;

const index = `const index = "import {{name}} from './{{name}}';\nexport default {{name}};";

export default index;`;

const sandbox = `const sandbox =
"import React from 'react'" +
"\nimport { View } from 'react-native'" +
'\nconst {{name}}SandBox = () => {' +
'\nreturn (' +
'\n  <View>' +
'\n  </View>' +
'\n)}' +
'\nexport default {{name}}SandBox';

export default sandbox;`;

const content = {
  'component.ts': component,
  'index.ts': index,
  'sandbox.ts': sandbox,
};

export default content;
