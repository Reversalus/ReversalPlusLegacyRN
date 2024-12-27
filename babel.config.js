module.exports = {
  presets: [
    "@babel/preset-react", // Transpile JSX
    "module:@react-native/babel-preset", // React Native support
    '@babel/preset-typescript'
  ],
  plugins: [
    "@babel/plugin-transform-runtime", // Enable runtime optimization
  ],
};
