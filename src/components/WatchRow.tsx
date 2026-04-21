"use client";

import { Copy, MoreHorizontalIcon, PenBox, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    TableCell,
    TableRow,
} from "@/components/ui/table";

import { Watch } from "@/types/watch-types";

type Props = {
    watch: Watch;
    onEdit: (watch: Watch) => void;
    onDelete: (id: number) => void;
};

export default function WatchRow({ watch, onEdit, onDelete }: Props) {
    return (
        <TableRow className="group hover:bg-gray-50/80 transition-colors">
            <TableCell className="px-6">
                <img
                    src={watch.imageUrl}
                    className="w-14 h-10 rounded object-cover"
                />
            </TableCell>

            <TableCell className="px-6 text-sm font-bold text-gray-800">
                {watch.name}
            </TableCell>

            <TableCell className="px-6 text-sm text-gray-600">
                {watch.brand}
            </TableCell>

            <TableCell className="px-6 text-sm text-gray-600">
                ${watch.price}
            </TableCell>

            <TableCell className="px-6 text-sm text-gray-600">
                {watch.gender}
            </TableCell>

            <TableCell className="px-6 text-sm text-gray-600">
                {watch.style}
            </TableCell>

            <TableCell className="px-6 ext-center">
                <div className="flex items-center justify-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="cursor-pointer">
                            <Button variant="ghost" size="icon" className="size-8">
                                <MoreHorizontalIcon />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => onEdit(watch)}
                            >
                                <PenBox size={16} />
                                Edit
                            </DropdownMenuItem>

                            {
                                /*
                                    <DropdownMenuItem className="cursor-pointer">
                                <Copy size={16} />
                                Duplicate
                            </DropdownMenuItem>
                                */
                            }

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                className="cursor-pointer"
                                variant="destructive"
                                onClick={() => onDelete(watch.id)}
                            >
                                <Trash size={16} />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </TableCell>
        </TableRow>
    );
}