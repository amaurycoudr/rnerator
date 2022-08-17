const componentTemplate =
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
  noSandBox: false,
};

export default componentTemplate;
