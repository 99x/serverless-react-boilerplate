var webpack = require('webpack'),
     path = require('path'),
     yaml = require('js-yaml'),
     fs = require('fs');

module.exports = {
    devtool: (process.env.NODE_ENV === 'production')? 'cheap-module-source-map' : 'inline-source-map',
    entry: [
        'script!jquery/dist/jquery.min.js',
        'script!foundation-sites/dist/foundation.min.js',
        './src/index.js'
    ],
    externals: {
        jquery: 'jQuery'
    },
    output: {
        filename: 'bundle.js'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src'],
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel?presets[]=react,presets[]=es2015']
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            }
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(yaml.safeLoad(fs.readFileSync('../serverless/env.yml', 'utf8')))
        }),
    ]
};
