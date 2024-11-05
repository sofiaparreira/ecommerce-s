const cors =  require("cors");
const express = require('express')
const autenticacaoRoutes = require("./routes/AutenticacaoRoutes")
const produtosRoutes = require('./routes/ProductRoutes')
const carrinhoRoutes = require('./routes/CarrinhoRoutes')


const app = express()
app.use(cors())
app.use(express.json())

app.use('/user', autenticacaoRoutes)

app.use('/product', produtosRoutes)

app.use('/carrinho', carrinhoRoutes)

const PORT = 3000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
