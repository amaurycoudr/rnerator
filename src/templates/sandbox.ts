const componentTemplate =
  "import React from 'react'" +
  "\nimport { View } from 'react-native'" +
  '\nconst {{name}}SandBox = () => {' +
  '\nreturn (' +
  '\n  <View>' +
  '\n  </View>' +
  '\n)}' +
  '\nexport default {{name}}SandBox';

export default componentTemplate;
