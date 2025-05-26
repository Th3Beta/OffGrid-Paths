const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'OffGridPaths'
});

// --- REGISTRO ---
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        (err) => {
            if (err) return res.json({ success: false, message: 'Error al registrar usuario.' });
            res.json({ success: true, message: 'Usuario registrado correctamente.' });
        }
    );
});

// --- LOGIN ---
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, result) => {
        if (result.length === 0) {
            return res.json({ success: false, message: 'Usuario no encontrado.' });
        }

        const isMatch = await bcrypt.compare(password, result[0].password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Contraseña incorrecta.' });
        }

        res.json({ success: true, message: 'Inicio de sesión exitoso.' });
    });
});

// Puerto del servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
