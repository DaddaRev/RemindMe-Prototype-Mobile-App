import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

function SetupPage() {
	const navigate = useNavigate();

	return (
		<div className="setup-page d-flex flex-column">
			<div className="setup-header text-center">
				<p className="setup-kicker mb-1">WELCOME TO</p>
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
				<p className="setup-empty-text mb-0">There are no uploaded plans for the moment</p>
			</div>

			<div className="setup-footer border-top border-3 border-dark pt-3">
				<Button
					className="setup-new-plan-btn w-100 py-3 border-3 fw-bold"
					onClick={() => navigate('/newPlan')}
				>
					<span className="fs-4">NEW PLAN <i class="bi bi-plus-circle-fill fs-3 text-success" ></i></span>
				</Button>
			</div>
		</div>
	);
}

export default SetupPage;