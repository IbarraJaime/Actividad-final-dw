import { Pelicula } from '../models/pelicula.model.js';

export const getPeliculas = () => Pelicula.findAll();

export const getPelicula = (id) => Pelicula.findByPk(id);

export const createPelicula = (data) => Pelicula.create(data);

export const updatePelicula = async (id, data) => {
    const pelicula = await Pelicula.findByPk(id);
    if (!pelicula) return null;
    return pelicula.update(data);
};

export const deletePelicula = async (id) => {
    const pelicula = await Pelicula.findByPk(id);
    if (!pelicula) return null;
    await pelicula.destroy();
    return true;
};