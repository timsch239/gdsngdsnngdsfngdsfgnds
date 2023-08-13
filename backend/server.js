require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const commissionRoutes = require('./routes/commissions')
const userRoutes = require('./routes/user')

const app = express()

app.use(express.json())
app.use(cors());

app.use('/api/commissions', commissionRoutes)
app.use('/api/user', userRoutes)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB connected')

        app.listen(process.env.PORT, () => {
            console.log('Listening on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })
