import React from "react";

interface TabProps {
  id: string;
  activeTab: string;
  children: React.ReactNode;
  onClick: (id: string) => void;
}

const Tab: React.FC<TabProps> = ({ id, activeTab, children, onClick }) => (
  <button
    className={`px-4 py-2 font-semibold ${
      activeTab === id
        ? "text-blue-500 border-b-4 border-blue-500"
        : "text-gray-500"
    }`}
    onClick={() => onClick(id)}
  >
    {children}
  </button>
);

export default Tab;
