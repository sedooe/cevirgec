// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://goo.gl/qPbSyX

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }, {
      test: /\.json$/,
      loader: 'json-loader'
    },
    { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.ttf$|\.eot$|\.woff$|\.woff2$|\.png$/i, loader: "file-loader" }
  ]
  },
};
