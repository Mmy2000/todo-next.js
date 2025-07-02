import Image from "next/image";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="">
        <MaxWidthWrapper className="pb-24 pt-10 ">
          <Link href="/todo">
            <Button variant="default" >
              Todos
              <ArrowRight size={14} className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </MaxWidthWrapper>
      </div>
    </>
  );
}
