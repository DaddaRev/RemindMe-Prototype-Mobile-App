import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './HomePage.css';

const HomePage = () => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const [dayOffset, setDayOffset] = useState(0);

  const getCurrentDate = () => {
    const today = new Date();
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + dayOffset);
    return currentDate;
  };

  const currentDate = getCurrentDate();
  const dayName = daysOfWeek[currentDate.getDay()];
  const dayNumber = currentDate.getDate();
  const month = currentDate.getMonth();

  const medicines = [
    {
      id_scheduled_medicine: 1,
      time: '16:00',
      name: 'Pastiglia Tosse',
      type: 'pill',
      taken: false
    },
    {
      id_scheduled_medicine: 2,
      time: '19:30',
      name: 'Pastiglia Pressione',
      type: 'pill',
      taken: false
    },
    {
      id_scheduled_medicine: 3,
      time: '22:00',
      name: 'Bustina Sonnolex',
      type: 'sachet',
      taken: false
    },
    {
      id_scheduled_medicine: 4,
      time: '22:00',
      name: 'Bustina Sonnolex',
      type: 'sachet',
      taken: false
    },
        {
      id_scheduled_medicine: 5,
      time: '22:00',
      name: 'Bustina Cavvvaloz',
      type: 'sachet',
      taken: false
    }
  ];

  const goToPreviousDay = () => {
    setDayOffset(dayOffset - 1);
  };

  const goToNextDay = () => {
    setDayOffset(dayOffset + 1);
  };

  const getMedicineIcon = (type) => {
    switch (type) {
      case 'pill':
        return '💊';
      case 'sachet':
        return '🥤';
      case 'drops':
        return '💧';
      default:
        return '💊';
    }
  };

  return (
    <div className="home-page d-flex flex-column h-100" style={{ background: '#F5E6D3' }}>
      {/* Header with the day and the date */}
      <div className="home-header">
        <Card className="border-3 border-dark rounded" style={{ background: '#F5E6D3' }}>
          <Card.Body className="p-3">
            <Row className="align-items-center">
              <Col xs={2} className="text-center">
                <Button variant="link" className="text-dark p-0 nav-arrow" onClick={goToPreviousDay}>
                  <h3 className="mb-0">&#9664;</h3>
                </Button>
              </Col>
              <Col xs={8} className="text-center">
                <h2 className="fw-bold mb-1">{dayName.toUpperCase()}</h2>
                <p className="mb-0 text-muted fw-semibold">{`${dayNumber}/${month + 1 < 10 ? '0' : ''}${month + 1}`}</p>
              </Col>
              <Col xs={2} className="text-center">
                <Button variant="link" className="text-dark p-0 nav-arrow" onClick={goToNextDay}>
                  <h3 className="mb-0">&#9654;</h3>
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>

      {/* Medicines card */}
      <div className="medicines-list flex-grow-1 overflow-auto py-3" style={{ background: '#F5E6D3' }}>
        <Container>
          {medicines.map((medicine) => (
            <Card key={medicine.id_scheduled_medicine} className="mb-3 border-3 medicine-card" style={{ borderColor: '#2D2D2D', background: '#FFFBF7' }}>
              <Card.Body className="p-3">
                <h4 className="fw-bold mb-2">{medicine.time}</h4>
                <hr className="my-2" />
                <Row className="align-items-center">
                  <Col xs={9}>
                    <p className="mb-0 fw-semibold text-uppercase">{medicine.name}</p>
                  </Col>
                  <Col xs={3} className="text-end">
                    <span style={{ fontSize: '2rem' }}>{getMedicineIcon(medicine.type)}</span>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Container>
      </div>

      {/* Separation bar */}
      <div className="action-section border-top border-3 border-dark" style={{ background: '#F5E6D3' }}>
        <Container className="py-3">
          <Row className="g-2">
            <Col xs={6}>
              <Button className="w-100 py-3 border-3 fw-bold action-btn" style={{ background: 'rgba(242, 238, 238, 1)', borderColor: '#2D2D2D', color: '#000000ff' }}>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <span style={{ fontSize: '1.5rem' }}>➕</span>
                  <span>NEW<br/>PLAN</span>
                </div>
              </Button>
            </Col>
            <Col xs={6}>
              <Button className="w-100 py-3 border-3 fw-bold action-btn" style={{ background: 'rgba(254, 254, 254, 1)', borderColor: '#2D2D2D', color: '#1a1a1a' }}>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <span style={{ fontSize: '1.5rem' }}>✏️</span>
                  <span>UPDATE<br/>PLAN</span>
                </div>
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
