import express from 'express';
import morgan from 'morgan';
import cors from "cors";

// init express
const app = express();
const port = 3001;

// middlewares
app.use(express.json());
app.use(morgan('dev'));

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessState: 200,
  credentials: true
};

// GET /api/plans/:id/scheduled-medicines
app.get("/api/plans/:id/scheduled-medicines", async (req, res) => {
    try {
        
    } catch (error) {
        
    }
});

