import { ButtonRed, CardBox, CardImg, Title } from "../../components";
import { Col, Row } from "../../Grid-system";
import { localFileUrl, useFETCH } from "../../APIs/useMyAPI";
import Loading from "../../Tools/Loading";

const AboutUs = () => {
  const { data, isLoading, deleteItem } = useFETCH(
    "admin/about-us/info",
    "admin/about-us/images"
  );
  return (
    <div className="py-5">
      <Title title="About us" />
      {isLoading ? <Loading /> : ""}
      <Row>
        <Col md={6} className="mx-auto">
          <CardBox showDelete edit="/About-Us/edit">
            {data?.data.data.about_us_text}
          </CardBox>
        </Col>
      </Row>
      <Row>
        {data?.data.data.about_us_images && data?.data.data.about_us_images.map((e) => (
          <Col lg={3} md={4} xs={6} key={e.id}>
            <CardBox deleteClick={() => deleteItem(e)}>
              <img
                src={localFileUrl + e.image}
                alt=""
                className="w-[250px] h-[250px] object-contain"
              />
            </CardBox>
          </Col>
        ))}
      </Row>
      <div className="fixed bottom-10 right-10">
        <ButtonRed
          link="/About-Us/add"
          name="add image"
          className="px-7 py-2"
        />
      </div>
    </div>
  );
};

export default AboutUs;
