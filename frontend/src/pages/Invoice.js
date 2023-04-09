import React, { useEffect, useState, useRef } from "react";
import Api from "../Api";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";

const Invoice = () => {
  const params = useLocation()
  const [data, setData] = useState("");
  const [afterFilter, setAfterFilter] = useState("");
  const [users, setUsers] = useState("")
  const [durasi, setDurasi] = useState()


  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const [today, setToday] = useState(new Date().toLocaleDateString('id-ID', options));

  const inputRef = useRef(null);
  
  const printDocument = () => {
    html2canvas(inputRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("download.pdf");
    });
  };

  const getData = async () => {
    try {
      if (!params.state.startDate || !params.state.endDate) {
        const response = await Api.getTask();
        setData(response.data.response);
        // console.log(response.data)
      } else {
        const filter = await Api.getFilterTask(params.state.startDate, params.state.endDate);
        setAfterFilter(filter.data.response);
        // console.log(filter.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDurasi = async () => {
    try{
        const response = await Api.getTask()
        setDurasi(response.data.durasiTotal)
        console.log(response.data.durasiTotal)
    } catch (error) {
        console.log(error)
    }
    
}

  const getName = async () =>{
    try{
      const getData = await Api.Me()
      const response = await Api.User(getData.data.uuid)
      setUsers(response)
      console.log(getData.data)
    }
    catch (error) {
      console.log(error)
    }
  }


  function formatDateString(dateString) {
    const dateObj = new Date(dateString);
    const date = dateObj.toISOString().slice(0, 10);
    const time = dateObj.toISOString().slice(11, 16);
    return `${date}  ${time}`;
  }

  useEffect(() => {
    getData();
    getName();
    getDurasi()
  }, []);

  return (
    <div className="flex relative">
      <div className="" ref={inputRef}>
        <div className="container ml-5 font-poppins w-[595px] h-[842px]">
          <div className="pt-[40px] flex items-center justify-center mb-[30px]">
            <h1 className="text-[24px] font-bold">My Task</h1>
            <div className="ml-[85px] text-[20px]">
              <h2 className="font-bold">
                Team Member Daily Report
              </h2>
              <h2 className="font-medium">
                Hartsimagineering Project Logs
              </h2>
            </div>
          </div>
          <div className="mt-[16px]">
            <div className="flex text-[15px] font-medium gap-1">
              <h1 className="">Name: </h1>
              {Object.values(users).map((item) => (
                <>
                  <h1>
                    {item.name}
                  </h1>
                </>
              ))}
            </div>
            <h1 className="text-[15px] font-medium mb-[30px]">{
            }
              Date: <span>{params.state.startDate} until {params.state.endDate}</span>
            </h1>
            <div class="relative overflow-x-auto pr-2">
              <table class="w-full text-xs text-left text-gray-500 dark:text-gray-400 mb-[31px]">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="p-3 py-3">
                      No.
                    </th>
                    <th scope="col" class="px-6 py-3 w-2/4">
                      Date & Time
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Project
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Description
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Duration
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {!params.state.startDate && !params.state.endDate
                    ? Object.values(data).map((item, idx) => (
                        <tr
                          key={item.id}
                          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            class="px-3 py-4 font-medium text-gray-900  dark:text-white"
                          >
                            {idx + 1}
                          </th>
                          <td class="px-6 py-4">
                            <div>
                              <h1>{formatDateString(item.start)}</h1>
                              <h1>{formatDateString(item.end)}</h1>
                            </div>
                          </td>
                          <td class="px-6 py-4">{item.project}</td>
                          <td class="px-6 py-4">{item.taskDescription}</td>
                          <td class="px-6 py-4">
                            {item.durasi}
                          </td>
                        </tr>
                      ))
                    : 
                    
                    Object.values(afterFilter).map((item, idx) => (
                        <tr key={item.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-3 py-4 font-medium text-gray-900  dark:text-white">{idx + 1}</th>
                          <td class="px-6 py-4">
                              <h1>{formatDateString(item.start)}</h1>
                              <h1>{formatDateString(item.end)}</h1>
                          </td>
                          <td class="px-6 py-4">{item.project}</td>
                          <td class="px-6 py-4">{item.taskDescription}</td>
                          <td class="px-6 py-4">{item.durasi}</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* <div className="pr-4">
            <div className="flex relative text-[16px] font-medium mt-[16px]">
              <h1>Total Work Duration</h1>
              <h1 className="absolute right-0">{durasi}</h1>
            </div>
            <div className="flex relative text-[16px] font-medium mt-[16px]">
              <div>
                <h1>Total Work Duration</h1>
                <h2>IIK SHOP</h2>
              </div>
              <h1 className="absolute right-0">{durasi}</h1>
            </div>
            <div className="flex relative text-[16px] font-medium mt-[16px]">
              <div>
                <h1>Work Duration Client</h1>
                <h2>Yayasan Bhaktiwiyata</h2>
              </div>
              <h1 className="absolute right-0">{durasi}</h1>
            </div>
          </div> */}

          <h1 className="mt-[16px] font-medium">
          <div className="flex text-[15px] font-medium gap-1">
              <h1 className="">Dicetak oleh: </h1>
                {Object.values(users).map((item) => (
                  <>
                    <h1>
                      {item.name}
                    </h1>
                  </>
                ))}
            </div>
            <h1 className="text-[15px]">pada {today} </h1>
          </h1>
        </div>
      </div>

      <div className="mt-[100px]">
        <button
          className="bg-red-500 rounded px-2 text-white font-bold font-poppins ml-3"
          onClick={printDocument}
        >
          Export PDF! 
        </button>
        <hr />
      </div>
    </div>
  );
};

export default Invoice;
