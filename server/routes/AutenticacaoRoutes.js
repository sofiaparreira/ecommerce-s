const express = require("express")
const bcrypt =  require("bcrypt");
const jwt = require("jsonwebtoken");
const User  = require('../models/User')

const route = express.Router()

route.post("/register", async (req, res) => {
    try {
        const { email, senha, role } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ error: "Email e senha são obrigatórios!" });
        }

        const isUserExistente = await User.findOne({ where: { email } });
        if (isUserExistente) {
            return res.status(400).json({ error: "Email já cadastrado" });
        }

        const hashedSenha = await bcrypt.hash(senha, 10);

        await User.create({
            email,
            senha: hashedSenha,
            role: role || 'user'
        });

        res.status(201).json({ message: "Usuário cadastrado com sucesso!" });

    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ error: "Erro ao registrar usuário" });
    }
});




route.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ error: "Email e senha são obrigatórios!" });
        }

        const userExistente = await User.findOne({ where: { email } });
        if (!userExistente) {
            return res.status(400).json({ error: "Email não encontrado!" });
        }

        const isSenhaValidada = await bcrypt.compare(senha, userExistente.senha);
        if (!isSenhaValidada) {
            return res.status(400).json({ error: "Senha inválida" });
        }

        const token = jwt.sign({ id: userExistente.id, role: userExistente.role }, 'secreta', { expiresIn: '1h' }); 
        
        res.status(200).json({ token, role: userExistente.role });
    } catch (error) {
        console.error("Erro ao logar:", error.message);
        res.status(500).json({ error: "Erro ao logar" });
    }
});


module.exports = route

