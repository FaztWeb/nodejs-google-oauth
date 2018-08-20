module.exports = {
    google: {
        clientID: '',
        clientSecret: '',
        callbackURL: '/auth/google/cb'
    },

    mongodb: {
        mongoURI: 'mongodb://localhost:27017/google-node-login'
    },

    session: {
        key: 'mysecretword'
    }
};