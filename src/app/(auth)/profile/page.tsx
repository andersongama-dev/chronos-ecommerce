"use client";

import {
    Package,
    Truck,
    Heart,
    Ticket,
    MapPin,
    Headphones,
    RefreshCcw,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useUserProfile } from "@/hooks/useProfile";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Sidebar from "@/components/Sidebar";
import EditProfileModal from "@/components/EditProfileModal";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";

export default function Profile() {
    const pathname = usePathname();

    const navItems = [
        { href: "/profile", label: "Profile", icon: Package },
        { href: "/orders", label: "Orders", icon: Truck },
        { href: "/addresses", label: "Addresses", icon: MapPin },
        { href: "/favorites", label: "Favorites", icon: Heart },
    ];

    const { fetchProfile, profile, loading } = useUserProfile();
    const [openEdit, setOpenEdit] = useState(false);

    const { updateProfile } = useUpdateProfile();

    const handleUpdateProfile = async (name: string, email: string) => {
        const updated = await updateProfile(name, email);

        if (updated) {
            await fetchProfile();
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const userInitial = profile?.name?.charAt(0).toUpperCase() || "";

    return (
        <div className="min-h-screen bg-[#f8f9fb] flex">

            <Sidebar />

            <main className="flex-1 p-6 md:p-10 space-y-6">

                <Card className="border-gray-100 shadow-sm">
                    <CardContent className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="w-16 h-16 rounded-full">
                                {profile?.name ? (
                                    <div className="w-full h-full flex items-center justify-center bg-[#4455de] text-white font-semibold text-lg rounded-full">
                                        {userInitial}
                                    </div>
                                ) : (
                                    <AvatarImage src="https://via.placeholder.com/80" />
                                )}
                            </Avatar>

                            <div>
                                <h1 className="text-xl font-semibold text-gray-900 tracking-[0.02em] leading-[1.5]">
                                    {loading ? "Loading..." : profile?.name || "—"}
                                </h1>
                                <p className="text-sm text-gray-500 tracking-[0.02em] leading-[1.5]">
                                    {profile?.email || "—"}
                                </p>
                            </div>
                        </div>

                        <Button
                            onClick={() => setOpenEdit(true)}
                            className="h-11 rounded-full px-4 bg-[#4455de] hover:opacity-90 cursor-pointer tracking-[0.02em] leading-[1.5]">
                            Edit profile
                        </Button>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { icon: Package, label: "Orders", value: 12 },
                        { icon: Truck, label: "In transit", value: 2 },
                        { icon: Heart, label: "Favorites", value: 5 },
                        { icon: Ticket, label: "Coupons", value: 3 },
                    ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <Card key={i} className="border-gray-100 hover:shadow-md transition">
                                <CardContent className="p-5 flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-[#eef0ff] text-[#4455de] tracking-[0.02em] leading-[1.5]">
                                        <Icon size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 tracking-[0.02em] leading-[1.5]">{item.label}</p>
                                        <p className="text-lg font-semibold text-gray-900 tracking-[0.02em] leading-[1.5]">
                                            {item.value}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <Card className="border-gray-100">
                    <CardHeader>
                        <CardTitle className="text-lg tracking-[0.02em] leading-[1.5]">Recent orders</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <img
                                    src="https://via.placeholder.com/60"
                                    className="w-14 h-14 rounded-lg object-cover"
                                />

                                <div>
                                    <p className="font-medium text-gray-900 tracking-[0.02em] leading-[1.5]">
                                        Chronos Black Edition
                                    </p>
                                    <p className="text-sm text-gray-500 tracking-[0.02em] leading-[1.5]">
                                        Order #1234
                                    </p>
                                </div>
                            </div>

                            <div className="text-right flex flex-col gap-4">
                                <Badge className="bg-green-100 text-green-600 px-4 py-3 tracking-[0.02em] leading-[1.5]">
                                    Delivered
                                </Badge>
                                <Link href="/orders/1234">
                                    <p className="text-xs text-[#4455de] mt-1 cursor-pointer tracking-[0.02em] leading-[1.5]">
                                        View details
                                    </p>
                                </Link>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <img
                                    src="https://via.placeholder.com/60"
                                    className="w-14 h-14 rounded-lg object-cover"
                                />

                                <div>
                                    <p className="font-medium text-gray-900 tracking-[0.02em] leading-[1.5]">
                                        Classic Gold Watch
                                    </p>
                                    <p className="text-sm text-gray-500 tracking-[0.02em] leading-[1.5]">
                                        Order #1235
                                    </p>
                                </div>
                            </div>

                            <div className="text-right flex flex-col gap-4 tracking-[0.02em] leading-[1.5]">
                                <Badge className="bg-yellow-100 text-yellow-600 px-4 py-3 tracking-[0.02em] leading-[1.5]">
                                    In transit
                                </Badge>
                                <Link href="/orders/1235">
                                    <p className="text-xs text-[#4455de] mt-1 cursor-pointer tracking-[0.02em] leading-[1.5]">
                                        Track order
                                    </p>
                                </Link>
                            </div>
                        </div>

                    </CardContent>
                </Card>

                <Card className="border-gray-100">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2 tracking-[0.02em] leading-[1.5]">
                            <MapPin size={18} />
                            Main address
                        </CardTitle>

                        <Link href="/addresses">
                            <Button variant="ghost" className="text-[#4455de] cursor-pointer tracking-[0.02em] leading-[1.5]">
                                Edit
                            </Button>
                        </Link>
                    </CardHeader>

                    <CardContent>
                        <p className="text-sm text-gray-600 tracking-[0.02em] leading-[1.5]">
                            123 Example Street <br />
                            São Paulo - SP <br />
                            ZIP 00000-000
                        </p>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-4">
                    <Link href="/support">
                        <Button className="w-full h-12 rounded-xl bg-[#4455de] hover:opacity-90 flex items-center gap-2 cursor-pointer tracking-[0.02em] leading-[1.5]">
                            <Headphones size={16} />
                            Contact support
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

            <EditProfileModal
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                initialName={profile?.name}
                initialEmail={profile?.email}
                onSave={handleUpdateProfile}
            />
        </div>
    );
}