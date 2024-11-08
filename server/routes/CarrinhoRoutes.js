const express = require("express");
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");


const router = express.Router();

router.get('/:idUsuario', async (req,res) => {
  const { idUsuario } = req.params

  try {
      const user = await User.findByPk(idUsuario)
      if(!user) {
          return res.status(404).json({ message: 'User not found' })
      }

      const items = await Cart.findAll({
          where: { idUsuario },
          include: {
              model: Product,
              attributes: ['id', 'nome', 'tipo', 'preco', 'quantidade']
          }
      })
      res.status(200).json(items)
  } catch (error) {
      console.error("Error fetching cart items: ", error)
      res.status(500).json({ message: 'Error fetching cart items' })
  }

})


router.post("/adicionar", async (req, res) => {
  const { idUsuario, idProduto, quantidade } = req.body;

  try {
    const usuario = await User.findByPk(idUsuario);

    if (!usuario) {
      return res.status(422).json({ message: "Usuário não encontrado" });
    }


    const produto = await Product.findByPk(idProduto)
    if(!produto){
        return res.status(404).json({ error: "Produto não encontrado"})
    }

    const produtoExiste = await Cart.findOne({
      where: { idUsuario, idProduto },
    });

    if (produtoExiste) {
      produtoExiste.quantidade += quantidade;
      produtoExiste.precoTotal = produtoExiste.quantidade + produto.preco
      await produtoExiste.save()
       
    } else {
      await Cart.create({
        idUsuario,
        idProduto,
        quantidade,
        precoTotal:  produto.preco * quantidade
    })
  return res
    .status(201)
    .json({ message: "Produto adicionado ao carrinho com sucesso" });
    }
  } catch (error) {
    console.log("Erro ao adicionar produto", error)
  }
});


module.exports = router
