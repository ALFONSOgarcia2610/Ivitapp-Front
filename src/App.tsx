import './App.css';
import { Outlet } from '@tanstack/react-router';
import Navbar from './comunes/navar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
