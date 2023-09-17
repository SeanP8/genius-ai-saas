import Link from "next/link";
import { Button } from "./ui/button";

export const LandingHero = () => {
  return (
    <div className="text-white font-bold text-center">
      <div className="text-4xl">
        <h1>The best AI tool for...</h1>
      </div>
      <div>
        <Link href={"/dashboard"}>
          <Button> start generating for free</Button>
        </Link>
      </div>
    </div>
  );
};
