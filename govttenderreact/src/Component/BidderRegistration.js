import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function BidderRegistration() {
  const [filepath, setFilePath] = useState("");
  const [biddername, setBidderName] = useState("");
  const [email, setEmail] = useState("");
  const [pno, setPno] = useState("");
  const [address, setAddress] = useState("");

  function handlesubmit() {
    if (!biddername) {
      toast.error("Please Enter Bidder Name");
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
    if (!filepath) {
      toast.error("Please Add File");
      return;
    }
    const obj = { biddername, email, pno, address, filepath };
    axios.post("http://localhost:8080/BidderRegistration", obj).then((res) => {
      toast.success(res.data);
      ClearAll();
    });
  }

  function ClearAll() {
    setBidderName("");
    setFilePath("");
    setEmail("");
    setPno("");
    setAddress("");
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
      <div className="text-end me-3 mb-2 mt-3">
        <Link to="/" className="btn btn-warning">
          Logout
        </Link>
      </div>
      <div className="col-10">
        <h4 className="text-center">Bidder Registration</h4>
        <div className="card p-1 mt-2 bg-secondary">
          <div className="card p-4">
            <div className="mb-3">
              <label>Bidder Name</label>
              <input
                type="text"
                className="form-control border border-2 border-secondary"
                value={biddername}
                onChange={(e) => setBidderName(e.target.value)}
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
    </div>
  );
}
