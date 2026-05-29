import { useEffect, useState } from "react";
import * as tablesService from "../services/tables";

export const useTables = (workspaceId = '', tableId = '') => {
    const [tables, setTables] = useState<any[]>([]);
    const [table, setTable] = useState<any | null>(null);
    const [tableLoading, setTableLoading] = useState<boolean>(false);

    // CREATE TABLE
    const createTable = async (table: any) => {
        setTableLoading(true);
        try {
            const response = await tablesService.createTable(table);
            return response;
        }
        catch (error) {
            console.error("Error in createTable:", error);
            return error;
        }
        finally {
            setTableLoading(false);
        }
    }
    // GET ALL TABLES
    const getAllTables = async () => {
        setTableLoading(true);
        try {
            const response = await tablesService.getAllTables(workspaceId);
            setTables(response?.data ?? []);
            return response;
        }
        catch (error) {
            console.error("Error in getAllTables:", error);
            return error;
        }
        finally {
            setTableLoading(false);
        }
    }
    // GET SINGLE TABLE
    const getSingleTable = async (id: string) => {
        setTableLoading(true);
        try {
            const response = await tablesService.getSingleTable(id);
            setTable(response?.data ?? null);
            return response;
        }
        catch (error) {
            console.error("Error in getSingleTable:", error);
            return error;
        }
        finally {
            setTableLoading(false);
        }
    }
    // UPDATE TABLE
    const updateTable = async (id: string, table: any) => {
        setTableLoading(true);
        try {
            const response = await tablesService.updateTable(id, table);
            if(response.success) {
                await getAllTables();
            }
            return response;
        }
        catch (error) {
            console.error("Error in updateTable:", error);
            return error;
        }
        finally {
            setTableLoading(false);
        }
    }
    // DELETE TABLE
    const deleteTable = async (id: string) => {
        setTableLoading(true);
        try {
            const response = await tablesService.deleteTable(id);
            if(response.success) {
                await getAllTables();
            }
            return response;
        }
        catch (error) {
            console.error("Error in deleteTable:", error);
            return error;
        }
        finally {
            setTableLoading(false);
        }
    }

    useEffect(() => {
        const fetchTables = async () => {
            if (workspaceId) {
                await getAllTables();
            }
        }
        fetchTables();
    }, [workspaceId]);

    useEffect(() => {
        if (tableId) {
            getSingleTable(tableId as string);
        }
    }, [tableId]);

    const refreshTables = async () => {
        await getAllTables();
    }

    return {
        tables,
        table,
        tableLoading,
        createTable,
        getAllTables,
        getSingleTable,
        updateTable,
        deleteTable,
        refreshTables,
    }
}