/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
 sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json'],

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
