// import search from "../../images/Icon feather-search.png";
import { CardBox, Title } from "../../components";
import { Col, Row } from "../../Grid-system";
import { useFETCH, useFilter } from "../../APIs/useMyAPI";
import Pagination from "../../Tools/Pagination";
import { useLocation } from "react-router-dom";

const Notifications = () => {
  const { search } = useLocation();
  const { data, isLoading, deleteItem } = useFETCH(
    `admin/notifications${search}`,
    "admin/notifications"
  );

  return (
    <div>
      <Title title="Notifications" />

      <Pagination
        loading={isLoading}
        pageCount={Math.ceil(data?.data.data.total / data?.data.data.per_page)}
      >
        <Row justify="center">
          {data?.data.data.data.map((e, i) => (
            <Col md={4} key={i}>
              <CardBox deleteClick={() => deleteItem(e)} showEdit={true}>
                <div className="text-xl text-center text-Purple font-semibold -mt-3">
                  {e.title}
                </div>
                <div className="mb-3 text-center">{e.description}</div>
                <div className="flex gap-2 mb-2">
                  <div className="font-semibold text-Pink">Date : </div>
                  <div className="">{e.date}</div>
                </div>
                <div className="flex gap-2 mb-2">
                  <div className="font-semibold text-Pink"> Time : </div>
                  <div className="">{e.time}</div>
                </div>
              </CardBox>
            </Col>
          ))}
        </Row>
      </Pagination>
    </div>
  );
};

export default Notifications;
