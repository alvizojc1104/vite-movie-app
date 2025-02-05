import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

interface CodeData {
    code: number;
    created: string;
    expiry_date: string;
    updatedAt: string;
    used: boolean;
    __v: number;
    _id: string;
}

export const columns: ColumnDef<CodeData>[] = [
    {
        accessorKey: "no",
        header: "No.",
    },
    {
        accessorKey: "code",
        header: "Code",
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <button className="text-sm flex items-center" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
        cell: ({ row }) => {
            const status = Boolean(row.getValue("status"));
            return !status ? <p className="text-sm text-green-500">Available</p> : <p className="text-sm text-red-500">Unavailable</p>
        },
    },
    {
        accessorKey: "created",
        header: "Created",
    },
    {
        accessorKey: "expiry_date",
        header: "Expiry Date",
    },
]
