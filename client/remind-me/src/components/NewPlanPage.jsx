import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import InfoPlanModal from './InfoPlanModal';
import { Outlet, useNavigate } from 'react-router';
import BackButton from './BackButton';


function NewPlanPage() {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    const startPersonalizing = () => {
        navigate("/newPlan/step1");
    }

    const skip = () => {
        navigate("/");
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
                <Col as="h1" md={11} className='mb-5 text-center'>
                    NEW PLAN
                </Col>
                <Col as="p" md={10} className='fs-4 text-center bg-white border border-dark border-3 pt-3 pb-3 rounded'>
                    BEFORE ADDING A NEW MEDICINE PROVIDE SOME USEFUL INFORMATIONS ABOUT YOUR DAILY ROUTINE
                </Col>
            </Row>

            <Row className='justify-content-center'>
                <Col md={6} className='mt-5 mb-4 text-center'>
                    <Button size='lg' onClick={startPersonalizing}>OK</Button>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col md={8} className='mb-4 text-center'>
                    <Button size='lg' onClick={skip}>SKIP THIS STEP</Button>
                </Col>
            </Row>

            <Row className='justify-content-center'>
                <Col md={3} className='ms-3 mt-4 mb-5 text-center'>
                    <Button size='lg' className='rounded-circle d-flex align-items-center justify-content-center' onClick={handleShow}>
                        <i className="bi bi-info-circle"></i>
                    </Button>
                </Col>
            </Row>

            <Row className='mt-2 pt-3 justify-content-center border-top border-2 border-dark'>
                <Col md={8} className='text-center'>
                    <Button className="btn-success" size='lg' onClick={askForHelp}>DO IT FOR ME <i className="bi bi-telephone ms-3"></i></Button>
                </Col>
            </Row>
            <InfoPlanModal show={show} onHide={() => setShow(false)} />
            <Outlet />
        </Container>
    );
}

export default NewPlanPage;