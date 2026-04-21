import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Analytics() {
    return (
        <div className="w-full h-full p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Analytics</h1>

                <Button className="bg-[#4455de] hover:opacity-90 h-11 w-11 rounded-full font-medium cursor-pointer">
                    <Plus size={24} />
                </Button>
            </div>
        </div>
    )
}