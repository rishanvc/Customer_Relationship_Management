import './App.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from "react";
import { fetchWithAuth } from "./services/api";
import Customers from './pages/Customers';
import Notes from './pages/Notes';
import Staff from './pages/Staff';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function DashboardLayout({ children }   ) {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const loadCustomers = async () => {
      const data = await fetchWithAuth("/customers/list/");
      setCustomers(data);
    };

    loadCustomers();
  }, []);

  return (
    <div className="flex">
      
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6 ">
          {children}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/customers" element={<DashboardLayout><Customers /></DashboardLayout>} />
      <Route path="/notes" element={<DashboardLayout><Notes /></DashboardLayout>} />
      <Route path="/staff" element={<DashboardLayout><Staff /></DashboardLayout>} />
      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />
    </Routes>
  );  
}

export default App;