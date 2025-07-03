"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Spinner from "@/components/ui/Spinner";
import { useProfile } from "../context/ProfileContext";
import { motion } from "framer-motion";
import Link from "next/link";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import apiServiceCall from "../service/apiServiceCall";

const page = () => {
  const { profile, loading, error, setProfile } = useProfile();
  const [showCoverImage, setShowCoverImage] = useState(false);

  const [formData, setFormData] = useState({
    country: "",
    city: "",
    bio: "",
    phone_number: "",
    gender: "",
    date_of_birth: "",
    work: "",
    education: "",
    first_name: "",
    last_name: "",
    username: "",
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [coverPicture, setCoverPicture] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [initialData, setInitialData] = useState(formData);
  const [file, setFile] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        country: profile?.profile?.country || "",
        city: profile?.profile?.city || "",
        bio: profile?.profile?.bio || "",
        phone_number: profile?.profile?.phone_number || "",
        gender: profile?.profile?.gender || "",
        date_of_birth: profile?.profile?.date_of_birth || "",
        work: profile?.profile?.work || "",
        education: profile?.profile?.education || "",
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        username: profile.username || "",
      });
      setInitialData(formData);
    }
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Separate handlers for profile and cover images
  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleCoverPictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverPicture(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const formDataToSend = new FormData();

    // Append regular profile fields
    formDataToSend.append("country", formData.country || "");
    formDataToSend.append("city", formData.city || "");
    formDataToSend.append("bio", formData.bio || "");
    formDataToSend.append("phone_number", formData.phone_number || "");
    formDataToSend.append("gender", formData.gender || "");
    formDataToSend.append("date_of_birth", formData.date_of_birth || "");
    formDataToSend.append("work", formData.work || "");
    formDataToSend.append("education", formData.education || "");

    // Append user fields with 'user.' prefix
    formDataToSend.append("user.first_name", formData.first_name || "");
    formDataToSend.append("user.last_name", formData.last_name || "");
    formDataToSend.append("user.username", formData.username || "");

    // Append files
    if (profilePicture) {
      formDataToSend.append("profile_picture", profilePicture);
    }
    if (coverPicture) {
      formDataToSend.append("cover_picture", coverPicture);
    }

    try {
      const response = await apiServiceCall({
        url: "/api/users/update_profile/",
        method: "PUT",
        endpoint: "profile",
        body: formDataToSend,
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });

      if (response.status_code === 200) {
        setProfile(response?.data);
        toast.success("Profile updated successfully");
        setEditMode(false);
        // Reset file states
        setProfilePicture(null);
        setCoverPicture(null);
        // Update initialData to current formData
        setInitialData(formData);
      } else {
        // Handle backend validation errors
        if (response.data?.user?.username) {
          // Username error
          toast.error(response.data.user.username[0]);
        } else if (response.message) {
          // General error message
          toast.error(response.message);
        } else {
          // Fallback error
          toast.error("Failed to update profile. Please check your inputs.");
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);

      // Handle network errors or other exceptions
      const err = error as any;
      if (err.data) {
        // The request was made and the server responded with a status code
        if (err.data?.user?.username) {
          toast.error(err.data.user.username[0]);
        } else {
          toast.error(err.data?.message || "An error occurred");
        }
      } else if (err.request) {
        // The request was made but no response was received
        toast.error("Network error. Please check your connection.");
      } else {
        // Something happened in setting up the request
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const storedValue = localStorage.getItem("showCoverImage");
    if (storedValue !== null) {
      setShowCoverImage(JSON.parse(storedValue));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("showCoverImage", JSON.stringify(showCoverImage));
  }, [showCoverImage]);

  if (loading)
    return (
      <div className="flex items-center w-full justify-center mt-5">
        <Spinner size={36} color="border-t-zinc-700 dark:border-t-zinc-300" />
      </div>
    );
  if (error) {
    <div className="flex items-center w-full justify-center">
      <h4>{error}</h4>
    </div>;
  }

  const coverStyle = showCoverImage
    ? {
        backgroundImage: `linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.6) 0%,
          rgba(0, 0, 0, 0.3) 40%,
          rgba(0, 0, 0, 0.6) 100%
        ), url(${profile?.profile?.cover_picture || "/default-cover.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {};    

  return (
    <ProtectedRoute>
      <MaxWidthWrapper>
        <motion.div
          style={coverStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col my-10 lg:flex-row lg:space-x-10 max-w-5xl mx-auto p-6 space-y-6 lg:space-y-0 bg-gradient-to-br from-zinc-50 via-white to-zinc-200 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-700 rounded-3xl shadow-2xl backdrop-blur-lg"
        >
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/3"
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <motion.img
                src={profile?.profile?.profile_picture || "default-avatar.png"}
                alt={`${profile?.profile?.full_name}'s avatar`}
                className="w-36 h-36 rounded-full border-4 object-cover border-zinc-600 dark:border-zinc-500 shadow-lg"
                whileHover={{ scale: 1.1 }}
              />
              <h1 className="text-3xl font-extrabold text-zinc-700 dark:text-gray-100">
                {profile?.profile?.full_name}
              </h1>
              <h4 className=" font-normal text-zinc-700 dark:text-gray-100">
                {profile?.username}
              </h4>
              <Toggle
                pressed={showCoverImage}
                onPressedChange={() => setShowCoverImage((prev) => !prev)}
                variant="outline"
              >
                Display Cover Image
              </Toggle>
            </div>
            <motion.div
              className="mt-4 p-6 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-md rounded-xl shadow-md flex flex-col items-center space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Manage Your Account
              </h2>
              <div className="flex space-x-4 items-center">
                {/* Orders Button */}
                <Link href="/todo">
                  <Button variant="default" className="">
                    ToDos
                  </Button>
                </Link>

                {/* Change Password Button */}
                {/* <Link to="/profile/change-password"> */}
                <Button variant="outline" size={"lg"}>
                  Change Password
                </Button>
                {/* </Link> */}
              </div>
            </motion.div>
            <motion.div
              className="mt-6 p-6 bg-white/60 flex gap-x-4 justify-center dark:bg-zinc-800/60 backdrop-blur-md rounded-xl shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div>
                <h1 className="text-slate-900 font-medium dark:text-slate-200">
                  Name:
                </h1>
                <h1 className="text-slate-900 font-medium dark:text-slate-200">
                  Country:
                </h1>
                <h1 className="text-slate-900 font-medium dark:text-slate-200">
                  City:
                </h1>
                <h1 className="text-slate-900 font-medium dark:text-slate-200">
                  Email:
                </h1>
                <h1 className="text-slate-900 font-medium dark:text-slate-200">
                  Phone:
                </h1>
                <h1 className="text-slate-900 font-medium dark:text-slate-200">
                  Address:
                </h1>
                <h1 className="text-slate-900 font-medium dark:text-slate-200">
                  Birth:
                </h1>
                <h1 className="text-slate-900 font-medium dark:text-slate-200">
                  Gender:
                </h1>
                <h1 className="text-slate-900 font-medium dark:text-slate-200">
                  Education:
                </h1>
                <h1 className="text-slate-900 font-medium dark:text-slate-200">
                  Work:
                </h1>
              </div>
              <div>
                <p className="text-slate-900 dark:text-slate-200">
                  {profile?.profile?.full_name}
                </p>
                <p className="text-slate-900 dark:text-slate-200">
                  {profile?.profile?.country}
                </p>
                <p className="text-slate-900 dark:text-slate-200">
                  {profile?.profile?.city}
                </p>
                <p className="text-slate-900 dark:text-slate-200">
                  {profile?.email || "N/A"}
                </p>
                <p className="text-slate-900 dark:text-slate-200">
                  {profile?.profile?.phone_number || "N/A"}
                </p>
                <p className="text-slate-900 dark:text-slate-200">
                  {profile?.profile?.full_address}
                </p>
                <p className="text-slate-900 dark:text-slate-200">
                  {profile?.profile?.date_of_birth}
                </p>
                <p className="text-slate-900 dark:text-slate-200">
                  {profile?.profile?.gender}
                </p>
                <p className="text-slate-900 dark:text-slate-200">
                  {profile?.profile?.education || "None"}
                </p>
                <p className="text-slate-900 dark:text-slate-200">
                  {profile?.profile?.work}
                </p>
              </div>
            </motion.div>

            <motion.div
              className="mt-6 p-6 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-md rounded-xl shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                About You
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                {profile?.profile?.bio || "No about information provided."}
              </p>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-2/3"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Edit Profile
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    placeholder="First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    type="text"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Last Name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    type="text"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    type="text"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    type="text"
                  />
                </div>
                <div>
                  <Input
                    placeholder="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    type="text"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Phone Number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    type="text"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Date of Birth"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    type="date"
                  />
                </div>
                <div>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, gender: value }))
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Input
                    placeholder="Education"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    type="text"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Work"
                    name="work"
                    value={formData.work}
                    onChange={handleChange}
                    type="text"
                  />
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-4"
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Profile Image
                </label>
                <div className="flex items-center space-x-4 mt-2">
                  <img
                    src={
                      profile?.profile?.profile_picture || "default-avatar.png"
                    }
                    alt="Profile"
                    className="w-12 h-12 object-cover rounded-full border border-gray-200 dark:border-gray-600 shadow-md"
                  />
                  <Input
                    type="file"
                    onChange={handleProfilePictureChange}
                    accept="image/*"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-4"
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Profile Cover Image
                </label>
                <div className="flex items-center space-x-4 mt-2">
                  <img
                    src={
                      profile?.profile?.cover_picture || "default-avatar.png"
                    }
                    alt="Profile"
                    className="w-12 h-12 object-cover rounded-full border border-gray-200 dark:border-gray-600 shadow-md"
                  />
                  <Input
                    type="file"
                    onChange={handleCoverPictureChange}
                    accept="image/*"
                  />
                </div>
              </motion.div>
              <Button
                className="w-full"
                variant={"default"}
                disabled={saving || loading}
                loadingText="Saving"
              >
                Save Changes
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </MaxWidthWrapper>
    </ProtectedRoute>
  );
};

export default page;
