import sqlite from 'sqlite3';
import dayjs from "dayjs";


const db = new sqlite.Database('bad_luck.sqlite', (err) => {
    if (err) throw err;
});

// Get all medicines of a plan, optionally filtered by day
export const getMedicines = (planId, day = null) => {
    return new Promise((resolve, reject) => {
        let sql = `
            SELECT 
                m.id as id_medicine,
                sm.rowid as id_scheduled_medicine,
                m.name,
                m.description,
                m.assumption_modality,
                m.medicine_type,
                sm.assumption_day,
                sm.assumption_time
            FROM ScheduledMedicine sm
            JOIN Medicine m ON sm.id_medicine = m.id
            WHERE sm.id_plan = ?
        `;
        
        const params = [planId];
        
        if (day) {
            sql += ' AND sm.assumption_day = ?';
            params.push(day);
        }
        
        sql += ' ORDER BY sm.assumption_time';
        
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else if (rows === undefined || rows.length === 0) {
                resolve({ error: "No medicines found for this plan. Check the inserted id." });
            } else {
                resolve(rows);
            }
        });
    });
};

// Update medicine information
export const updateMedicine = (planId, scheduledMedicineId, updates) => {
    return new Promise((resolve, reject) => {
        // First verify the scheduled medicine exists and belongs to the plan
        const verifySql = `
            SELECT sm.rowid, sm.id_medicine, m.id
            FROM ScheduledMedicine sm
            JOIN Medicine m ON sm.id_medicine = m.id
            WHERE sm.rowid = ? AND sm.id_plan = ?
        `;
        
        db.get(verifySql, [scheduledMedicineId, planId], (err, row) => {
            if (err) {
                reject(err);
            } else if (row === undefined) {
                resolve({ error: "Scheduled medicine not found for this plan. Check the inserted ids." });
            } else {
                // Update Medicine table
                const medicineUpdateSql = `
                    UPDATE Medicine 
                    SET 
                        name = COALESCE(?, name),
                        description = COALESCE(?, description),
                        assumption_modality = COALESCE(?, assumption_modality),
                        medicine_type = COALESCE(?, medicine_type)
                    WHERE id = ?
                `;
                
                db.run(medicineUpdateSql, [
                    updates.name || null,
                    updates.description || null,
                    updates.assumption_modality || null,
                    updates.medicine_type || null,
                    row.id_medicine
                ], (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        // Update ScheduledMedicine table
                        const scheduleSql = `
                            UPDATE ScheduledMedicine 
                            SET assumption_time = COALESCE(?, assumption_time)
                            WHERE rowid = ?
                        `;
                        
                        db.run(scheduleSql, [updates.assumption_time || null, scheduledMedicineId], (err) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve({ success: true });
                            }
                        });
                    }
                });
            }
        });
    });
};

// Delete the medicine schedule
export const deleteScheduledMedicine = (planId, scheduledMedicineId) => {
    return new Promise((resolve, reject) => {
        const sql = `
            DELETE FROM ScheduledMedicine 
            WHERE rowid = ? AND id_plan = ?
        `;
        
        db.run(sql, [scheduledMedicineId, planId], function(err) {
            if (err) {
                reject(err);
            } else if (this.changes === 0) {
                resolve({ error: "Scheduled medicine not found for this plan. Check the inserted ids." });
            } else {
                resolve({ success: true });
            }
        });
    });
};




