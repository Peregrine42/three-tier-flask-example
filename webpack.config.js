const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { sourceMapsEnabled } = require("process");

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: "./frontend/index.jsx", // Entry point of the frontend of the application
  output: {
    path: path.resolve(__dirname, "static"), // Output directory
    filename: "bundle.js", // Output bundle file name
    publicPath: "/", // Public URL of the output directory when referenced in a browser
  },
  resolve: {
    extensions: [".js", ".jsx"], // File extensions to resolve
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Match both .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Use babel-loader for .js and .jsx files
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"], // Babel presets for React and modern JS
          },
        },
      },
      {
        test: /\.css$/, // Match .css files
        use: ["style-loader", "css-loader"], // Use style-loader and css-loader for .css files
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Clean 'dist' folder before each build
  ],
  devServer: {
    contentBase: "./dist", // Serve content from 'dist' directory
    historyApiFallback: true, // Allows client-side routing (react-router, etc.) to work
  },
};
