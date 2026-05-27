export const WORKSPACES_RESPONSE = {
    success: true,
    message: "Workspaces fetched successfully",

    data: [
        {
            id: "ws_alpha",
            name: "Alpha",
            description: "Sales management workspace",
            total_tables: 4,
            total_members: 12,

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
                    name: "Indian Sales",
                    description: "Manage indian sales records",

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
                    name: "Customer Support",
                    description: "Track customer issues",

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
            total_tables: 2,
            total_members: 5,

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