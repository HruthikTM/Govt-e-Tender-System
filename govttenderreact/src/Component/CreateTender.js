import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CreateTender() {
  const [tendername, setTenderName] = useState("");
  const [workid, setWorkid] = useState();
  const [description, setDescription] = useState("");
  const [tenderstdate, setTenderstdate] = useState("");
  const [tenderenddate, setTenderenddate] = useState("");

  const [tenderdetails, setTenderdetails] = useState([]);
  const [deptid, setDeptid] = useState([]);
  const [work, setWork] = useState([]);
  const [workID, setWorkID] = useState();

  function GetWork() {
    axios
      .get("http://localhost:8080/GetWork")
      .then((res) => {
        setWork(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    GetWork();
    GetDeptiD();
  }, []);

  function handlesubmit() {
    if (!tendername) {
      toast.error("Please Enter Head Name");
      return;
    }
    if (!tenderstdate) {
      toast.error("Please Enter Start Date");
      return;
    }
    if (!tenderenddate) {
      toast.error("Please Enter End Date");
      return;
    }
    if (!description) {
      toast.error("Please Enter Description");
      return;
    }
    if (!workid) {
      toast.error("Please Select Work");
      return;
    }

    const obj = { tendername, tenderstdate, tenderenddate, description };
    axios
      .post(`http://localhost:8080/Createtender/${workid}`, obj)
      .then((res) => {
        toast.success(res.data);
        ClearAll();
      });
  }

  function ClearAll() {
    setTenderName("");
    setWorkid("");
    setDescription("");
    setTenderstdate("");
    setTenderenddate("");
  }

  function GetDeptiD() {
    var Id = sessionStorage.getItem("deptheadid");
    axios.get(`http://localhost:8080/getdeptheaddetails/${Id}`).then((res) => {
      setDeptid(res.data);
    });
  }

  function handleget(workID) {
    axios
      .get(`http://localhost:8080/gettenderdetails/${workID}`)
      .then((res) => {
        setTenderdetails(res.data);
      });
  }

  function val(e) {
    setWorkID(e.target.value);
    handleget(e.target.value);
  }

  return (
    <div classname="container">
      <div className="row ">
        <div className="col-4">
          <h4 className="text-center">Add Tender Details</h4>

          <div className="card p-1 mt-2 bg-secondary">
            <div className="card p-4">
              <div className="mb-3">
                <label>Tender Name</label>
                <input
                  type="text"
                  className="form-control border border-2 border-secondary"
                  value={tendername}
                  onChange={(e) => setTenderName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <lable>Select Work</lable>
                <select
                  className="form-select mb-3 border border-2 border-secondary"
                  value={workid}
                  onChange={(e) => setWorkid(e.target.value)}
                >
                  <option value={0}>--Select--</option>
                  {work
                    .filter((item) => item.addDept?.deptid == deptid)
                    .map((item) => {
                      return (
                        <option value={item.workid}>{item.workname}</option>
                      );
                    })}
                </select>
              </div>

              <div className="mb-3">
                <label>Tender Start Date</label>
                <input
                  type="text"
                  className="form-control border border-2 border-secondary"
                  value={tenderstdate}
                  onChange={(e) => setTenderstdate(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label>Tender End Date</label>
                <input
                  type="text"
                  className="form-control border border-2 border-secondary"
                  value={tenderenddate}
                  onChange={(e) => setTenderenddate(e.target.value)}
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

        <div className="col-8">
          <h4 className="text-center">Tender Details</h4>
          <div className="card p-1 bg-secondary">
            <div className="card p-4">
              <div className="mb-3">
                <label className="form-label">Select Work</label>
                <select
                  className="form-select mb-3 border border-2 border-secondary"
                  value={workID}
                  onChange={val}
                >
                  <option value={0}>--Select--</option>
                  {work
                    .filter((item) => item.addDept?.deptid == deptid)
                    .map((item) => {
                      return (
                        <option value={item.workid}>{item.workname}</option>
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
                    <th>Tender Name</th>
                    <th>Work Name</th>
                    <th>Tender Start Date</th>
                    <th>Tender End Date</th>
                    <th>Tender Call Date</th>
                    <th>Tender Description</th>
                    <th>Tender Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tenderdetails.map((item) => {
                    return (
                      <tr>
                        <td>{item.tendername}</td>
                        <td>{item.workDetails?.workname}</td>
                        <td>{item.tenderstdate}</td>
                        <td>{item.tenderenddate}</td>
                        <td>{item.tenderdate}</td>
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
