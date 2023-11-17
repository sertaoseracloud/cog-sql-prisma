const express = require('express');
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
});

//midleware
app.use(express.json());

app.get('/', async (req, res) => {
    return res.json({ ok: true })
})

//Listando todos os usuários
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    return res.status(200).json({ users })
})

// Filtrando um dado atravers dos parametros de rota (:id)
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const users = await prisma.user.findUnique({
        where: { id: parseInt(id) }
    })
    return res.status(200).json(users)
})

//Inserir novo usuario no banco, de ser enviado com corpo
app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    const users = await prisma.user.create({
        data: { name, email }
    })
    return res.status(201).json(users)
})

//Alterar informações do banco de dados
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const users = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { name, email }
    })
    return res.status(200).json(users)
})

//Deletar um usuario pelo id
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.user.delete({
        where: { id: parseInt(id) }
    })
    return res.status(200).json({ ok: true })
})

app.listen(3000, () => console.log("O servidor iniciou na porta 3000"))