import { Navbar, Container, Row, Col } from 'react-bootstrap';

function StatusBar() {
  return (
    <Navbar className="status-bar" bg="white" variant="light">
      <Container fluid className="px-0">
        <Row className="w-100 m-0 align-items-center justify-content-between">
          <Col xs="auto" className="status-left">
            <span className="time">9:41</span>
          </Col>
          <Col xs="auto" className="status-right">
            <div className="signal">
              <div className="signal-bar"></div>
              <div className="signal-bar"></div>
              <div className="signal-bar"></div>
            </div>
            <span className="wifi">📡</span>
            <div className="battery">
              <div className="battery-level"></div>
            </div>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default StatusBar;
