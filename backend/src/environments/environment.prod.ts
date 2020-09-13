export const environment = {
    port: 8000,
    mongodb: {
        connectionUrl: 'mongodb://localhost:27017/fin-wonder-db'
    },
    jwt: {
        signature: '1',
        expiration: '6h'
    }
}
