import { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Invoice from "./Invoice";

// import "./styles.css";

const Test = () => {
  const inputRef = useRef(null);
  const printDocument = () => {
    html2canvas(inputRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("download.pdf");
    });
  };
  return (
    <div className="flex relative">
        <div className="border" ref={inputRef}>
          {/* <Invoice /> */}
        </div>

        <div className="mt-[100px]">
          <button className="bg-red-500 rounded px-2 text-white font-bold font-poppins ml-3" onClick={printDocument}>Print PDF!</button>
          <hr />
        </div>
    </div>
  );
};
export default Test;