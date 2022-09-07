import express from 'express'
import user from './routes/users'
import thread from './routes/Threads'

const PORT = 3001

const app = express()
app.use(express.json())

app.use('/api', user)
app.use('/api', thread)

app.get('/', async (req, res) =>
  res.json({
    message: 'hello',
  })
)

app.listen(PORT, () => console.log(`Rest Api run on http://localhost:${PORT}`))
