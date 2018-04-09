import babel from 'rollup-plugin-babel';

export default {
  input: 'src/ApngComponent.js',
  output: {
    file: 'lib/ApngComponent.js',
    format: 'umd'
  },
  moduleName:'ApngComponent',
  plugins: [ babel() ]
};
