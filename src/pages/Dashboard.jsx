import React, { useCallback, useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa6";
// import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import Participants from "./Participants";
import { earningData, boxIcon } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import {
  handleGetAllParticipants,
  handleGetParticipantStat,
} from "../actions/participants";
// import { useRecoilState } from "recoil";

const Dashboard = () => {
  const { currentColor } = useStateContext();
  const [participants, setParticipants] = useState(null);
  const [participantStat, setParticipantStat] = useState({});
  const [total, setTotal] = useState();

  const fetchParticipants = useCallback(async () => {
    const response = await handleGetAllParticipants({ page: 1, size: 20 });
    setParticipants(response.data);
  }, [handleGetAllParticipants]);

  const fetchParticipantsStat = useCallback(async () => {
    const response = await handleGetParticipantStat();
    const { adults, undergraduates, kiddies, teenagers, total } = response.data;
    setParticipantStat({ kiddies, teenagers, undergraduates, adults });
    setTotal(total);
  }, [handleGetParticipantStat]);

  useEffect(() => {
    fetchParticipants();
    fetchParticipantsStat();
  }, []);

  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl text-black font-bold">{total}</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full p-4"
            >
              <FaUsers />
            </button>
          </div>
          <p className="font-bold text-gray-400 mt-1"> Particpant</p>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {/* {earningData.map((item) => (
            <div
              key={item.title}
              className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-44  p-4 pt-9 rounded-2xl "
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item?.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-bold">{item.amount}</span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))} */}
          {Object.entries(participantStat).map(([key, value]) => {
            return (
              <div
                key={key}
                className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-44 p-4 pt-9 rounded-2xl"
              >
                <button
                  type="button"
                  style={{
                    color: boxIcon[key].iconColor,
                    backgroundColor: boxIcon[key].iconBg,
                  }}
                  className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
                >
                  {boxIcon[key].icon}
                </button>
                <p className="mt-3">
                  <span className="text-lg font-bold">{value}</span>
                </p>
                <p className="text-sm text-gray-400 mt-1">{key}</p>
              </div>
            );
          })}
        </div>
      </div>
      <Participants participantsData={participants} />
    </div>
  );
};

export default Dashboard;
