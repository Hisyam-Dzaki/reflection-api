const express = require('express')
require('dotenv').config();
const app = express()
const userRoutes = require("./routes/user")
const reflectionRoutes = require("./routes/reflection")

app.use(express.json())
app.use('/api/v1/users/', userRoutes)
app.use('/api/v1/reflections/', reflectionRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
  })