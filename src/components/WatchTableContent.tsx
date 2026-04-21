"use client";

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import WatchRow from "./WatchRow";
import { Watch } from "@/types/watch-types";

type Props = {
    watches: Watch[];
    onEdit: (watch: Watch) => void;
    onDelete: (id: number) => void;
};

export default function WatchTableContent({ watches, onEdit, onDelete }: Props) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="overflow-x-auto">
                <Table className="w-full text-left border-collapse">
                    <TableHeader>
                        <TableRow className="bg-gray-50 border-b border-gray-100">
                            <TableHead className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                                Image
                            </TableHead>
                            <TableHead className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                                Name
                            </TableHead>
                            <TableHead className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                                Brand
                            </TableHead>
                            <TableHead className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                                Price
                            </TableHead>
                            <TableHead className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                                Gender
                            </TableHead>
                            <TableHead className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                                Style
                            </TableHead>
                            <TableHead className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-50">
                        {watches.map((watch) => (
                            <WatchRow
                                key={watch.id}
                                watch={watch}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}