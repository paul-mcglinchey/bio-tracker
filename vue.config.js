module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/bio-tracker/' // note the trailing slash
  : '/',
}