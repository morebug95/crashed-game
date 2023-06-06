import React from "react";

interface TableProps {
  data: { [key: string]: string | number }[];
}

const TableComponent: React.FC<TableProps> = ({ data }) => {
  const columns = Object.keys(data[0]);

  return (
    <table className="min-w-max w-full table-auto">
      <thead>
        <tr className=" text-gray-600 uppercase text-sm leading-normal">
          {columns.map((column, index) => (
            <th key={index} className="py-3 px-6 text-left">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="border-b border-gray-200 hover:bg-gray-100"
          >
            {columns.map((column, columnIndex) => (
              <td
                key={columnIndex}
                className="py-3 px-6 text-left whitespace-nowrap"
              >
                {row[column]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
