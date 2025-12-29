import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

function InfoPlanModal(props) {
  const { t } = useTranslation();
  
return (
    <Modal
      show={props.show}
      backdrop="static"
      keyboard={false}
      centered
      size="sm"
    >
      <Modal.Header
        className="border-3 border-dark rounded-top"
        style={{ backgroundColor: '#FFF9E6' }}
      >
        <Modal.Title className="w-100 text-center fw-bold">
          {t('infoPlanModal.title')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        className="text-center fs-6"
        style={{ backgroundColor: '#FFF9E6' }}
      >
        {t('infoPlanModal.body')}
      </Modal.Body>

      <Modal.Footer
        className="d-flex justify-content-center border-top border-3 border-dark rounded-bottom"
        style={{ backgroundColor: '#FFF9E6' }}
      >
        <Button
          variant=""
          size="lg"
          className="w-100 py-2 border-3 fw-bold"
          style={{
            backgroundColor: '#D6EEA6',   // verde chiaro, coerente con OK
            borderColor: '#2D2D2D',
            color: '#000000',
            borderRadius: '12px'
          }}
          onClick={props.onHide}
        >
          {t('infoPlanModal.understood')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InfoPlanModal;