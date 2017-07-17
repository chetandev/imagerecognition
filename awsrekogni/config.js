var config = {

    CASSANDRA: {

        ContactPoints: process.env.CASSANDRA_SERVER.split(','),
        Keyspace: process.env.KEYSPACE,
        Pooling: {
            Local: 2,
            Remote: 1
        },
    },


    ERROR: {
        ERROR_LOG_DIR: (process.env.NODE_ENV == 'local' ? __base : '/usrdata') + '/logs/nodelogs/',
        ERROR_LOG_FILE_NAME: (process.env.NODE_ENV == 'local' ? __base : '/usrdata') + `/logs/nodelogs/${process.env.NODE_ENV}-imagerecognition.log`
    },

}

module.exports = config
