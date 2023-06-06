import Image from "next/image";
import React from "react";
import { FaReact, FaNodeJs, FaVuejs, FaAngular } from "react-icons/fa";

interface MyData {
  column1: string;
  column2: string;
  column3: string;
}

interface CardProps {
  data: MyData[];
}

const icons = [
  <FaReact key="FaReact" />,
  <FaNodeJs key="FaNodeJs" />,
  <FaVuejs key="FaVuejs" />,
  <FaAngular key="FaAngular" />,
];

const CardComponent: React.FC<CardProps> = ({ data }) => {
  return (
    <div className="text-sm bg-[#1a2c38] px-4 rounded-xl">
      {data.map((item, index) => (
        <div key={index} className="flex justify-between p-2 ">
          <div className="w-1/3 text-center flex flex-row justify-center items-center">
            <div className="mr-2">
              {React.cloneElement(
                icons[Math.floor(Math.random() * icons.length)],
                { key: index + item.column1 }
              )}
            </div>
            <div>{item.column1}</div>
          </div>
          <div className="w-1/3 text-center">{item.column2}</div>
          <div className="w-1/3 text-left text-[#00e701] flex flex-row">
            <div className="mr-2">
              <Image src={"/love.svg"} alt="icon" width={20} height={20} />
            </div>
            <div>{item.column3}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardComponent;
