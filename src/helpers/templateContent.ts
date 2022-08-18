const component = `const component =
"import React from 'react';import { View } from 'react-native';type {{name}}Props = {};const {{name}} = (props: {{name}}Props) => {return (  <View>  </View>)}; export default {{name}}";
export const config = {
location: 'components',
sandboxDisabled: false,
};

export default component;`;

const index = `const index = "import {{name}} from './{{name}}';export default {{name}};";

export default index;`;

const sandbox = `const sandbox =
"import React from 'react'; import { View } from 'react-native'const {{name}}SandBox = () => {return (<View></View>)} export default {{name}}SandBox';"
export default sandbox;`;

const templatesContent = {
  'component.ts': component,
  'index.ts': index,
  'sandbox.ts': sandbox,
};

export default templatesContent;
