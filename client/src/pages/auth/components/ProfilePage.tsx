import { useEffect } from "react";
// import { Edit, Mail, Phone, Check, X, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { fetchProfile } from "../thunk";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateProfile, updateProfileSchema } from "../validate";
import { Form } from "@/components/ui/form";
import FormController from "@/components/custom/FormController";

const ProfileDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const userId = JSON.parse(localStorage.getItem("userId") as string);

  const form = useForm<UpdateProfile>({
    mode: "all",
    resolver: zodResolver(updateProfileSchema),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (userId) {
      dispatch(fetchProfile({ params: { id: userId } }));
    }
  }, [dispatch, userId]);

  const updateProfile = () => {
    //
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Form {...form}>
        <form onSubmit={handleSubmit(updateProfile)}>
          <FormController
            type="file"
            control={control}
            errors={errors}
            placeholder="Upload Profile Pic"
            name="avatar"
            label="Profile Picture"
          />
        </form>
      </Form>
    </div>
  );
};

export default ProfileDetailsPage;
