import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UpdateProject() {
  const [client, setClient] = useState([]);
  const [clientID, setClientID] = useState();
  const [projectdetails, setProjectDetails] = useState([]);
  const [bidderid, setBidderid] = useState();

  function GetClient() {
    axios
      .get("http://localhost:8080/GetClient")
      .then((res) => {
        setClient(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    GetClient();
    GetBidderid();
  }, []);

  function handleget(clientID) {
    if (!clientID) {
      toast.error("Please Select Client");
      return;
    }
    axios
      .get(`http://localhost:8080/getclientprojectdetails/${clientID}`)
      .then((res) => {
        setProjectDetails(res.data);
      });
  }

  function GetBidderid() {
    var id = sessionStorage.getItem("bidderid");
    setBidderid(id);
  }

  function handleupdate() {
    axios.put(`http://localhost:8080/UpdateStatus/${clientID}`).then((res) => {
      if (res.data === "This Project Already Completed") toast.error(res.data);
      else toast.success(res.data);
    });
  }

  function val(e) {
    setClientID(e.target.value);
    handleget(e.target.value);
  }

  return (
    <div className="container">
      <div className="col-10">
        <h4 className="text-center">Update Project Details</h4>
        <div className="card p-1 bg-secondary">
          <div className="card p-4">
            <div className="mb-3">
              <lable>Select Client</lable>
              <select
                className="form-select mb-3 border border-2 border-secondary"
                value={clientID}
                onChange={val}
              >
                <option value={0}>--Select--</option>
                {client
                  .filter(
                    (item) => item.bidderRegistration?.bidderid == bidderid
                  )
                  .map((item) => {
                    return (
                      <option value={item.clientid}>{item.clientname}</option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="col-10">
        <div className="card p-1 mt-2 bg-secondary">
          <div className="card p-4">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Client Project Name</th>
                  <th>Client Name</th>
                  <th>Client Project Description</th>
                  <th>Client Project Date</th>
                  <th>Download Document</th>
                  <th>Client Project Status</th>
                </tr>
              </thead>
              <tbody>
                {projectdetails
                  .filter((item) => item.status === "pending")
                  .map((item) => {
                    return (
                      <tr>
                        <td>{item.projectname}</td>
                        <td>{item.clientBasic?.clientname}</td>
                        <td>{item.description}</td>
                        <td>{item.projectdate}</td>
                        <td>
                          <a href={item.filepath} download>
                            {" "}
                            Download Document
                          </a>
                        </td>
                        <td>{item.status}</td>
                        <td>
                          <input
                            type="button"
                            className="btn btn-primary"
                            onClick={handleupdate}
                            value="Complete"
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
