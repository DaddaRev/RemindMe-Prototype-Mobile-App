import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import readline from 'readline';
import { updateMedicine, deleteScheduledMedicine, getMedicines } from './dao.mjs';
import { translateDayEngToIta } from './utils.mjs';

// init express
const app = express();
const port = 3001;

// Notification state
let shouldNotify = false;

// Setup readline interface to listen for console input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  if (input.trim().toLowerCase() === 'notify') {
    shouldNotify = true;
    console.log('✅ Notification triggered! Will send on next check.');
  }
});

// middlewares
app.use(express.json());
app.use(morgan('dev'));

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);  // let non-browser clients pass
    
    // let localhost pass
    if (origin.indexOf('localhost') !== -1) return callback(null, true);
    
    // let ngrok domains pass
    if (origin.indexOf('ngrok') !== -1) return callback(null, true);
    
    // block other origins
    callback(new Error('Not allowed by CORS'));
  },
  optionsSuccessState: 200,
  credentials: true
};

app.use(cors(corsOptions));

// GET /api/plans/:id/scheduled-medicines/?day
app.get("/api/plans/:id/scheduled-medicines", async (req, res) => {
  const planId = req.params.id;
  const dayEng = req.query.day;
  const day = translateDayEngToIta(dayEng);

  try {
    const scheduledMedicines = await getMedicines(planId, day);
    res.json(scheduledMedicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

// GET /api/notifications/check
app.get("/api/notifications/check", async (req, res) => {
  try {
    if (shouldNotify) {
      // Reset to false after sending notification
      shouldNotify = false;
      res.json({ status: 'yes', message: "TACHIPIRINA" }); //Hard coded tachipirina for demo
    } else {
      res.json({ status: 'no' });
    }
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


