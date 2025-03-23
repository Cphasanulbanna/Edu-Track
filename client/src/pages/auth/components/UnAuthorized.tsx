import AccessDenied from "@/assets/icons/access-denied.svg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const UnAuthorized = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex justify-center items-center gap-5 p-10">
      <div className="flex flex-col gap-2.5">
        <h1 className="font-bold text-6xl">
          Your are not authorized <br /> to access this page
        </h1>
        <Button
          onClick={goBack}
          variant={"default"}
          className="w-max ml mx-auto mt-3.5"
        >
          Go Back
        </Button>
      </div>
      <div className="w-[500px]">
        <img src={AccessDenied} alt="access denied" />
      </div>
    </div>
  );
};

export default UnAuthorized;
