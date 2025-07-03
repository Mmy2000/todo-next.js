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

const page = () => {
    
  const { profile, loading, error } = useProfile();
  const [showCoverImage, setShowCoverImage] = useState(false);
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
    const handleCoverImage = ()=>{

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
            <div className="flex flex-col items-center text-center space-y-4">
              <motion.img
                src={profile?.profile?.profile_picture || "default-avatar.png"}
                alt={`${profile?.profile?.full_name}'s avatar`}
                className="w-36 h-36 rounded-full border-4 object-cover border-zinc-600 dark:border-zinc-500 shadow-lg"
                whileHover={{ scale: 1.1 }}
              />
              <h1 className="text-3xl font-extrabold text-zinc-700 dark:text-gray-100">
                {profile?.profile?.full_name}
              </h1>
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
                  Email:
                </h1>
                <h1 className="text-slate-900 font-medium dark:text-slate-200">
                  Phone:
                </h1>
                <h1 className="text-slate-900 font-medium dark:text-slate-200">
                  Address:
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
                  {profile?.email || "N/A"}
                </p>
                <p className="text-slate-900 dark:text-slate-200">
                  {profile?.profile?.phone_number || "N/A"}
                </p>
                <p className="text-slate-900 dark:text-slate-200">
                  {profile?.profile?.full_address}
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
        </motion.div>
      </MaxWidthWrapper>
    </ProtectedRoute>
  );
};

export default page;
