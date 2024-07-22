import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import photo from "../e-tender img.webp";

export default function Home() {
  const [usetype, setUserType] = useState("");
  const [userid, setUserId] = useState();
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handlelogin() {
    if (!usetype) {
      toast.error("Please Select User Type");
      return;
    }

    if (usetype == 1) {
      if (!userid) {
        toast.error("Please Enter User ID");
        return;
      }

      if (!password) {
        toast.error("Please Enter Password");
        return;
      }
      const obj = { userid, password };
      axios.post("http://localhost:8080/GovtLogin", obj).then((res) => {
        if (res.data === "Login Successfully") {
          navigate("/govtadmin");
        } else {
          toast.error(res.data);
        }
      });
    } else if (usetype == 2) {
      if (!userid) {
        toast.error("Please Enter User ID");
        return;
      }

      if (!password) {
        toast.error("Please Enter Password");
        return;
      }

      sessionStorage.setItem("deptheadid", userid);

      axios
        .get(`http://localhost:8080/chkDeptHeadLogin/${userid}/${password}`)
        .then((res) => {
          if (res.data === "Correct Password") {
            navigate("/depthead");
          } else {
            toast.error(res.data);
          }
        });
    } else if (usetype == 3) {
      if (!userid) {
        toast.error("Please Enter User ID");
        return;
      }

      if (!password) {
        toast.error("Please Enter Password");
        return;
      }

      sessionStorage.setItem("bidderid", userid);

      axios
        .get(`http://localhost:8080/chkBidderLogin/${userid}/${password}`)
        .then((res) => {
          if (res.data === "Correct Password") {
            navigate("/bidderhome");
          } else {
            toast.error(res.data);
          }
        });
    } else if (usetype == 4) {
      if (!userid) {
        toast.error("Please Enter User ID");
        return;
      }

      if (!password) {
        toast.error("Please Enter Password");
        return;
      }

      sessionStorage.setItem("clientid", userid);

      axios
        .get(`http://localhost:8080/chkClientLogin/${userid}/${password}`)
        .then((res) => {
          if (res.data === "Correct Password") {
            navigate("/clienthome");
          } else {
            toast.error(res.data);
          }
        });
    }
  }

  return (
    <>
      <h2 className="text-center mb-4 bg-warning text-light">
        Government e-Tender System
      </h2>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-6 border border-5 border-warning text-center">
            <img src={photo} className="img-fluid" />
          </div>
          <div className="col-6">
            <div className="card p-1 bg-warning">
              <div className="card p-3 ">
                <div>
                  <div className="mb-3">
                    <label>Select User Type</label>
                    <select
                      className="form-select mb-3 border border-2 border-warning"
                      onChange={(e) => setUserType(e.target.value)}
                    >
                      <option value={0}>--Select--</option>
                      <option value={1}>Govt Admin</option>
                      <option value={2}>Department Head</option>
                      <option value={3}>Bidder</option>
                      <option value={4}>Client</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label>Enter User ID</label>
                    <input
                      type="text"
                      className="form-control border border-2 border-warning"
                      value={userid}
                      onChange={(e) => setUserId(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Enter Password</label>
                    <input
                      type="password"
                      className="form-control border border-2 border-warning"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="text-end mt-2">
                    <Link className="me-4" to="forgot">
                      Forgot Password
                    </Link>
                    <input
                      type="button"
                      className="btn btn-outline-info me-3"
                      onClick={handlelogin}
                      value="Login"
                    />
                  </div>

                  <div>
                    <Link
                      to="bidderregistration"
                      className="btn btn-secondary me-2"
                    >
                      Bidder Registration
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4 bg-warning text-light p-3 mb-5">
          <div className="col-12">
            <p>
              The Government e-Tender System is an online platform designed to
              streamline the procurement process for government projects. It
              enhances transparency, efficiency, and competitiveness in awarding
              contracts. By digitizing the tendering process, it allows
              suppliers and contractors to submit bids electronically, reducing
              paperwork and administrative delays. This system facilitates easy
              access to tender information, enabling more businesses to
              participate, including small and medium enterprises. Features
              often include secure document submissions, online payment options,
              and real-time notifications about tender updates. The e-tendering
              process typically involves several stages: publishing the tender,
              submission of bids, evaluation, and awarding contracts, all
              conducted digitally. This minimizes the risk of corruption and
              favoritism, as the process is more open to scrutiny. Additionally,
              the system often incorporates features like bid tracking and
              comprehensive audit trails, which further ensure accountability.
              Overall, the Government e-Tender System represents a significant
              shift towards modernization in public procurement, fostering fair
              competition and promoting economic growth.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
