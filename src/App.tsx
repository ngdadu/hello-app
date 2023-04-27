import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './HomePage'
import FireworksPage from './FireworksPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/fire" element={ <FireworksPage /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
