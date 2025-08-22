const app = require('./src/app')
require('dotenv').config();
const connectdb = require('./src/db/db')

connectdb()

app.listen(3000, () => {
    console.log('server started ')
})