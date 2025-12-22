import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function BackButton({ fallback = '/', onClick, ...props }) {
  const navigate = useNavigate();

  const handleBack = (e) => {
    onClick?.(e);
    if (e?.defaultPrevented) return;

    if (window.history.length > 1) navigate(-1);
    else navigate(fallback, { replace: true });
  };

  return (
    <Button className="btn-dark" size="lg" onClick={handleBack} {...props}>
      <i className="bi bi-arrow-left" aria-hidden="true"></i>
    </Button>
  );
}

export default BackButton;