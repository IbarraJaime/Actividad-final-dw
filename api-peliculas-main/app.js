import express from 'express'
import fs from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'
import { Sequelize, DataTypes } from 'sequelize'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API peliculas funcionando')
})

const SECRET_KEY = 'mi_clave_secreta_super_segura'


app.post('/login', (req, res) => {
    const { username, password } = req.body

    if (username === 'admin' && password === '1234') {
        const user = { id: 1, name: 'Heber' }

        const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' })

        res.json({ message: 'Login exitoso', token })
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' })
    }
})

const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(401).json({ message: 'Token requerido' })

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token inválido o expirado' })
        req.user = decoded
        next()
    })
}

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
})

const Pelicula = sequelize.define('Pelicula', {
    titulo: DataTypes.STRING,
    director: DataTypes.STRING,
    anio: DataTypes.INTEGER
})

const logger = (req, res, next) => {
    const log = `${new Date().toLocaleString()} - ${req.method} ${req.url}\n`
    const ruta = path.join(process.cwd(), 'log.txt')
    fs.writeFileSync(ruta, log, { flag: 'a' })
    next()
}

app.use(logger)


app.get('/peliculas', verificarToken, async (req, res) => {
    const data = await Pelicula.findAll()
    res.json(data)
})

app.get('/peliculas/:id', verificarToken, async (req, res) => {
    const data = await Pelicula.findByPk(req.params.id)
    res.json(data)
})

app.post('/peliculas', verificarToken, async (req, res) => {
    const data = await Pelicula.create(req.body)
    res.json(data)
})

app.put('/peliculas/:id', verificarToken, async (req, res) => {
    const peli = await Pelicula.findByPk(req.params.id)
    if (!peli) return res.status(404).send('No encontrada')

    await peli.update(req.body)
    res.json(peli)
})

app.delete('/peliculas/:id', verificarToken, async (req, res) => {
    const peli = await Pelicula.findByPk(req.params.id)
    if (!peli) return res.status(404).send('No encontrada')

    await peli.destroy()
    res.json({ mensaje: 'Eliminada' })
})

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Servidor en http://localhost:${port}`)
    })
})