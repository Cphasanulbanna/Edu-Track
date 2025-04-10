import { AppDispatch } from "@/app/store";
import { getCourseDetails } from "@/common/selector";
import { fetchCourseDetails } from "@/common/thunk";
import CustomAccordion from "@/components/custom/CustomAccordion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

type Semester = {
    feeAmount: number,
    semesterNumber: number
}

type CourseDetailsType = {
    description?: string,
    duration: number,
    title: string,
    totalCourseFee: number,
    totalSemesters: number,
    semesters: Semester[]
} 


const CourseDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();
    const courseDetails = useSelector(getCourseDetails) as CourseDetailsType
    
    
    const accordionData = courseDetails?.semesters?.map((obj) => {
        return {
            title: obj?.semesterNumber,
            content: obj?.feeAmount
        }
    })
    

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseDetails({ params: { id } }));
    }
  }, [id, dispatch]);
    return <div className="w-screen flex justify-center items-center">
      <CustomAccordion accordionData={accordionData}/>
  </div>;
};

export default CourseDetails;
