const express = require("express")
const bcrypt =  require("bcrypt");
const jwt = require("jsonwebtoken");
const Product  = require('../models/Product')


const route = express.Router()


route.get("/", async (req, res) => {
    try {
        const produtos = await Product.findAll()
        res.status(200).json(produtos)

    } catch (error) {
        console.error("Erro ao mostrar produtos", error)
        res.status(500).json({ error: "Erro ao mostrar produtos"})        
    }
})

route.post("/adicionar", async (req, res) => {
    try {
        const { nome, tipo , quantidade, preco } = req.body;

        if(!nome || !tipo || !quantidade || !preco){
            return res.status(400).json({error: "Preencha todos os campos"})
        }

       const produtoExiste = await Product.findOne({ where: { nome }})
       if(produtoExiste){
            const novaQuantidade = produtoExiste.quantidade + quantidade;
            await Product.update(
                { quantidade: novaQuantidade},
                { where: {id: produtoExiste.id}}
            );
            return res.status(200).json({ message: "Quantidade em estoque atualizada"})
       } else {

            await Product.create({
                nome, 
                tipo,
                quantidade, 
                preco
            })

            return res.status(201).json({ message: "Produto criado com sucesso"})
       }
    
    } catch (error) {
        console.error("Erro ao adicionar produto", error)
        res.status(400).json({ error: "Erro ao adicionar produto"})
    }   
})  


route.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params
        const produtoDeletado = await Product.destroy({where: {id}})

        if (!produtoDeletado) {
            return res.status(404).json({ error: "Produto não encontrado"})
        }

        res.status(200).json({ error: "Produto deletado com sucesso "})

    } catch (error) {
        console.error("Erro ao deletar produto", error)
        res.status(500).json({ error: "Erro ao deletar produto"})
    }
})


route.put("/update/:id", async (req, res) => {
    try {
        const {id } = req.params
        const { nome, tipo, quantidade, preco} = req.body

        if(!nome || !tipo || !quantidade || !preco){
            return res.status(400).json({ error: "Preencha todos os campos "})
        }

        const produto = await Product.findByPk(id)

        if(!produto) {
            return res.status(404).json({ error: "Produto não encotrado"})
        }

        await Product.update(
            { nome, tipo , quantidade, preco},
            {where: {id}}
        )

        res.status(200).json({message: "Produto atualizado"})


    } catch (error) {
        return res.status(500).json({error: "Erro ao atualizar produto"})
        
    }
})



module.exports = route