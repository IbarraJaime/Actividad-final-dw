import express from 'express';
import * as service from '../services/peliculas.service.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const data = await service.getPeliculas();
    res.json(data);
});

router.get('/:id', async (req, res) => {
    const data = await service.getPelicula(req.params.id);
    res.json(data);
});

router.post('/', async (req, res) => {
    const data = await service.createPelicula(req.body);
    res.json(data);
});

router.put('/:id', async (req, res) => {
    const data = await service.updatePelicula(req.params.id, req.body);
    res.json(data);
});

router.delete('/:id', async (req, res) => {
    const data = await service.deletePelicula(req.params.id);
    res.json({ eliminado: data });
});

export default router;