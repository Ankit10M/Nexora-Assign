import express from 'express'
import 'dotenv/config'
import { connectDB } from './config/db.js'
import cors from 'cors'
import productRoute from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'

const app = express()
const PORT = process.env.PORT || 5001

const corsOptions = {
   origin: 'https://nexora-assign-mock-ecom.onrender.com',
   methods: ['GET', 'POST', 'DELETE','PUT'],
   credentials: true,
   optionSuccessStatus: 204
}

app.use(cors(corsOptions))
app.use(express.json())

//  db
connectDB()

// routes
app.use('/api/products', productRoute)
app.use('/api/cart', cartRoutes)

app.get('/', (req, res) => {
   res.send('api is working')
})
app.listen(PORT, () => {
   console.log(`server running on ${PORT}`);
})
