import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function InfoPlanModal(props) {
  return (
      <Modal
        show={props.show}
        backdrop="static"
        keyboard={false}
        centered
        size="sm"
      >
        <Modal.Header>
          <Modal.Title className='w-100 text-center'>Information on plan</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center fs-5'>
          Plan is used for gathering together the medicines you need to take during the week with their intake times.
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="primary" onClick={props.onHide}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default InfoPlanModal;