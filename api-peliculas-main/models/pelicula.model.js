import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Pelicula = sequelize.define('Pelicula', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    director: {
        type: DataTypes.STRING
    },
    anio: {
        type: DataTypes.INTEGER
    }
});