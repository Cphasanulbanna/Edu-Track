import { AppDispatch } from "@/app/store";
import { fetchCourses } from "@/common/thunk";
import CommonTable from "@/components/custom/CommonTable";
import { Column, TableRow } from "@/types/components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoursesData, getLoading } from "@/common/selector";
import { Button } from "@/components/ui/button";
import CreateCourse from "./CreateCourse";
import { deleteCourse } from "../thunk";

const Courses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const coursesData = useSelector(getCoursesData);
  const loading = useSelector(getLoading);

  const [openCourseModal, setOpenCourseModal] = useState<boolean>(false)

  const { courses } = coursesData;


  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const renderTableField = (value: string) => {
    return <p>{value || "Not Available"}</p>;
  };

  const editCourse = (data: TableRow) => {
    console.log({data});
  }

  const deleteCourseFn = (data: TableRow) => {
    dispatch(deleteCourse({params: {id: String(data?._id)}}))
  }

  const columns: Column<TableRow>[] = [
    {
      header: "Title",
      cell: (field) => renderTableField(field?.row?.title),
    },
    {
      header: "Description",
      cell: (field) => renderTableField(field?.row?.description),
    },
    {
      header: "Duration",
      cell: (field) => renderTableField(field?.row?.duration),
    },
    {
      header: "Actions",
      type: "actions",
      actions: [
        {
          name: "edit",
          handleClick: editCourse
        },
          {
          name: "delete",
          handleClick: deleteCourseFn
        }
      ]
    }
  ]

  const closeCourseModal = () => {
    setOpenCourseModal(false)
  }
  return (
    <div className="flex-1  w-full h-full p-16">
      <CreateCourse open={openCourseModal} close={closeCourseModal}/>
      <CommonTable
        data={courses}
        columns={columns}
        isLoading={loading.courses}
      />
      <div className="flex justify-end mt-5">
        <Button onClick={() => setOpenCourseModal(true)}>Create</Button>
      </div>
    </div>
  );
};

export default Courses;
