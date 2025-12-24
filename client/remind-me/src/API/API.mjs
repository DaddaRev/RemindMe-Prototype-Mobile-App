const SERVER_URL = ""

/**
 * Get all the medicines of a plan
 * GET /api/plans/:id/scheduled-medicines
 * @param {number} planId - The ID of the plan
 * @param {string} day - Optional day filter (e.g., "Monday")
 * @returns {Promise<Array>} Array of scheduled medicines
 */
const getScheduledMedicines = async (planId, day = null) => {
  try {
    let url = `${SERVER_URL}/api/plans/${planId}/scheduled-medicines`;
    
    if (day) {
      url += `?day=${encodeURIComponent(day)}`;
    }

    const response = await fetch(url);
    
    if (response.ok) {
      const medicines = await response.json();
      return medicines;
    } else if (response.status === 404) {
      throw new Error('Plan not found');
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching scheduled medicines:', error);
    throw error;
  }
};

/**
 * Update medicine information
 * PUT /api/plans/:id_plan/scheduled-medicines/:id_scheduled_medicine
 * @param {number} planId - The ID of the plan
 * @param {number} scheduledMedicineId - The ID of the scheduled medicine
 * @param {Object} medicineData - The medicine data to update
 * @param {string} medicineData.description - Medicine description
 * @param {string} medicineData.assumption_modality - Assumption modality (e.g., "oral")
 * @param {string} medicineData.medicine_type - Medicine type (e.g., "pill", "sachet", "drops")
 * @param {string} medicineData.assumption_time - Time of assumption (e.g., "8:30")
 * @returns {Promise<Object>} Updated medicine data
 */
const updateScheduledMedicine = async (planId, scheduledMedicineId, medicineData) => {
  try {
    const url = `${SERVER_URL}/api/plans/${planId}/scheduled-medicines/${scheduledMedicineId}`;
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(medicineData),
    });
    
    if (response.ok) {
      const result = await response.json();
      return result;
    } else if (response.status === 404) {
      throw new Error('Plan or scheduled medicine not found');
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating scheduled medicine:', error);
    throw error;
  }
};

/**
 * Delete the medicine schedule
 * DELETE /api/plans/:id_plan/scheduled-medicines/:id_scheduled_medicine
 * @param {number} planId - The ID of the plan
 * @param {number} scheduledMedicineId - The ID of the scheduled medicine to delete
 * @returns {Promise<Object>} Deletion confirmation
 */
const deleteScheduledMedicine = async (planId, scheduledMedicineId) => {
  try {
    const url = `${SERVER_URL}/api/plans/${planId}/scheduled-medicines/${scheduledMedicineId}`;
    
    const response = await fetch(url, {
      method: 'DELETE',
    });
    
    if (response.ok) {
      const result = await response.json();
      return result;
    } else if (response.status === 404) {
      throw new Error('Plan or scheduled medicine not found');
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting scheduled medicine:', error);
    throw error;
  }
};

const API = { 
  getScheduledMedicines,
  updateScheduledMedicine,
  deleteScheduledMedicine
};
export default API;

