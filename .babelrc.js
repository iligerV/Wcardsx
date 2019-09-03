module.exports = {
    // ignore: ["node_modules/**", "react/dst/**"],
    ignore: ["react/dst/**"],
    presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-flow"],
    plugins: [
        ["@babel/plugin-proposal-decorators", {decoratorsBeforeExport: true}],
        ["@babel/plugin-proposal-class-properties", {loose: true}],
    ],
    exclude: [
        "/node_modules\\/*jss*/",
        "/node_modules\\/css-vendor*/",
        "/node_modules\\/react-swipe-component*/",
        "/node_modules\\/@material-ui*/",
    ]
}
