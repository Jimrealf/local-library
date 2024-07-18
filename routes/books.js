const express = require('express');
const router = express.Router();
const pool = require('../db');
const { error } = require('console');

//Add a new book
router.post('/', async (req, res) => {
    const { title, author, genre, year } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO books (title, author, genre, year) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, author, genre, year]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all books
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM books');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a book by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM books WHERE id=$1', [
            id,
        ]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a book by id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, genre, year } = req.body;
    try {
        const result = await pool.query(
            'UPDATE books SET title = $1, author = $2, genre = $3, year = $4 WHERE id = $5 RETURNING *',
            [title, author, genre, year, id]
        );
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a book by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'DELETE FROM books WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rows.length > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
