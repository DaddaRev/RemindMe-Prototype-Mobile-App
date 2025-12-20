import { Outlet } from 'react-router';

function DefaultLayout() {
    return (
        <div className="android-device">
            <div className="screen-content">
                <div className="app-container">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;