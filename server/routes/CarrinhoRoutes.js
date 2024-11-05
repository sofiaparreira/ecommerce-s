const express = require("express");
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

const router = express.Router();

router.get("/:idUsuario", async (req, res) => {
  const { idUsuario } = req.params;

  try {
    const usuario = await User.findByPk(idUsuario);
    if (!usuario) {
      return res.status(422).json({ message: "Usuário não encontrado" });
    }

    const produtos = await Product.findAll({
      where: { idUsuario },
      include: {
        model: Product,
        attributes: ["id", "nome", "tipo", "preco", "quantidade"],
      },
    });

    res.status(200).json(produtos);
  } catch (error) {
    console.log("Erro  ao buscar produtos do usuário" + error);
  }
});

//passa o id usuário aqui tbm?? pesquisar
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

    if (!produtoExiste) {
        await Cart.create({
            idUsuario,
            idProduto,
            quantidade,
            precoSoma:  produto.preco * quantidade
        })
      return res
        .status(201)
        .json({ message: "Produto adicionado ao carrinho com sucesso" });
    } else {
        produtoExiste.quantidade += quantidade;
        produtoExiste.precoSoma = produtoExiste.quantidade + produto.preco
        await produtoExiste.save()
    }
  } catch (error) {
    console.log("Erro ao adicionar produto", error)
  }
});
