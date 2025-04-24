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
import { getAvatarUploadProgress, getProfileDetails } from "../selector";
import { Edit, X } from "lucide-react";
import { formatUpdateProfileData } from "../helper";

type ProfileDetails = {
  avatar?: string;
  first_name?: string;
  last_name?: string;
  dob?: string;
  mobile_number?: string;
};

const ProfileDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profileDetails = useSelector(getProfileDetails) as ProfileDetails;
  const avatarUploadProgress = useSelector(getAvatarUploadProgress);

  const [profilePic, setProfilePic] = useState<string>("");
  const [profilePreview, setProfilePreview] = useState<string>("");
  const [showUploadProgress, setShowUploadProgress] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const userId = JSON.parse(localStorage.getItem("userId") as string);
  const profileImageUrl = profilePreview || profilePic;

  const form = useForm<UpdateProfile>({
    mode: "all",
    resolver: zodResolver(updateProfileSchema),
  });

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    getValues,
    formState: { errors, isDirty, isValid },
  } = form;

  useEffect(() => {
    if (userId) {
      dispatch(fetchProfile({ params: { id: userId } }));
    }
  }, [dispatch, userId]);

  const updateProfileFn = async (data: UpdateProfile) => {
    if (!data) return;
    const formData = formatUpdateProfileData(data)

    setShowUploadProgress(true);
    const response = await dispatch(updateProfile({ formData }));

    if (updateProfile.fulfilled.match(response)) {
      dispatch(fetchProfile({ params: { id: userId } }));
      setProfilePic("");
      setProfilePreview("");
      setShowUploadProgress(false);
      setValue("avatar", undefined);
      setEdit(false)
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("avatar", file,{shouldDirty: true});
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const clearImagePreview = () => {
    setValue("avatar", undefined);
    setProfilePreview("");
  };

  useEffect(() => {
    if (profileDetails?.avatar) {
      setProfilePic(profileDetails?.avatar);
    }
    if (profileDetails) {
      reset({
        firstName: profileDetails?.first_name,
        lastName: profileDetails?.last_name,
        mobileNumber: profileDetails?.mobile_number,
      });
    }
  }, [profileDetails, reset]);

  const handleEdit = () => {
    if (edit) {
      setEdit(false)
      reset(getValues())
    }
    else {
      setEdit(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 w-screen px-40">
      <Form {...form}>
        <form
          className="grid grid-cols-12 gap-y-4 max-w-[500px]"
          onSubmit={handleSubmit(updateProfileFn)}
        >
          <div className="col-span-12">
            <div className="flex justify-end items-center">
              <button
                type="button"
                onClick={handleEdit}
                className="cursor-pointer hover:opacity-75"
              >
                {edit ? (
                  <span className="border-2 border-slate-300 rounded-md px-2 py-1">
                    Cancel
                  </span>
                ) : (
                  <Edit className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <div className="col-span-12">
            <FormController
              type="file"
              control={control}
              errors={errors}
              placeholder="Upload Profile Pic"
              name="avatar"
              label="Profile Picture"
              handleChange={handleFileChange}
              uploadProgress={avatarUploadProgress}
              showUploadProgress={showUploadProgress}
              isDisabled={!edit}
            />
          </div>
          <div className="col-span-12">
            <FormController
              control={control}
              errors={errors}
              placeholder="Enter First Name"
              name="firstName"
              label="First Name"
              isDisabled={!edit}
            />
          </div>

          <div className="col-span-12">
            <FormController
              control={control}
              errors={errors}
              placeholder="Enter Last Name"
              name="lastName"
              label="Last Name"
              isDisabled={!edit}
            />
          </div>

          <div className="col-span-12">
            <FormController
              control={control}
              errors={errors}
              placeholder="Enter Mobile Number"
              name="mobileNumber"
              label="Mobile Number"
              isDisabled={!edit}
            />
          </div>
          <div className="col-span-12">
            {profileImageUrl && (
              <div className="mt-3">
                {profilePreview && (
                  <button
                    onClick={clearImagePreview}
                    className="cursor-pointer hover:opacity-65"
                  >
                    <X />
                  </button>
                )}

                <img
                  src={profileImageUrl}
                  alt="avatar"
                  className="w-32 overflow-hidden rounded-full object-cover aspect-square shadow-lg"
                />
              </div>
            )}
          </div>
          {isDirty && (
            <div className="col-span-12">
              <Button disabled={!isValid}>Update</Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default ProfileDetailsPage;
