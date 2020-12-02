const withTM = require('next-transpile-modules')([
  '@material-ui/core',
  '@material-ui/labs',
  '@material-ui/icons'
])

module.exports = {
  ...withTM(),
  i18n: {
    locales: ['es'],
    defaultLocale: 'es'
  }
}
