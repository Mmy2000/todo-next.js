"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    const access = localStorage.getItem("access");
    if (!access) {
      router.push("/");
      setHasAccess(false);
    } else {
      setHasAccess(true);
    }
  }, [router]);

  // Don't render until we've determined access
  if (hasAccess === null || !user) return null;

  return <>{children}</>;
}
