import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ClientBasic() {
  const [clientname, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [pno, setPno] = useState("");
  const [address, setAddress] = useState("");

  const [clientbasic, setClientBasic] = useState([]);

  useEffect(() => {
    debugger;
    GetClient();
  }, []);

  function handlesubmit() {
    if (!clientname) {
      toast.error("Please Enter Client Name");
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

    const obj = { clientname, email, pno, address };
    axios
      .post(
        `http://localhost:8080/Clientbasic/${sessionStorage.getItem(
          "bidderid"
        )}`,
        obj
      )
      .then((res) => {
        toast.success(res.data);
        GetClient();
        ClearAll();
      });
  }

  function ClearAll() {
    setClientName("");
    setEmail("");
    setPno("");
    setAddress("");
  }

  function GetClient() {
    debugger;
    var id = sessionStorage.getItem("bidderid");

    axios
      .get(`http://localhost:8080/GetClientBasicDetails/${id}`)
      .then((res) => {
        setClientBasic(res.data);
      });
  }

  return (
    <div className="container">
      <div className="row ">
        <div className="col-4">
          <h4 className="text-center">Add Client Basic Details</h4>
          <div className="card p-1 bg-secondary">
            <div className="card p-4">
              <div className="mb-3">
                <label>Client Name</label>
                <input
                  type="text"
                  className="form-control border border-2 border-secondary"
                  value={clientname}
                  onChange={(e) => setClientName(e.target.value)}
                />
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

        <div className="col-7">
          <h4 className="text-center">Client Basic Details</h4>
          <div className="card p-1 bg-secondary">
            <div className="card p-4">
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
