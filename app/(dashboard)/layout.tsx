import Navbar from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { getApiLimitCount } from "@/util/api-limits";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();
  return (
    <div className="h-full relative">
      <div className="h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
        <Sidebar apiLimitCount={apiLimitCount} />
      </div>
      <main className="md:pl-72 pb-10">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
