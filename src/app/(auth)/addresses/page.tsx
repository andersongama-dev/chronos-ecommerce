"use client";

import { MapPin, Plus } from "lucide-react";

import Link from "next/link";
import Sidebar from "@/components/Sidebar";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Addresses() {
  const addresses = [
    {
      id: 1,
      name: "Home",
      street: "123 Example Street",
      city: "São Paulo - SP",
      zip: "00000-000",
      isDefault: true,
    },
    {
      id: 2,
      name: "Office",
      street: "456 Business Ave",
      city: "São Paulo - SP",
      zip: "11111-111",
      isDefault: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 space-y-6">

        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900 tracking-[0.02em] leading-[1.5]">
            Addresses
          </h1>

          <Link href="/addresses/new">
            <Button className="h-11 rounded-full px-4 bg-[#4455de] hover:opacity-90 flex items-center gap-2 tracking-[0.02em] leading-[1.5]">
              <Plus size={16} />
              Add address
            </Button>
          </Link>
        </div>

        <Card className="border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg tracking-[0.02em] leading-[1.5]">
              Your addresses
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            {addresses.map((addr, index) => (
              <div key={addr.id}>
                
                <div className="flex items-center justify-between">

                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-[#eef0ff] text-[#4455de]">
                      <MapPin size={18} />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900 tracking-[0.02em] leading-[1.5]">
                          {addr.name}
                        </p>

                        {addr.isDefault && (
                          <Badge className="bg-[#eef0ff] text-[#4455de] tracking-[0.02em] leading-[1.5]">
                            Default
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 tracking-[0.02em] leading-[1.5] mt-1">
                        {addr.street}
                      </p>

                      <p className="text-sm text-gray-600 tracking-[0.02em] leading-[1.5]">
                        {addr.city}
                      </p>

                      <p className="text-sm text-gray-600 tracking-[0.02em] leading-[1.5]">
                        ZIP {addr.zip}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 text-xs">

                    <Link href={`/addresses/${addr.id}`}>
                      <span className="text-[#4455de] cursor-pointer tracking-[0.02em] leading-[1.5]">
                        Edit
                      </span>
                    </Link>

                    {!addr.isDefault && (
                      <button className="text-gray-500 tracking-[0.02em] leading-[1.5]">
                        Set as default
                      </button>
                    )}

                    <button className="text-red-500 tracking-[0.02em] leading-[1.5]">
                      Remove
                    </button>

                  </div>
                </div>

                {index !== addresses.length - 1 && <Separator />}
              </div>
            ))}

          </CardContent>
        </Card>

      </main>
    </div>
  );
}