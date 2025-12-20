import React, { useCallback, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import API from '../API/API.mjs';
import MedicineCard from './MedicineCards';
import useAlignedClock from '../hooks/useAlignedClock';
import useSwipe from '../hooks/useSwipe';

const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function HomePage(props) {
  const navigate = useNavigate();
  const planId = props.planId ?? 1;


  const [scheduledMedicines, setScheduledMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

   // personalized hook to have aligned time in both status bar and home page
  const currentTime = useAlignedClock();

  const today = new Date();
  const dayName = daysOfWeek[today.getDay()];
  const dayNumber = today.getDate();
  const month = today.getMonth();
  
  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const timeString = `${hours}:${minutes}`;

  useEffect(() => {
    if (!planId) return;

    const fetchMedicines = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const meds = await API.getScheduledMedicines(planId, dayName);
        setScheduledMedicines(meds || []);
      } catch (err) {
        setFetchError('Unable to load medicines for today.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [planId, dayName]);

  const goToNextDay = useCallback(() => {
    // Navigate to schedule page starting from day offset 1 (tomorrow)
    navigate('/schedule?dayOffset=1');
  }, [navigate]);

  const swipeHandlers = useSwipe(
    goToNextDay,  // onSwipeLeft - go to next day
    null,         // onSwipeRight - disabled on home page (today)
    50            // threshold
  );

  return (
    <div className="home-page d-flex flex-column" {...swipeHandlers}>
      {/* Header with the day, date and time */}
      <div className="home-header">
        <Card className="border-3 border-dark rounded home-card">
          <Card.Body className="p-3">
            <Row className="align-items-center">
              <Col xs={7} className="text-start">
                <h2 className="fw-bold mb-1" style={{ fontSize: '1.8rem' }}>{dayName.toUpperCase()}</h2>
                <p className="mb-0 text-muted fw-semibold" style={{ fontSize: '1rem' }}>
                  {`${dayNumber}/${month + 1 < 10 ? '0' : ''}${month + 1}`}
                </p>
              </Col>
              <Col xs={5} className="text-end">
                <h2 className="fw-bold mb-0" style={{ fontSize: '2rem', whiteSpace: 'nowrap' }}>{timeString}</h2>
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
              No medicines scheduled for today.
            </Alert>
          )}
          {scheduledMedicines.map((medicine, idx) => (
            <MedicineCard key={medicine.id_sched_med ?? `med-${idx}`} medicine={medicine} index={idx} />
          ))}
        </Container>
      </div>

      {/* Action buttons */}
      <div className="action-section border-top border-3 border-dark">
        <Container className="py-3">
          <Row className="g-2">
            <Col xs={6}>
              <Button
                className="w-100 py-3 border-3 fw-bold action-btn"
                style={{ background: 'rgba(242, 238, 238, 1)', borderColor: '#2D2D2D', color: '#000000ff' }}
                /* onClick={() => navigate('/plans/new')} */
              >
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <span style={{ fontSize: '1.5rem' }}>➕</span>
                  <span>NEW<br />PLAN</span>
                </div>
              </Button>
            </Col>
            <Col xs={6}>
              <Button
                className="w-100 py-3 border-3 fw-bold action-btn"
                style={{ background: 'rgba(254, 254, 254, 1)', borderColor: '#2D2D2D', color: '#1a1a1a' }}
/*                 onClick={() => {
                  if (planId) navigate(`/plans/${planId}/edit`);
                }} */
              >
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <span style={{ fontSize: '1.5rem' }}>✏️</span>
                  <span>UPDATE<br />PLAN</span>
                </div>
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default HomePage;