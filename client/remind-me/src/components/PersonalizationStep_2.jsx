import { Container, Row, Col, Button, Form } from 'react-bootstrap';
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
        <Container>
            <Row className="mb-4 mt-3">
                <Col md={2} className='pt-2 ps-2'>
                    <BackButton />
                </Col>
            </Row>

            <Row className='justify-content-center'>
                <Col as="h2" className='mb-3 text-center'>
                    {t('personalization.step2Title')}
                </Col>
                <Col as="p" md={11} className='fs-4 text-center bg-white border border-dark border-3 pt-3 pb-3 rounded'>
                    {t('personalization.step2Question')}
                </Col>
            </Row>

            <Form>
                <Form.Group className="mt-4 mb-4">
                    <Form.Label className='fw-bold'>{t('personalization.morning')}:</Form.Label>
                    <Form.Control placeholder={t('personalization.enterMotivation')} />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label className='fw-bold'>{t('personalization.afternoon')}:</Form.Label>
                    <Form.Control placeholder={t('personalization.enterMotivation')} />
                </Form.Group>

                <Form.Group className="mb-5">
                    <Form.Label className='fw-bold'>{t('personalization.evening')}:</Form.Label>
                    <Form.Control placeholder={t('personalization.enterMotivation')} />
                </Form.Group>
            </Form>

            <Row className='mt-5'>
                <Col md={8} className='text-center'>
                    <Button onClick={goBack}>{t('personalization.cancelOperation')}</Button>
                </Col>
                <Col md={4}>
                    <Button onClick={nextStep}>{t('buttons.next')}</Button>
                </Col>
            </Row>

            <Row className='mt-4 justify-content-center border-top border-2 border-dark pt-3'>
                <Col className='text-center'>
                    <Button className="btn-success" size='lg' onClick={askForHelp}>{t('helpPage.askForHelp')} <i className="bi bi-telephone ms-3"></i></Button>
                </Col>
            </Row>
        </Container>
    );
}

export default PersonalizationStep_2;