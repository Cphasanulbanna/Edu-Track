import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store";
import { fetchProfile, updateProfile } from "../thunk";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateProfile, updateProfileSchema } from "../validate";
import { Form } from "@/components/ui/form";
import FormController from "@/components/custom/FormController";
import { Button } from "@/components/ui/button";
import { getProfileDetails } from "../selector";
import { X } from "lucide-react";

type ProfileDetails = {
  avatar?: string
}

const ProfileDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = JSON.parse(localStorage.getItem("userId") as string);
  const profileDetails = useSelector(getProfileDetails) as ProfileDetails
  const [profilePic, setProfilePic] = useState<string>("");

  console.log({profileDetails});
  
  const form = useForm<UpdateProfile>({
    mode: "all",
    resolver: zodResolver(updateProfileSchema),
  });

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (userId) {
      dispatch(fetchProfile({ params: { id: userId } }));
    }
  }, [dispatch, userId]);

  const updateProfileFn = async (data: UpdateProfile) => {
    if (!data.avatar) return;
    const formData = new FormData();
    formData.append("image", data.avatar);
    const response = await dispatch(updateProfile({ formData }));
    if (updateProfile.fulfilled.match(response)) {
      setProfilePic(profileDetails?.avatar as string);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("avatar", file);
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const clearImagePreview = () => {
    setValue("avatar", undefined);
    setProfilePic("");
  };

  return (
    <div className="min-h-screen bg-gray-50 w-screen px-40 mt-10">
      <Form {...form}>
        <form
          className="grid grid-cols-12 gap-y-3"
          onSubmit={handleSubmit(updateProfileFn)}
        >
          <div className="col-span-4">
            <FormController
              type="file"
              control={control}
              errors={errors}
              placeholder="Upload Profile Pic"
              name="avatar"
              label="Profile Picture"
              handleChange={handleFileChange}
            />
          </div>
          <div className="col-span-12">
            {profilePic && (
              <div className="">
                <button
                  onClick={clearImagePreview}
                  className="cursor-pointer hover:opacity-65"
                >
                  <X />
                </button>

                <img
                  src={profilePic}
                  alt="avatar"
                  className="w-32 overflow-hidden rounded-full object-cover aspect-square"
                />
              </div>
            )}
          </div>
          <div className="col-span-12">
            <Button disabled={!getValues()?.avatar}>
              Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileDetailsPage;
