import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function NewPassword() {
  const [newpassword, setnewpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const navigate = useNavigate();

  function handlechange()
  {
    if (newpassword === confirmpassword) 
    {
      var email = sessionStorage.getItem("email");
      axios
        .put(`http://localhost:8080/changepassword/${email}/${newpassword}`)
        .then((res) => {
          if ((res.data = "Password Changed Sucessfully")) 
            navigate("/");
          else 
          toast.error(res.data);
        })
    } 
    else 
      toast.error("Passwords doesn't match");
  }

  return (
    <div className="container">
      <div className="text-end me-3 mb-2 mt-3">
        <Link to="/" className="btn btn-warning">
          Logout
        </Link>
        <div className="col-10">
          <h4 className="text-center">New Password</h4>
          <div className="card p-1 mt-2 bg-secondary">
          <div className="card p-4">
            <div>
              <div className="mb-3">
                <div className="text-start">
                <label for="password" className="form-label ">
                  New Password
                </label>
                <input
                  type="text"
                  className="form-control border border-2 border-secondary"
                  value={newpassword}
                  onChange={(e) => setnewpassword(e.target.value)}
                />
              </div>
              </div>
              <div className="mb-3">
              <div className="text-start">
                <label for="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control border border-2 border-secondary"
                  value={confirmpassword}
                  onChange={(e) => setconfirmpassword(e.target.value)}
                />
              </div>
              </div>
              <div className="text-end">
                <input
                  type="button"
                  className="btn btn-primary"
                  onClick={handlechange}
                  value="Change"
                />
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
