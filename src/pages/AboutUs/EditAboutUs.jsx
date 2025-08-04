import { fileUrl, useFETCH, usePOST } from "../../APIs/useMyAPI";
import { Col, Row } from "../../Grid-system";
import AddImage from "../../Tools/AddFile";
import Loading from "../../Tools/Loading";
import { Back, ButtonRed } from "../../components";

const EditAboutUs = () => {
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

  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit(`admin/about-us/images`);
  };
  return (
    <div>
      <Row justify={"center"}>
        <Col md={7} className="">
          <AddImage
            name="image"
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

export default EditAboutUs;
