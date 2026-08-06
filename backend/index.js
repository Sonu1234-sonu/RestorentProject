import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import apiRoutes from './routes/api.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 5000

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) {
            callback(null, true)
            return
        }

        const allowedLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/
        if (allowedLocalhost.test(origin)) {
            callback(null, true)
        } else {
            callback(new Error('CORS policy does not allow access from this origin'))
        }
    },
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api', apiRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'Bar business API is running' })
})

app.use((err, req, res, next) => {
    console.error(err)
    res.status(err.status || 500).json({ error: err.message || 'Server error' })
})

const startServer = async () => {
    try {
        await connectDB()
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`)
        process.exit(1)
    }
}

startServer()
