export const USERS_RESPONSE = {
    success: true,
    message: "Users fetched successfully",

    data: [
        {
            id: "u_1",
            name: "Faizan",
            email: "faizan.md9735@gmail.com",
            role: "Admin",

            created_workspaces: [
                "ws_alpha",
            ],

            assigned_workspaces: [
                "ws_alpha",
                "ws_beta",
            ],

            created_tables: [
                "tb_1",
                "tb_2",
            ],

            assigned_tables: [
                "tb_1",
                "tb_2",
            ],

            created_forms: [
                "fm_1",
                "fm_2",
            ],

            assigned_forms: [
                "fm_1",
            ],

            total_workspaces: 2,
            total_tables: 2,
            total_forms: 2,
        },

        {
            id: "u_2",
            name: "Aman",
            email: "aman@gmail.com",
            role: "Editor",

            created_workspaces: [],

            assigned_workspaces: [
                "ws_alpha",
            ],

            created_tables: [],

            assigned_tables: [
                "tb_1",
            ],

            created_forms: [],

            assigned_forms: [
                "fm_1",
            ],

            total_workspaces: 1,
            total_tables: 1,
            total_forms: 1,
        },

        {
            id: "u_3",
            name: "Ravi",
            email: "ravi@gmail.com",
            role: "Viewer",

            created_workspaces: [],

            assigned_workspaces: [
                "ws_alpha",
            ],

            created_tables: [],

            assigned_tables: [
                "tb_2",
            ],

            created_forms: [],

            assigned_forms: [],

            total_workspaces: 1,
            total_tables: 1,
            total_forms: 0,
        },
    ],
};

export const FORMS_RESPONSE = {
    success: true,
    message: "Forms fetched successfully",

    data: [
        {
            id: "fm_1",
            workspace_id: "ws_alpha",
            table_id: "tb_1",

            name: "Indian Sales Form",
            description: "Create indian sales entries",

            created_by: "u_1",

            assigned_users: [
                "u_1",
                "u_2",
            ],

            fields: [
                {
                    key: "customer_name",
                    label: "Customer Name",
                    type: "text",
                    required: true,
                },
                {
                    key: "amount",
                    label: "Amount",
                    type: "number",
                    required: true,
                },
                {
                    key: "status",
                    label: "Status",
                    type: "select",
                    required: true,
                    options: [
                        "Pending",
                        "Completed",
                        "Cancelled",
                    ],
                },
            ],

            total_submissions: 2,

            created_at: "2026-05-27",
        },

        {
            id: "fm_2",
            workspace_id: "ws_alpha",
            table_id: "tb_2",

            name: "Support Issue Form",
            description: "Track customer support issues",

            created_by: "u_1",

            assigned_users: [
                "u_1",
            ],

            fields: [
                {
                    key: "customer",
                    label: "Customer",
                    type: "text",
                    required: true,
                },
                {
                    key: "issue",
                    label: "Issue",
                    type: "textarea",
                    required: true,
                },
                {
                    key: "priority",
                    label: "Priority",
                    type: "select",
                    required: true,
                    options: [
                        "Low",
                        "Medium",
                        "High",
                    ],
                },
            ],

            total_submissions: 1,

            created_at: "2026-05-27",
        },
    ],
};


export const WORKSPACES_RESPONSE = {
    success: true,
    message: "Workspaces fetched successfully",

    data: [
        {
            id: "ws_alpha",
            name: "Alpha",
            description: "Sales management workspace",

            created_by: "u_1",

            assigned_users: [
                "u_1",
                "u_2",
                "u_3",
            ],

            total_tables: 2,
            total_forms: 2,
            total_members: 3,

            owner: {
                id: "u_1",
                name: "Faizan",
                email: "faizan.md9735@gmail.com",
            },

            editors: [
                {
                    id: "u_2",
                    name: "Aman",
                    email: "aman@gmail.com",
                },
            ],

            viewers: [
                {
                    id: "u_3",
                    name: "Ravi",
                    email: "ravi@gmail.com",
                },
            ],

            tables: [
                {
                    id: "tb_1",
                    workspace_id: "ws_alpha",

                    name: "Indian Sales",
                    description: "Manage indian sales records",

                    created_by: "u_1",

                    assigned_users: [
                        "u_1",
                        "u_2",
                        "u_3",
                    ],

                    total_forms: 1,

                    owner: {
                        id: "u_1",
                        name: "Faizan",
                        email: "faizan.md9735@gmail.com",
                    },

                    editors: [
                        {
                            id: "u_2",
                            name: "Aman",
                            email: "aman@gmail.com",
                        },
                    ],

                    viewers: [
                        {
                            id: "u_3",
                            name: "Ravi",
                            email: "ravi@gmail.com",
                        },
                    ],

                    schema: [
                        {
                            key: "customer_name",
                            label: "Customer Name",
                            type: "text",
                            required: true,
                        },
                        {
                            key: "amount",
                            label: "Amount",
                            type: "number",
                            required: true,
                        },
                        {
                            key: "status",
                            label: "Status",
                            type: "select",
                            required: true,
                            options: [
                                "Pending",
                                "Completed",
                                "Cancelled",
                            ],
                        },
                    ],

                    rows: [
                        {
                            id: "r1",
                            customer_name: "ABC Pvt Ltd",
                            amount: 45000,
                            status: "Completed",
                            created_at: "2026-05-27",
                        },
                        {
                            id: "r2",
                            customer_name: "XYZ Pvt Ltd",
                            amount: 22000,
                            status: "Pending",
                            created_at: "2026-05-27",
                        },
                    ],
                },

                {
                    id: "tb_2",
                    workspace_id: "ws_alpha",

                    name: "Customer Support",
                    description: "Track customer issues",

                    created_by: "u_1",

                    assigned_users: [
                        "u_1",
                    ],

                    total_forms: 1,

                    owner: {
                        id: "u_1",
                        name: "Faizan",
                        email: "faizan.md9735@gmail.com",
                    },

                    editors: [],

                    viewers: [],

                    schema: [
                        {
                            key: "customer",
                            label: "Customer",
                            type: "text",
                            required: true,
                        },
                        {
                            key: "issue",
                            label: "Issue",
                            type: "textarea",
                            required: true,
                        },
                        {
                            key: "priority",
                            label: "Priority",
                            type: "select",
                            required: true,
                            options: [
                                "Low",
                                "Medium",
                                "High",
                            ],
                        },
                    ],

                    rows: [
                        {
                            id: "r1",
                            customer: "Airtel",
                            issue: "Login problem",
                            priority: "High",
                        },
                    ],
                },
            ],
        },

        {
            id: "ws_beta",
            name: "Beta",
            description: "Marketing workspace",

            created_by: "u_4",

            assigned_users: [
                "u_4",
            ],

            total_tables: 0,
            total_forms: 0,
            total_members: 1,

            owner: {
                id: "u_4",
                name: "Neha",
                email: "neha@gmail.com",
            },

            editors: [],

            viewers: [],

            tables: [],
        },
    ],
};