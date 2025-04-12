import { useEffect } from "react";
// import { Edit, Mail, Phone, Check, X, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { fetchProfile, updateProfile } from "../thunk";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateProfile, updateProfileSchema } from "../validate";
import { Form } from "@/components/ui/form";
import FormController from "@/components/custom/FormController";
import { Button } from "@/components/ui/button";

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
    setValue,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (userId) {
      dispatch(fetchProfile({ params: { id: userId } }));
    }
  }, [dispatch, userId]);

  const updateProfileFn = (data: UpdateProfile) => {
     if (!data.avatar) return;
    const formData = new FormData()
    formData.append("file", data.avatar)
    dispatch(updateProfile({ requestBody: { file: formData } }));
  };

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setValue("avatar", file);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Form {...form}>
        <form onSubmit={handleSubmit(updateProfileFn)}>
          <FormController
            type="file"
            control={control}
            errors={errors}
            placeholder="Upload Profile Pic"
            name="avatar"
            label="Profile Picture"
            handleChange={handleFileChange}
          />
        <Button>Update</Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileDetailsPage;
