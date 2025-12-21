import { Card, Row, Col, Button } from 'react-bootstrap';

const getMedicineIcon = (type) => {
  switch (type) {
    case 'pill':   return '💊';
    case 'sachet': return '🥤';
    case 'drops':  return '💧';
    default:       return '💊';
  }
};

export function MedicineCard(props) {
  return (
    <Card className="mb-3 border-3 medicine-card" style={{ borderColor: '#2D2D2D', background: '#FFFBF7' }}>
      <Card.Body className="p-3">
        <Row className="align-items-center mb-2">
          <Col xs={9}>
            <h4 className="fw-bold mb-0">
              {props.medicine?.assumption_time} - {props.medicine?.name}
            </h4>
          </Col>
          <Col xs={3} className="text-end d-flex justify-content-end align-items-center gap-3">
            {/* Switch order: show medicine icon, then the (larger) pencil */}
            <span style={{ fontSize: '2rem' }}>
              {getMedicineIcon(props.medicine?.medicine_type)}
            </span>
            {props.editMode && (
              <Button
                variant="dark"
                size="lg"
                onClick={() => props.onEdit?.(props.medicine)}
                aria-label="Edit medicine"
                className="border-3 fw-bold d-inline-flex align-items-center justify-content-center"
                style={{ fontSize: '2rem', lineHeight: 1, padding: '0.25rem 0.5rem' }}
              >
                ✏️
              </Button>
            )}
          </Col>
        </Row>
        <hr className="my-2" />
        <p className="mb-0 fw-semibold text-uppercase">{props.medicine?.description}</p>
      </Card.Body>
    </Card>
  );
}

export default MedicineCard;