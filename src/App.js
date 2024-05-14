import { Home } from './pages/home';
import { Login } from './pages/login';
import { Feed } from './pages/feed';
import { Cadastro } from './pages/cadastro';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from 'react-router-dom';

function App() {
  return (<>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;