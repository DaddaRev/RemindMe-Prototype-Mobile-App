import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import { updateMedicine, deleteScheduledMedicine, getMedicines } from './dao.mjs';

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

app.use(cors(corsOptions));

// GET /api/plans/:id/scheduled-medicines/?day
app.get("/api/plans/:id/scheduled-medicines", async (req, res) => {
  const planId = req.params.id;
  const day = req.query.day;

  try {
    const scheduledMedicines = await getMedicines(planId, day);
    res.json(scheduledMedicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});


// PUT /api/plans/:id_plan/scheduled-medicines/:id_scheduled_medicine
app.put("/api/plans/:id_plan/scheduled-medicines/:id_scheduled_medicine", async (req, res) => {
  const planId = req.params.id_plan;
  const scheduledMedicineId = req.params.id_scheduled_medicine;
  const updates = req.body;
  try {
    const result = await updateMedicine(planId, scheduledMedicineId, updates);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/plans/:id_plan/scheduled-medicines/:id_scheduled_medicine
app.delete("/api/plans/:id_plan/scheduled-medicines/:id_scheduled_medicine", async (req, res) => {
  const planId = req.params.id_plan;
  const scheduledMedicineId = req.params.id_scheduled_medicine;

  try {
    const result = await deleteScheduledMedicine(planId, scheduledMedicineId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


