import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import HR from "./Pages/HomePages/HR";
import Staff from "./Pages/HomePages/Staff";
import Manager from "./Pages/HomePages/Manager";
import EmployeeManagement from "./Pages/EmployeeManagementPage/EmployeeManagement"
import StaffProjectPage from './Pages/ProjectPages/StaffProjectPage';
import ManagerProjectPage from './Pages/ProjectPages/ManagerProjectPage';
import { Route, Routes, useNavigate } from "react-router-dom";
import { EmployeeProvider } from './Components/EmployeeContext/EmployeeContext';
import StaffFeedbackPage from "./Pages/FeedbackPages/StaffFeedbackPage";
import HRPlanMeals from './Pages/MealPages/HRPlanMeals';
import ChooseTime from './Pages/TimePages/ChooseTime';
import Timer from './Pages/TimePages/Timer';

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
          <Route path="/Timer" element={<Timer/>} />
        </Routes>
      </div>
    </EmployeeProvider>
  );
}

export default App;
