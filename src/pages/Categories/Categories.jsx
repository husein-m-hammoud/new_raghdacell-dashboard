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
  DropdownWithSearch,
  AddCategoryModal,
  DeleteCategoryModal,
  UpdateTypeModal,
  Title,
} from "../../components";
import { useEffect, useState } from "react";

const Categories = () => {
  const { search } = useLocation();
  const [selected, setSelected] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryId, setCategoryId] = useState(0);

  const [showUpdateTypModal, setShowUpdateTypModal] = useState(false);

  const [newData, setNewData] = useState(false);
  const [dummy, setDummy] = useState(false);

  const { data, isLoading, deleteItem, reCallUrl } = useFETCH(
    "admin/categories-with-products"
  );
  const { data: product_types, isLoading: isLoadingType } = useFETCH(
    "admin/product-types"
  );
  const [productTypeOptions, setProductTypeOptions] = useState(null);
  useEffect(() => {
    if (product_types?.data) {
      const formattedProductType = product_types.data.map((productType) => ({
        value: productType.id,
        label: productType.name,
      }));
      console.log({ formattedProductType });
      // Add "No type" option at the beginning
      const noTypeOption = { value: 0, label: "No type" };
      setProductTypeOptions([...formattedProductType, noTypeOption]);
    }
  }, [product_types]);

  const { handleSubmit, loading, error } = usePOST();

  const removeCategoryFromProduct = async (product_id) => {
    console.log({ product_id });

    var url = `admin/products/${product_id}/remove-category`;
    var res = await fetchData(url);
    if (res) {
      window.location.reload();
    }
  };

  const { data: categories, isLoading: isLoadingCat } =
    useFETCH("admin/categories");

  // Filter products based on selected category
  const filteredData = selected
    ? data?.data?.filter((category) => category.name === selected)
    : data?.data;

  const updateForceUnavailable = async (category_id, product_id) => {
    var url = "admin/update-force-unavailable-category";
    await fetchData(url, { category_id, product_id });
    reCallUrl("admin/categories-with-products");
  };

  const addProductType = (categoryId) => {
    setCategoryId(categoryId);
    setShowUpdateTypModal(true);
  };

  useEffect(() => {
    if (categories) {
      setNewData(categories);
      console.log("new categories");
      setDummy((prev) => !prev);
    }
  }, [categories]);

  const renderCategories = () => {
    return (
      <Row justify={"start"}>
        {filteredData?.map((category) => {
          if (category.products.length == 0) {
            return null;
          }
          // Extract all product_type_id values for the products in this category
          const productTypeIds = category.products.map(
            (product) => product.product_type_id
          );

          // Check if all product_type_id values are the same and not null
          const allSameType = productTypeIds.every(
            (typeId) => typeId === productTypeIds[0] && typeId !== null
          );
          const allNullType = productTypeIds.every((typeId) => typeId === null);

          // Determine the product type name from productTypeOptions
          const productTypeName =
            productTypeOptions?.find(
              (option) => option.value === productTypeIds?.[0]
            )?.label || "Unknown Type";

          return (
            <div key={category.id} className="w-full mb-8">
              {/* Category Title */}
              <h2 className="text-center text-Pink font-bold text-2xl mb-4">
                {category.name}
              </h2>

              {/* Product Type Status */}
              <div className="text-center mb-4">
                {allSameType && (
                  <p className="text-green-500 font-bold">
                    Product Type: {productTypeName}{" "}
                    <button
                      className="ml-2 px-3 py-1 bg-blue-500 text-white rounded"
                      onClick={() => addProductType(category.id)}
                    >
                      Update Type
                    </button>
                  </p>
                )}
                {allNullType && (
                  <p className="text-red-500 font-bold">
                    No Product Type Added{" "}
                    <button
                      className="ml-2 px-3 py-1 bg-orange-500 text-white rounded"
                      onClick={() => addProductType(category.id)}
                    >
                      Add Type
                    </button>
                  </p>
                )}
                {!allSameType && !allNullType && (
                  <p className="text-yellow-500 font-bold">
                    Warning: Product types are inconsistent. Please update.
                    <button
                      className="ml-2 px-3 py-1 bg-yellow-500 text-white rounded"
                      onClick={() => addProductType(category.id)}
                    >
                      Update All
                    </button>
                  </p>
                )}
              </div>

              {/* Products */}
              <Row justify={"start"}>
                {category.products.map((product) => (
                  <Col lg={24} md={3} xs={6} key={product.id}>
                    <CardPro
                      showDelete={"false"}
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
                            name="Update Available"
                            onClick={() =>
                              updateForceUnavailable(category.id, product.id)
                            }
                          />
                        </div>
                        <div className="flex gap-1 justify-center mt-3">
                          <ButtonRed
                            className="py-2 px-5"
                            name="Remove From Category"
                            onClick={() =>
                              product?.id &&
                              removeCategoryFromProduct(product.id)
                            }
                          />
                        </div>
                      </div>
                    </CardPro>
                  </Col>
                ))}
              </Row>
            </div>
          );
        })}
      </Row>
    );
  };

  if (isLoading || isLoadingType || isLoadingCat) {
    return <Loading />;
  }

  return (
    <div>
      <Row className="" justify={"between"}>
        <Col md={4}>
          <Title title="Categories" />
        </Col>
        <Col md={6} className={"flex justify-end"}>
          <div className="flex gap-1 mx-3">
            <ButtonRed
              className="py-2 px-5"
              name="Add Category"
              onClick={() => setShowModal(true)}
            />
            <ButtonRed
              className="py-2 px-5"
              name="Delete Category"
              onClick={() => setShowDeleteModal(true)}
            />
          </div>
        </Col>
      </Row>
      <Row className="">
        <Col md={4}>
          {/* <select
            name=""
            id=""
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full py-2 text-center border-2 outline-none border-Pink rounded-xl"
          >
            <option value="">all</option>
            {newData?.data?.map((category) => (
              <option key={category?.id} value={category?.name}>
                {category?.name}
              </option>
            ))}
          </select> */}

          <DropdownWithSearch
            options={[
              { value: "", label: "All" }, // ✅ Add "All" option
              ...(newData?.data?.map((category) => ({
                value: category?.name,
                label: category?.name,
              })) || []),
            ]}
            onSelect={(selectedOption) =>
              setSelected(selectedOption?.value || "")
            }
            selectedValue={selected}
          />
        </Col>
      </Row>
      {isLoading || isLoadingCat ? <Loading /> : ""}

      {renderCategories()}

      <AddCategoryModal
        show={showModal}
        onClose={() => setShowModal(false)}
        type={"category"}
      />
      <DeleteCategoryModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        categories={newData?.data}
        type={"category"}
      />
      <UpdateTypeModal
        show={showUpdateTypModal}
        onClose={() => setShowUpdateTypModal(false)}
        productTypeOptions={productTypeOptions}
        categoryId={categoryId}
      />
    </div>
  );
};

export default Categories;
