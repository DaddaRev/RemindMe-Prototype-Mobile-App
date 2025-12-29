import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function BackButton({ fallback = '/', onClick, ...props }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBack = (e) => {
    onClick?.(e);
    if (e?.defaultPrevented) return;

    if (window.history.length > 1) navigate(-1);
    else navigate(fallback, { replace: true });
  };

  return (
    <Button
      className="border-3 fw-bold action-btn"
      style={{ background: 'rgba(254, 254, 254, 1)', borderColor: '#2D2D2D', color: '#1a1a1a' }}
      onClick={handleBack}
      aria-label={t('navigation.back')}
      {...props}
    >
      ← {t('navigation.back')}
    </Button>
  );
}

export default BackButton;