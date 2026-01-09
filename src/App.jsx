import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import AdminLoginPage from './pages/AdminLoginPage';
import EditProductPage from './pages/EditProductPage';
import ProductDetail from './components/public/ProductDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/edit/:id" element={<EditProductPage />} />
        <Route path="/detail-produk/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;