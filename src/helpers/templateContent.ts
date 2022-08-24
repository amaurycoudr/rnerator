import { Extension } from './type';
import { curryTextIfTs } from './utils';

const component = (isJs: boolean) => {
  const textIfTs = curryTextIfTs(isJs);
  return {
    template: `import React from 'react';import { View } from 'react-native';${textIfTs(
      'type {{name}}Props = {};'
    )}const {{name}} = (props${textIfTs(
      ': {{name}}Props'
    )}) => {return (<View></View>)}; export default {{name}};`,
    location: 'components',
    sandboxDisabled: false,
  };
};

const index = {
  template: "import {{name}} from './{{name}}';export default {{name}};",
};

const sandbox = {
  template:
    "import React from 'react';import { View } from 'react-native'; const {{name}}Sandbox = () => {return (  <View></View>)}; export default {{name}}Sandbox;",
};

const stringify = (data: any) => JSON.stringify(data, null, '\t');

const getTemplateContent = (extension: Extension) => {
  const isJs = extension === 'js';
  return {
    'component.json': stringify(component(isJs)),
    'index.json': stringify(index),
    'sandbox.json': stringify(sandbox),
  };
};

export default getTemplateContent;
