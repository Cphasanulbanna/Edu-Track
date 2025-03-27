import { Outlet } from "react-router-dom";
import Header from "./Header";
import SidebarComponent from "./SidebarComponent";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { actions as commonSliceActions } from "@/common/slice";

  const items = [
    {
      title: "Students",
      url: "students",
      icon: "PiStudentFill",
    },
     {
      title: "Courses",
      url: "courses",
      icon: "courses",
    },
      {
      title: "Transactions",
      url: "transactions",
      icon: "transactions",
    },

    {
      title: "Teachers",
      url: "teachers",
      icon: "GiTeacher",
    },
    {
      title: "Staff",
      url: "]]]]",
      icon: "FaUsers",
    },
  ];
const AdminLayout = () => {
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(commonSliceActions.setSidebarData({ name: "Admin", items }));
  }, [ dispatch]);
  return (
    <div>
      <div className="fixed top-0 left-0 z-40 right-0">
        <Header />
      </div>
      <div className="w-screen h-screen flex justify-between gap-5">
        <SidebarComponent />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
