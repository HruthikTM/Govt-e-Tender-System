import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function WorkDetails() {
  const [workname, setWorkName] = useState("");
  const [description, setDescription] = useState("");
  const [work, setWork] = useState([]);
  const [headid, setHeadID] = useState();

  useEffect(() => {
    GetWork();
  }, []);

  function handlesubmit() {
    if (!workname) {
      toast.error("Please Enter Head Name");
      return;
    }
    if (!description) {
      toast.error("Please Enter Description");
      return;
    }

    const obj = { workname, description };
    axios
      .post(`http://localhost:8080/Workdetails/${headid}`, obj)
      .then((res) => {
        toast.success(res.data);
        GetWork();
        ClearAll();
      });
  }

  function ClearAll() {
    setWorkName("");
    setDescription("");
  }

  function GetWork() {
    var id = sessionStorage.getItem("deptheadid");
    setHeadID(id);
    axios.get(`http://localhost:8080/GetWorkDetails/${id}`).then((res) => {
      setWork(res.data);
    });
  }

  return (
    <div className="container">
      <div className="row ">
        <div className="col-4">
          <h4 className="text-center">Add Work Details</h4>
          <div className="card p-1 bg-secondary">
            <div className="card p-4">
              <div className="mb-3">
                <label>Work Name</label>
                <input
                  type="text"
                  className="form-control border border-2 border-secondary"
                  value={workname}
                  onChange={(e) => setWorkName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label>Description</label>
                <input
                  type="text"
                  className="form-control border border-2 border-secondary"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
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

        <div className="col-7">
          <h4 className="text-center">Work Details</h4>
          <div className="card p-1 bg-secondary">
            <div className="card p-4">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Work Name</th>
                    <th>Department Name</th>
                    <th>Work Description</th>
                    <th>Work Status</th>
                  </tr>
                </thead>
                <tbody>
                  {work.map((item) => {
                    return (
                      <tr>
                        <td>{item.workname}</td>
                        <td>{item.addDept.deptname}</td>
                        <td>{item.description}</td>
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
