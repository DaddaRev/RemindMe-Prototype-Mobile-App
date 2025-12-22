import { Container, Row, Col, Button, ListGroup, Modal } from 'react-bootstrap';
import { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router';
import BackButton from './BackButton';

function HelpPage() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);
    const [show, setShow] = useState(false);

    const handleSubmit = () => {
        if (!selected) return;
        setShow(true);
        //navigate("/");
    }

    const onHide = () => {
        setShow(false);
    }

    return(
        <Container>
            <Row className="mb-4 mt-3">
                <Col md={2} className='pt-2 ps-2'>
                    <BackButton />
                </Col>
            </Row>

            <Row className='justify-content-center'>
                <Col md={11} as="h4" className='mb-3 fs-4 text-center bg-white border border-dark border-3 pt-3 pb-3 rounded'>
                    WHO YOU WANT TO PERFORM THE ACTION FOR YOU?
                </Col>
            </Row>

            <Row className='mt-3 justify-content-center'>
                <Col md={11} className="mb-5 text-center">
                    <ListGroup>
                        <ListGroup.Item
                            action
                            onClick={() => setSelected('DR. SMITH')}
                            className={`d-flex align-items-center ${selected === 'DR. SMITH' ? 'border border-3 border-dark' : ''}`}
                        >
                            <img 
                                src="/assets/proxy-image.jpg" 
                                className="rounded-circle me-3"
                                style={{width: '80px', height: '80px', objectFit: 'cover'}}
                            />
                            <div>
                                <h5>DR. SMITH</h5>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            onClick={() => setSelected('DR. ROBERT')}
                            className={`d-flex align-items-center ${selected === 'DR. ROBERT' ? 'border border-3 border-dark' : ''}`}
                        >
                            <img 
                                src="/assets/proxy-image.jpg" 
                                className="rounded-circle me-3"
                                style={{width: '80px', height: '80px', objectFit: 'cover'}}
                            />
                            <div>
                                <h5>DR. ROBERT</h5>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            onClick={() => setSelected('BOB')}
                            className={`d-flex align-items-center ${selected === 'BOB' ? 'border border-3 border-dark' : ''}`}
                        >
                            <img 
                                src="/assets/proxy-image.jpg" 
                                className="rounded-circle me-3"
                                style={{width: '80px', height: '80px', objectFit: 'cover'}}
                            />
                            <div>
                                <h5>BOB</h5>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            onClick={() => setSelected('CLARK')}
                            className={`d-flex align-items-center ${selected === 'CLARK' ? 'border border-3 border-dark' : ''}`}
                        >
                            <img 
                                src="/assets/proxy-image.jpg" 
                                className="rounded-circle me-3"
                                style={{width: '80px', height: '80px', objectFit: 'cover'}}
                            />
                            <div>
                                <h5>CLARK</h5>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>

            <Row className='mt-5 justify-content-center border-top border-2 border-dark pt-3'>
                <Col className='text-center'>
                    <Button className="btn-success" size='lg' disabled={!selected} onClick={handleSubmit}>ASK FOR HELP <i className="bi bi-telephone ms-3"></i></Button>
                </Col>
            </Row>

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
                <Button size="lg" variant="primary" onClick={onHide}>
                    OK
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default HelpPage;