export const environment = {
    port: 4200,
    mongodb: {
        connectionUrl: 'mongodb://localhost:27017/fin-wonder-db'
    },
    jwt: {
        signature: '1',
        expiration: '6h'
    }
}
