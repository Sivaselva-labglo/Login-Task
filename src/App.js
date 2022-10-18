import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './loginPage';
import UsersPage from './usersPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<LoginPage/>} />
        <Route exact path='/:userspage' element={<UsersPage/>} />
      </Routes>
    </Router>

  );
}

export default App;
