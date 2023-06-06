import TabComponent from "./components/content";
import CrashGame from "./components/crashchart";
import TableComponent from "./components/table";

const Home = () => {
  const data = [
    {
      "Column 1": "Row 1 Value 1",
      "Column 2": "Row 1 Value 2",
      "Column 3": "Row 1 Value 3",
      "Column 4": "Row 1 Value 4",
      "Column 5": "Row 1 Value 5",
      "Column 6": "Row 1 Value 6",
    },
    {
      "Column 1": "Row 2 Value 1",
      "Column 2": "Row 2 Value 2",
      "Column 3": "Row 2 Value 3",
      "Column 4": "Row 2 Value 4",
      "Column 5": "Row 2 Value 5",
      "Column 6": "Row 2 Value 6",
    },
    // Add more rows as necessary
  ];
  return (
    <div className="w-[1300px]">
      <CrashGame />
      <div className="my-[30px]">
        <TabComponent />
        <TableComponent data={data} />
      </div>
    </div>
  );
};

export default Home;
