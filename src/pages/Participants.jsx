import React, { useCallback, useEffect } from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from "@syncfusion/ej2-react-grids";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { participantsGrid } from "../data/dummy";
import { Header } from "../components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import participantAtom from "../atoms/participants/participant.atom";
import { handleGetAllParticipants } from "../actions/participants";

const customToolbarTemplate = (props) => {
  // console.log(props);
  return (
    <div className="flex gap-3 px-3">
      <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
        <FaEye size={15} />
      </button>
      <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
        <AiFillEdit size={15} />
      </button>
      <button className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600">
        <RiDeleteBin6Fill size={15} />
      </button>
    </div>
  );
};

const Participants = () => {
  const participantsData = useRecoilValue(participantAtom);
  const toolbarOptions = ["Search"];

  const editing = { allowDeleting: true, allowEditing: true };

  const setParticipants = useSetRecoilState(participantAtom);

  const fetchParticipants = useCallback(async () => {
    const response = await handleGetAllParticipants({ page: 1, size: 20 });
    const data = response.data;
    setParticipants({ ...participantsData, participants: data });
  }, [handleGetAllParticipants]);

  useEffect(() => {
    fetchParticipants();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Participants" />
      <div className="w-fit ">
        <GridComponent
          dataSource={participantsData.participants}
          width="auto"
          allowSorting
          pageSettings={{ pageSize: 10 }}
          editSettings={editing}
          toolbar={toolbarOptions}
          // load={true}
        >
          <ColumnsDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {participantsGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
            <ColumnDirective
              headerText="Actions"
              width="150"
              template={customToolbarTemplate}
              textAlign="Center"
            />
          </ColumnsDirective>
          <Inject services={[Search, Page]} />
        </GridComponent>
        <div className="w-full flex justify-between items-center p-2"></div>
      </div>
    </div>
  );
};
export default Participants;
