import Image from "next/image";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import Link from "next/link";
import { ArrowRight, Check, Star } from "lucide-react";

export default function Home() {
  return (
    <>
        <section>
          <MaxWidthWrapper className="pb-10 pt-10 lg:grid lg:grid-cols-3 lg:gap-x-0 xl:gap-x-8 ">
            <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
              <div className="mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
                <h1 className=" w-fit tracking-tight text-balance font-bold !leading-tight text-zinc-900 dark:text-zinc-200 text-3xl md:text-6xl">
                  Your Tasks, Organized Your Way with a{" "}
                  <span className="bg-green-600 px-2 text-white">Custom</span>{" "}
                  ToDo App
                </h1>
                <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                  Stay focused and in control with your personalized task
                  manager. Our ToDo app is built to simplify your life and help
                  you turn plans into{" "}
                  <span className="font-semibold">progress</span> whether it's
                  daily goals, big projects, or simple reminders.
                </p>
                <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                  <div className="space-y-2">
                    <li className="flex gap-1.5 items-center text-left">
                      <Check className="h-5 w-5 shrink-0 text-green-600" />
                      Intuitive and user-friendly interface
                    </li>
                    <li className="flex gap-1.5 items-center text-left">
                      <Check className="h-5 w-5 shrink-0 text-green-600" />5
                      Smart reminders and recurring tasks
                    </li>
                    <li className="flex gap-1.5 items-center text-left">
                      <Check className="h-5 w-5 shrink-0 text-green-600" />
                      Smart reminders and recurring tasks
                    </li>
                  </div>
                </ul>
                <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  <div className="flex -space-x-4">
                    <img
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                      src="/users/user-1.png"
                      alt="user image"
                    />
                    <img
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                      src="/users/user-2.png"
                      alt="user image"
                    />
                    <img
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                      src="/users/user-3.png"
                      alt="user image"
                    />
                    <img
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                      src="/users/user-4.jpg"
                      alt="user image"
                    />
                    <img
                      className="inline-block object-cover h-10 w-10 rounded-full ring-2 ring-slate-100"
                      src="/users/user-5.jpg"
                      alt="user image"
                    />
                  </div>
                  <div className="flex flex-col justify-between items-center sm:items-start">
                    <div className="flex gap-0.5">
                      <Star className="h-4 w-4 text-green-600 fill-green-600" />
                      <Star className="h-4 w-4 text-green-600 fill-green-600" />
                      <Star className="h-4 w-4 text-green-600 fill-green-600" />
                      <Star className="h-4 w-4 text-green-600 fill-green-600" />
                      <Star className="h-4 w-4 text-green-600 fill-green-600" />
                    </div>

                    <p>
                      <span className="font-semibold">1.250</span> happy
                      customers
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-8 lg:mx-0 h-fit">
              <div className="relative md:max-w-xl">
                <Link href="/todo">
                  <Button size={"lg"} variant="default">
                    Todos
                    <ArrowRight size={14} className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                
              </div>
            </div>
          </MaxWidthWrapper>
        </section>
    </>
  );
}
