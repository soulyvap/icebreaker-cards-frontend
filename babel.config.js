module.exports = function (api) {
  // ✅ Uses CommonJS format
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [["module:react-native-dotenv"]],
  };
};
