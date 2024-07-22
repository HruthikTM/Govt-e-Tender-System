
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ViewTender() {
  const [tenderdetails, setTenderdetails] = useState([]);
  const [work, setWork] = useState([]);
  const [deptid, setDeptid] = useState([]);
  const [workID, setWorkID] = useState();
  const [bidderdetails, setBidderDetails] = useState([]);
  const [qutationdetails, setQutationDetails] = useState([]);
  const [clientbasic, setClientBasic] = useState([]);
  const [projectdetails, setProjectDetails] = useState([]);
  const [feedbackdetails, setFeedbackDetails] = useState([]);

  const [biddertxt, setbiddertxt] = useState("");
  const [quotationtxt, setquotationtxt] = useState("");

  const [bidderflag, setbidderflag] = useState(false);
  const [quotationflag, setquotationflag] = useState(false);
  const [clientflag, setclientflag] = useState(false);
  const [clientprojectflag, setclientprojectflag] = useState(false);
  const [tenderflag, settenderflag] = useState(false);
  const [commentsflag, setcommentsflag] = useState(false);

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
    settenderflag(true);
    setWorkID(e.target.value);
    handleget(e.target.value);
  }

  function handlebidder(tenderid) {
    setbidderflag(true);
    axios
      .get(`http://localhost:8080/getbidderdetails/${tenderid}`)
      .then((res) => {
        if (typeof res.data === "object" && res.data.length > 0) {
          setBidderDetails(res.data);
          setbiddertxt("");
        } else {
          setbiddertxt("No Bidder found");
          setBidderDetails([]);
        }
      });
  }

  function handlequtation(tenderid) {
    setquotationflag(true);
    axios
      .get(`http://localhost:8080/getqutationdetails/${tenderid}`)
      .then((res) => {
        if (typeof res.data === "object" && res.data.length > 0) {
          setQutationDetails(res.data);
          setquotationtxt("");
        } else {
          setquotationtxt("No Quotation Found");
          setQutationDetails([]);
        }
      });
  }

  function handleclient(bidderid) {
    setclientflag(true);
    axios
      .get(`http://localhost:8080/GetClientBasicDetails/${bidderid}`)
      .then((res) => {
        setClientBasic(res.data);
      });
  }

  function handleclientproject(clientid) {
    setclientprojectflag(true);
    axios
      .get(`http://localhost:8080/getclientprojectdetails/${clientid}`)
      .then((res) => {
        setProjectDetails(res.data);
      });
  }

  function handlecomments(projectid) {
    setcommentsflag(true);
    axios.get(`http://localhost:8080/getfeedback/${projectid}`).then((res) => {
      setFeedbackDetails(res.data);
    });
  }

  function handletender(tenderid, bidderid) {
    axios
      .put(`http://localhost:8080/updatestatus/${tenderid}/${bidderid}`)
      .then((res) => {
        if (res.data === "This Tender Already approved") toast.error(res.data);
        else toast.success(res.data);
      });
  }

  return (
    <div className="col-12">
      <div className="card p-1 bg-light">
        <div className="card p-4">
          <div className="mb-3">
            <label className="form-label">Select Work</label>
            <select className="form-select mb-3 border border-2 border-secondary" value={workID} onChange={val}>
              <option value={0}>--Select--</option>
              {work
                .filter((item) => item.addDept?.deptid == deptid)
                .map((item) => {
                  return <option value={item.workid}>{item.workname}</option>;
                })}
            </select>
          </div>
        </div>
      </div>

      <div className="card p-1 mt-2 bg-light">
        {tenderflag ? (
          <div className="card p-4">
            <div className="col-12">
              <h4 className="text-center">Tender Details</h4>
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
                  {tenderdetails
                    .filter((item) => item.status === "pending")
                    .map((item) => {
                      return (
                        <tr>
                          <td>{item.tendername}</td>
                          <td>{item.workDetails?.workname}</td>
                          <td>{item.tenderstdate}</td>
                          <td>{item.tenderenddate}</td>
                          <td>{item.tenderdate}</td>
                          <td>{item.description}</td>
                          <td>{item.status}</td>

                          <td>
                            <input
                              type="button"
                              className="btn btn-primary"
                              onClick={(e) => handlebidder(item.tenderid)}
                              value="View Bidder"
                            />
                          </td>

                          <td>
                            <input
                              type="button"
                              className="btn btn-primary"
                              onClick={(e) => handlequtation(item.tenderid)}
                              value="View Qutation"
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          ""
        )}

        {bidderflag ? (
          <div className="card p-4 mt-2">
            {biddertxt == "No Bidder found" ? (
              <div>
                <h6 className="text-center">{biddertxt}</h6>
              </div>
            ) : (
              <div className="col-12">
                <h4 className="text-center">Bidder Details</h4>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Bidder Name</th>
                      <th>Bidder Email</th>
                      <th>Bidder Mobile NO</th>
                      <th>Bidder Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bidderdetails.map((item) => {
                      return (
                        <tr>
                          <td>{item.biddername}</td>
                          <td>{item.email}</td>
                          <td>{item.pno}</td>
                          <td>{item.address}</td>
                          <td>
                            <input
                              type="button"
                              className="btn btn-primary"
                              onClick={(e) => handleclient(item.bidderid)}
                              value="View Client Basic"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          ""
        )}

        {quotationflag ? (
          <div className="card p-4 mt-2">
            {quotationtxt == "No Quotation Found" ? (
              <h6 className="text-center">{quotationtxt}</h6>
            ) : (
              <div className="col-12">
                <h4 className="text-center">Qutation Details</h4>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Bidder Name</th>
                      <th>Tender Amount</th>
                      <th>Apply Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {qutationdetails.map((item) => {
                      return (
                        <tr>
                          <td>{item.bidderRegistration.biddername}</td>
                          <td>{item.tenderamt}</td>
                          <td>{item.applydate}</td>
                          <td>{item.status}</td>
                          <td>
                            <input
                              type="button"
                              className="btn btn-primary"
                              onClick={(e) =>
                                handletender(
                                  item.createTender.tenderid,
                                  item.bidderRegistration.bidderid
                                )
                              }
                              value="Approve"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          ""
        )}

        {clientflag ? (
          <div className="card p-4 mt-2">
            <div className="col-12">
              <h4 className="text-center">Client Basic Details</h4>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Client Name</th>
                    <th>Bidder Name</th>
                    <th>Client Email</th>
                    <th>Client Phno</th>
                    <th>Client Address</th>
                  </tr>
                </thead>
                <tbody>
                  {clientbasic.map((item) => {
                    return (
                      <tr>
                        <td>{item.clientname}</td>
                        <td>{item.bidderRegistration.biddername}</td>
                        <td>{item.email}</td>
                        <td>{item.pno}</td>
                        <td>{item.address}</td>
                        <td>
                          <input
                            type="button"
                            className="btn btn-primary"
                            onClick={(e) => handleclientproject(item.clientid)}
                            value="View Client Project"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          ""
        )}

        {clientprojectflag ? (
          <div className="card p-4 mt-2">
            <div className="col-12">
              <h4 className="text-center">Client Project Details</h4>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th> Project Name</th>
                    <th> Client Name</th>
                    <th> Project Description</th>
                    <th> Project Date</th>
                    <th> Project Status</th>
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
                              value="View Comments"
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
        ) : (
          ""
        )}

        {commentsflag ? (
          <div className="card p-4 mt-2">
            <div className="col-12">
              <h4 className="text-center">Client Feed Back Details</h4>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Comments</th>
                    <th>Post Comment Date</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbackdetails.map((item) => {
                    return (
                      <tr>
                        <td>{item.comments}</td>
                        <td>{item.postdate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
