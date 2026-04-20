"use client";

import { RefreshCcw } from "lucide-react";

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

export default function Orders() {
    const orders = [
        {
            id: "1234",
            name: "Chronos Black Edition",
            price: 299,
            status: "Delivered",
            image: "https://via.placeholder.com/60",
            date: "March 12, 2026",
        },
        {
            id: "1235",
            name: "Classic Gold Watch",
            price: 349,
            status: "In transit",
            image: "https://via.placeholder.com/60",
            date: "March 15, 2026",
        },
    ];

    const getStatusStyle = (status: string) => {
        if (status === "Delivered") {
            return "bg-green-100 text-green-600";
        }
        if (status === "In transit") {
            return "bg-yellow-100 text-yellow-600";
        }
        return "bg-gray-100 text-gray-600";
    };

    return (
        <div className="min-h-screen bg-[#f8f9fb] flex">
            <Sidebar />

            <main className="flex-1 p-6 md:p-10 space-y-6">

                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-gray-900 tracking-[0.02em] leading-[1.5]">
                        Orders
                    </h1>
                </div>

                <Card className="border-gray-100">
                    <CardHeader>
                        <CardTitle className="text-lg tracking-[0.02em] leading-[1.5]">
                            Your orders
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">

                        {orders.map((order, index) => (
                            <div key={order.id}>

                                <div className="flex items-center justify-between">

                                    {/* Left */}
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={order.image}
                                            className="w-14 h-14 rounded-lg object-cover"
                                        />

                                        <div>
                                            <p className="font-medium text-gray-900 tracking-[0.02em] leading-[1.5]">
                                                {order.name}
                                            </p>

                                            <p className="text-sm text-gray-500 tracking-[0.02em] leading-[1.5]">
                                                Order #{order.id} • {order.date}
                                            </p>

                                            <p className="text-sm text-gray-700 tracking-[0.02em] leading-[1.5] mt-1">
                                                U$ {order.price}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-right flex flex-col gap-3">
                                        <Badge
                                            className={`${getStatusStyle(
                                                order.status
                                            )} px-4 py-3 tracking-[0.02em] leading-[1.5]`}
                                        >
                                            {order.status}
                                        </Badge>

                                        <div className="flex flex-col items-end text-xs gap-1">

                                            <Link href={`/orders/${order.id}`}>
                                                <span className="text-[#4455de] cursor-pointer tracking-[0.02em] leading-[1.5]">
                                                    View details
                                                </span>
                                            </Link>

                                            {order.status === "In transit" && (
                                                <Link href={`/orders/${order.id}/tracking`}>
                                                    <span className="text-[#4455de] cursor-pointer tracking-[0.02em] leading-[1.5]">
                                                        Track order
                                                    </span>
                                                </Link>
                                            )}

                                        </div>
                                    </div>
                                </div>

                                {index !== orders.length - 1 && <Separator />}
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-4">
                    <Link href="/support">
                        <Button className="w-full h-12 rounded-xl bg-[#4455de] hover:opacity-90 tracking-[0.02em] leading-[1.5]">
                            Need help with an order?
                        </Button>
                    </Link>

                    <Link href="/returns">
                        <Button
                            variant="outline"
                            className="w-full h-12 rounded-xl flex items-center gap-2 cursor-pointer tracking-[0.02em] leading-[1.5]"
                        >
                            <RefreshCcw size={16} />
                            Returns & exchanges
                        </Button>
                    </Link>
                </div>
            </main>
        </div>
    );
}