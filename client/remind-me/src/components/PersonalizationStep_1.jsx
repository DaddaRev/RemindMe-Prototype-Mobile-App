import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router';
import BackButton from './BackButton';

function PersonalizationStep() {
    const [morning, setMorning] = useState(null); // '7-10' | '10-13' | null
    const [afternoon, setAfternoon] = useState(null); // '13-16' | '16-19' | null
    const [evening, setEvening] = useState(null); // '19-22' | '22-01' | null

    const hasAnySelection = Boolean(morning || afternoon || evening);
    const navigate = useNavigate();

    const goBack = () => {
        navigate("/");
    }
    const nextStep = () => {
        navigate("/newPlan/personalization/2");
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
                    PERSONALIZATION STEP #1
                </Col>
                <Col as="p" md={11} className='fs-5 text-center bg-white border border-dark border-3 pt-3 pb-3 rounded'>
                    WHEN ARE YOU MORE COMFORTABLE WITH MOVING DURING THE DAY? (SELECT AT LEAST A TIME SLOT)
                </Col>
            </Row>

            <Row className='mb-3'>
                <Col md={12} as="p" className='fw-bold'>
                    MORNING:
                </Col>
                <Col md={6} className='text-center'>
                    <Button
                        size='lg'
                        className='fw-bold'
                        variant={morning === '7-10' ? 'outline-primary' : 'outline-secondary'}
                        onClick={() => setMorning(morning === '7-10' ? null : '7-10')}
                    >
                        7:00-10:00
                    </Button>
                </Col>
                <Col md={6} className='text-center'>
                    <Button
                        size='lg'
                        className='fw-bold'
                        variant={morning === '10-13' ? 'outline-primary' : 'outline-secondary'}
                        onClick={() => setMorning(morning === '10-13' ? null : '10-13')}
                    >
                        10:00-13:00
                    </Button>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col md={12} as="p" className='fw-bold'>
                    AFTERNOON:
                </Col>
                <Col md={6} className='text-center'>
                    <Button
                        size='lg'
                        className='fw-bold'
                        variant={afternoon === '13-16' ? 'outline-primary' : 'outline-secondary'}
                        onClick={() => setAfternoon(afternoon === '13-16' ? null : '13-16')}
                    >
                        13:00-16:00
                    </Button>
                </Col>
                <Col md={6} className='text-center'>
                    <Button
                        size='lg'
                        className='fw-bold'
                        variant={afternoon === '16-19' ? 'outline-primary' : 'outline-secondary'}
                        onClick={() => setAfternoon(afternoon === '16-19' ? null : '16-19')}
                    >
                        16:00-19:00
                    </Button>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col md={12} as="p" className='fw-bold'>
                    EVENING:
                </Col>
                <Col md={6} className='text-center'>
                    <Button
                        size='lg'
                        className='fw-bold'
                        variant={evening === '19-22' ? 'outline-primary' : 'outline-secondary'}
                        onClick={() => setEvening(evening === '19-22' ? null : '19-22')}
                    >
                        19:00-22:00
                    </Button>
                </Col>
                <Col md={6} className='text-center'>
                    <Button
                        size='lg'
                        className='fw-bold'
                        variant={evening === '22-01' ? 'outline-primary' : 'outline-secondary'}
                        onClick={() => setEvening(evening === '22-01' ? null : '22-01')}
                    >
                        22:00-01:00
                    </Button>
                </Col>
            </Row>

            <Row className='mt-4'>
                <Col md={8} className='text-center'>
                    <Button onClick={goBack}>CANCEL OPERATION</Button>
                </Col>
                {hasAnySelection && (
                    <Col md={4}>
                        <Button onClick={nextStep}>NEXT</Button>
                    </Col>
                )}
            </Row>

            <Row className='mt-4 justify-content-center border-top border-2 border-dark pt-3'>
                <Col className='text-center'>
                    <Button className="btn-success" size='lg' onClick={askForHelp}>DO IT FOR ME <i className="bi bi-telephone ms-3"></i></Button>
                </Col>
            </Row>
        </Container>
    );
}

export default PersonalizationStep;