import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { WORKSPACES_RESPONSE } from "./mock";

export default function TableView() {

    const { tableId } = useParams();

    const [search, setSearch] = useState("");

    const allTables = WORKSPACES_RESPONSE.data.flatMap(
        (workspace) => workspace.tables
    );

    const table = allTables.find(
        (item) => item.id === tableId
    );

    const filteredRows = useMemo(() => {

        if (!table) {
            return [];
        }

        return table.rows.filter((row: any) => {

            return Object.values(row).some((value) =>
                String(value)
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );

        });

    }, [search, table]);

    if (!table) {
        return (
            <div className="p-6">
                Table Not Found
            </div>
        );
    }

    return (
        <div className="p-6">

            <div className="bg-white border border-gray-200 rounded-3xl p-6">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>

                        <h1 className="text-2xl font-black text-gray-900">
                            {table.name}
                        </h1>

                        <p className="text-sm text-gray-400 mt-1">
                            {table.description}
                        </p>

                    </div>

                    <input
                        type="text"
                        placeholder="Search records..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="
                            w-full
                            lg:w-[280px]
                            border
                            border-gray-200
                            rounded-2xl
                            px-4
                            py-3
                            text-sm
                            outline-none
                            focus:border-orange-400
                        "
                    />

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

                    <div className="bg-orange-50 rounded-2xl p-4">

                        <p className="text-xs text-gray-500">
                            Total Records
                        </p>

                        <h3 className="font-black text-2xl text-gray-900 mt-2">
                            {table.rows.length}
                        </h3>

                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4">

                        <p className="text-xs text-gray-500">
                            Total Fields
                        </p>

                        <h3 className="font-black text-2xl text-gray-900 mt-2">
                            {table.schema.length}
                        </h3>

                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4">

                        <p className="text-xs text-gray-500">
                            Owner
                        </p>

                        <h3 className="font-black text-lg text-gray-900 mt-2">
                            {table.owner.name}
                        </h3>

                    </div>

                </div>

            </div>

            <div className="mt-6 bg-white border border-gray-200 rounded-3xl overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[900px]">

                        <thead className="bg-gray-50 border-b border-gray-200">

                            <tr>

                                {table.schema.map((field: any) => (

                                    <th
                                        key={field.key}
                                        className="
                                            px-5
                                            py-4
                                            text-left
                                            text-xs
                                            font-black
                                            uppercase
                                            tracking-wider
                                            text-gray-500
                                        "
                                    >

                                        <div className="flex flex-col">

                                            <span>
                                                {field.label}
                                            </span>

                                            <span className="text-[10px] text-orange-500 mt-1">
                                                {field.type}
                                            </span>

                                        </div>

                                    </th>

                                ))}

                            </tr>

                        </thead>

                        <tbody>

                            {filteredRows.length > 0 ? (

                                filteredRows.map((row: any) => (

                                    <tr
                                        key={row.id}
                                        className="
                                            border-b
                                            border-gray-100
                                            hover:bg-orange-50/40
                                            transition-all
                                        "
                                    >

                                        {table.schema.map((field: any) => (

                                            <td
                                                key={field.key}
                                                className="
                                                    px-5
                                                    py-4
                                                    text-sm
                                                    text-gray-700
                                                "
                                            >

                                                {field.type === "select" ? (

                                                    <span
                                                        className={`
                                                            px-3
                                                            py-1
                                                            rounded-full
                                                            text-xs
                                                            font-semibold
                                                            ${row[field.key] === "Completed"
                                                                ? "bg-green-100 text-green-600"
                                                                : row[field.key] === "Pending"
                                                                    ? "bg-yellow-100 text-yellow-600"
                                                                    : "bg-red-100 text-red-600"
                                                            }
                                                        `}
                                                    >
                                                        {row[field.key]}
                                                    </span>

                                                ) : (

                                                    row[field.key]

                                                )}

                                            </td>

                                        ))}

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan={table.schema.length}
                                        className="
                                            text-center
                                            py-14
                                            text-gray-400
                                            text-sm
                                        "
                                    >
                                        No Records Found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}