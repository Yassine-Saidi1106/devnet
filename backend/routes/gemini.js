const express = require('express');
const router = express.Router();

// Test endpoint
router.get('/test', (req, res) => {
    res.json({ 
        message: 'API Gemini prête', 
        hasKey: !!process.env.GEMINI_API_KEY 
    });
});

// Chat endpoint
router.post('/chat', async (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ error: 'Message requis' });
    }
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(503).json({ error: 'API Gemini non configurée' });
    }
    
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: message }] }]
                })
            }
        );
        
        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Désolé, je n\'ai pas pu répondre.';
        
        res.json({ success: true, response: reply });
    } catch (error) {
        console.error('Erreur Gemini:', error);
        res.status(500).json({ error: 'Erreur API Gemini' });
    }
});

module.exports = router;