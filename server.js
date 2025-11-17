
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'data', 'participants.json');

// --- Middleware ---
app.use(cors());
app.use(express.json());
// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));


// --- Helper Functions ---
const readData = async () => {
    try {
        await fs.access(DATA_FILE);
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, create it with an empty array
        if (error.code === 'ENOENT') {
            await writeData([]);
            return [];
        }
        throw error;
    }
};

const writeData = async (data) => {
    // Ensure data directory exists
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
};


// --- API Routes ---

// GET /api/participants - Get all participants
app.get('/api/participants', async (req, res) => {
    try {
        const participants = await readData();
        res.json(participants);
    } catch (error) {
        console.error('Read Error:', error);
        res.status(500).json({ message: 'Error reading data file.' });
    }
});

// POST /api/participants - Register a new participant
app.post('/api/participants', async (req, res) => {
    try {
        const participants = await readData();
        const newParticipant = req.body;

        // Basic validation
        if (!newParticipant.username || !newParticipant.email) {
            return res.status(400).json({ message: 'Username and email are required.' });
        }
        
        // Check for duplicates
        const userExists = participants.some(p => p.username.toLowerCase() === newParticipant.username.toLowerCase() || p.email.toLowerCase() === newParticipant.email.toLowerCase());
        if (userExists) {
            return res.status(409).json({ message: 'Username or email already exists.' });
        }

        const userToSave = {
            id: newParticipant.username, // Use username as ID
            ...newParticipant,
            paid: false,
            verified: false,
            gain: 0,
        };

        participants.push(userToSave);
        await writeData(participants);
        res.status(201).json({ status: 'success', user: userToSave });

    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Error processing registration.' });
    }
});


// PATCH /api/participants/:username - Update a participant
app.patch('/api/participants/:username', async (req, res) => {
    try {
        const participants = await readData();
        const { username } = req.params;
        const updates = req.body;

        const participantIndex = participants.findIndex(p => p.username.toLowerCase() === username.toLowerCase());

        if (participantIndex === -1) {
            return res.status(404).json({ message: 'Participant not found.' });
        }

        // Update participant
        participants[participantIndex] = { ...participants[participantIndex], ...updates };

        await writeData(participants);
        res.json({ status: 'updated', user: participants[participantIndex] });

    } catch (error) {
        console.error('Update Error:', error);
        res.status(500).json({ message: 'Error updating participant.' });
    }
});

// Catch-all to serve index.html for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
