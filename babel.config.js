module.exports = {
  presets: [
    ["@vue/cli-plugin-babel/preset", { modules: false, useBuiltIns: "entry" }],
  ],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "~src/theme",
      },
    ],
  ],
};
