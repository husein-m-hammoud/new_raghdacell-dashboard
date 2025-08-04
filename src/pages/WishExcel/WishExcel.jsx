import React, { useState } from "react";
import { BiShow } from "react-icons/bi";
import { MdDownload } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { baseUrl } from "../../APIs/useMyAPI";
import {
  clickZoomInImage,
  fileUrl,
  useFETCH,
  useFilter,
  usePOST,
} from "../../APIs/useMyAPI";
import { Col, Row } from "../../Grid-system";
import Pagination from "../../Tools/Pagination";
import {
  AcceptBtn,
  Buttons,
  CancelBtn,
  Currency,
  DeleteTable,
  FilterOrderStataus,
  FilterProcess,
  FilterSearch,
  Title,
  UploadModal,
} from "../../components";
import code from "../../images/istockphoto-1136155337-612x612.jpg";
import { CurrencyFilter } from "../Users/WalletUser";

const WishExcel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const { handleParamsClick, searchParams } = useFilter();
  const { search } = useLocation();
  const { handleSubmit, error, loading, handleChangeInput } = usePOST({});
  const { data, isLoading, reCallUrl } = useFETCH("admin/wish-imports");
  const { data: balance } = useFETCH("admin/wish-imports/balance");


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };
  console.log({balance});

  const handleDownload = (filename) => {
    const link = document.createElement("a");
    link.href = `${fileUrl}${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  //   const handleDownload = async (filename) => {
  //     let url =  `${fileUrl}${filename}`;;
  //     const response = await fetch(url);
  //     const blob = await response.blob();
  //     const link = document.createElement('a');
  //     link.href = window.URL.createObjectURL(blob);
  //     link.download = 'your-file-name';
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  // };

  const handleSubmitFile = () => {
    handleSubmit("admin/wish-imports/import", null, true);
    closeModal();
  };

  return (
    <div>
      <Row className="" justify={"between"}>
        <Col 
          onClick={openModal}
          col={4}
          className={`border flex justify-between cursor-pointer flex-col border-Purple  p-1 text-center  rounded-2xl font-semibold ${
            searchParams.get("process") === "PROMO_CODE"
              ? "shadow-lg shadow-Pink"
              : ""
          }`}
        >
          <h6 className="max-sm:text-[16px]">Upload File</h6>
        </Col>
        <Col col={8} className="text-right font-semibold">
    Balance: {balance?.data?.balance}$
    </Col>
      </Row>

      <Pagination
        loading={isLoading}
        pageCount={Math.ceil(data?.data.total / data?.data.per_page)}
      >
        <Row>
          <Col>
            <div className=" ">
              <table className="w-full mx-auto my-5 text-center rounded-2xl overflow-hidden border-2 border-Pink">
                <thead className="bg-Pink text-white h-[70px]">
                  <tr>
                    <td>File Name</td>
                    <td>Number of Rows</td>
                    <td>Rows Added</td>
                    <td>Rows Updated</td>
                    
                  </tr>
                </thead>
                <tbody className=" align-middle">
                  {data?.data?.data?.map((e, i) => (
                    <tr key={e?.id} className="border border-Pink  ">
                      <td className=" justify-center align-middle flex gap-2 mt-2">
                        {e.file_name}{" "}
                        <MdDownload
                          className="cursor-pointer"
                          size={20}
                          onClick={() => handleDownload(e.file_name)}
                        />
                      </td>
                      <td className="text-green-600 font-semibold py-7">
                        {JSON.parse(e?.details)?.number_of_rows}
                      </td>
                      <td className="text-green-600 font-semibold py-7">
                        {JSON.parse(e?.details)?.rows_added}
                      </td>
                      <td className="text-green-600 font-semibold py-7">
                        {JSON.parse(e?.details)?.rows_updated}
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Pagination>

      <UploadModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onFileChange={handleChangeInput}
        onSubmit={handleSubmitFile}
      />
    </div>
  );
};

export default WishExcel;
