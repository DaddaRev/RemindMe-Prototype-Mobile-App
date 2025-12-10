import './App.css'
import HomePage from './components/HomePage'

function App() {
  return (
    <div className="android-device">
      <div className="screen-content">
        {/* Status Bar */}
        <div className="status-bar">
          <div className="status-left">
            <span className="time">9:41</span>
          </div>
          <div className="status-right">
            <div className="signal">
              <div className="signal-bar"></div>
              <div className="signal-bar"></div>
              <div className="signal-bar"></div>
            </div>
            <span className="wifi">📡</span>
            <div className="battery">
              <div className="battery-level"></div>
            </div>
          </div>
        </div>

        {/* App Content Area */}
        <div className="app-container">
          <HomePage />
        </div>
      </div>
    </div>
  )
}

export default App
