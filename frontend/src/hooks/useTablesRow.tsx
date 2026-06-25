import * as tableRowsService from "../services/tableRows";
import { useEffect, useState } from "react";

export const useTablesRow = (tableId = '', rowId = '') => {
    const [tableRows, setTableRows] = useState<any[]>([]);
    const [tableRow, setTableRow] = useState<any | null>(null);
    const [tableRowLoading, setTableRowLoading] = useState<boolean>(false);

    // CREATE TABLE ROW
    const createTableRow = async (payload: any) => {
        setTableRowLoading(true);
        try {
            const response = await tableRowsService.createTableRow(payload);
            if (response.success) {
                await getAllTableRows(tableId);
                return response;
            }
        } catch (error) {
            console.error("Error:", error);
            return error;
        } finally {
            setTableRowLoading(false);
        }
    }
    // GET ALL TABLE ROWS
    const getAllTableRows = async (tableId: string) => {
        try {
            const response = await tableRowsService.getAllTableRows(tableId);
            if (response.success) {
                setTableRows(response?.data ?? []);
                return response;
            }
        } catch (error) {
            console.error("Error:", error);
            return error;
        }
    }
    // GET SINGLE TABLE ROW
    const getSingleTableRow = async (rowId: string) => {
        try {
            const response = await tableRowsService.getSingleTableRow(rowId);
            if (response.success) {
                setTableRow(response?.data ?? null);
                return response;
            }
        } catch (error) {
            console.error("Error:", error);
            return error;
        }
    }
    // UPDATE TABLE ROW
    const updateTableRow = async (rowId: string, payload: any) => {
        setTableRowLoading(true);
        try {
            const response = await tableRowsService.updateTableRow(rowId, payload);
            if (response.success) {
                await getAllTableRows(tableId);
                return response;
            }
        } catch (error) {
            console.error("Error:", error);
            return error;
        } finally {
            setTableRowLoading(false);
        }
    }
    // DELETE TABLE ROW
    const deleteTableRow = async (rowId: string) => {
        try {
            const response = await tableRowsService.deleteTableRow(rowId);
            if (response.success) {
                await getAllTableRows(tableId);
                return response;
            }
        } catch (error) {
            console.error("Error:", error);
            return error;
        }
    }
    // REFRESH TABLE ROWS
    const refreshTableRows = async () => {
        await getAllTableRows(tableId);
    }

    useEffect(() => {
        const fetchTableRows = async () => {
            if (tableId) {
                await getAllTableRows(tableId);
            }
        }
        fetchTableRows();
    }, [tableId]);

    useEffect(() => {
        if (rowId) {
            getSingleTableRow(rowId);
        }
    }, [rowId]);

    return {
        tableRows,
        tableRow,
        tableRowLoading,
        refreshTableRows,
        createTableRow,
        updateTableRow,
        deleteTableRow,
    }
}
