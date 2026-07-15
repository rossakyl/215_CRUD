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

//post 
app.post('/biodata', async (req, res) => {
    const { id, nama, nim, kelas } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO biodata(id, nama, nim, kelas) VALUES($1, $2, $3, $4) RETURNING *',
            [id, nama, nim, kelas]
        );

        res.status(201).json({
            message: 'Data added successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Terjadi kesalahan pada server atau database"
        });
    }
});

//put
app.put('/biodata/:id', async (req, res) => {
    const { id } = req.params;
    const { nama, nim, kelas } = req.body;

    try {
        const result = await pool.query(
            'UPDATE biodata SET nama=$1, nim=$2, kelas=$3 WHERE id=$4 RETURNING *',
            [nama, nim, kelas, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Data not found"
            });
        }

        res.status(200).json({
            message: 'Data updated successfully',
            data: result.rows[0],
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