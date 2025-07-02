"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { useAuth } from "@/app/context/AuthContext";
import { LoginDialog } from "@/components/LoginDialog";
import { RegisterDialog } from "@/components/RegisterDialog";

const Navbar = () => {
  // Replace with real authentication logic
  const { user, logout } = useAuth();
  const handleLogout = () => {
    // Add your logout logic here
    logout();
  };

  return (
    <nav className="w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-900 px-4 py-2 flex items-center justify-between">
      <Link
        href="/"
        className="text-xl font-bold text-slate-900 dark:text-white"
      >
        TodoApp
      </Link>
      <div className="flex items-center gap-2">
        <ModeToggle />
        {!user ? (
          <>
            <LoginDialog />
            <RegisterDialog />
          </>
        ) : (
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
