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
      <div className="position-absolute start-50 translate-middle-x w-100 h-100 d-flex flex-column align-items-center pointer-events-none mt-3 mb-2" style={{ top: 0, paddingTop: "clamp(40px, 8vh, 80px)" }}>
        <h1 className="text-white mb-2" style={{ zIndex: 1, fontSize: 'clamp(1rem, 3.5vw, 1.3rem)', textAlign: 'center', padding: '0 1rem', lineHeight: '1.3' }}>{t('qrScan.instruction')}</h1>
        <div
          className="border border-white"
          style={{
            width: "clamp(200px, 70vw, 300px)",
            aspectRatio: "1/1",
            boxShadow: "0 0 0 9999px rgba(0,0,0,0.5)",
            borderWidth: '3px'
          }}
        />
      </div>

      {/* Text Input */}
      <Form.Control
        type="text"
        placeholder={t('qrScan.enterPlanCode')}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="position-absolute start-50 translate-middle-x mt-2"
        style={{ 
          bottom: "clamp(100px, 50vh, 280px)", 
          width: "clamp(250px, 50vw, 320px)",
          zIndex: 10,
          pointerEvents: "auto",
          borderColor: '#2D2D2D',
          borderWidth: '3px',
          borderRadius: '12px',
          padding: 'clamp(0.6rem, 2vw, 0.85rem)',
          fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
          fontWeight: '500'
        }}
      />

      <Button
        className="position-absolute start-50 translate-middle-x fw-bold border-3 mt-0"
        size="lg"
        onClick={handleSubmit}
        style={{ 
          bottom: "clamp(20px, 60vh, 170px)", 
          pointerEvents: "auto",
          background: 'rgba(254, 254, 254, 1)',
          borderColor: '#2D2D2D',
          color: '#1a1a1a',
          borderRadius: '12px',
          transition: 'all 0.2s ease',
          fontSize: 'clamp(1rem, 3.5vw, 1.3rem)',
          minWidth: 'clamp(180px, 50vw, 240px)',
          padding: 'clamp(0.6rem, 2vh, 1rem) clamp(1.5rem, 5vw, 2.5rem)'
        }}
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
          <Modal.Body className='p-4 text-center'>
            <h4 className="fw-bold text-success mb-3">{t('common.success')}</h4>
            <p className='mb-0' style={{ fontSize: 'clamp(1rem, 2.5vw, 1.1rem)' }}>
              {t('qrScan.successMessage')}
            </p>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center border-0 pt-0 pb-4">
            <Button 
              className="border-3 fw-bold"
              style={{
                background: '#f2e999ff',
                borderColor: '#2D2D2D',
                color: '#1a1a1a',
                borderRadius: '12px',
                transition: 'all 0.2s ease',
                fontSize: '18px',
                padding: '0.75rem 3rem'
              }}
              onClick={onHide}
            >
              OK
            </Button>
          </Modal.Footer>
      </Modal>
    </div>
  );
}

export default QR_Scan;