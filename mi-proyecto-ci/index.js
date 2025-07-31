const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint
app.get('/api/status', (_, res) => {
    res.json({ 
        message: '¡Hola mundo desde Jenkins Pipeline - Pipeline Test v2.0! 🚀',
        status: 'OK', 
        timestamp: new Date().toISOString(),
        version: '2.0.0'
    });
});

app.get('/health', (_, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    console.log(`Visita: http://localhost:${PORT}`);
});
