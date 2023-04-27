import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './HomePage'
import FireworksPage from './FireworksPage'
import OSMap from './OSMap';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/fire" element={ <FireworksPage /> } />
        <Route path="/map" element={ <OSMap /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
