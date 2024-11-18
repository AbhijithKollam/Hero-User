import './App.css';
import Home from './Pages/Home';
import { Route, Routes } from 'react-router-dom';
import About from './Pages/About';
import Complaints from './Pages/Complaints';
import Auth from './Pages/Auth';
import PrivateRoute from './Components/PrivateRoute'; // Import the PrivateRoute component

function App() {
  return (
    <div>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Auth />} />
        <Route path='/register' element={<Auth register="register" />} />

        {/* Protected routes */}
        <Route 
          path='/home' 
          element={<PrivateRoute element={Home} />} 
        />
        <Route 
          path='/about' 
          element={<PrivateRoute element={About} />} 
        />
        <Route 
          path='/complaints' 
          element={<PrivateRoute element={Complaints} />} 
        />
      </Routes>
    </div>
  );
}

export default App;
