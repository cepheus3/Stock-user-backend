const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = app => {
    app.use(
        createProxyMiddleware("/payment",{
            target: "https://checkout.chapa.co/checkout",
            changeOrigin: true
        })
    )
}