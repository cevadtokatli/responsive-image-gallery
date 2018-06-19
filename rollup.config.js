const pkg = require('./package');
const coffee = require('rollup-plugin-coffee-script');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');

const banner = `/*!
 *   Responsive Image Gallery
 *   version: ${pkg.version}
 *    author: ${pkg.author.name} <${pkg.author.email}>
 *   website: ${pkg.author.url}
 *    github: ${pkg.repository.url}
 *   license: ${pkg.license}
 */`;

module.exports = {
    input: 'src/index.coffee',
    output: [
        {
            banner,
            file: 'dist/responsive-image-gallery.js',
            format: 'umd',
            name: 'ResponsiveImageGallery'
        },
        {
            banner,
            file: 'dist/responsive-image-gallery.common.js',
            format: 'cjs'
        },
        {
            banner,
            file: 'dist/responsive-image-gallery.esm.js',
            format: 'es'
        }
    ],
    plugins: [
        coffee({
            exclude: /node_modules/
        }),
        nodeResolve({
            extensions: ['.js', '.coffee'] 
        }),
        commonjs({
            extensions: ['.js', '.coffee']
        }),
        babel({
            plugins: [
                ['external-helpers']
            ],
            presets: [
                ['env', {modules: false}]
            ]
        })
    ]
}