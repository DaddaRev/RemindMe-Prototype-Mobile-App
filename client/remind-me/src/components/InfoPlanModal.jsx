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
        <Modal.Header>
          <Modal.Title className='w-100 text-center'>{t('infoPlanModal.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center fs-5'>
          {t('infoPlanModal.body')}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="primary" onClick={props.onHide}>
            {t('infoPlanModal.understood')}
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default InfoPlanModal;