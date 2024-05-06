import { useLocation } from "react-router";
import Header from "../../Components/Header/Header";

function ChatPage(){
    //Variables
    const location = useLocation();
    console.log(location.state);

    return(
        <>
          <Header>
                <h1> Workwise </h1>
                <button className="logout-button">Log Out</button>
            </Header>

            {
                role === "Manager" 
                ? <ManagerProjectViewSection managerID={employeeID}/> 
                : <StaffProjectViewSection staffID={employeeID}/>
            }
        </>
    );
}

export default ChatPage;