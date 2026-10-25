
import 'dotenv/config';
import express, { type ErrorRequestHandler } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import appareilsRouter from './routes/appareils.js';

const app = express();
const PORT = Number(process.env.PORT) || 3001;
const MONGODB_URI =
  process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/appareils_db';

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'API Appareils opérationnelle' });
});

app.use('/api/appareils', appareilsRouter);

// Gestion centralisée des erreurs
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);

  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).json({ message: 'Validation MongoDB échouée' });
    return;
  }

  res.status(500).json({ message: 'Erreur interne du serveur' });
};

app.use(errorHandler);

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connexion à MongoDB réussie');

    app.listen(PORT, () => {
      console.log(`API disponible sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Impossible de démarrer le serveur :', error);
    process.exit(1);
  }
}

void startServer();
