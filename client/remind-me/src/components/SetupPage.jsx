import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

function SetupPage() {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<div className="setup-page d-flex flex-column">
			<div style={{ 
					position: 'absolute', 
					top: '25px', 
					right: '10px', 
					zIndex: 1000 
				}}>
					<LanguageSelector />
            </div>
			<div className="setup-header text-center">
				<p className="setup-kicker mb-1">{t('setupPage.title')}</p>
				<h1 className="setup-title mb-1">REMIND ME</h1>
			</div>

			<div className="setup-body flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center">
				<div className="setup-illustration mb-3">
					<div className="setup-blob" aria-hidden="true"></div>
					<div className="setup-pill pill-left" aria-hidden="true"></div>
					<div className="setup-pill pill-right" aria-hidden="true"></div>
					<div className="setup-bottle" aria-hidden="true">
						<div className="setup-bottle-cap"></div>
						<div className="setup-bottle-label">RM</div>
					</div>
				</div>
				<p className="setup-empty-text mb-0">{t('setupPage.noPlans')}</p>
			</div>

			<div className="setup-footer border-top border-3 border-dark pt-3">
				<Button
					className="setup-new-plan-btn w-100 py-3 border-3 fw-bold"
					onClick={() => navigate('/newPlan')}
				>
					<span className="fs-4">{t('navigation.newPlan')}<i class="bi bi-plus-circle-fill fs-3 text-success" ></i></span>
				</Button>
			</div>
		</div>
	);
}

export default SetupPage;