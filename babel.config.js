module.exports = {
  presets: [
    "@babel/preset-env", // Transpile modern JS
    "@babel/preset-react", // Transpile JSX
    "module:@react-native/babel-preset", // React Native support
  ],
  plugins: [
    "@babel/plugin-transform-runtime", // Enable runtime optimization
  ],
};