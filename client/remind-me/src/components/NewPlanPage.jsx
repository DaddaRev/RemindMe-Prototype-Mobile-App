import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import InfoPlanModal from './InfoPlanModal';
import { Outlet, useNavigate } from 'react-router';
import BackButton from './BackButton';
import { useTranslation } from 'react-i18next';


function NewPlanPage() {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const { t } = useTranslation();

    const navigate = useNavigate();

    const startPersonalizing = () => {
        navigate("/newPlan/step1");
    }

    const skip = () => {
        navigate("/newPlan/step3");
    }

    const askForHelp = () => {
        navigate("/help");
    }

    return(
        <div className="home-page d-flex flex-column">
            {/* Back button */}
            <div className="px-3 pt-3 align-self-start" style={{ zIndex: 10 }}>
                <BackButton />
            </div>

            {/* Header with title */}
            <div className="home-header mt-3 px-3">
                <Card className="border-3 border-dark rounded home-card" style={{ backgroundColor: '#FFF9E6' }}>
                    <Card.Body className="p-3 d-flex justify-content-center">
                        <h1 className='new-plan-title mb-0'>
                            {t('newPlanPage.title')}
                        </h1>
                    </Card.Body>
                </Card>
            </div>

            {/* Main content area */}
            <div className="medicines-list flex-grow-1 overflow-auto py-3">
                <Container className="d-flex flex-column justify-content-evenly h-100">
                    <Row className='justify-content-center mb-2 mt-2'>
                        <Col md={10} className='fs-5 text-center pt-2 pb-2 rounded'>
                            {t('newPlanPage.description')}
                        </Col>
                    </Row>

                    <Row className='justify-content-center ml-1 mr-1 mt-5 mb-4'>
                        <Col md={10} className='text-center'>
                            <Button
                                variant=""
                                className="w-100 py-3 border-3 fw-bold"
                                size='lg'
                                style={{ backgroundColor: '#d6eea6ff', borderColor: '#2D2D2D', color: '#000000', borderRadius: '12px' }}
                                onClick={startPersonalizing}
                            >
                                OK
                            </Button>
                        </Col>
                    </Row>

                    <Row className='justify-content-center mb-5'>
                        <Col md={10} className='text-center'>
                            <Button
                                variant=""
                                className="w-100 py-3 border-3 fw-bold"
                                size='lg'
                                style={{ backgroundColor: '#FFF9E6', borderColor: '#2D2D2D', color: '#000000', borderRadius: '12px' }}
                                onClick={skip}
                            >
                                {t('newPlanPage.skipStep')}
                            </Button>
                        </Col>
                    </Row>

                    <Row className='justify-content-center'>
                        <Col className='text-center'>
                            <Button size='lg' className='rounded-circle d-flex align-items-center justify-content-center btn-thick-border mx-auto'
                                style={{ width: '54px', height: '54px' }}
                                onClick={handleShow}>
                                <i className="bi bi-info-circle"></i>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Action section */}
            <div className='action-section border-top border-3 border-dark'>
                <Container className='py-3'>
                    <Button
                        className="w-100 py-3 border-3 fw-bold action-btn"
                        size='lg'
                        style={{ background: 'rgba(255, 255, 255, 1)', borderColor: '#2D2D2D', color: '#1a1a1a' }}
                        onClick={askForHelp}
                    >
                        <div className="d-flex align-items-center justify-content-center gap-4">
                            <span>{t('personalization.doItForMe')}</span>
                            <span><i className="bi bi-telephone-fill text-success fs-3"></i></span>
                        </div>
                    </Button>
                </Container>
            </div>

            <InfoPlanModal show={show} onHide={() => setShow(false)} />
            <Outlet />
        </div>
    );
}

export default NewPlanPage;