import { Outlet } from 'react-router';
import Notification from './Notification';

function DefaultLayout() {
    return (
        <div className="android-device">
            <div className="screen-content">
                <div className="app-container">
                    <Outlet />
                    <Notification />
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;