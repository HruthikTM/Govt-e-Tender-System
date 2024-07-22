import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./Component/Home";
import Govtadmin from "./Component/Govtadmin";
import AddDepartment from "./Component/AddDepartment";
import AddDepartmentHead from "./Component/AddDepartmentHead";
import DeptHead from "./Component/DeptHead";
import WorkDetails from "./Component/WorkDetails";
import CreateTender from "./Component/CreateTender";
import ViewTender from "./Component/ViewTender";
import BidderRegistration from "./Component/BidderRegistration";
import BidderHome from "./Component/BidderHome";
import ClientBasic from "./Component/ClientBasic";
import ClientProject from "./Component/ClientProject";
import Qutation from "./Component/Qutation";
import ClientHome from "./Component/ClientHome";
import ViewProject from "./Component/ViewProject";
import PostFeedback from "./Component/PostFeedback";
import AddQutation from "./Component/AddQutation";
import UpdateProject from "./Component/UpdateProject";
import ForgotPassword from "./Component/ForgotPassword";
import NewPassword from "./Component/NewPassword";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="" element={<Home />} />

          <Route path="govtadmin" element={<Govtadmin />}>
            <Route path="adddept" element={<AddDepartment />} />
            <Route path="adddepthead" element={<AddDepartmentHead />} />
          </Route>

          <Route path="depthead" element={<DeptHead />}>
            <Route path="workdetails" element={<WorkDetails />} />
            <Route path="createtender" element={<CreateTender />} />
            <Route path="viewtenderdetails" element={<ViewTender />} />
          </Route>

          <Route path="bidderhome" element={<BidderHome />}>
            <Route path="clientbasic" element={<ClientBasic />} />
            <Route path="clientproject" element={<ClientProject />} />
            <Route path="updateproject" element={<UpdateProject />} />
            <Route path="qutation" element={<Qutation />} />
            <Route path="addqutation" element={<AddQutation />} />
          </Route>

          <Route path="clienthome" element={<ClientHome />}>
            <Route path="viewproject" element={<ViewProject />} />
            <Route path="postfeedback" element={<PostFeedback />} />
          </Route>

          <Route
            path="forgot"
            element={<ForgotPassword />}
          ></Route>

          <Route
            path="newpassword"
            element={<NewPassword />}
          ></Route>

          <Route
            path="bidderregistration"
            element={<BidderRegistration />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
