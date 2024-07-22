import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Qutation() {
  const [dept, setDept] = useState([]);
  const [deptid, setDeptID] = useState();
  const [tenderdetails, setTenderDetails] = useState([]);

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
  }, []);

  const navigate = useNavigate();

  function handlesubmit() {
    if (!deptid) {
      alert("Please Select Department");
      return;
    }
    axios
      .get(`http://localhost:8080/GetTenderDetails/${deptid}`)
      .then((res) => {
        debugger;
        setTenderDetails(res.data);
      });
  }

  function handleapply(tenderid, tenderstdate, tenderenddate, tenderdate) {
    console.log(tenderstdate + "," + tenderenddate + "," + tenderdate);

    axios
      .get(
        `http://localhost:8080/Applyforqutation/${tenderid}/${tenderdate}/${tenderstdate}/${tenderenddate}`
      )
      .then((res) => {
        if (res.data === "Today is within the range") {
          toast.success(res.data);
          navigate("/bidderhome/addqutation");
          sessionStorage.setItem("tenderid", tenderid);
        } else {
          toast.error(res.data);
        }
      });
  }

  return (
    <div className="container">
      <div className="col-10">
      <h4 className="text-center">Quotation Details</h4>
        <div className="card p-1 bg-secondary">
          <div className="card p-4">
            <div className="mb-3">
              <label className="form-label">Select Department</label>
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

      <div className="col-10">
        <div className="card p-1 mt-2 bg-secondary">
          <div className="card p-4">
            <h4 className="text-center">Client Project Details</h4>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Work Name</th>
                  <th>Tender Name</th>
                  <th>Tender Description</th>
                  <th>Tender Start Date</th>
                  <th>Tender End Date</th>
                </tr>
              </thead>
              <tbody>
                {tenderdetails.map((item) => {
                  return (
                    <tr>
                      <td>{item.workDetails?.workname}</td>
                      <td>{item.tendername}</td>
                      <td>{item.description}</td>
                      <td>{item.tenderstdate}</td>
                      <td>{item.tenderenddate}</td>

                      <td>
                        <input
                          type="button"
                          className="btn btn-primary"
                          onClick={(e) =>
                            handleapply(
                              item.tenderid,
                              item.tenderstdate,
                              item.tenderenddate,
                              item.tenderdate
                            )
                          }
                          value="Apply"
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
