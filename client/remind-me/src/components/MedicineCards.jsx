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
    <Card 
      className="mb-3 border-3 medicine-card" 
      style={{ 
        borderColor: '#2D2D2D', 
        background: '#FFFBF7',
        /* 1. VISIVO: Se non sono in edit mode, mostro la manina */
        cursor: !props.editMode ? 'pointer' : 'default'
      }}
      /* 2. LOGICA: Qui colleghiamo la funzione passata dalla Home */
      onClick={!props.editMode ? props.onClick : undefined}
    >
      <Card.Body className="p-3">
        <Row className="align-items-center mb-2">
          <Col xs={9}>
            <h4 className="fw-bold mb-0">
              {props.medicine?.assumption_time} - {props.medicine?.name}
            </h4>
          </Col>
          <Col xs={3} className="text-end d-flex justify-content-end align-items-center gap-3">
            <span style={{ fontSize: '2rem' }}>
              {!props.editMode && getMedicineIcon(props.medicine?.medicine_type)}
            </span>
            {props.editMode && (
              <Button
                /* 3. STOP PROPAGATION: Evita che il click sulla matita attivi anche la card */
                onClick={(e) => {
                    e.stopPropagation(); 
                    props.onEdit?.(props.medicine);
                }}
                aria-label="Edit medicine"
                className="border-3 fw-bold action-btn d-inline-flex align-items-center justify-content-center"
                style={{ background: 'rgba(254, 254, 254, 1)', borderColor: '#2D2D2D', color: '#1a1a1a', fontSize: '2rem', lineHeight: 1, padding: '0.25rem 0.5rem' }}
              >
                {/* 4. FIX: class -> className */}
                <i className="bi bi-pencil-fill text-warning fs-3"></i>
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