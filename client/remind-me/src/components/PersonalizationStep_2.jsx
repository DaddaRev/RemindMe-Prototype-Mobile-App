import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router';
import BackButton from './BackButton';
import { useTranslation } from 'react-i18next';

function PersonalizationStep_2() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const goBack = () => {
        navigate("/");
    }
    const askForHelp = () => {
        navigate("/help");
    }
    const nextStep = () => {
        navigate("/newPlan/step3");
    }

    return(
        <div className="d-flex flex-column" style={{ minHeight: '100%', background: 'var(--accent)' }}>
            <div className="px-3 pt-3">
                <BackButton />
            </div>

            <Container className="flex-grow-1 py-3" style={{ overflow: 'auto' }}>
                <Row className='justify-content-center mb-4'>
                    <Col xs={12}>
                        <Card className="border-3 border-dark rounded">
                            <Card.Body className="p-3">
                                <h2 className='mb-2 text-center fw-bold' style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}>
                                    {t('personalization.step2Title')}
                                </h2>
                                <p className='text-center mb-0' style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1rem)' }}>
                                    {t('personalization.step2Question')}
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className='fw-bold' style={{ fontSize: 'clamp(1.2rem, 2vw, 1rem)' }}>
                            {t('personalization.morning')}:
                        </Form.Label>
                        <Form.Control 
                            placeholder={t('personalization.enterMotivation')}
                            style={{
                                borderColor: '#2D2D2D',
                                borderWidth: '2px',
                                borderRadius: '12px',
                                padding: '0.75rem',
                                fontSize: 'clamp(1.1rem, 2vw, 1rem)'
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className='fw-bold' style={{ fontSize: 'clamp(1.2rem, 2vw, 1rem)' }}>
                            {t('personalization.afternoon')}:
                        </Form.Label>
                        <Form.Control 
                            placeholder={t('personalization.enterMotivation')}
                            style={{
                                borderColor: '#2D2D2D',
                                borderWidth: '2px',
                                borderRadius: '12px',
                                padding: '0.75rem',
                                fontSize: 'clamp(1.1rem, 2vw, 1rem)'
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className='fw-bold' style={{ fontSize: 'clamp(1.2rem, 2vw, 1rem)' }}>
                            {t('personalization.evening')}:
                        </Form.Label>
                        <Form.Control 
                            placeholder={t('personalization.enterMotivation')}
                            style={{
                                borderColor: '#2D2D2D',
                                borderWidth: '2px',
                                borderRadius: '12px',
                                padding: '0.75rem',
                                fontSize: 'clamp(1.1rem, 2vw, 1rem)'
                            }}
                        />
                    </Form.Group>
                </Form>
            </Container>

            <div className="py-3 px-3">
                <Row className="g-2">
                    <Col xs={6}>
                        <Button
                            className='w-100 py-3 border-3 fw-bold'
                            style={{
                                background: 'rgba(244, 194, 194, 1)',
                                borderColor: '#2D2D2D',
                                color: '#000000',
                                borderRadius: '12px',
                                transition: 'all 0.2s ease',
                                fontSize: '18px'
                            }}
                            onClick={goBack}
                        >
                            {t('personalization.cancelOperation')}
                        </Button>
                    </Col>
                    <Col xs={6}>
                        <Button
                            className='w-100 py-3 border-3 fw-bold'
                            style={{
                                background: '#f2e999ff',
                                borderColor: '#2D2D2D',
                                color: '#1a1a1a',
                                borderRadius: '12px',
                                transition: 'all 0.2s ease',
                                fontSize: '18px'
                            }}
                            onClick={nextStep}
                        >
                            {t('buttons.next')}
                        </Button>
                    </Col>
                </Row>
            </div>

            <div className="action-section border-top border-3 border-dark">
                <Container className="py-3">
                    <Row>
                        <Col xs={12}>
                            <Button
                                className="w-100 py-3 border-3 fw-bold"
                                style={{
                                    background: 'rgba(254, 254, 254, 1)',
                                    borderColor: '#2D2D2D',
                                    color: '#1a1a1a',
                                    borderRadius: '12px',
                                    transition: 'all 0.2s ease',
                                    fontSize: '18px'
                                }}
                                onClick={askForHelp}
                            >
                                <div className="d-flex align-items-center justify-content-center gap-4">
                                    <span>{t('personalization.doItForMe')}</span>
                                    <span><i className="bi bi-telephone-fill text-success fs-3"></i></span>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default PersonalizationStep_2;