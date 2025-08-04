import { useLocation } from "react-router-dom";
import { fileUrl, useFETCH } from "../../APIs/useMyAPI";
import { Col, Row } from "../../Grid-system";
import Loading from "../../Tools/Loading";

import {
  Add,
  ButtonRed,
  CardPro,
  FilterProducts,
  FilterSearch,
  ApiLogo,
  Title,
} from "../../components";

const Products = () => {
  const { search } = useLocation();
  const { data, isLoading, deleteItem } = useFETCH(
    `admin/products${search}`,
    "admin/products"
  );
  return (
    <div>
      <Row className="" justify={"between"}>
        <Col md={4}>
          <Title title="Products" />
        </Col>
        <Col md={6} className={"flex justify-end"}>
          <FilterSearch />
        </Col>
      </Row>
      <FilterProducts />
      {isLoading ? <Loading /> : ""}

      <Row justify={"start"}>
        {data?.data.data.map((e) => (
          <Col lg={24} md={3} xs={6} key={e.id} className="">
            <CardPro
              showDelete={e.pkey === "FREE_FIRE"}
              deleteClick={() => deleteItem(e)}
              show={`/Products/Product-${e.number}/view/${e.id}`}
              edit={`/Products/Product-${e.number}/${e.id}`}
              // showHideOnMobile = {e}
            >
              <img
                src={fileUrl + e.images[0]?.image}
                alt=""
                className="w-full h-[107px]"
              />
              <h1 className="text-center text-Pink font-bold text-xl">
                {e.name.en}
              </h1>
              <div className="text-center align-middle flex justify-center">
              <ApiLogo data={e?.automated} className="w-6" />
              </div>
             
              
              <h1 className="text-center text-Pink font-bold text-xl">
                {e.number === 1
                  ? "product one"
                  : e.number === 2
                  ? "product two"
                  : e.number === 3
                  ? "product three"
                  : e.number === 4
                  ? "product four"
                  : e.number === 5
                  ? "product five"
                  : e.number === 5
                  ? "Api Products"
                  : ""}
              </h1>
            </CardPro>
          </Col>
        ))}
      </Row>

      <Add>
        <div className="flex flex-col">
          <ButtonRed
            className="py-2 m-1 px-4"
            name="Product one"
            link="/Products/Product-1/add"
          />
          <ButtonRed
            className="py-2 m-1 px-4"
            name="Product two"
            link="/Products/Product-2/add"
          />
          <ButtonRed
            className="py-2 m-1 px-4"
            name="Product three"
            link="/Products/Product-3/add"
          />
          <ButtonRed
            className="py-2 m-1 px-4"
            name="Product four"
            link="/Products/Product-4/add"
          />
          <ButtonRed
            className="py-2 m-1 px-4"
            name="Product five"
            link="/Products/Product-5/add"
          />
          <ButtonRed
            className="py-2 m-1 px-4"
            name="API Products"
            link="/Products/Product-6/add"
          />
            <ButtonRed
            className="py-2 m-1 px-4"
            name="Group Products"
            link="/Products/Product-7/add"
          />
        </div>
      </Add>
    </div>
  );
};

export default Products;
