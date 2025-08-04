import { useParams } from "react-router-dom";
import { fileUrl, useFETCH, usePOST } from "../../../APIs/useMyAPI";
import { Col, Row } from "../../../Grid-system";
import { Back, ButtonRed } from "../../../components";
import Loading from "../../../Tools/Loading";
import AddImage from "../../../Tools/AddFile";

const AddImageSlider = () => {
  const {
    handleChangeInput,
    handleSubmit,
    setFormData,
    setViewFile,
    viewFile,
    formData,
    loading,
    error,
  } = usePOST({});
  const { data } = useFETCH(`admin/slider/images`);
  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit(`admin/slider/images`);
  };
  return (
    <div>
      <Row justify={"center"}>
        <Col md={7} className="">
          <AddImage
            name="image"
            oldImage={data?.data.data.image && fileUrl + data?.data.data.image}
            newImage={viewFile}
            onChange={handleChangeInput}
            title="إضف صورة"
            clickDelete={() => {
              setViewFile("");
              setFormData({ ...formData, images: "" });
            }}
          />
          {loading ? <Loading /> : ""}
          <div className="text-red-500 font-semibold">{error}</div>
          <ButtonRed
            name="Add"
            className="px-4 py-3"
            onClick={handleSubmitMain}
          />
        </Col>
      </Row>
      <Back />
    </div>
  );
};

export default AddImageSlider;
