"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import apiServiceCall from "../service/apiServiceCall";

// Assuming you already have a User type defined somewhere
interface ProfileContextType {
  profile: User | null;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  error: string | null;
}

// Create context
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Safe hook to use ProfileContext
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileContextProvider");
  }
  return context;
};

// Provider
interface Props {
  children: ReactNode;
}

export const ProfileContextProvider: React.FC<Props> = ({ children }) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await apiServiceCall({
          url: "/api/users/profile/",
          method: "get",
          endpoint: "profile",
        });

        setProfile(res?.data);
      } catch (err: any) {
        console.error("Profile fetch error:", err);
        setError(err?.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        loading,
        error,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
