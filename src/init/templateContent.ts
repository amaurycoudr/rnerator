import { COMPONENTS } from '../utils/const';
import { Extension } from '../type/type';
import { getNoTextIfJs } from '../utils/string';

const component = (extension: Extension) => {
  const textIfTs = getNoTextIfJs(extension);
  return {
    template: `import React from 'react';import { View } from 'react-native';${textIfTs(
      'type {{name}}Props = {};'
    )}const {{name}} = (props${textIfTs(
      ': {{name}}Props'
    )}) => {return (<View></View>)}; export default {{name}};`,
    location: COMPONENTS,
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

const getTemplateContent = (extension: Extension) => ({
  'component.json': stringify(component(extension)),
  'index.json': stringify(index),
  'sandbox.json': stringify(sandbox),
});

export default getTemplateContent;
