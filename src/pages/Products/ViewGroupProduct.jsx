import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { fileUrl, useFETCH,fetchData } from "../../APIs/useMyAPI";
import { Col, Row } from "../../Grid-system";
import Loading from "../../Tools/Loading";
import Pagination from "../../Tools/Pagination";
import AddToGroupModal from "../../components/Modal/AddToGroupModal";
import { Back, Buttons, CardBox ,CardPro,ButtonRed} from "../../components";

const ViewGroupProduct = () => {
  const { search } = useLocation();
  const [showModal, setShowModal] = React.useState(false);
  
  const handleShowModal = () => setShowModal(true);
  const { id } = useParams();
  const { data, isLoading } = useFETCH(`admin/products/${id}`);
  const { data: groups, isLoading: isLoadingGroup } = useFETCH(
    `admin/products/by-group/${id}`
  );

  const dataAll = data?.data.data;
  let products = groups?.data?.data?.products || [];
  console.log({products});

  const removeFromGroup = async (productId) => {
    const url = `admin/products/remove-from-group/${id}`;
    const res = await fetchData(url, { product_id: productId });
    if (res) {
      window.location.reload();
    }
  }
  return (
    <>
      <Row justify="center">
        {isLoading ? <Loading /> : ""}
        <Col md={9}>
          <div className="border border-Pink rounded-2xl p-5">
            <Row justify="center" className="items-center">
              <Col lg={6}>
                <img
                  src={fileUrl + dataAll?.images[0]?.image}
                  alt=""
                  className="rounded-2xl mx-auto "
                />
              </Col>
              <Col lg={6}>
                <div className="flex gap-2 ">
                  <div className="font-semibold text-Pink">English Name :</div>
                  <div>{dataAll?.name.en}</div>
                </div>
                <div className="flex gap-2 ">
                  <div className="font-semibold text-Pink">Arabic Name :</div>
                  <div>{dataAll?.name.ar}</div>
                </div>
                <div className="flex gap-2  ">
                  <div className="font-semibold text-Pink">Available:</div>
                  <div
                    className={
                      dataAll?.available ? "text-green-600" : "text-red-700"
                    }
                  >
                    {dataAll?.available ? "Yes" : "NO"}{" "}
                  </div>
                </div>
                <div className="flex gap-2  ">
                  <div className="font-semibold text-Pink">
                    Force Available:
                  </div>
                  <div
                    className={
                      dataAll?.force_unavailable
                        ? "text-red-700"
                        : "text-green-600"
                    }
                  >
                    {dataAll?.force_unavailable ? "NO" : "Yes"}{" "}
                  </div>
                  <Buttons
                    name="Add To Group"
                    onClick={()=>handleShowModal()}
                    className="bg-green-600 text-white w-fit ml-auto mr-4 -mt-4 mb-2 px-3"
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <AddToGroupModal
          show={showModal}
          onClose={() => setShowModal(false)}
          productId={id}
        />
      </Row>
        <Row justify={"start"} className="pt-5">
                {products && products.map((product) => (
                  <Col lg={24} md={3} xs={6} key={product.id}>
                    <CardPro
                      showDelete={"false"}
                      show={`/Products/Product-${product.number}/view/${product.id}`}
                      edit={`/Products/Product-${product.number}/${product.id}`}
                    >
                      <img
                        src={fileUrl + product?.images[0]?.image}
                        alt=""
                        className="w-full h-[107px]"
                      />
                      <h1 className="text-center text-Pink font-bold text-xl">
                        {product.name.en}
                      </h1>
                     
                      <h1 className="text-center text-Pink font-bold text-md">
                        {product.number === 1
                          ? "product one"
                          : product.number === 2
                          ? "product two"
                          : product.number === 3
                          ? "product three"
                          : product.number === 4
                          ? "product four"
                          : product.number === 5
                          ? "product five"
                          : product.number === 6
                          ? "Api Products"
                          : ""}
                      </h1>
                      <div className="p-5">
                        <p className="text-center text-black font-bold text-md">
                          Available:{" "}
                          <span
                            className={
                              product.available === 0
                                ? "text-Pink"
                                : "text-green-500"
                            }
                          >
                            {product.available == 1 ? "True" : "False"}
                          </span>
                        </p>
                        <p className="text-center text-black font-bold text-md">
                          Force Available:{" "}
                          <span
                            className={
                              product.force_unavailable === 1
                                ? "text-Pink"
                                : "text-green-500"
                            }
                          >
                            {product.force_unavailable == 0 ? "True" : "False"}
                          </span>
                        </p>
                        {product.is_parent_category === 1 && (
                          <p className="text-center text-black font-bold text-md">
                           
                            <span
                              className={
                                "text-green-500"
                              }
                            >
                            Parent Category
                            </span>
                          </p>
                        )}
                      
                        <div className="flex gap-1 justify-center mt-3">
                          <ButtonRed
                            className="py-2 px-5"
                            name="Remove From Group"
                            onClick={() =>
                              product?.id &&
                              removeFromGroup(product.id)
                            }
                          />
                        </div>
                      </div>
                    </CardPro>
                  </Col>
                ))}
              </Row>
      <Back name="Edit" link={`/Products/Product-1/${id}`} />
    </>
  );
};

export default ViewGroupProduct;
