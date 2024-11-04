
const express = require("express")
const cors =  require("cors");
const autenticacaoRoutes = require("./routes/AutenticacaoRoutes")
const produtosRoutes = require('./routes/ProductRoutes')


const app = express()
app.use(cors())
app.use(express.json())

app.use('/user', autenticacaoRoutes)

app.use('/product', produtosRoutes)

const PORT = 3000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
