import { Add, CardBox, Title } from "../../../components";
import { Col, Row } from "../../../Grid-system";
import { localFileUrl, useFETCH } from "../../../APIs/useMyAPI";
import Loading from "../../../Tools/Loading";
import { Link } from "react-router-dom";

const ImageSlider = () => {
  const { data, deleteItem, isLoading } = useFETCH(`admin/slider/images`);
  return (
    <div>
      <Title title="Images" />
      {isLoading ? <Loading /> : ""}
      <Row>
        {data?.data.data.map((e) => (
          <Col lg={3} md={4} xs={6} key={e.id}>
            <CardBox deleteClick={() => deleteItem(e)}>
              <img
                src={localFileUrl + e.image}
                alt=""
                className="w-full h-[250px] object-contain"
              />
            </CardBox>
          </Col>
        ))}
      </Row>
      <Link to="/home/add-image-slider">
        <Add />
      </Link>
    </div>
  );
};

export default ImageSlider;
