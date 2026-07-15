const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mahasiswa',
    password: 'Stich14#',
    port: 5432,
});

app.use(express.json());

app.get('/biodata', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM biodata');

        res.status(200).json({
            message: 'Data retrieved successfully',
            data: result.rows,
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Terjadi kesalahan pada server atau database"
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});