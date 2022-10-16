const PROXY_CONFIG = [
    {
        context: ['/api'],
        target: 'http://suporte.williansistemas.kinghost.net',
        secure: false,
        logLevel: 'debug'
    }
];

module.exports = PROXY_CONFIG;