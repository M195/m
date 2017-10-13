module.exports = {
  token: process.env.TELEGRAM_TOKEN,
  ngrokHost: 'https://a94a8b85.ngrok.io',
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 8080,
};