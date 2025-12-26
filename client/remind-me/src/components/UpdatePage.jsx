import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { useNavigate, useLocation, useParams } from 'react-router';
import API from "../API/API.mjs";

const UpdatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { planId, medicineId } = useParams(); // Prende gli ID dall'URL

  // Recupera dati passati dalla Home o null se accesso diretto
  const passedData = location.state?.medicine;
  const autoEdit = location.state?.autoEdit || false; // Se true, parte in edit mode

  const fromSchedule = location.state?.fromSchedule || false;
  const originalDayOffset = location.state?.dayOffset || 1;

  // Se autoEdit è true, partiamo subito in editing (Flusso "Update Plan")
  // Altrimenti partiamo in false (Flusso "Info/Lettura")
  const [isEditing, setIsEditing] = useState(autoEdit);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(!passedData); // Carica se non abbiamo dati passati

  // Custom modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Picker Time States
  const [pickerTime, setPickerTime] = useState({ h: '08', m: '00' });
  const [viewMode, setViewMode] = useState('scroll');
  const [activeField, setActiveField] = useState(null);
  const [inputBuffer, setInputBuffer] = useState('');

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (passedData) {
      initializeForm(passedData);
      setLoading(false);
    } else {
      // if no data passed, fetch from API
      const loadData = async () => {
        try {
          const meds = await API.getScheduledMedicines(planId);
          const found = meds ? meds.find(m => m.id_sched_med.toString() === medicineId.toString()) : null;

          if (found) {
            initializeForm(found);
          } else {
            setError("Medicine not found.");
          }
        } catch (err) {
          console.error(err);
          setError("Error loading medicine details.");
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }
  }, [passedData, planId, medicineId]);

  const initializeForm = (data) => {
    setFormData({
      id_sched_med: data.id_sched_med,
      name: data.name,
      time: data.time || data.assumption_time || '08:00',
      modality: data.assumption_modality || 'ORAL',
      type: data.type || data.medicine_type || 'pill',
      description: data.description || '',
      notify: true 
    });
  };

  const goBackWithFeedback = (msg) => {
    if (fromSchedule) {
      // If we came from Schedule, go back there with feedback
      navigate('/schedule', {
        state: {
          feedback: msg,
          returnToOffset: originalDayOffset
        }
      });
    } else {
      // Otherwise go back to Home
      navigate('/', { state: { feedback: msg } });
    }
  };

  const openTimePicker = () => {
    const [h, m] = formData.time.split(':');
    setPickerTime({ h, m });
    setViewMode('scroll');
    setInputBuffer('');
    setActiveField(null);
    setShowTimeModal(true);
  };

  const selectScrollTime = (type, value) => {
    setPickerTime(prev => ({ ...prev, [type]: value.toString().padStart(2, '0') }));
  };

  const activateKeypad = (field) => {
    setViewMode('keypad');
    setActiveField(field);
    setInputBuffer('');
  };

  const handleKeypadInput = (num) => {
    const val = num.toString();
    if (activeField === 'hours') {
      if (inputBuffer === '' && num > 2) {
        setPickerTime(prev => ({ ...prev, h: '0' + val }));
        activateKeypad('minutes');
        return;
      }
      const newBuffer = inputBuffer + val;
      if (newBuffer.length === 2) {
        if (parseInt(newBuffer) > 23) {
          setPickerTime(prev => ({ ...prev, h: '0' + val }));
          setInputBuffer('');
        } else {
          setPickerTime(prev => ({ ...prev, h: newBuffer }));
          activateKeypad('minutes');
        }
      } else {
        setPickerTime(prev => ({ ...prev, h: val }));
        setInputBuffer(newBuffer);
      }
    } else if (activeField === 'minutes') {
      if (inputBuffer === '' && num > 5) {
        setPickerTime(prev => ({ ...prev, m: '0' + val }));
        setActiveField('done');
        return;
      }
      const newBuffer = inputBuffer + val;
      if (newBuffer.length === 2) {
        if (parseInt(newBuffer) > 59) {
          setPickerTime(prev => ({ ...prev, m: '0' + val }));
        } else {
          setPickerTime(prev => ({ ...prev, m: newBuffer }));
          setActiveField('done');
        }
        setInputBuffer('');
      } else {
        setPickerTime(prev => ({ ...prev, m: val }));
        setInputBuffer(newBuffer);
      }
    }
  };

  const handleBackspace = () => {
    setInputBuffer(prev => prev.slice(0, -1));
    if (activeField === 'hours') setPickerTime(prev => ({ ...prev, h: '--' }));
    if (activeField === 'minutes') setPickerTime(prev => ({ ...prev, m: '--' }));
  };

  const saveTime = () => {
    let finalH = pickerTime.h.replace('-', '0').padStart(2, '0');
    let finalM = pickerTime.m.replace('-', '0').padStart(2, '0');
    setFormData({ ...formData, time: `${finalH}:${finalM}` });
    setShowTimeModal(false);
  };

  const scrollHours = Array.from({ length: 24 }, (_, i) => i);
  const scrollMinutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const getModalityIcon = (mod) => {
    switch (mod) { case 'ORAL': return '👄'; case 'INJECTION': return '💉'; case 'TOPICAL': return '🧴'; case 'DROPS': return '💧'; case 'INHALATION': return '💨'; default: return '👄'; }
  };
  const getMedicineIcon = (type) => {
    switch (type) { case 'pill': return '💊'; case 'sachet': return '🥤'; case 'needle': return '💉'; case 'cream': return '🧴'; case 'drops': return '💧'; default: return '💊'; }
  };

  // --- API CALLS ---
  const confirmSave = async () => {
    try {
      const apiData = {
        assumption_time: formData.time,
        assumption_modality: formData.modality,
        medicine_type: formData.type,
        description: formData.description,
        name: formData.name,
      };

      await API.updateScheduledMedicine(planId, formData.id_sched_med, apiData);

      setShowConfirmModal(false);
      setIsEditing(false);

      // Successo: Torna indietro col messaggio
      goBackWithFeedback('Changes saved successfully!');

    } catch (err) {
      console.error(err);
      setShowConfirmModal(false);
      // Errore: Resta qui e mostra il modale rosso
      setErrorMsg('Error saving data. Please try again.');
      setShowErrorModal(true);
    }
  };

  // Funzione chiamata quando si conferma l'eliminazione dal modale
  const confirmDelete = async () => {
    try {
      await API.deleteScheduledMedicine(planId, formData.id_sched_med);
      // Successo: Torna indietro col messaggio
      goBackWithFeedback('Medicine deleted successfully!');
    } catch (err) {
      console.error("Error deleting:", err);
      setShowDeleteModal(false);
      // Errore: Resta qui e mostra il modale rosso
      setErrorMsg('Error deleting medicine.');
      setShowErrorModal(true);
    }
  };

  const handleTopRightAction = () => {
    if (isEditing) {
      // MODALITA' EDIT: Il tasto è un cestino -> APRI MODALE DELETE
      setShowDeleteModal(true);
    } else {
      // MODALITA' LETTURA: Il tasto è una matita -> ATTIVA MODIFICA
      setIsEditing(true);
    }
  };

  if (loading) return <div className="p-5 text-center"><Spinner animation="border" /></div>;
  if (error) return <div className="p-5"><Alert variant="danger">{error}</Alert><Button onClick={() => navigate('/')}>Go Back</Button></div>;
  if (!formData) return null;

  const isTimeValid = !pickerTime.h.includes('-') && !pickerTime.m.includes('-');

  return (
    <div className="d-flex flex-column h-100" style={{ backgroundColor: '#F5E6D3', position: 'relative' }}>

      {/* TOP BAR: Back button styled like HomePage */}
      <div className="px-3 pt-3 align-self-start" style={{ zIndex: 10 }}>
        <Button
          className="border-3 fw-bold action-btn"
          style={{ background: 'rgba(254, 254, 254, 1)', borderColor: '#2D2D2D', color: '#1a1a1a' }}
          onClick={() => navigate(-1)}
          aria-label="Back"
        >
          ← Back
        </Button>
      </div>

      {/* BODY */}
      <Container className="py-3 flex-grow-1 overflow-auto no-scrollbar">
        {/* Hero presentation: distinct from below cards */}
        <div className="px-2 mb-2">
          <div className="border rounded-2 p-4 border-dark" style={{ background: 'linear-gradient(135deg, #FDF6D9 0%, #FCECC1 100%)', boxShadow: '0 3px 12px rgba(224, 175, 101, 0.18)' }}>
            <Row className="align-items-center">
              <Col xs={9} sm={9}>
                <div className="fw-bold text-uppercase text-truncate" style={{ fontSize: '2rem', lineHeight: '1.15', color: '#2D2D2D', letterSpacing: '0.8px', whiteSpace: 'nowrap' }}>
                  {formData.name}
                </div>
              </Col>
              <Col xs={3} sm={3} className="d-flex justify-content-end">
                <Button
                  variant="outline-dark"
                  className="rounded-circle d-flex align-items-center justify-content-center border-3 fw-bold"
                  style={{ width: '65px', height: '65px', fontSize: '1.9rem', borderColor: '#2D2D2D', color: '#2D2D2D', backgroundColor: '#FFFBF7', padding: 0 }}
                  onClick={handleTopRightAction}
                >
                  {isEditing ? '🗑️' : '✏️'}
                </Button>
              </Col>
            </Row>
          </div>
        </div>
        {!isEditing && (
          // VISTA LETTURA
          <div className="d-flex flex-column gap-3 px-2 py-2">

            {/* 1. Time */}
            <div className="border-3 rounded-2 p-3" style={{ borderColor: '#2D2D2D', background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8E7 100%)', boxShadow: '0 2px 8px rgba(224, 175, 101, 0.15)' }}>
              <Row className="align-items-center g-1">
                <Col xs={4} className="text-center">
                  <div className="text-uppercase fw-bold" style={{ fontSize: '0.95rem', color: '#3d3d00', letterSpacing: '0.8px', lineHeight: '1.3' }}>Assumption<br />Time</div>
                </Col>
                <Col xs={4} className="d-flex justify-content-center">
                  <div className="d-flex justify-content-center align-items-center" style={{ width: '55px', height: '55px', background: '#FFF9ED', borderRadius: '10px' }}>
                    <span style={{ fontSize: '2rem', lineHeight: 1 }}>⏰</span>
                  </div>
                </Col>
                <Col xs={4} className="text-center">
                  <div className="fw-bold" style={{ color: '#2D2D2D', fontSize: '1.8rem', letterSpacing: '1px' }}>{formData.time}</div>
                </Col>
              </Row>
            </div>

            {/* 2. Modality */}
            <div className="border-3 rounded-2 p-3" style={{ borderColor: '#2D2D2D', background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8E7 100%)', boxShadow: '0 2px 8px rgba(224, 175, 101, 0.15)' }}>
              <Row className="align-items-center g-1">
                <Col xs={4} className="text-center">
                  <div className="text-uppercase fw-bold" style={{ fontSize: '0.95rem', color: '#3d3d00', letterSpacing: '0.8px', lineHeight: '1.3' }}>Assumption<br />Modality</div>
                </Col>
                <Col xs={4} className="d-flex justify-content-center">
                  <div className="d-flex justify-content-center align-items-center" style={{ width: '55px', height: '55px', background: '#FFF9ED', borderRadius: '10px' }}>
                    <span style={{ fontSize: '2rem', lineHeight: 1 }}>{getModalityIcon(formData.modality)}</span>
                  </div>
                </Col>
                <Col xs={4} className="text-center">
                  <div className="fw-bold text-uppercase" style={{ color: '#2D2D2D', fontSize: '1.4rem' }}>{formData.modality}</div>
                </Col>
              </Row>
            </div>

            {/* 3. Medicine Type */}
            <div className="border-3 rounded-2 p-3" style={{ borderColor: '#2D2D2D', background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8E7 100%)', boxShadow: '0 2px 8px rgba(224, 175, 101, 0.15)' }}>
              <Row className="align-items-center g-1">
                <Col xs={6} className="text-center">
                  <div className="text-uppercase fw-bold" style={{ fontSize: '0.95rem', color: '#3d3d00', letterSpacing: '0.8px', lineHeight: '1.3' }}>Medicine<br />Type</div>
                </Col>
                <Col xs={6} className="d-flex justify-content-center">
                  <div className="d-flex justify-content-center align-items-center border-3" style={{ width: '55px', height: '55px', borderColor: '#2D2D2D', background: '#FFF9ED', borderRadius: '10px' }}>
                    <span style={{ fontSize: '2rem' }}>{getMedicineIcon(formData.type)}</span>
                  </div>
                </Col>
              </Row>
            </div>

            {/* 4. Description */}
            <div className="border-3 rounded-2 p-3" style={{ borderColor: '#2D2D2D', background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8E7 100%)', boxShadow: '0 2px 8px rgba(224, 175, 101, 0.15)' }}>
              <div className="text-uppercase fw-bold mb-2" style={{ fontSize: '0.95rem', color: '#3d3d00', letterSpacing: '0.8px' }}>
                Description
              </div>
              <div className="fst-italic px-3 py-2 border-start border-3" style={{ minHeight: '60px', fontSize: '1rem', lineHeight: '1.5', color: '#555', borderColor: '#e0af65 !important' }}>
                {formData.description || <span className="text-muted opacity-75">No description available</span>}
              </div>
            </div>

          </div>
        )}

        {isEditing && (
          // Editing VIEW
          <div className="d-flex flex-column gap-3 px-1 pb-4">
            {/* 1. Time Select */}
            <div className="d-flex align-items-center justify-content-between">
              <div className="label-text w-50">Assumption<br />Time:</div>
              <div className="w-100 ms-2 d-flex align-items-center" onClick={openTimePicker}>
                <div className="d-flex justify-content-center align-items-center" style={{ width: '45px', flexShrink: 0, marginRight: '8px' }}>
                  <span style={{ fontSize: '2rem', lineHeight: 1 }}>⏰</span>
                </div>
                <Form.Control
                  type="text"
                  readOnly
                  value={formData.time}
                  className="edit-field-box fw-bold border-3"
                  style={{
                    cursor: 'pointer', borderColor: '#2D2D2D', height: '55px', backgroundColor: '#FFFBF7', color: '#2D2D2D', fontSize: '1.4rem', textAlign: 'center',
                    flex: 1, width: '1px', minWidth: 0
                  }}
                />
              </div>
            </div>
            {/* 2. Modality Select */}
            <div className="d-flex align-items-center justify-content-between mt-2">
              <div className="label-text w-50">Assumption <br />Modality:</div>
              <div className="w-100 ms-2 d-flex align-items-center">
                <div className="d-flex justify-content-center align-items-center" style={{ width: '45px', flexShrink: 0, marginRight: '8px' }}>
                  <span style={{ fontSize: '2rem', lineHeight: 1 }}>{getModalityIcon(formData.modality)}</span>
                </div>
                <Form.Select
                  className="edit-field-box fw-bold border-3 text-uppercase"
                  style={{
                    appearance: 'none', cursor: 'pointer', borderColor: '#2D2D2D', height: '55px', textAlign: 'left',
                    fontSize: '0.95rem', paddingRight: '35px',
                    flex: 1, width: '1px', minWidth: 0,
                  }}
                  value={formData.modality}
                  onChange={(e) => setFormData({ ...formData, modality: e.target.value })}
                >
                  <option value="ORAL">ORAL</option>
                  <option value="INJECTION">INJECTION</option>
                  <option value="TOPICAL">TOPICAL</option>
                  <option value="DROPS">DROPS</option>
                  <option value="INHALATION">INHALATION</option>
                </Form.Select>
              </div>
            </div>
            {/* 3. Medicine Type */}
            <div className="d-flex align-items-center justify-content-between mt-2">
              <div className="label-text">Medicine Type:</div>
              <div className="d-flex align-items-center">
                <div className="edit-field-box justify-content-center bg-white" style={{ width: '80px', padding: '5px' }}>
                  <span style={{ fontSize: '2rem' }}>{getMedicineIcon(formData.type)}</span>
                </div>
              </div>
            </div>
            {/* 4. Description */}
            <div className="mt-2 w-100">
              <div className="label-text mb-1">Description:</div>
              <textarea
                className="edit-field-box text-start fw-normal align-items-start h-auto w-100"
                rows="4"
                style={{ resize: 'none' }}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description..."
              ></textarea>
            </div>
            {/* Notification Switch */}
            <div className="d-flex align-items-center justify-content-between mt-2 p-3 rounded-3 border-3" style={{ border: '2px solid #2D2D2D', background: '#FFFBF7' }}>
              <div className="label-text" style={{ fontSize: '0.85rem' }}>SEND NOTIFICATION</div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={formData.notify}
                  onChange={(e) => setFormData({ ...formData, notify: e.target.checked })}
                />
                <span className="slider"></span>
              </label>
            </div>
            <Button variant="success" className="w-100 py-3 mt-3 btn-thick-border text-uppercase mb-2" style={{ borderRadius: '12px', fontSize: '1.2rem' }} onClick={() => setShowConfirmModal(true)}>
              CONFIRM CHANGES ✓
            </Button>
          </div>
        )}
      </Container>

      <div className="action-section p-3 mt-auto border-top border-3 border-dark">
        <div className="d-flex justify-content-center">
          <Button 
            variant="outline-dark" 
            className="py-2 px-4 fs-5 fw-bold btn-thick-border"
            style={{ borderRadius: '12px', minWidth: '220px' }}
          >
            <div className="d-flex align-items-center justify-content-center gap-3">
              <span className="text-uppercase">ASK FOR<br />HELP</span>
              <span><i className="bi bi-telephone-fill text-success fs-3"></i></span>
            </div>
          </Button>
        </div>
      </div>

      {showConfirmModal && (
        <div className="in-app-overlay">
          <div className="custom-modal-card">
            <h4 className="fw-bold text-center">CONFIRM CHANGES?</h4>
            <p className="text-center fs-5">Are you sure you want to save?</p>
            <div className="d-flex justify-content-between gap-3 mt-2">
              <Button variant="danger" onClick={() => setShowConfirmModal(false)} className="flex-grow-1 border-2 fw-bold">CANCEL</Button>
              <Button variant="success" onClick={confirmSave} className="flex-grow-1 fw-bold">YES, SAVE</Button>
            </div>
          </div>
        </div>
      )}

      {showTimeModal && (
        <div className="in-app-overlay">
          <div className="custom-modal-card" style={{ width: '90%' }}>
            <h4 className="fw-bold text-center mb-0">SET TIME</h4>
            <div className="tp-header">
              <div className={`tp-digit-box ${activeField === 'hours' ? 'active' : ''}`} onClick={() => activateKeypad('hours')}>{pickerTime.h}</div>
              <div className="tp-separator">:</div>
              <div className={`tp-digit-box ${activeField === 'minutes' ? 'active' : ''}`} onClick={() => activateKeypad('minutes')}>{pickerTime.m}</div>
            </div>
            {viewMode === 'scroll' ? (
              <div className="tp-scroll-container">
                <div className="tp-column">{scrollHours.map(h => <div key={h} className={`tp-item ${pickerTime.h === h.toString().padStart(2, '0') ? 'selected' : ''}`} onClick={() => selectScrollTime('h', h.toString().padStart(2, '0'))}>{h.toString().padStart(2, '0')}</div>)}</div>
                <div className="tp-column">{scrollMinutes.map(m => <div key={m} className={`tp-item ${pickerTime.m === m.toString().padStart(2, '0') ? 'selected' : ''}`} onClick={() => selectScrollTime('m', m.toString().padStart(2, '0'))}>{m.toString().padStart(2, '0')}</div>)}</div>
              </div>
            ) : (
              <div className="tp-numpad">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => <div key={n} className="tp-key" onClick={() => handleKeypadInput(n)}>{n}</div>)}
                <div className="tp-key ghost" onClick={() => setViewMode('scroll')}>↩</div>
                <div className="tp-key" onClick={() => handleKeypadInput(0)}>0</div>
                <div className="tp-key ghost" onClick={handleBackspace}>⌫</div>
              </div>
            )}
            <div className="d-flex justify-content-between gap-3 mt-2">
              <Button variant="danger" className="flex-grow-1 border-2 fw-bold" onClick={() => setShowTimeModal(false)}>CANCEL</Button>
              <Button variant={isTimeValid ? "success" : "dark"} className="flex-grow-1 fw-bold" onClick={saveTime} disabled={!isTimeValid}>OK</Button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="in-app-overlay">
          <div className="custom-modal-card">
            <h4 className="fw-bold text-center text-danger">DELETE MEDICINE?</h4>
            <p className="text-center fs-5">
              Are you sure you want to delete <strong>{formData.name}</strong> from your plan?
            </p>
            <div className="d-flex justify-content-between gap-3 mt-2">
              <Button
                variant="outline-dark"
                onClick={() => setShowDeleteModal(false)}
                className="flex-grow-1 border-2 fw-bold"
              >
                CANCEL
              </Button>
              <Button
                variant="danger"
                onClick={confirmDelete}
                className="flex-grow-1 fw-bold"
              >
                YES, DELETE
              </Button>
            </div>
          </div>
        </div>
      )}

      {showErrorModal && (
        <div className="in-app-overlay">
          <div className="custom-modal-card">
            <h4 className="fw-bold text-center text-danger">ERROR ⚠️</h4>
            <p className="text-center fs-5">{errorMsg}</p>
            <Button variant="dark" onClick={() => setShowErrorModal(false)} className="w-100 fw-bold">
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePage;