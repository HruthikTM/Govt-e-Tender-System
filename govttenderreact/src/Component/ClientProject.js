import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ClientProject() {
  const [filepath, setFilePath] = useState("");

  const [projectname, setProjectName] = useState("");
  const [clientid, setClientid] = useState();
  const [description, setDescription] = useState("");

  const [client, setClient] = useState([]);
  const [projectdetails, setProjectDetails] = useState([]);
  const [bidderid, setBidderid] = useState();
  const [clientID, setClientID] = useState();

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

  function handlesubmit() {
    if (!projectname) {
      toast.error("Please Enter Project Name");
      return;
    }
    if (!description) {
      toast.error("Please Enter Description");
      return;
    }
    if (!clientid) {
      toast.error("Please Select Client");
      return;
    }
    if (!filepath) {
      toast.error("Please Select File");
      return;
    }

    const obj = { projectname, description, filepath };
    axios
      .post(`http://localhost:8080/Clientproject/${clientid}`, obj)
      .then((res) => {
        toast.success(res.data);

        ClearAll();
      });
  }

  function ClearAll() {
    setProjectName("");
    setDescription("");
    setFilePath("");
  }

  function GetBidderid() {
    var id = sessionStorage.getItem("bidderid");
    setBidderid(id);
  }

  function handleget(clientID) {
    axios
      .get(`http://localhost:8080/getclientprojectdetails/${clientID}`)
      .then((res) => {
        setProjectDetails(res.data);
      });
  }

  function val(e) {
    setClientID(e.target.value);
    handleget(e.target.value);
  }

  const Image = (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFilePath(reader.result);
    };
  };
  return (
    <div className="container">
      <div className="row ">
        <div className="col-4">
          <h4 className="text-center">Add Client Project Details</h4>
          <div className="card p-1 bg-secondary">
            <div className="card p-4">
              <div className="mb-3">
                <label>Project Name</label>
                <input
                  type="text"
                  className="form-control border border-2 border-secondary"
                  value={projectname}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <lable>Select Client</lable>
                <select
                  className="form-select mb-3 border border-2 border-secondary"
                  value={clientid}
                  onChange={(e) => setClientid(e.target.value)}
                >
                  <option value={0}>--Select--</option>
                  {client
                    .filter(
                      (item) => item.bidderRegistration["bidderid"] == bidderid
                    )
                    .map((item) => {
                      return (
                        <option value={item.clientid}>{item.clientname}</option>
                      );
                    })}
                </select>
              </div>

              <div className="mb-3">
                <label>Enter Project Description</label>
                <input
                  type="text"
                  className="form-control border border-2 border-secondary"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="form-group py-2 border border-2 border-secondary">
                <label>Choose file</label>
                <input type="file" className="form-control" onChange={Image} />
              </div>

              <div className="text-end">
                <input
                  type="button"
                  className="btn btn-primary"
                  onClick={handlesubmit}
                  value="Submit"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-8">
          <h4 className="text-center">Client Project Details</h4>
          <div className="card p-1 bg-secondary">
            <div className="card p-4">
              <div className="mb-3">
                <lable>Select Client</lable>
                <select
                  className="form-select mb-3"
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
                  {projectdetails.map((item) => {
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
