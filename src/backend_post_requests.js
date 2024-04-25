import axios from 'axios'
const URL = "https://workwise-backend.azurewebsites.net"

async function insertProject(project_name, description, manager_id, estimated_time) {
    const project = {
      project_name: project_name,
      description: description,
      manager_id: manager_id,
      estimated_time: estimated_time
    }
  
    axios.post(`${URL}/Project`, project)
      .then((res) => {
        return console.log(res.data);
      }).catch((err) => {
        return console.error(err);
      });
  }

  export {insertProject}