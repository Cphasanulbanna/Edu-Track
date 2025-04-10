import { AppDispatch } from "@/app/store";
import { getCourseDetails } from "@/common/selector";
import { fetchCourseDetails } from "@/common/thunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();
    const courseDetails = useSelector(getCourseDetails)
    
    console.log({courseDetails});
    

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseDetails({ params: { id } }));
    }
  }, [id, dispatch]);
  return <div>CourseDetails</div>;
};

export default CourseDetails;
