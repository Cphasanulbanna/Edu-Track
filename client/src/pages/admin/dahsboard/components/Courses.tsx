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
import AddSemester from "./AddSemester";
import { ArrowRightIcon } from "lucide-react";

const Courses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const coursesData = useSelector(getCoursesData);
  const loading = useSelector(getLoading);

  const [openCourseModal, setOpenCourseModal] = useState<boolean>(false);
  const [openSemesterModal, setOpenSemesterModal] = useState<boolean>(false);
  const [dataToEdit, setDataToEdit] = useState({})
  const [courseId, setCourseId] = useState<string>("")

  const { courses } = coursesData;

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const renderTableField = (value: string) => {
    return <p>{value || "Not Available"}</p>;
  };

  const renderSemesterDetails = (data: any) => {
    return <div className="flex justify-center items-center gap-1.5">
      <p>{data?.length ?? 0}</p>
      <Button className="px-0" variant={"ghost"}><p className="flex items-center gap-x-1">Manage <ArrowRightIcon className="w-5 h-5"/></p></Button>
    </div>
  }

  const editCourse = (data: TableRow) => {
    setDataToEdit(data)
    setOpenCourseModal(true)
  };

  const deleteCourseFn = async (data: TableRow) => {
    const result = await dispatch(
      deleteCourse({ params: { id: String(data?._id) } })
    );
    if (deleteCourse.fulfilled.match(result)) {
      dispatch(fetchCourses());
    }
  };

  const addSemester = (data: Record<string, unknown>) => {
    setOpenSemesterModal(true)
    setCourseId(data?._id as string)
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
      header: "Semesters",
      cell: (field) => renderSemesterDetails(field?.row?.semesters),
    },
    {
      header: "Actions",
      type: "actions",
      actions: [
        {
          name: "edit",
          handleClick: editCourse,
        },
        {
          name: "delete",
          handleClick: deleteCourseFn,
        },
          {
          name: "Add Semester",
          handleClick: addSemester,
        },
      ],
    },
  ];

  const closeCourseModal = () => {
    setOpenCourseModal(false);
  };

    const closeSemesterModal = () => {
    setOpenSemesterModal(false);
  };
  return (
    <div className="flex-1  w-full h-full p-16">
      <AddSemester close={closeSemesterModal} open={openSemesterModal} courseId={courseId} />
      <CreateCourse open={openCourseModal} close={closeCourseModal} dataToEdit={dataToEdit} />
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
