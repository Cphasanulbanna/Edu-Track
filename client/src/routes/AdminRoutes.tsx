import AdminLayout from "@/components/layout/AdminLayout";
import StudentsList from "@/pages/admin/dahsboard/StudentsList";
import Teachers from "@/pages/admin/dahsboard/Teachers";
import { Route, Routes } from "react-router-dom";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout  />}>
        <Route path="/students" element={<StudentsList />} />
        <Route path="/teachers" element={<Teachers />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
