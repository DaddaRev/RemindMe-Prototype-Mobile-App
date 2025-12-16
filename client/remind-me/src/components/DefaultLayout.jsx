import { Outlet } from 'react-router';
import StatusBar from './StatusBar';

function DefaultLayout() {
    return (
        <div className="android-device">
            <div className="screen-content">
                <StatusBar />
                <div className="app-container">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;