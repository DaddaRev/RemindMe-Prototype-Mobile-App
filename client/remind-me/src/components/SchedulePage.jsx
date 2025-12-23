import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useSearchParams, useLocation } from 'react-router';
import API from '../API/API.mjs';
import MedicineCard from './MedicineCards';
import useSwipe from '../hooks/useSwipe';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const WEEK_MAX_OFFSET = 6; // today + 6 days = 7-day window

function SchedulePage(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const planId = props.planId ?? 1;

  // Get initial dayOffset from URL params, default to 1 (tomorrow)
  const initialOffset = location.state?.returnToOffset || 1;

  // anchor "today" once so the window does not slide during the session
  const baseDateRef = useRef(new Date());

  const [dayOffset, setDayOffset] = useState(initialOffset);
  const [scheduledMedicines, setScheduledMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    // Se c'è un messaggio di feedback (es. "Deleted!"), mostralo
    if (location.state?.feedback) {
      setSuccessMsg(location.state.feedback);
      setShowSuccessModal(true);
      // Puliamo lo state per non rimostrarlo se l'utente ricarica
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const getCurrentDate = () => {
    const currentDate = new Date(baseDateRef.current);
    currentDate.setDate(currentDate.getDate() + dayOffset);
    return currentDate;
  };

  const currentDate = getCurrentDate();
  const dayName = daysOfWeek[currentDate.getDay()];
  const dayNumber = currentDate.getDate();
  const month = currentDate.getMonth();

  const goToPreviousDay = useCallback(() => {
    if (dayOffset <= 1) {
      // If we're at day offset 1 (tomorrow), go back to home page (today)
      navigate('/');
    } else {
      setDayOffset(prev => prev - 1);
    }
  }, [dayOffset, navigate]);

  const goToNextDay = useCallback(() => setDayOffset(prev => Math.min(WEEK_MAX_OFFSET, prev + 1)), []);

  const swipeHandlers = useSwipe(
    goToNextDay,      // onSwipeLeft - go to next day
    goToPreviousDay,  // onSwipeRight - go to previous day
    50                // threshold
  );

  useEffect(() => {
    if (!planId) return;

    const fetchMedicines = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const meds = await API.getScheduledMedicines(planId, dayName);
        setScheduledMedicines(meds || []);
      } catch (err) {
        setFetchError('Unable to load medicines for this day.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [planId, dayName]);

  const atWeekEnd = dayOffset >= WEEK_MAX_OFFSET;

  return (
    <div className="home-page d-flex flex-column" {...swipeHandlers}>

      {showSuccessModal && (
        <div className="in-app-overlay" style={{ zIndex: 9999 }}>
          <div className="custom-modal-card">
            <h4 className="fw-bold text-center text-success">SUCCESS!</h4>
            <p className="text-center fs-5 mb-4">{successMsg}</p>
            <Button
              variant="success"
              onClick={() => setShowSuccessModal(false)}
              className="w-100 fw-bold py-2 border-3"
              style={{ fontSize: '1.2rem' }}
            >
              OK
            </Button>
          </div>
        </div>
      )}

      {props.editMode && (
        <div className="px-3 pt-3 align-self-start" style={{ zIndex: 10 }}>
          <Button
            className="border-3 fw-bold action-btn"
            style={{ background: 'rgba(254, 254, 254, 1)', borderColor: '#2D2D2D', color: '#1a1a1a' }}
            onClick={props.toggleEditMode}
            aria-label="Back"
          >
            ← Back
          </Button>
        </div>
      )}
      {/* Header with the day and the date */}
      <div className="home-header">
        <Card className="border-3 border-dark rounded home-card">
          <Card.Body className="p-3">
            <Row className="align-items-center">
              <Col xs={12} className="text-center">
                <h2 className="fw-bold mb-1">{dayName.toUpperCase()}</h2>
                <p className="mb-0 text-muted fw-semibold">
                  {`${dayNumber}/${month + 1 < 10 ? '0' : ''}${month + 1}`}
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>

      {/* Medicines list */}
      <div className="medicines-list flex-grow-1 overflow-auto py-3">
        <Container>
          {loading && (
            <div className="d-flex justify-content-center my-4">
              <Spinner animation="border" variant="dark" />
            </div>
          )}
          {fetchError && (
            <Alert variant="danger" className="mb-3">
              {fetchError}
            </Alert>
          )}
          {!loading && !fetchError && scheduledMedicines.length === 0 && (
            <Alert variant="secondary" className="mb-3">
              No medicines scheduled for {dayName}.
            </Alert>
          )}
          {scheduledMedicines.map((medicine, idx) => (
            <MedicineCard
              key={medicine.id_sched_med ?? `med-${idx}`}
              medicine={medicine}
              index={idx}
              editMode={props.editMode}
              onEdit={(med) => navigate(`/plans/${planId}/scheduled/${med.id_sched_med}`, {
                state: {
                  medicine: med,
                  autoEdit: true,
                  fromSchedule: true,    
                  dayOffset: dayOffset   // Giorno corrente
                }
              })}
              onClick={() => navigate(`/plans/${planId}/scheduled/${medicine.id_sched_med}`, {
                state: {
                  medicine,
                  autoEdit: false,
                  fromSchedule: true,
                  dayOffset: dayOffset
                }
              })}
            />
          ))}
        </Container>
      </div>

      {/* Action buttons */}
      <div className="action-section border-top border-3 border-dark">
        <Container className="py-3">
          <Row className="g-2">
            {props.editMode ? (
              <Col xs={12}>
                <Button
                  className="w-100 py-3 border-3 fw-bold action-btn"
                  style={{ background: 'rgba(254, 254, 254, 1)', borderColor: '#2D2D2D', color: '#1a1a1a' }}
                  onClick={() => navigate('/help')}
                >
                  <div className="d-flex align-items-center justify-content-center gap-4">
                    <span>ASK FOR HELP</span>
                    <span><i class="bi bi-telephone-fill text-success fs-3"></i></span>
                  </div>
                </Button>
              </Col>
            ) : (
              <>
                <Col xs={6}>
                  <Button
                    className="w-100 py-3 border-3 fw-bold action-btn"
                    style={{ background: 'rgba(242, 238, 238, 1)', borderColor: '#2D2D2D', color: '#000000ff' }}
                    onClick={() => navigate('/plans/new')}
                  >
                    <div className="d-flex align-items-center justify-content-center gap-4">
                      <span>NEW<br />PLAN</span>
                      <span><i class="bi bi-plus-circle-fill fs-3 text-success" ></i></span>
                    </div>
                  </Button>
                </Col>
                <Col xs={6}>
                  <Button
                    className="w-100 py-3 border-3 fw-bold action-btn"
                    style={{ background: 'rgba(254, 254, 254, 1)', borderColor: '#2D2D2D', color: '#1a1a1a' }}
                    onClick={props.toggleEditMode}
                  >
                    <div className="d-flex align-items-center justify-content-center gap-4">
                      <span>UPDATE<br />PLAN</span>
                      <span><i class="bi bi-pencil-fill text-warning fs-3"></i></span>
                    </div>
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default SchedulePage;