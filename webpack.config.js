var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './client/main.jsx',
    output: {
        path: './public',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                  presets: ['react', 'es2015']
                }
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
                loader: 'file'
            },
            {
                test: /\.[s]*css$/,
                exclude: /(node_modules)/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            },

        ]
    },
    plugins: [
      new ExtractTextPlugin("bundle.css")
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss']
    }
}
