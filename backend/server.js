import express from 'express'
import connectDB from "./db/db.js";
import route from "./routes/route.js";
import cors from 'cors'

const app = express()
app.use(cors())



// Database Connection
connectDB();

// JSON
app.use(express.json())

// Load Routes
app.get('/', (req, res) => {
    res.send('API is running')
})

app.use("/api", route)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
})