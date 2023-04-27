import logo from './logo.svg';
import './HomePage.css';
import AppBanner from './AppBanner';
import { Button } from '@mui/material';

const HomePage = () => {
    return (
        <div className="App">
        <header className="App-header">
          <AppBanner />
          <img src={logo} className="App-logo" alt="logo" />
          <div style={{ display: 'flex', gap: '4px' }}>
            <Button
              variant="contained" 
              color="primary"
              size="large"
              href="https://reactjs.org"
              target="_blank"
            >
              Learn React
            </Button>
            <Button
              variant="contained" 
              color="primary"
              size="large"
              href="/fire"
              target="_blank"
            >
              Fireworks
            </Button>
          </div>
        </header>
      </div>
    )
}

export default HomePage;