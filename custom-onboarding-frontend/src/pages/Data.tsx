import React, { useEffect, useState } from "react";
import AdminConfigTable from "../components/AdminConfigTable";
import UserDataTable from "../components/UserDataTable";
import { AdminConfig, UserData } from "../types";
import { fetchUsers } from "../api/userApi";
import { fetchAdminConfig } from "../api/adminApi";
import { toast } from "react-toastify";

const Data: React.FC = () => {
    const [adminConfigData, setAdminConfigData] = useState<AdminConfig[]>([]);
    const [userData, setUserData] = useState<UserData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            let adminConfigResponse = await fetchAdminConfig();
            let userResponse = await fetchUsers();

            // Checks if the response is a string and throws an error
            if (typeof adminConfigResponse === 'string') {
                throw new Error(adminConfigResponse);
            }
        
            // Checks if the response is a string and throws an error
            if (typeof userResponse === 'string') {
                throw new Error(userResponse);
            }
            
            setAdminConfigData(adminConfigResponse);
            setUserData(userResponse);
        } catch (err) {
            toast.error((err as Error).message);
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <button
                className="min-w-[100px] mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={fetchData}
                disabled={loading}
            >
                {loading ? "Refreshing..." : "Refresh Data"}
            </button>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <AdminConfigTable data={adminConfigData} />
            <UserDataTable data={userData} />
        </div>
    );
};

export default Data;