import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function PostFeedback() {
  const [projectid, setProjectid] = useState();

  const [comments, setComments] = useState("");

  useEffect(() => {
    ProjectId();
  }, []);

  function ProjectId() {
    setProjectid(sessionStorage.getItem("projectid"));
  }

  function handlesubmit() {
    if (!comments) {
      toast.error("Please Post a Comment");
      return;
    }

    const obj = { comments };

    axios
      .post(`http://localhost:8080/Postcomments/${projectid}`, obj)

      .then((res) => {
        if (res.data === "Comments Aleady Exist") toast.error(res.data);
        else toast.success(res.data);
        ClearAll();
      });
  }

  function ClearAll() {
    setProjectid("");
  }

  return (
    <div className="container">
      <div className="card p-1 mt-2 bg-secondary">
        <div className="card p-4">
          <div className="mb-3">
            <label>Post Comments</label>
            <textarea
              className="form-control border border-2 border-secondary"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            ></textarea>
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
