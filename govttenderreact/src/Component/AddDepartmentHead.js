import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddDepartment() {
  const [deptid, setDeptID] = useState();
  const [dept, setDept] = useState([]);
  const [dheadname, setDheadName] = useState("");
  const [email, setEmail] = useState("");
  const [pno, setPno] = useState("");
  const [address, setAddress] = useState("");

  const [depthead, setDeptHead] = useState([]);

  function GetDept() {
    axios
      .get("http://localhost:8080/GetDept")
      .then((res) => {
        setDept(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    GetDept();
    GetDeptHead();
  }, []);

  function handlesubmit() {
    if (!dheadname) {
      toast.error("Please Enter Head Name");
      return;
    }
    if (!email) {
      toast.error("Please Enter Email");
      return;
    }
    if (!pno) {
      toast.error("Please Enter Phone Number");
      return;
    }
    if (!address) {
      toast.error("Please Enter Address");
      return;
    }
    if (!deptid) {
      toast.error("Please Select Department");
      return;
    }
    const obj = { dheadname, email, pno, address };
    axios
      .post(`http://localhost:8080/AddDeptHead/${deptid}`, obj)
      .then((res) => {
        toast.success(res.data);
        GetDeptHead();
        ClearAll();
      });
  }

  function ClearAll() {
    setDheadName("");
    setDeptID("");
    setEmail("");
    setPno("");
    setAddress("");
  }

  function GetDeptHead() {
    axios.get("http://localhost:8080/GetDeptHead").then((res) => {
      setDeptHead(res.data);
    });
  }

  return (
    <div className="container">
      <div className="row ">
        <div className="col-4">
          <h4 className="text-center">Add Department Head Details</h4>
          <div className="card p-1 bg-secondary">
            <div className="card p-4">
              <div className="mb-3">
                <label>Head Name</label>
                <input
                  type="text"
                  className="form-select mb-3 border border-2 border-secondary"
                  value={dheadname}
                  onChange={(e) => setDheadName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <lable>Select Department</lable>
                <select
                  className="form-select mb-3 border border-2 border-secondary"
                  value={deptid}
                  onChange={(e) => setDeptID(e.target.value)}
                >
                  <option value={0}>--Select--</option>
                  {dept.map((item) => {
                    return <option value={item.deptid}>{item.deptname}</option>;
                  })}
                </select>
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control border border-2 border-secondary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label>Phone</label>
                <input
                  type="text"
                  className="form-control border border-2 border-secondary"
                  value={pno}
                  onChange={(e) => setPno(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control border border-2 border-secondary"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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

        <div className="col-8">
          <h4 className="text-center">Department Head Details</h4>
          <div className="card p-1 bg-secondary">
            <div className="card p-4">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Department Head Name</th>
                    <th>Department Name</th>
                    <th>Department Head Email</th>
                    <th>Department Head Ph No</th>
                    <th>Department HeadAddress</th>
                  </tr>
                </thead>
                <tbody>
                  {depthead.map((item) => {
                    return (
                      <tr>
                        <td>{item.dheadname}</td>
                        <td>{item.addDept.deptname}</td>
                        <td>{item.email}</td>
                        <td>{item.pno}</td>
                        <td>{item.address}</td>
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
