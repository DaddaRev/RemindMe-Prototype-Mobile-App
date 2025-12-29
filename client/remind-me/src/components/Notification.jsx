import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap'; 
import { useNavigate } from 'react-router';
import API from '../API/API.mjs';
import { useTranslation } from 'react-i18next';

function Notification() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState(null);
  const [showTooTiredScreen, setShowTooTiredScreen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    // Poll the server every 5 seconds
    const checkForNotifications = async () => {
      try {
        const response = await API.checkNotification();
        
        // If server responds with "yes" or a truthy value, show notification
        if (response && (response.status === 'yes' || response === 'yes')) {
          setNotificationData(response);
          setShowNotification(true);
        }
      } catch (error) {
        console.error('Error checking notifications:', error);
      }
    };
    checkForNotifications(); // initial check

    const intervalId = setInterval(checkForNotifications, 5000); //polling every 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  // User confirms taking medicine
  const handleOkClick = () => {
    setShowNotification(false);
    setNotificationData(null);
    setShowTooTiredScreen(false);
  };

  // User is too tired - show options screen
  const handleTooTiredClick = () => {
    setShowTooTiredScreen(true);
  };

  // Go back to main notification screen
  const handleBackClick = () => {
    setShowTooTiredScreen(false);
  };

  // Postpone 10 minutes
  const handlePostponeClick = () => {
    setShowNotification(false);
    setNotificationData(null);
    setShowTooTiredScreen(false);
  };

  // Navigate to modify plan page
  const handleModifyPlanClick = () => {
    // Navigate to update page - assuming we have planId and medicineId in notificationData
    const planId = notificationData?.planId || 1; // Default to 1 if not provided    
    setShowNotification(false);
    setNotificationData(null);
    setShowTooTiredScreen(false);
    navigate(`/plans/1/scheduled/10`); // Hardcoded medicineId and plan for demo
  };

  if (!showNotification) {
    return null;
  }

  // "Too Tired" options screen
  if (showTooTiredScreen) {
    return (
      <div className="notification-overlay d-flex align-items-center justify-content-center">
        <div className="modal-dialog modal-dialog-centered w-100 phone-modal-dialog">
          <div className="modal-content bg-white shadow-lg rounded-4 p-4" style={{ border: '2px solid #e0e0e0' }}>
            <div className="modal-body text-center d-flex flex-column justify-content-between" style={{ minHeight: '280px' }}>
              
              {/* Header */}
              <div className="mt-2">
                <Row className="justify-content-center mb-4">
                  <Col xs={12}>
                    <h4 className="fw-bold mb-2" style={{ color: '#2d3748' }}>
                      {t('notification.whatToDo')}
                    </h4>
                  </Col>
                </Row>
              </div>

              {/* Buttons */}
              <div className="mb-2">
                <Row className="g-3">
                  <Col xs={12}>
                    <button
                      type="button"
                      className="btn w-100 py-3 fw-semibold"
                      onClick={handlePostponeClick}
                      style={{ 
                        backgroundColor: '#fff9c4', 
                        color: '#7d6608', 
                        border: '2px solid #f9a825', 
                        fontSize: '1rem',
                        borderRadius: '10px',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-1px)';
                        e.target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.15)';
                        e.target.style.backgroundColor = '#fff59d';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
                        e.target.style.backgroundColor = '#fff9c4';
                      }}
                    >
                      {t('notification.postpone')}
                    </button>
                  </Col>

                  <Col xs={12}>
                    <button
                      type="button"
                      className="btn w-100 py-3 fw-semibold"
                      onClick={handleModifyPlanClick}
                      style={{ 
                        backgroundColor: '#ffccbc', 
                        color: '#bf360c', 
                        border: '2px solid #ff7043', 
                        fontSize: '1rem',
                        borderRadius: '10px',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-1px)';
                        e.target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.15)';
                        e.target.style.backgroundColor = '#ffab91';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
                        e.target.style.backgroundColor = '#ffccbc';
                      }}
                    >
                      {t('notification.modifyPlan')}
                    </button>
                  </Col>

                  <Col xs={12}>
                    <button
                      type="button"
                      className="btn w-100 py-2 fw-normal"
                      onClick={handleBackClick}
                      style={{ 
                        backgroundColor: 'transparent', 
                        color: '#718096', 
                        border: '1px solid #cbd5e0', 
                        fontSize: '0.875rem',
                        borderRadius: '8px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#f7fafc';
                        e.target.style.color = '#4a5568';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#718096';
                      }}
                    >
                      {t('buttons.cancel')}
                    </button>
                  </Col>
                </Row>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main notification screen
  return (
    <div className="notification-overlay d-flex align-items-center justify-content-center">
      <div className="modal-dialog modal-dialog-centered w-100 phone-modal-dialog">
        <div className="modal-content bg-white shadow-lg rounded-4 p-4" style={{ border: '2px solid #e0e0e0' }}>
          <div className="modal-body text-center d-flex flex-column justify-content-between" style={{ minHeight: '280px' }}> 
            {/* Icon and Time */}
            <div className="mt-2">
              <Row className="justify-content-center mb-3">
                <Col xs="auto">
                  <div className="notification-icon-large mb-2">
                    <svg
                      width="56"
                      height="56"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg" //bell icon
                    >
                      <path
                        d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z"
                        fill="#e63946"
                      />
                    </svg>
                  </div>
                </Col>
              </Row>
              <Row className="justify-content-center mb-2">
                <Col xs={12}>
                  <h2 className="fw-bold mb-0" style={{ color: '#2d3748', fontSize: '2.5rem' }}>
                    {notificationData?.time || "16:00"}
                  </h2>
                </Col>
              </Row>
              <Row className="justify-content-center mb-2">
                <Col xs={12}>
                  <h5 className="fw-bold text-uppercase" style={{ color: '#2d3748', fontSize: '1.2rem', lineHeight: '1.4', letterSpacing: '0.5px' }}>
                    {notificationData?.message}
                  </h5>
                </Col>
              </Row>
              <Row className="justify-content-center mb-4">
                <Col xs={12}>
                  <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>
                    {t('notification.timeToTake')}
                  </p>
                </Col>
              </Row>
            </div>

            {/* Buttons */}
            <div className="mb-2">
              <Row className="g-2">
                <Col xs={12}>
                  <button
                    type="button"
                    className="btn w-100 py-3 fw-semibold"
                    onClick={handleTooTiredClick}
                    style={{ 
                      backgroundColor: '#f7fafc', 
                      color: '#4a5568', 
                      border: '2px solid #cbd5e0', 
                      fontSize: '1rem',
                      borderRadius: '10px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#edf2f7';
                      e.target.style.borderColor = '#a0aec0';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#f7fafc';
                      e.target.style.borderColor = '#cbd5e0';
                    }}
                  >
                    {t('notification.tooTired')}
                  </button>
                </Col>

                <Col xs={12}>
                  <button
                    type="button"
                    className="btn w-100 py-3 fw-semibold text-white"
                    onClick={handleOkClick}
                    style={{ 
                      backgroundColor: '#e63946', 
                      border: 'none', 
                      fontSize: '1rem',
                      borderRadius: '10px',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 8px rgba(230, 57, 70, 0.3)'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-1px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(230, 57, 70, 0.4)';
                      e.target.style.backgroundColor = '#d62839';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 2px 8px rgba(230, 57, 70, 0.3)';
                      e.target.style.backgroundColor = '#e63946';
                    }}
                  >
                    {t('notification.takeIt')}
                  </button>
                </Col>
              </Row>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;