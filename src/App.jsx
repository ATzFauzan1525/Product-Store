import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import ProductDetail from './components/public/ProductDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/detail-produk/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;