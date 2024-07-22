import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewProject() {
  const [projectdetails, setProjectDetails] = useState([]);

  useEffect(() => {
    GetClientProject();
  }, []);

  const navigate = useNavigate();

  function GetClientProject() {
    var id = sessionStorage.getItem("clientid");
    axios
      .get(`http://localhost:8080/getclientprojectdetails/${id}`)
      .then((res) => {
        setProjectDetails(res.data);
      });
  }

  function handlecomments(projectid) {
    navigate("/clienthome/postfeedback");
    sessionStorage.setItem("projectid", projectid);
  }

  return (
    <div className="container">
      <div className="card p-1 mt-2 bg-secondary">
        <div className="card p-4">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Client Project Name</th>
                <th>Client Name</th>
                <th>Client Project Description</th>
                <th>Client Project Date</th>
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
                    <td>{item.status}</td>
                    {item.status === "completed" ? (
                      <td>
                        <input
                          type="button"
                          className="btn btn-primary"
                          onClick={(e) => handlecomments(item.projectid)}
                          value="Post Comments"
                        />
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
