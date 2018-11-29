module.exports = {
    entry: './public/script/index.js',
    output: {
        path: __dirname + '/public/script/',
        filename: 'bundle.js'
    },
    watch: true,
    historyApiFallback: true,
    module: {
        loaders: [{
            exclude: /(node_modules)/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    }
}