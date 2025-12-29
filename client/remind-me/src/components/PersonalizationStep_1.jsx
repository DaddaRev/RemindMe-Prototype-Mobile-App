import { Container, Row, Col, Button } from 'react-bootstrap';
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
        <Container>
            <Row className="mb-4 mt-3">
                <Col md={2} className='pt-2 ps-2'>
                    <BackButton />
                </Col>
            </Row>

            <Row className='justify-content-center'>
                <Col as="h2" className='mb-3 text-center'>
                    {t('personalization.step1Title')}
                </Col>
                <Col as="p" md={11} className='fs-5 text-center bg-white border border-dark border-3 pt-3 pb-3 rounded'>
                    {t('personalization.step1Question')}
                </Col>
            </Row>

            <Row className='mb-3'>
                <Col md={12} as="p" className='fw-bold'>
                    {t('personalization.morning')}:
                </Col>
                <Col md={6} className='text-center'>
                    <Button
                        size='lg'
                        className='fw-bold'
                        variant={props.morning === '7-10' ? 'outline-primary' : 'outline-secondary'}
                        onClick={() => props.setMorning(props.morning === '7-10' ? null : '7-10')}
                    >
                        7:00-10:00
                    </Button>
                </Col>
                <Col md={6} className='text-center'>
                    <Button
                        size='lg'
                        className='fw-bold'
                        variant={props.morning === '10-13' ? 'outline-primary' : 'outline-secondary'}
                        onClick={() => props.setMorning(props.morning === '10-13' ? null : '10-13')}
                    >
                        10:00-13:00
                    </Button>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col md={12} as="p" className='fw-bold'>
                    {t('personalization.afternoon')}:
                </Col>
                <Col md={6} className='text-center'>
                    <Button
                        size='lg'
                        className='fw-bold'
                        variant={props.afternoon === '13-16' ? 'outline-primary' : 'outline-secondary'}
                        onClick={() => props.setAfternoon(props.afternoon === '13-16' ? null : '13-16')}
                    >
                        13:00-16:00
                    </Button>
                </Col>
                <Col md={6} className='text-center'>
                    <Button
                        size='lg'
                        className='fw-bold'
                        variant={props.afternoon === '16-19' ? 'outline-primary' : 'outline-secondary'}
                        onClick={() => props.setAfternoon(props.afternoon === '16-19' ? null : '16-19')}
                    >
                        16:00-19:00
                    </Button>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col md={12} as="p" className='fw-bold'>
                    {t('personalization.evening')}:
                </Col>
                <Col md={6} className='text-center'>
                    <Button
                        size='lg'
                        className='fw-bold'
                        variant={props.evening === '19-22' ? 'outline-primary' : 'outline-secondary'}
                        onClick={() => props.setEvening(props.evening === '19-22' ? null : '19-22')}
                    >
                        19:00-22:00
                    </Button>
                </Col>
                <Col md={6} className='text-center'>
                    <Button
                        size='lg'
                        className='fw-bold'
                        variant={props.evening === '22-01' ? 'outline-primary' : 'outline-secondary'}
                        onClick={() => props.setEvening(props.evening === '22-01' ? null : '22-01')}
                    >
                        22:00-01:00
                    </Button>
                </Col>
            </Row>

            <Row className='mt-4'>
                <Col md={8} className='text-center'>
                    <Button onClick={goBack}>{t('personalization.cancelOperation')}</Button>
                </Col>
                {hasAnySelection && (
                    <Col md={4}>
                        <Button onClick={nextStep}>{t('buttons.next')}</Button>
                    </Col>
                )}
            </Row>

            <Row className='mt-4 justify-content-center border-top border-2 border-dark pt-3'>
                <Col className='text-center'>
                    <Button className="btn-success" size='lg' onClick={askForHelp}>{t('helpPage.askForHelp')} <i className="bi bi-telephone ms-3"></i></Button>
                </Col>
            </Row>
        </Container>
    );
}

export default PersonalizationStep_1;