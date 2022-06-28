module.exports = function(htmlWebpackPlugin, options) {
    const innerHTML = options.fn(this);
    return require('../partials/layout.hbs')({
        title: htmlWebpackPlugin.options.title,
        ogTitle: htmlWebpackPlugin.options.ogTitle,
        ogImage: htmlWebpackPlugin.options.ogImage,
        ogDescription: htmlWebpackPlugin.options.ogDescription,
        innerHTML
    })
}