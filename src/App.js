import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import HR from "./Pages/HomePages/HR";
import Staff from "./Pages/HomePages/Staff";
import Manager from "./Pages/HomePages/Manager";
import EmployeeManagement from "./Pages/EmployeeManagementPage/EmployeeManagement"
import StaffProjectPage from './Pages/ProjectPages/StaffProjectPage';
import ManagerProjectPage from './Pages/ProjectPages/ManagerProjectPage';
import HRProjectPage from './Pages/ProjectPages/HRProjectPage';
import { Route, Routes } from "react-router-dom";
import { EmployeeProvider } from './Components/EmployeeContext/EmployeeContext';
import StaffFeedbackPage from "./Pages/FeedbackPages/StaffFeedbackPage";

function App() {
  return (
    <EmployeeProvider>
      <div className='App'>
        <Routes>
          <Route path="/HR" element={<HR />} />
          <Route path="/Staff" element={<Staff />} />
          <Route path="/Manager" element={<Manager />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/EmployeeManagement" element={<EmployeeManagement />} />
          <Route path="/StaffProjectPage" element={<StaffProjectPage/>} />
          <Route path="/ManagerProjectPage" element={<ManagerProjectPage/>} />
          <Route path="/HRProjectPage" element={<HRProjectPage/>} />
          <Route path="/StaffFeedbackPage" element={<StaffFeedbackPage/>} />
        </Routes>
      </div>
    </EmployeeProvider>
  );
}

export default App;
