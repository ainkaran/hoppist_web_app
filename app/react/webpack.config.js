module.exports = {
    entry: './routes.jsx',
    output: {
        filename: '../../public/index.js', //this is the default name, so you can skip it
        //at this directory our bundle file will be available
        //make sure port 8090 is used when launching webpack-dev-server
        publicPath: 'http://localhost:8090/assets'
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
            }
        ]
    },
    externals: {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        'react': 'React'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}
