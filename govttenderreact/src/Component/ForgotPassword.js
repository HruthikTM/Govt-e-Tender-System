import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState();
  const [otpflag, setOtpFlag] = useState(false);

  const navigate = useNavigate();

  function handleverify() {
    sessionStorage.setItem("email", email);
    var emailid = sessionStorage.getItem("email");
    setEmail("");
    setOtp("");
    axios.post(`http://localhost:8080/sendotp/${emailid}`).then((res) => {
      if (res.data == "OTP sent to your email pls check") {
        setOtpFlag(true);
        toast.success(res.data);
      } else {
        toast.error(res.data);
      }
    });
  }

  function handlesubmit() {
    axios.get(`http://localhost:8080/chkotp/${otp}`).then((res) => {
      if (res.data == "Entered Correct OTP") {
        navigate("/newpassword");
        setOtp("");
        setEmail("");
      } else {
        toast.success(res.data);
        setOtpFlag(true);
        setOtp("");
      }
    });
  }

  return (
    <div className="container">
      <div className="text-end me-3 mb-2 mt-3">
        <Link to="/" className="btn btn-warning">
          Logout
        </Link>
        <div className="col-10">
          <h4 className="text-center">Forgot Password Dashboard</h4>
          <div className="card p-1 mt-2 bg-secondary">
            <div className="card p-4">
              {otpflag ? (
                <div>
                  <div className="mb-3">
                    <div className="text-start">
                      <label className="form-label ">Enter OTP</label>
                      <input
                        type="text"
                        className="form-control border border-2 border-secondary"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </div>
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
              ) : (
                <div>
                  <div className="mb-3">
                    <div className="text-start">
                      <label className="form-label ">Enter Email ID</label>
                      <input
                        type="text"
                        className="form-control border border-2 border-secondary"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="text-end">
                    <input
                      type="button"
                      className="btn btn-primary"
                      onClick={handleverify}
                      value="Verify"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
