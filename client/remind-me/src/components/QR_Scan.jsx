import { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import BackButton from "./BackButton";
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';


function QR_Scan(props) {
  const videoRef = useRef(null);
  const [inputText, setInputText] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const determinePlanId = () => {
    if (props.morning == "7-10") {
      if (props.afternoon == "13-16") {
        if (props.planId === 1) {
          return 2;
        } else {
          return 1;
        }
      } else {
        if (props.planId === 3) {
          return 4;
        } else {
          return 3;
        }      
      }
    } else {
      if (props.afternoon == "13-16") {
        if (props.planId === 5) {
          return 6;
        } else {
          return 5;
        }
      } else {
        if (props.planId === 7) {
          return 8;
        } else {
          return 7;
        }
      }
    }
  };


  const handleSubmit = () => {
    const newPlanId = determinePlanId();
    props.setPlanId(newPlanId);
    props.setHasPlan(true);
    setShow(true);
  }

  const onHide = () => {
    setShow(false);
    navigate("/");
  }

  useEffect(() => {
    let stream;

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then(s => {
        stream = s;
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(err => console.error("Camera access error:", err));

    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, []);

  /*function capture() {
    callApi(); // placeholder
  }

  function callApi() {
    console.log("API called");
  }*/

  return (
    <div className="position-relative vh-100 bg-dark">
      <video
        ref={videoRef}
        className="w-100 h-100 object-fit-cover"
        autoPlay
        playsInline
      />

      {/* Back Button */}
      <BackButton variant="light" className="position-absolute" style={{ top: "20px", left: "20px", zIndex: 10 }} />

      {/* Overlay with frame */}
      <div className="position-absolute start-50 translate-middle-x w-100 h-100 d-flex flex-column align-items-center pointer-events-none" style={{ top: 0, paddingTop: "60px" }}>
        <h1 className="text-white mb-5" style={{ zIndex: 1 }}>{t('newPlanPage.title')}</h1>
        <div
          className="border border-white"
          style={{
            width: "70vw",
            maxWidth: "300px",
            aspectRatio: "1/1",
            boxShadow: "0 0 0 9999px rgba(0,0,0,0.5)"
          }}
        />
      </div>

      {/* Text Input */}
      <Form.Control
        type="text"
        placeholder={t('qrScan.enterPlanCode')}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="position-absolute start-50 translate-middle-x"
        style={{ 
          bottom: "140px", 
          width: "70vw", 
          maxWidth: "300px",
          zIndex: 10,
          pointerEvents: "auto"
        }}
      />

      <Button
        className="btn-light position-absolute start-50 translate-middle-x py-3 px-5 fs-1 fw-bold"
        size="lg"
        onClick={handleSubmit}
        style={{ borderRadius: "0", bottom: "30px", pointerEvents: "auto" }}
      >
        {t('qrScan.scan')}
      </Button>

      <Modal
          show={show}
          backdrop="static"
          keyboard={false}
          centered
          size="sm"
      >
          <Modal.Body className='fs-5 text-center'>
          {t('qrScan.successMessage')}
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
          <Button size="lg" variant="primary" onClick={onHide}>
              OK
          </Button>
          </Modal.Footer>
      </Modal>
    </div>
  );
}

export default QR_Scan;