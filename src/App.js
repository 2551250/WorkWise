import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import HR from "./Pages/HomePages/HR";
import Staff from "./Pages/HomePages/Staff";
import Manager from "./Pages/HomePages/Manager";
import EmployeeManagement from "./Pages/EmployeeManagementPage/EmployeeManagement"
import ViewStaff from "./Pages/EmployeeManagementPage/ViewStaff"
import StaffProjectPage from './Pages/ProjectPages/StaffProjectPage';
import ManagerProjectPage from './Pages/ProjectPages/ManagerProjectPage';
import {Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { EmployeeProvider } from './Components/EmployeeContext/EmployeeContext';
import StaffFeedbackPage from "./Pages/FeedbackPages/StaffFeedbackPage";
import HRPlanMeals from './Pages/MealPages/HRPlanMeals';
import ChooseTime from './Pages/TimePages/ChooseTime';
import Timer from './Pages/TimePages/Timer';
import ManualTime from './Pages/TimePages/ManualTime';
import ChatPage from './Pages/ChatPage/ChatPage';
import StaffBookMeals from './Pages/MealPages/StaffBookMeals';
import Timesheet from './Pages/Timesheets/Timesheet';


function App() {
  const navigate = useNavigate();

  return (
    <EmployeeProvider>
      <div className='App'>
        <Routes>
          <Route path="/HR" element={<HR />} />
          <Route path="/Staff" element={<Staff />} />
          <Route path="/Manager" element={<Manager />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/EmployeeManagement" element={<EmployeeManagement />} />
          <Route path="/StaffProjectPage" element={<StaffProjectPage navigate={navigate}/>} />
          <Route path="/ManagerProjectPage" element={<ManagerProjectPage/>} />
          <Route path="/StaffFeedbackPage" element={<StaffFeedbackPage/>} />
          <Route path="/HRBookMeals" element={<HRPlanMeals/>} />
          <Route path="/ChooseTime" element={<ChooseTime/>} />
          <Route path="/Timer" element={<Timer navigate={navigate}/>} />
          <Route path="/ManualTimer" element={<ManualTime navigate={navigate}/>} />
          <Route path="/ChatPage" element={<ChatPage />} />
          <Route path="/StaffBookMeals" element={<StaffBookMeals/>} />
          <Route path="/Timesheet" element={<Timesheet/>} />
        

          <Route path = "/ViewStaff" element={<ViewStaff />} />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </EmployeeProvider>
  );
}

export default App;
