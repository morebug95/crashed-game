import React from "react";
import Image from "next/image";
interface TableProps {
  data: { [key: string]: string | number }[];
}

const TableComponent: React.FC<TableProps> = ({ data }) => {
  const columns = Object.keys(data[0]);

  return (
    <table className="min-w-max w-full table-auto">
      <thead>
        <tr className="text-gray-400 uppercase text-sm leading-normal">
          {columns.map((column, index) => (
            <th key={index} className="py-3 px-6 text-left">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-gray-300 text-sm font-light">
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={rowIndex % 2 === 0 ? "bg-[#213743]" : ""}
          >
            {columns.map((column, columnIndex) => (
              <td
                key={columnIndex}
                className={`py-3 px-6 text-left whitespace-nowrap ${
                  columnIndex === 5 ? "text-[#00e701]" : "text-white"
                }`}
              >
                <div className="flex flex-row">
                  <div>{row[column]}</div>
                  {columnIndex === 4 ? (
                    <div className="ml-1">
                      <Image
                        src={"/love.svg"}
                        alt="icon"
                        width={20}
                        height={20}
                      />
                    </div>
                  ) : null}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
