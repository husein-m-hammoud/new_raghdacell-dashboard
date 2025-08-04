import { useLocation } from "react-router-dom";
import { fileUrl, useFETCH, fetchData, usePOST } from "../../APIs/useMyAPI";
import { Col, Row } from "../../Grid-system";
import Loading from "../../Tools/Loading";
import {
  Add,
  ButtonRed,
  CardPro,
  FilterSearch,
  ApiLogo,
  AddCategoryModal,
  DeleteCategoryModal,
  Title,
} from "../../components";
import { useEffect, useState } from "react";

const ProductTypes = () => {
  const { search } = useLocation();
  const [selected, setSelected] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [newData, setNewData] = useState(false);
  const [dummy, setDummy] = useState(false);

  const { data, isLoading, deleteItem, reCallUrl } = useFETCH(
    "admin/product-types-with-products"
  );

  const {
    handleSubmit,
    loading,
    error,
  } = usePOST();

  const removeCategoryFromProduct = async (product_id) => {
    console.log({product_id});

    var url  = `admin/products/${product_id}/remove-product-type`
   var res =  await fetchData(url);
   if(res) {
    window.location.reload();
   }
  };

  const { data: product_types , isLoading: isLoadingCat} = useFETCH("admin/product-types");

  // Filter products based on selected product_type
  const filteredData = selected
    ? data?.data?.filter((product_type) => product_type.name === selected)
    : data?.data;


    useEffect(() =>{
      if(product_types) {
        setNewData(product_types)
        setDummy(prev => !prev);
      }
    },[product_types]);


  return (
    <div>
      <Row className="" justify={"between"}>
        <Col md={4}>
          <Title title="Products Type" />
        </Col>
        <Col md={6} className={"flex justify-end"}>
          <div className="flex gap-1 mx-3">
            <ButtonRed
              className="py-2 px-5"
              name="Add Type"
              onClick={() => setShowModal(true)}
            />
             <ButtonRed
                      className="py-2 px-5"
                      name="Delete Type"
                      onClick={() => setShowDeleteModal(true)}
               />

          </div>
        </Col>
      </Row>
      <Row className="">
        <Col md={4}>
          <select
            name=""
            id=""
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full py-2 text-center border-2 outline-none border-Pink rounded-xl"
          >
            <option value="">all</option>
            {newData?.data?.map((product_type) => (
              <option key={product_type?.id} value={product_type?.name}>
                {product_type?.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>
      {isLoading || isLoadingCat ? <Loading /> : ""}

      <Row justify={"start"}>
        {filteredData?.map((product_type) =>

          product_type.products.map((product) => (
            <Col lg={24} md={3} xs={6} key={product.id} className="">
              <CardPro
                showDelete={'false'}
              
                show={`/Products/Product-${product.number}/view/${product.id}`}
                edit={`/Products/Product-${product.number}/${product.id}`}
              >
                <img
                  src={fileUrl + product.images[0]?.image}
                  alt=""
                  className="w-full h-[107px]"
                />
                <h1 className="text-center text-Pink font-bold text-xl">
                  {product.name.en}
                </h1>
                <div className="text-center align-middle flex justify-center">
                  <ApiLogo data={product?.automated} className="w-6" />
                </div>
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
                <div className=" p-5">
                  <h1 className="text-center text-Pink font-bold text-xl">
                    {product_type.name}
                  </h1>
                  <p className="text-center text-black font-bold text-md">
                    Available :{" "}
                    <span
                      className={product.available === 0 ? 'text-Pink' : 'text-green-500'}

                    >
                      {product.available == 1 ? "True" : "False"}
                    </span>
                  </p>
                  <p className="text-center text-black font-bold text-md">
                    Force Available :{" "}
                    <span
                      className={product.force_unavailable === 1 ? 'text-Pink' : 'text-green-500'}

                    >
                      {product.force_unavailable == 0 ? "True" : "False"}
                    </span>
                  </p>
                  <div className="flex gap-1 justify-center mt-3">
                    
              
                    
                  </div>
                  <div className="flex gap-1 justify-center mt-3">
                    
                    <ButtonRed
                      className="py-2 px-5"
                      name="Remove From Product Type"
                      onClick={() => product?.id && removeCategoryFromProduct(product.id)}
                    />
                    
                  </div>
                </div>
              </CardPro>
            </Col>
          ))
        )}
      </Row>
      <AddCategoryModal show={showModal} onClose={() => setShowModal(false)} type= {'product_type'} />
      <DeleteCategoryModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} categories={newData?.data}  type= {'product_type'}/>

    </div>
  );
};

export default ProductTypes;
