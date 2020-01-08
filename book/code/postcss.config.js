module.exports = ({ file, env }) => ({
    plugins: {
        'postcss-cssnext': {},
        'cssnano': env === 'production' ? {
            safe: true,
            sourcemap: true,
            autoprefixer: false,
        } : false
    }
});