import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "./ui/progress";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useProModal } from "@/hooks/use-pro-modal";

export const FreeCounter = ({
  apiLimitCount = 0,
}: {
  apiLimitCount: number;
}) => {
  const [mounted, setMounted] = useState(false);
  const proModal = useProModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className=" ">
      <Card className="bg-[#131738]  border-0 rounded-2xl m-[0.5px]">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress
              className="h-3 bg-gradient-to-r from-gray-900 to-yellow-500 text-white border-0"
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
            />
          </div>
          <Button variant="premium" onClick={proModal.onOpen}>
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
