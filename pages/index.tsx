import Image from "next/image";
import TabComponent from "./components/content";
import CrashGame from "./components/crashchart";
import CardComponent from "./components/side";
import TableComponent from "./components/table";
import { sideData } from "../utils/data";
import { FaUser } from "react-icons/fa";

const Home = () => {
  const data = [
    {
      Game: "Row 1 Value 1",
      User: "Row 1 Value 2",
      Time: "Row 1 Value 3",
      "Bet Amount": "Row 1 Value 4",
      Multiplier: "Row 1 Value 5",
      Payout: "Row 1 Value 6",
    },
    {
      Game: "Row 1 Value 1",
      User: "Row 1 Value 2",
      Time: "Row 1 Value 3",
      "Bet Amount": "Row 1 Value 4",
      Multiplier: "Row 1 Value 5",
      Payout: "Row 1 Value 6",
    },
    {
      Game: "Row 1 Value 1",
      User: "Row 1 Value 2",
      Time: "Row 1 Value 3",
      "Bet Amount": "Row 1 Value 4",
      Multiplier: "Row 1 Value 5",
      Payout: "Row 1 Value 6",
    },
  ];

  return (
    <div className="flex flex-row justify-center">
      <div className="w-[1300px]">
        <div className="px-[40px]">
          <CrashGame />
        </div>

        <div className="mt-[60px] flex flex-col items-end px-[40px]">
          <TabComponent />
          <TableComponent data={data} />
        </div>
      </div>
      <div className="w-[400px] h-[100vh] overflow-auto">
        <div className="flex flex-row justify-between items-center mb-4 mt-4">
          <div className="flex flex-row items-center">
            <FaUser />
            <div className="text-sm ml-2">100 User</div>
          </div>
          <div className="flex flex-row text-sm">
            <div className="mr-2">
              <Image src={"/love.svg"} alt="icon" width={20} height={20} />
            </div>
            <div className="text-[#00e701]">8098098080908</div>
          </div>
        </div>
        <CardComponent data={sideData} />
      </div>
    </div>
  );
};

export default Home;
