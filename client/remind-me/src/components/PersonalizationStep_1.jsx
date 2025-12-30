import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router';
import BackButton from './BackButton';
import { useTranslation } from 'react-i18next';

function PersonalizationStep_1(props) {


    const hasAnySelection = Boolean(props.morning || props.afternoon || props.evening);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const goBack = () => {
        navigate("/");
    }
    const nextStep = () => {
        navigate("/newPlan/step2");
    }
    const askForHelp = () => {
        navigate("/help");
    }

    return(
        <div className="d-flex flex-column" style={{ minHeight: '100%', background: 'var(--accent)' }}>
            <div className="px-3 pt-3">
                <BackButton />
            </div>

            <Container className="flex-grow-1 py-3"  style={{ overflow: 'auto' }}>
                 <Row className='justify-content-center mb-4'>
                    <Col xs={12}>
                        <Card className="border-3 border-dark rounded">
                            <Card.Body className="p-3">
                                <h2 className='mb-1 text-center fw-bold' style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}>
                                    {t('personalization.step1Title')}
                                </h2>
                                <p className='text-center mb-0' style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1rem)' }}>
                                    {t('personalization.step1Question')}
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className='mb-1 mt-2'>
                    <Col xs={12}>
                        <p className='fw-bold mb-2' style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1rem)' }}>
                            {t('personalization.morning')}:
                        </p>
                    </Col>
                    <Col xs={6} className='mb-2'>
                        <Button
                            className='w-100 fw-bold border-3'
                            style={{
                                background: props.morning === '7-10' ? '#f2e999ff' : 'rgba(242, 238, 238, 1)',
                                borderColor: '#2D2D2D',
                                color: '#000000',
                                borderRadius: '12px',
                                transition: 'all 0.2s ease',
                                padding: '0.5rem 0.25rem',
                                fontSize: 'clamp(1.2rem, 2vw, 1rem)'
                            }}
                            onClick={() => props.setMorning(props.morning === '7-10' ? null : '7-10')}
                        >
                            7:00-10:00
                        </Button>
                    </Col>
                    <Col xs={6} className='mb-2'>
                        <Button
                            className='w-100 fw-bold border-3'
                            style={{
                                background: props.morning === '10-13' ? '#f2e999ff' : 'rgba(242, 238, 238, 1)',
                                borderColor: '#2D2D2D',
                                color: '#000000',
                                borderRadius: '12px',
                                transition: 'all 0.2s ease',
                                padding: '0.5rem 0.25rem',
                                fontSize: 'clamp(1.2rem, 2vw, 1rem)'
                            }}
                            onClick={() => props.setMorning(props.morning === '10-13' ? null : '10-13')}
                        >
                            10:00-13:00
                        </Button>
                    </Col>
                </Row>
                <Row className='mb-2'>
                    <Col xs={12}>
                        <p className='fw-bold mb-2' style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1rem)' }}>
                            {t('personalization.afternoon')}:
                        </p>
                    </Col>
                    <Col xs={6} className='mb-2'>
                        <Button
                            className='w-100 fw-bold border-3'
                            style={{
                                background: props.afternoon === '13-16' ? '#f2e999ff' : 'rgba(242, 238, 238, 1)',
                                borderColor: '#2D2D2D',
                                color: '#000000',
                                borderRadius: '12px',
                                transition: 'all 0.2s ease',
                                padding: '0.5rem 0.25rem',
                                fontSize: 'clamp(1.2rem, 2vw, 1rem)'
                            }}
                            onClick={() => props.setAfternoon(props.afternoon === '13-16' ? null : '13-16')}
                        >
                            13:00-16:00
                        </Button>
                    </Col>
                    <Col xs={6} className='mb-2'>
                        <Button
                            className='w-100 fw-bold border-3'
                            style={{
                                background: props.afternoon === '16-19' ? '#f2e999ff' : 'rgba(242, 238, 238, 1)',
                                borderColor: '#2D2D2D',
                                color: '#000000',
                                borderRadius: '12px',
                                transition: 'all 0.2s ease',
                                padding: '0.5rem 0.25rem',
                                fontSize: 'clamp(1.2rem, 2vw, 1rem)'
                            }}
                            onClick={() => props.setAfternoon(props.afternoon === '16-19' ? null : '16-19')}
                        >
                            16:00-19:00
                        </Button>
                    </Col>
                </Row>
                <Row className='mb-1'>
                    <Col xs={12}>
                        <p className='fw-bold mb-2' style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1rem)' }}>
                            {t('personalization.evening')}:
                        </p>
                    </Col>
                    <Col xs={6} className='mb-2'>
                        <Button
                            className='w-100 fw-bold border-3'
                            style={{
                                background: props.evening === '19-22' ? '#f2e999ff' : 'rgba(242, 238, 238, 1)',
                                borderColor: '#2D2D2D',
                                color: '#000000',
                                borderRadius: '12px',
                                transition: 'all 0.2s ease',
                                padding: '0.5rem 0.25rem',
                                fontSize: 'clamp(1.2rem, 2vw, 1rem)'
                            }}
                            onClick={() => props.setEvening(props.evening === '19-22' ? null : '19-22')}
                        >
                            19:00-22:00
                        </Button>
                    </Col>
                    <Col xs={6} className='mb-2'>
                        <Button
                            className='w-100 fw-bold border-3'
                            style={{
                                background: props.evening === '22-01' ? '#f2e999ff' : 'rgba(242, 238, 238, 1)',
                                borderColor: '#2D2D2D',
                                color: '#000000',
                                borderRadius: '12px',
                                transition: 'all 0.2s ease',
                                padding: '0.5rem 0.25rem',
                                fontSize: 'clamp(1.2rem, 2vw, 1rem)'
                            }}
                            onClick={() => props.setEvening(props.evening === '22-01' ? null : '22-01')}
                        >
                            22:00-01:00
                        </Button>
                    </Col>
                </Row>
            </Container>

            <div className="py-3 px-3 mt-1">
                <Row className="g-2">
                    <Col xs={hasAnySelection ? 6 : 12}>
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
                    {hasAnySelection && (
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
                    )}
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

export default PersonalizationStep_1;