import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddDepartment() {
  const [deptname, setDeptName] = useState("");
  const [description, setDescription] = useState("");

  const [dept, setDept] = useState([]);

  useEffect(() => {
    getDept();
  }, []);

  function handlesubmit() {
    if (!deptname) {
      toast.error("Please Enter Dept Name");
      return;
    }
    if (!description) {
      toast.error("Please Enter Dept Description");
      return;
    }
    const obj = { deptname, description };
    axios.post("http://localhost:8080/AddDept", obj).then((res) => {
      if (res.data === "Department Already exist") toast.error(res.data);
      else toast.success("Department added Successfully");
      getDept();
      ClearAll();
    });
  }
  function ClearAll() {
    setDeptName("");
    setDescription("");
  }

  function getDept() {
    axios.get("http://localhost:8080/GetDept").then((res) => {
      setDept(res.data);
    });
  }

  return (
    <div className="container">
      <div className="row ">
        <div className="col-6">
          <h4 className="text-center">Add Department</h4>
          <div className="card p-1 bg-secondary">
            <div className="card p-4">
              <div className="mb-3">
                <label>Enter Department Name</label>
                <input
                  type="text"
                  className="form-control border border-2 border-secondary"
                  value={deptname}
                  onChange={(e) => setDeptName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label>Enter Department Description</label>
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

        <div className="col-6">
          <h4 className="text-center">Department Details</h4>
          <div className="card p-1 bg-secondary">
            <div className="card p-4">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Department Name</th>
                    <th>Department Description</th>
                  </tr>
                </thead>
                <tbody>
                  {dept.map((item) => {
                    return (
                      <tr>
                        <td>{item.deptname}</td>
                        <td>{item.description}</td>
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
