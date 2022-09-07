import express from 'express'
import user from './routes/users'
import thread from './routes/Threads'
// const bodyParser = require('body-parser');

const PORT = 3001


const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({
//     extended: true
// }))

app.use('/api/v1', user)
app.use('/api/v1', thread)

app.listen(PORT, () => console.log(`Rest Api run on http://localhost:${PORT}`))
