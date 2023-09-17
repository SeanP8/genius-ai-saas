// import { LandingContent } from "@/components/Landing-Content";
import { LandingHero } from "@/components/Landing-Hero";
import { LandingNavbar } from "@/components/Landing-Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      {/* <LandingContent /> */}
    </div>
  );
};

export default LandingPage;
