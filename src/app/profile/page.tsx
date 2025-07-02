"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const page = () => {
    
  const { profile, profileLoading } = useAuth();
  useEffect(() => {
    console.log(profile);
  }, []);
  return (
    <ProtectedRoute>
      <div>page</div>
    </ProtectedRoute>
  );
};

export default page;
