export const validarApiKey = (req, res, next) => {
    const apiKey = req.query.key;
    if (apiKey === '12345') next();
    else res.status(403).send('API Key inválida');
};