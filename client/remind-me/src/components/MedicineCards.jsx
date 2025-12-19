import { Card, Row, Col } from 'react-bootstrap';

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

export function MedicineCard({ medicine, index }) {
  return (
    <Card
      key={medicine.id_sched_med ?? `med-${index}`}
      className="mb-3 border-3 medicine-card"
      style={{ borderColor: '#2D2D2D', background: '#FFFBF7' }}
    >
      <Card.Body className="p-3">
        <h4 className="fw-bold mb-2">{medicine.assumption_time}</h4>
        <hr className="my-2" />
        <Row className="align-items-center">
          <Col xs={9}>
            <p className="mb-0 fw-semibold text-uppercase">{medicine.description}</p>
          </Col>
          <Col xs={3} className="text-end">
            <span style={{ fontSize: '2rem' }}>
              {getMedicineIcon(medicine.medicine_type)}
            </span>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default MedicineCard;