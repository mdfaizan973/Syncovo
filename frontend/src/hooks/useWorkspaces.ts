import { useEffect, useState } from "react";
import * as workspacesService from "../services/workspaces";

export const useWorkspaces = (loadAllWorkspaces = true) => {
    const [workspaces, setWorkspaces] = useState<any[]>([]);
    const [workspace, setWorkspace] = useState<any | null>(null);
    const [workspaceLoading, setWorkspaceLoading] = useState<boolean>(false);

    // POST WORKSPACE
    const createWorkspace = async (workspace: any) => {
        setWorkspaceLoading(true);
        try {
            const response = await workspacesService.postWorkspace(workspace);
            if (response.success) {
                await getAllWorkspaces();
            }
            return response;
        } catch (error) {
            console.error("Error in createWorkspace:", error);
            return error;
        } finally {
            setWorkspaceLoading(false);
        }
    }
    // GET ALL WORKSPACES
    const getAllWorkspaces = async () => {
        setWorkspaceLoading(true);
        try {
            const response = await workspacesService.getAllWorkspaces();
            setWorkspaces(response?.data ?? []);
            return response;
        } catch (error) {
            console.error("Error in getAllWorkspaces:", error);
            return error;
        } finally {
            setWorkspaceLoading(false);
        }
    }
    // GET SINGLE WORKSPACE
    const getSingleWorkspace = async (id: string) => {
        setWorkspaceLoading(true);
        try {
            const response = await workspacesService.getSingleWorkspace(id);
            setWorkspace(response?.data ?? null);
        } catch (error) {
            console.error("Error in getSingleWorkspace:", error);
            return error;
        } finally {
            setWorkspaceLoading(false);
        }
    }
    // UPDATE WORKSPACE
    const updateWorkspace = async (id: string, workspace: any) => { 
        setWorkspaceLoading(true);
        try {
            const response = await workspacesService.updateWorkspace(id, workspace);
            if (response.success) {
                await getAllWorkspaces();
            }
            return response;
        } catch (error) {
            console.error("Error in updateWorkspace:", error);
            return error;
        } finally {
            setWorkspaceLoading(false);
        }
    }
    // DELETE WORKSPACE
    const deleteWorkspace = async (id: string) => {
        setWorkspaceLoading(true);
        try {
            const response = await workspacesService.deleteWorkspace(id);
            if (response.success) {
                await getAllWorkspaces();
            }
            return response;
        } catch (error) {
            console.error("Error in deleteWorkspace:", error);
            return error;
        } finally {
            setWorkspaceLoading(false);
        }
    }
    // REFRESH WORKSPACES
    const refreshWorkspaces = async () => {
        await getAllWorkspaces();
    }

    useEffect(() => {
        const fetchWorkspaces = async () => {
            if (loadAllWorkspaces) {
                await getAllWorkspaces();
            }
        }
        fetchWorkspaces();
    }, [loadAllWorkspaces]);
    return {
        workspaces,
        workspace,
        workspaceLoading,
        createWorkspace,
        getAllWorkspaces,
        getSingleWorkspace,
        updateWorkspace,
        deleteWorkspace,
        refreshWorkspaces,
    }
}