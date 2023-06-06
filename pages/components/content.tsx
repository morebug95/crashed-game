import { useState } from "react";
import Tab from "./tab";

const TabComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <div className="flex border-b bg-white rounded-full w-[500px] justify-center mb-4">
      <Tab id="1" activeTab={activeTab} onClick={setActiveTab}>
        My Bets
      </Tab>
      <Tab id="2" activeTab={activeTab} onClick={setActiveTab}>
        All Bets
      </Tab>
      <Tab id="3" activeTab={activeTab} onClick={setActiveTab}>
        High Rollers
      </Tab>
    </div>
  );
};

export default TabComponent;
