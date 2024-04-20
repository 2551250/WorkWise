import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import HR from "./Pages/HomePages/HR";
import Staff from "./Pages/HomePages/Staff";
import Manager from "./Pages/HomePages/Manager";
import EmployeeManagement from "./Pages/StaffManagementPage/EmployeeManagement"
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/HR" element={<HR />} />
        <Route path="/Staff" element={<Staff />} />
        <Route path="/Manager" element={<Manager />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/EmployeeManagement" element={<EmployeeManagement />} />
      </Routes>

    </div>
  );
}

export default App;
