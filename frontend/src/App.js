import {BrowserRouter, Routes,Route,Navigate} from 'react-router-dom'
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';

// pages && components
import Home from './pages/Home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

function App() {

  const {user}=useAuthContext()

  return (
    <div className="app">
      <BrowserRouter>
      <Navbar/>
      <div className='page'>
        <Routes>
          <Route
          path="/"
          element={user ? <Home/> : <Navigate to="/login"/>}
          />
          <Route
          path="/login"
          element={!user ? <Login/> :<Navigate to="/"/>}
          />
          <Route
          path="/signup"
          element={!user ? <Signup/> : <Navigate to="/"/>}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
