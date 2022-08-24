const component = {
  template:
    "import React from 'react';import { View } from 'react-native';type {{name}}Props = {};const {{name}} = (props: {{name}}Props) => {return (  <View>  </View>)}; export default {{name}};",
  location: 'components',
  sandboxDisabled: false,
};

const index = {
  template: "import {{name}} from './{{name}}';export default {{name}};",
};

const sandbox = {
  template:
    "import React from 'react';import { View } from 'react-native'; const {{name}}Sandbox = () => {return (  <View></View>)}; export default {{name}}Sandbox;",
};
const stringify = (data: any) => JSON.stringify(data, null, '\t');
const templatesContent = {
  'component.json': stringify(component),
  'index.json': stringify(index),
  'sandbox.json': stringify(sandbox),
};

export default templatesContent;
