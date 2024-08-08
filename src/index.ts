import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
const PORT = 3000
// create an instance server
const app: Application = express()
// Middleware to parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json())

// HTTP request logger middleware
app.use(morgan('common'))
// HTTP security middleware headers
app.use(helmet())
// Basic rate-limiting middleware for Express
// Apply the rate limiting middleware to all requests
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 1 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'el3b b3ed ya ro7 mama',
  })
)
// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍',
  })
})

//post
app.post('/', (req: Request, res: Response) => {
  res.json({
      message: 'Hello World 🌍 from post',
      data: req.body
  })
})

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})
export default app
