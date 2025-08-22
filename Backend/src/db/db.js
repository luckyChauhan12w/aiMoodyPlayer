const mongoose = require('mongoose');


function connectdb() {

    mongoose.connect(process.env.MONGO_DB_URL)
        .then(() => {
            console.log('Mongodb connected')
        })
        .catch(() => {
            console.log('Mongodb not connected')
        })
}

module.exports = connectdb