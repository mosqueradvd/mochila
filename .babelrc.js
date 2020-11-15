const plugins = [
  "@babel/plugin-proposal-class-properties",
  [
    "babel-plugin-import",
    {
      libraryName: "@material-ui/core",
      libraryDirectory: "esm",
      camel2DashComponentName: false,
    },
    "core",
  ],
  [
    "babel-plugin-import",
    {
      libraryName: "@material-ui/icons",
      libraryDirectory: "esm",
      camel2DashComponentName: false,
    },
    "icons",
  ],
  [
    "babel-plugin-import",
    {
      libraryName: "@material-ui/lab",
      libraryDirectory: "esm",
      camel2DashComponentName: false,
    },
    "lab",
  ],
];

module.exports = {
  "presets": [
    [
      "next/babel",
      {
        "preset-env": {},
        "transform-runtime": {},
        "styled-jsx": {},
        "class-properties": {}
      }
    ]
  ],
  "plugins": plugins
}
