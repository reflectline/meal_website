const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/js/script.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'src/css', to: 'css' },
                { from: 'src/icons', to: 'icons' },
                { from: 'src/img', to: 'img' },
                { from: 'src/index.html', to: 'index.html' }
            ]
        })
    ]
};
