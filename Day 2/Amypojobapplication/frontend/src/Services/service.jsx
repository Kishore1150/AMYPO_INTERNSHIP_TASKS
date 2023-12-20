import JobApp from "./axios";

class Services
{

  getApplication()
  {
    return JobApp.get("/getallapplications");
  }

  deleteApplication(id)
  {
    return JobApp.delete(`/deleteapplication/${id}`);
  }
  addApplication(applicationData)
  {
    return JobApp.post(
      "/addjobapplication",
      applicationData
    );
  }

  updateApplication(id,applicationdata)
  {
    return JobApp.put(`/updatejobapplication/${id}`, applicationdata);
  }

  Signup(userdata)
  {


    return JobApp.post("/register",userdata);
  }

  SignIn(userdata)
  {
    return JobApp.post("/login",userdata);
  }

  getUser(id)
  {
    return JobApp.get(`/getuser/${id}`);
  }


}

export default new Services();