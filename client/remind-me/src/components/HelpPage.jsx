import { Container, Row, Col, Button, ListGroup, Modal } from 'react-bootstrap';
import { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router';

function HelpPage() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);
    const [show, setShow] = useState(false);

    const handleSubmit = () => {
        if (!selected) return;
        setShow(true);
    }

    const onHide = () => {
        setShow(false);
        navigate("/");
    }

    return(
        <div className="home-page d-flex flex-column">
            <div className="px-3 pt-3 align-self-start" style={{ zIndex: 10 }}>
                <Button
                    className="border-3 fw-bold action-btn d-inline-flex align-items-center"
                    style={{ background: 'rgba(254, 254, 254, 1)', borderColor: '#2D2D2D', color: '#1a1a1a', whiteSpace: 'nowrap' }}
                    onClick={() => navigate(-1)}
                    aria-label="Back"
                >
                    ← Back
                </Button>
            </div>

            <Container fluid className="flex-grow-1 d-flex flex-column px-3 pb-3" style={{ minHeight: 0 }}>
                <Row className="justify-content-center mt-1">
                    <Col xs={12} className="mb-4 mt-3">
                        <div className="text-center bg-white border border-dark border-3 py-4 px-4 rounded fw-bold" style={{ fontSize: '1.15rem', lineHeight: 1.25 }}>
                            Who you want to perform the action for you?
                        </div>
                    </Col>
                </Row>

                <Row className="justify-content-center flex-grow-1" style={{ minHeight: 0 }}>
                    <Col xs={12} className="mb-2 text-center d-flex flex-column" style={{ minHeight: 0 }}>
                        <ListGroup className="shadow-sm flex-grow-1" style={{ minHeight: 0, overflowY: 'auto' }}>
                            <ListGroup.Item
                                action
                                onClick={() => setSelected('DR. SMITH')}
                                className={`d-flex align-items-center py-3 ${selected === 'DR. SMITH' ? 'border border-3 border-dark' : 'border border-2 border-dark-subtle'}`}
                            >
                                <img 
                                    src="/assets/proxy-image.jpg" 
                                    className="rounded-circle me-3"
                                    style={{width: '72px', height: '72px', objectFit: 'cover'}}
                                />
                                <div className="text-start">
                                    <h5 className="mb-0 fw-bold">DR. SMITH</h5>
                                    <small className="text-muted">Primary physician</small>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                onClick={() => setSelected('DR. ROBERT')}
                                className={`d-flex align-items-center py-3 ${selected === 'DR. ROBERT' ? 'border border-3 border-dark' : 'border border-2 border-dark-subtle'}`}
                            >
                                <img 
                                    src="/assets/proxy-image.jpg" 
                                    className="rounded-circle me-3"
                                    style={{width: '72px', height: '72px', objectFit: 'cover'}}
                                />
                                <div className="text-start">
                                    <h5 className="mb-0 fw-bold">DR. ROBERT</h5>
                                    <small className="text-muted">Cardiologist</small>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                onClick={() => setSelected('BOB')}
                                className={`d-flex align-items-center py-3 ${selected === 'BOB' ? 'border border-3 border-dark' : 'border border-2 border-dark-subtle'}`}
                            >
                                <img 
                                    src="/assets/proxy-image.jpg" 
                                    className="rounded-circle me-3"
                                    style={{width: '72px', height: '72px', objectFit: 'cover'}}
                                />
                                <div className="text-start">
                                    <h5 className="mb-0 fw-bold">BOB</h5>
                                    <small className="text-muted">Neighbor</small>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                onClick={() => setSelected('CLARK')}
                                className={`d-flex align-items-center py-3 ${selected === 'CLARK' ? 'border border-3 border-dark' : 'border border-2 border-dark-subtle'}`}
                            >
                                <img 
                                    src="/assets/proxy-image.jpg" 
                                    className="rounded-circle me-3"
                                    style={{width: '72px', height: '72px', objectFit: 'cover'}}
                                />
                                <div className="text-start">
                                    <h5 className="mb-0 fw-bold">CLARK</h5>
                                    <small className="text-muted">Friend</small>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>

            <div className="action-section border-top border-3 border-dark mt-auto">
                <Container className="py-3">
                    <Button
                        className="w-100 py-3 border-3 fw-bold action-btn"
                        style={{ background: 'rgba(254, 254, 254, 1)', borderColor: '#2D2D2D', color: '#1a1a1a' }}
                        disabled={!selected}
                        onClick={handleSubmit}
                    >
                        <div className="d-flex align-items-center justify-content-center gap-3">
                            <span>ASK FOR HELP</span>
                            <span><i className="bi bi-telephone-fill text-success fs-3"></i></span>
                        </div>
                    </Button>
                </Container>
            </div>

            <Modal
                show={show}
                backdrop="static"
                keyboard={false}
                centered
                size="sm"
            >
                <Modal.Body className='fs-5 text-center'>
                ONCE <strong>{selected}</strong> HAS COMPLETED YOUR PLAN YOU WILL BE NOTIFIED!
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                <Button
                    size="lg"
                    className="border-3 fw-bold action-btn d-inline-flex align-items-center"
                    style={{ background: 'rgba(236, 241, 139, 1)', borderColor: '#2D2D2D', color: '#1a1a1a', whiteSpace: 'nowrap' }}
                    onClick={onHide}
                    aria-label="OK"
                >
                    OK
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default HelpPage;