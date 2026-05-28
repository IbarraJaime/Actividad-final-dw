import fs from 'fs';
import path from 'path';

export const logger = (req, res, next) => {
    const log = `${new Date().toLocaleString()} - ${req.method} ${req.url}\n`;
    const ruta = path.join(process.cwd(), 'log.txt');
    fs.writeFileSync(ruta, log, { flag: 'a' });
    next();
};