import Image from "next/image";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { PlusIcon } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="">
        <MaxWidthWrapper className="pb-24 pt-10 ">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            Hello
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="default" className="cursor-pointer">
              <PlusIcon size={14} className="mr-1" />
              New Todo
            </Button>
          </div>
          <ModeToggle />
        </MaxWidthWrapper>
      </div>
    </>
  );
}
