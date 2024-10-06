const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

const users = []; // Un tableau pour stocker des utilisateurs fictifs
const SECRET_KEY = 'votre_clé_secrète'; // Utilisée pour signer les JWT (garder cette clé sécurisée)

// Endpoint pour s'inscrire
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Hashage du mot de passe avant de le stocker
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    res.json({ message: 'Utilisateur inscrit avec succès' });
});

// Endpoint pour se connecter et générer un JWT
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Génération d'un JWT
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
});

// Middleware pour vérifier le JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token requis' });
    }

    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalide' });
        }
        req.user = decoded; // Les informations du token sont accessibles via req.user
        next();
    });
};

// Endpoint protégé
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: `Bienvenue, ${req.user.username}, vous avez accès à cette ressource protégée !` });
});

app.listen(3000, () => {
    console.log('Le serveur tourne sur <http://localhost:3000>');
});