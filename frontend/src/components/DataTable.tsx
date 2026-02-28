import React from 'react';

interface Props {
    title: string;
    headers: string[];
    data: any[];
    renderRow: (item: any) => React.ReactNode;
    onAdd: () => void;
}

export const DataTable: React.FC<Props> = ({ title, headers, data, renderRow, onAdd }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <button onClick={onAdd} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
                + Add {title.slice(0, -1)}
            </button>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {headers.map(h => <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>)}
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.length > 0 ? data.map(renderRow) : (
                        <tr><td colSpan={headers.length + 1} className="px-6 py-10 text-center text-gray-400">No data found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);