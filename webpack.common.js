const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const ImageminWebpackPlugin = require("imagemin-webpack-plugin").default;
const ImageminMozjpeg = require("imagemin-mozjpeg");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/scripts/index.js"),
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/templates/index.html"),
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/public/"),
          to: path.resolve(__dirname, "dist/"),
        },
      ],
    }),

    new WorkboxWebpackPlugin.GenerateSW({
      swDest: "./sw.bundle.js",
      runtimeCaching: [
        {
          urlPattern: ({ url }) =>
            url.href.startsWith("https://restaurant-api.dicoding.dev/"),
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "yumyum-apps-api",
          },
        },
        {
          urlPattern: ({ url }) =>
            url.href.startsWith(
              "https://restaurant-api.dicoding.dev/images/medium/"
            ),
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "yumyum-apps-image-api",
          },
        },
        // Cache Font Awesome stylesheet
        {
          urlPattern: ({ url }) =>
            url.origin === "https://stackpath.bootstrapcdn.com" &&
            url.pathname.includes("font-awesome"),
          handler: "CacheFirst",
          options: {
            cacheName: "font-awesome-styles",
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
          },
        },
        // Cache Font Awesome font files
        {
          urlPattern: ({ url }) =>
            url.origin === "https://stackpath.bootstrapcdn.com" &&
            (url.pathname.endsWith(".woff") ||
              url.pathname.endsWith(".woff2") ||
              url.pathname.endsWith(".ttf")),
          handler: "CacheFirst",
          options: {
            cacheName: "font-awesome-fonts",
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
          },
        },
      ],
    }),

    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
      ],
    }),
  ],
};
