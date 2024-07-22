import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddQutation() {
  const [tenderid, setTenderID] = useState();
  const [bidderid, setBidderID] = useState();

  const [tenderamt, setTenderamt] = useState("");

  useEffect(() => {
    BidderId();
    TenderID();
  }, []);

  function BidderId() {
    setBidderID(sessionStorage.getItem("bidderid"));
  }

  function TenderID() {
    setTenderID(sessionStorage.getItem("tenderid"));
  }

  function handlesubmit() {
    if (!tenderamt) {
      toast.error("Please Enter Tender Amount");
      return;
    }
    const obj = { tenderamt };
    debugger;
    axios
      .post(`http://localhost:8080/Addqutation/${tenderid}/${bidderid}`, obj)

      .then((res) => {
        if (res.data === "Qutation Aleady Exist") toast.error(res.data);
        else toast.success(res.data);
        ClearAll();
      });
  }

  function ClearAll() {
    setTenderamt("");
  }

  return (
    <div className="container">
      <div className="card p-1 mt-2 bg-secondary">
        <div className="card p-4">
          <div className="mb-3">
            <label>Enter Tender Amount</label>
            <input
              type="text"
              className="form-control border border-2 border-secondary"
              value={tenderamt}
              onChange={(e) => setTenderamt(e.target.value)}
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
  );
}
