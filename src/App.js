import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './loginPage';
import UsersPage from './usersPage';
import PrivateRouter from './PrivateRouter';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<LoginPage />} />
        <Route exact path='/:userspage' element={
          <PrivateRouter>
            <UsersPage />
          </PrivateRouter>
        } />
      </Routes>
    </Router>

  );
}

export default App;
