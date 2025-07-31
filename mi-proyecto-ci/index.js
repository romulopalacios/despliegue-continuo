const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_, res) => {
    res.send('¡Hola mundo desde Jenkins Pipeline - Pipeline Test v2.0! 🚀');
});

app.get('/health', (_, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
