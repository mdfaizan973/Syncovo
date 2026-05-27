import { useState } from "react";
import { WORKSPACES_RESPONSE } from "./mock";

const FIELD_TYPES = [
    "text",
    "textarea",
    "number",
    "email",
    "password",
    "date",
    "file",
    "select",
    "checkbox",
    "radio",
];

export default function FormBuilder() {

    const workspaces = WORKSPACES_RESPONSE.data;

    const [workspaceId, setWorkspaceId] = useState("");

    const [tableName, setTableName] = useState("");

    const [description, setDescription] = useState("");

    const [fields, setFields] = useState<any[]>([
        {
            label: "",
            key: "",
            type: "text",
            required: false,
            options: [],
        },
    ]);

    const addField = () => {

        setFields([
            ...fields,

            {
                label: "",
                key: "",
                type: "text",
                required: false,
                options: [],
            },
        ]);
    };

    const updateField = (
        index: number,
        key: string,
        value: any
    ) => {

        const updatedFields = [...fields];

        updatedFields[index][key] = value;

        setFields(updatedFields);
    };

    const addOption = (fieldIndex: number) => {

        const updatedFields = [...fields];

        updatedFields[fieldIndex].options.push("");

        setFields(updatedFields);
    };

    const updateOption = (
        fieldIndex: number,
        optionIndex: number,
        value: string
    ) => {

        const updatedFields = [...fields];

        updatedFields[fieldIndex].options[optionIndex] = value;

        setFields(updatedFields);
    };

    const handleSave = () => {

        const payload = {
            workspace_id: workspaceId,
            table_name: tableName,
            description,
            fields,
        };

        console.log("TABLE PAYLOAD", payload);
    };

    return (
        <div className="p-6">

            {/* HEADER */}

            <div
                className="
                    bg-white
                    border
                    border-gray-200
                    rounded-3xl
                    p-6
                "
            >

                <h1 className="text-2xl font-black text-gray-900">
                    Create Dynamic Table
                </h1>

                <p className="text-sm text-gray-400 mt-1">
                    Build dynamic forms and database tables
                </p>

                {/* FORM TOP */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

                    {/* WORKSPACE */}

                    <div>

                        <label
                            className="
                                text-sm
                                font-bold
                                text-gray-700
                                block
                                mb-2
                            "
                        >
                            Workspace
                        </label>

                        <select
                            value={workspaceId}
                            onChange={(e) =>
                                setWorkspaceId(e.target.value)
                            }
                            className="
                                w-full
                                border
                                border-gray-200
                                rounded-2xl
                                px-4
                                py-3
                                outline-none
                                focus:border-orange-400
                            "
                        >

                            <option value="">
                                Select Workspace
                            </option>

                            {workspaces.map((workspace) => (

                                <option
                                    key={workspace.id}
                                    value={workspace.id}
                                >
                                    {workspace.name}
                                </option>

                            ))}

                        </select>

                    </div>

                    {/* TABLE NAME */}

                    <div>

                        <label
                            className="
                                text-sm
                                font-bold
                                text-gray-700
                                block
                                mb-2
                            "
                        >
                            Table Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter table name"
                            value={tableName}
                            onChange={(e) =>
                                setTableName(e.target.value)
                            }
                            className="
                                w-full
                                border
                                border-gray-200
                                rounded-2xl
                                px-4
                                py-3
                                outline-none
                                focus:border-orange-400
                            "
                        />

                    </div>

                </div>

                {/* DESCRIPTION */}

                <div className="mt-5">

                    <label
                        className="
                            text-sm
                            font-bold
                            text-gray-700
                            block
                            mb-2
                        "
                    >
                        Description
                    </label>

                    <textarea
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        className="
                            w-full
                            border
                            border-gray-200
                            rounded-2xl
                            px-4
                            py-3
                            h-28
                            resize-none
                            outline-none
                            focus:border-orange-400
                        "
                    />

                </div>

            </div>

            {/* FIELDS */}

            <div className="mt-6">

                <div className="flex items-center justify-between mb-4">

                    <div>

                        <h2 className="text-xl font-black text-gray-900">
                            Dynamic Fields
                        </h2>

                        <p className="text-sm text-gray-400 mt-1">
                            Create dynamic schema for the table
                        </p>

                    </div>

                    <button
                        onClick={addField}
                        className="
                            bg-orange-500
                            hover:bg-orange-600
                            text-white
                            px-5
                            py-2.5
                            rounded-xl
                            text-sm
                            font-semibold
                        "
                    >
                        Add Field
                    </button>

                </div>

                <div className="space-y-5">

                    {fields.map((field, index) => (

                        <div
                            key={index}
                            className="
                                bg-white
                                border
                                border-gray-200
                                rounded-3xl
                                p-5
                            "
                        >

                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

                                {/* LABEL */}

                                <div>

                                    <label
                                        className="
                                            text-xs
                                            font-bold
                                            text-gray-500
                                            block
                                            mb-2
                                        "
                                    >
                                        Field Label
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Customer Name"
                                        value={field.label}
                                        onChange={(e) =>
                                            updateField(
                                                index,
                                                "label",
                                                e.target.value
                                            )
                                        }
                                        className="
                                            w-full
                                            border
                                            border-gray-200
                                            rounded-2xl
                                            px-4
                                            py-3
                                            outline-none
                                            focus:border-orange-400
                                        "
                                    />

                                </div>

                                {/* KEY */}

                                <div>

                                    <label
                                        className="
                                            text-xs
                                            font-bold
                                            text-gray-500
                                            block
                                            mb-2
                                        "
                                    >
                                        Field Key
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="customer_name"
                                        value={field.key}
                                        onChange={(e) =>
                                            updateField(
                                                index,
                                                "key",
                                                e.target.value
                                            )
                                        }
                                        className="
                                            w-full
                                            border
                                            border-gray-200
                                            rounded-2xl
                                            px-4
                                            py-3
                                            outline-none
                                            focus:border-orange-400
                                        "
                                    />

                                </div>

                                {/* TYPE */}

                                <div>

                                    <label
                                        className="
                                            text-xs
                                            font-bold
                                            text-gray-500
                                            block
                                            mb-2
                                        "
                                    >
                                        Field Type
                                    </label>

                                    <select
                                        value={field.type}
                                        onChange={(e) =>
                                            updateField(
                                                index,
                                                "type",
                                                e.target.value
                                            )
                                        }
                                        className="
                                            w-full
                                            border
                                            border-gray-200
                                            rounded-2xl
                                            px-4
                                            py-3
                                            outline-none
                                            focus:border-orange-400
                                        "
                                    >

                                        {FIELD_TYPES.map((type) => (

                                            <option
                                                key={type}
                                                value={type}
                                            >
                                                {type}
                                            </option>

                                        ))}

                                    </select>

                                </div>

                                {/* REQUIRED */}

                                <div>

                                    <label
                                        className="
                                            text-xs
                                            font-bold
                                            text-gray-500
                                            block
                                            mb-2
                                        "
                                    >
                                        Required
                                    </label>

                                    <div
                                        className="
                                            h-[50px]
                                            border
                                            border-gray-200
                                            rounded-2xl
                                            flex
                                            items-center
                                            px-4
                                        "
                                    >

                                        <input
                                            type="checkbox"
                                            checked={field.required}
                                            onChange={(e) =>
                                                updateField(
                                                    index,
                                                    "required",
                                                    e.target.checked
                                                )
                                            }
                                        />

                                    </div>

                                </div>

                            </div>

                            {/* OPTIONS */}

                            {(field.type === "select" ||
                                field.type === "radio") && (

                                <div className="mt-5">

                                    <div className="flex items-center justify-between">

                                        <h3
                                            className="
                                                text-sm
                                                font-bold
                                                text-gray-700
                                            "
                                        >
                                            Options
                                        </h3>

                                        <button
                                            onClick={() =>
                                                addOption(index)
                                            }
                                            className="
                                                text-orange-500
                                                text-sm
                                                font-semibold
                                            "
                                        >
                                            + Add Option
                                        </button>

                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">

                                        {field.options.map(
                                            (
                                                option: string,
                                                optionIndex: number
                                            ) => (

                                                <input
                                                    key={optionIndex}
                                                    type="text"
                                                    placeholder="Option"
                                                    value={option}
                                                    onChange={(e) =>
                                                        updateOption(
                                                            index,
                                                            optionIndex,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="
                                                        border
                                                        border-gray-200
                                                        rounded-2xl
                                                        px-4
                                                        py-3
                                                        outline-none
                                                        focus:border-orange-400
                                                    "
                                                />

                                            )
                                        )}

                                    </div>

                                </div>

                            )}

                        </div>

                    ))}

                </div>

                {/* SAVE */}

                <div className="flex justify-end mt-6">

                    <button
                        onClick={handleSave}
                        className="
                            bg-orange-500
                            hover:bg-orange-600
                            text-white
                            px-6
                            py-3
                            rounded-2xl
                            text-sm
                            font-bold
                            transition-all
                        "
                    >
                        Save Table
                    </button>

                </div>

            </div>

        </div>
    );
}