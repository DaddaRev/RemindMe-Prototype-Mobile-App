import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router';
import BackButton from './BackButton';

function PersonalizationStep_2() {
    const navigate = useNavigate();

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
        <Container>
            <Row className="mb-4 mt-3">
                <Col md={2} className='pt-2 ps-2'>
                    <BackButton />
                </Col>
            </Row>

            <Row className='justify-content-center'>
                <Col as="h2" className='mb-3 text-center'>
                    PERSONALIZATION STEP #2
                </Col>
                <Col as="p" md={11} className='fs-4 text-center bg-white border border-dark border-3 pt-3 pb-3 rounded'>
                    ADD A MOTIVATION BEHIND THE SELECTED SLOTS (OPTIONAL)
                </Col>
            </Row>

            <Form>
                <Form.Group className="mt-4 mb-4">
                    <Form.Label className='fw-bold'>MORNING:</Form.Label>
                    <Form.Control placeholder="Enter a motivation" />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label className='fw-bold'>AFTERNOON:</Form.Label>
                    <Form.Control placeholder="Enter a motivation" />
                </Form.Group>

                <Form.Group className="mb-5">
                    <Form.Label className='fw-bold'>EVENING:</Form.Label>
                    <Form.Control placeholder="Enter a motivation" />
                </Form.Group>
            </Form>

            <Row className='mt-5'>
                <Col md={8} className='text-center'>
                    <Button onClick={goBack}>CANCEL OPERATION</Button>
                </Col>
                <Col md={4}>
                    <Button onClick={nextStep}>NEXT</Button>
                </Col>
            </Row>

            <Row className='mt-4 justify-content-center border-top border-2 border-dark pt-3'>
                <Col className='text-center'>
                    <Button className="btn-success" size='lg' onClick={askForHelp}>DO IT FOR ME <i className="bi bi-telephone ms-3"></i></Button>
                </Col>
            </Row>
        </Container>
    );
}

export default PersonalizationStep_2;