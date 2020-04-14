module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    ["import", { libraryName: "@ant-design/react-native" }],
    [
      "import",
      {
        libraryName: "lodash",
        libraryDirectory: "",
        camel2DashComponentName: false
      },
      "lodash"
    ],
    [
      "module-resolver",
      {
        root: ["."],
        alias: {
          "@": "./src"
        }
      }
    ]
  ]
};
