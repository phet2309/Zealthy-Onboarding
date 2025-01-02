import { AdminConfig } from "../types";

// This component displays the admin config table on Data page
const AdminConfigTable: React.FC<{ data: AdminConfig[] }> = ({ data }) => {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Admin Config Table</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Page Number</th>
                            <th className="border border-gray-300 px-4 py-2">Component Name</th>
                            <th className="border border-gray-300 px-4 py-2">Created At</th>
                            <th className="border border-gray-300 px-4 py-2">Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((config) => (
                            <tr key={config.id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2">{config.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{config.pageNumber}</td>
                                <td className="border border-gray-300 px-4 py-2">{config.componentName}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {config.createdAt ? new Date(config.createdAt).toLocaleString() : 'N/A'}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {config.updatedAt ? new Date(config.updatedAt).toLocaleString() : 'N/A'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminConfigTable;