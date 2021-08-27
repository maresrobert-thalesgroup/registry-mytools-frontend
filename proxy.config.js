const PROXY_CONFIG = [
    {
    "context": ['/oauth/*'],
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin":true,
    "logLevel": "debug"
    },
    {
    "context": ['/v1/profile'],
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin":true,
    "logLevel": "debug"
    },
  ]