import AdminLayout from "@/components/layout/AdminLayout";
import Courses from "@/pages/admin/dahsboard/components/Courses";
import StudentsList from "@/pages/admin/dahsboard/components/StudentsList";
import TeachersList from "@/pages/admin/dahsboard/components/TeachersList";
import Transactions from "@/pages/admin/dahsboard/components/Transactions";
import { Route, Routes } from "react-router-dom";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout  />}>
        <Route path="/students" element={<StudentsList />} />
        <Route path="/teachers" element={<TeachersList />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/courses" element={<Courses />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
