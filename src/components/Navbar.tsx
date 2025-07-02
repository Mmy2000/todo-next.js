"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { useAuth } from "@/app/context/AuthContext";
import { LoginDialog } from "@/components/LoginDialog";
import { RegisterDialog } from "@/components/RegisterDialog";
import MaxWidthWrapper from "./ui/MaxWidthWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  // Replace with real authentication logic
  const { user, logout } = useAuth();
  const handleLogout = () => {
    // Add your logout logic here
    logout();
  };
  

  return (
    <nav className="sticky z-[10] h-14 inset-x-0 top-0 w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-900 ">
      <MaxWidthWrapper>
        <div className="flex items-center justify-between h-14">
          <Link
            href="/"
            className="text-xl font-bold text-slate-900 dark:text-white"
          >
            TodoApp
          </Link>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />
            {!user ? (
              <>
                <LoginDialog />
                <RegisterDialog />
              </>
            ) : (
              <>
                <Link href="/profile">
                  <Avatar>
                    <AvatarImage
                      src={user?.profile?.profile_picture}
                      alt="User avatar"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <Button variant="destructive" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
