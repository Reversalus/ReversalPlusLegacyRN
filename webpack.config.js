const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const appDirectory = path.resolve(__dirname);
const { presets, plugins } = require(`${appDirectory}/babel.config.js`);
const compileNodeModules = [
    "react-native-swiper", // Include react-native-swiper
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));

const babelLoaderConfiguration = {
    test: /\.(js|jsx|ts|tsx)$/,
    include: [
        path.resolve(__dirname, "index.web.js"),
        path.resolve(__dirname, "App.tsx"),
        path.resolve(__dirname, "src"),
        path.resolve(__dirname, "component"),
        ...compileNodeModules, // Ensure react-native-swiper is transpiled
    ],
    use: {
        loader: "babel-loader",
        options: {
            cacheDirectory: true,
            presets,
            plugins,
        },
    },
};

const svgLoaderConfiguration = {
    test: /\.svg$/,
    use: [
        {
            loader: "@svgr/webpack",
        },
    ],
};

const imageLoaderConfiguration = {
    test: /\.(gif|jpe?g|png|svg)$/,
    use: {
        loader: "url-loader",
        options: {
            name: "[name].[ext]",
        },
    },
};

const tsLoaderConfiguration = {
    test: /\.(ts)x?$/,
    exclude: /node_modules|\.d\.ts$/,
    use: {
        loader: "ts-loader",
        options: {
            transpileOnly: true, // Avoid emitting files
            compilerOptions: {
                noEmit: true, // Prevent TypeScript from emitting JS files
            },
        },
    },
};

module.exports = {
    entry: {
        app: path.join(__dirname, "index.web.js"),
    },
    output: {
        path: path.resolve(appDirectory, "dist"),
        publicPath: "/",
        filename: "rnw.bundle.js",
    },
    resolve: {
        extensions: [".web.tsx", ".web.ts", ".tsx", ".ts", ".web.js", ".js", "jsx"],
        alias: {
            "react-native$": "react-native-web",
        },
    },
    module: {
        rules: [
            babelLoaderConfiguration,
            imageLoaderConfiguration,
            svgLoaderConfiguration,
            tsLoaderConfiguration, // Ensure ts-loader is added
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "index.html"),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(true),
        }),
    ],
    devServer: {
        historyApiFallback: true,
    },
};
