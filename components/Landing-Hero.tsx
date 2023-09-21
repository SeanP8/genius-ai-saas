"use client";
import Link from "next/link";
import TypewritterComponent from "typewriter-effect";
import { Button } from "./ui/button";

export const LandingHero = () => {
  return (
    <div className="text-white font-bold text-center py-36 space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The best AI tool for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-yellow-500">
          <TypewritterComponent
            options={{
              strings: [
                "Chatbot.",
                "Photo Generation.",
                "Blog Writting.",
                "Mail Writting.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Create content using AI 10x faster
      </div>
      <div>
        <Link href={"/dashboard"}>
          <Button
            variant="premium"
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          >
            Start Generating For Free
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No Credit Card Required
      </div>
    </div>
  );
};
