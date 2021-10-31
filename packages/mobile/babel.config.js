module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '^_(.+)': './src/\\1',
          },
          extensions: ['.android.js', '.ios.js', '.js', '.json', '.native'],
        },
      ],
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          safe: true,
        },
      ],
    ],
  };
};
