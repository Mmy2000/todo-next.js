import Image from "next/image";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";

export default function Home() {
  return (
    <>
      <div className="bg-slate-50 grainy-light">
        <MaxWidthWrapper className="pb-24 pt-10 ">
          <h1>Hello</h1>
          <Button variant="default" className="cursor-pointer">
            Click Me
          </Button>
        </MaxWidthWrapper>
      </div>
    </>
  );
}
