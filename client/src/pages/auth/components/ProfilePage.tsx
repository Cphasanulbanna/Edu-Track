import React, { useEffect, useState } from "react";
import { Edit, Mail, Phone, Check, X, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { fetchProfile } from "../thunk";

// Define types
interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  role: string;
  profilePicture: string;
}

// Profile Details Component
const ProfileDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const userId = JSON.parse(localStorage.getItem("userId") as string);
  // Initial profile state
  const initialProfile: UserProfile = {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    mobile: "+1 (555) 123-4567",
    role: "Senior Software Engineer",
    profilePicture: "/api/placeholder/400/400",
  };

  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(profile);

  useEffect(() => {
    if (userId) {
      dispatch(fetchProfile({ params: { id: userId } }));
    }
  }, [dispatch, userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Profile Details</h1>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-1 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-1 rounded-md transition-all duration-200"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row">
              {/* Profile Picture */}
              <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
                <div className="relative">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
                    {profile.profilePicture ? (
                      <img
                        src={profile.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <User size={48} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <div className="absolute bottom-0 right-0">
                      <label
                        htmlFor="profile-picture"
                        className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-md"
                      >
                        <Edit size={16} />
                        <input
                          type="file"
                          id="profile-picture"
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    </div>
                  )}
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-800">
                  {profile.firstName} {profile.lastName}
                </h2>
                <span className="text-blue-600 font-medium">
                  {profile.role}
                </span>
              </div>

              {/* Profile Details */}
              <div className="md:w-2/3 md:pl-8">
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mobile
                        </label>
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Role
                        </label>
                        <input
                          type="text"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex space-x-3 pt-4">
                      <button
                        type="submit"
                        className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                      >
                        <Check size={16} className="mr-2" />
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="flex items-center bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                      >
                        <X size={16} className="mr-2" />
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">
                        Contact Information
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-blue-500 mr-3" />
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-gray-800">{profile.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 text-blue-500 mr-3" />
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="text-gray-800">{profile.mobile}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">
                        Additional Information
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Role</p>
                          <p className="text-gray-800 font-medium">
                            {profile.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsPage;
