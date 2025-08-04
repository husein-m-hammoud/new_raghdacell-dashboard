import { useParams } from "react-router-dom";
import { fileUrl, useFETCH, usePOST } from "../../APIs/useMyAPI";
import { Col, Row } from "../../Grid-system";
import AddImage from "../../Tools/AddFile";
import {
  Back,
  Check,
  CheckAs7ab,
  Input,
  Title,
  DropdownWithSearch,
} from "../../components";
import { useEffect, useState } from "react";
import Loading from "../../Tools/Loading";
import { useContextHook } from "../../Context/ContextOPen";

const APICounter = ({
  id,
  formData,
  data,
  setFormData,
  viewFile,
  handleChangeInput,
  setViewFile,
}) => {
  console.log("APICounter", id, formData, data, setFormData);
  const { setCheckId, checkId } = useContextHook();
  const { data: categories } = useFETCH("admin/categories");
  const [categoryOptions, setCategoryOptions] = useState(null);

  const { data: product_types } = useFETCH("admin/product-types");
  const [productTypeOptions, setProductTypeOptions] = useState(null);

  useEffect(() => {
    setFormData({
      ...formData,
      th_party_api_id: checkId ? checkId : "",
    });
  }, [checkId]);

  useEffect(() => {
    if (categories?.data) {
      const formattedCategories = categories.data.map((category) => ({
        value: category.id,
        label: category.name,
      }));
      setCategoryOptions(formattedCategories);
    }
  }, [categories]);

  useEffect(() => {
    if (product_types?.data) {
      const formattedProductType = product_types.data.map((productType) => ({
        value: productType.id,
        label: productType.name,
      }));
      setProductTypeOptions(formattedProductType);
    }
  }, [product_types]);

  useEffect(() => {
    id !== "add" && setCheckId(data?.th_party_api_id);
  }, [data]);
  return (
    <div>
      <Row className="p-0 pt-3">
        <Input
          name="name_en"
          onChange={handleChangeInput}
          placeholder={"Product Name"}
          value={formData?.name_en}
        />
        <Input
          name="name_ar"
          onChange={handleChangeInput}
          placeholder={"اسم المنتج"}
          value={formData?.name_ar}
        />
        <Input
          type="number"
          name="user_price"
          onChange={handleChangeInput}
          placeholder={"User Price "}
          value={formData?.user_price}
        />
        <Input
          type="number"
          name="user_percentage"
          onChange={handleChangeInput}
          placeholder={"User percentage % "}
          value={formData?.user_percentage}
        />
        <Input
          type="number"
          name="company_price"
          onChange={handleChangeInput}
          placeholder={"Company Price "}
          value={formData?.company_price}
        />
        <Input
          type="number"
          name="company_percentage"
          onChange={handleChangeInput}
          placeholder={"Company percentage % "}
          value={formData?.company_percentage}
        />

        <Input
          type="number"
          name="minimum_qut"
          onChange={handleChangeInput}
          placeholder={"minimum quantity"}
          value={formData?.minimum_qut}
        />

        <Input
          type="number"
          name="maximum_qut"
          onChange={handleChangeInput}
          placeholder={"maximum quantity"}
          value={formData?.maximum_qut}
        />

        <Input
          name="note_en"
          onChange={handleChangeInput}
          placeholder={"Note(optional)"}
          value={formData?.note_en}
        />
        <Input
          name="note_ar"
          onChange={handleChangeInput}
          placeholder={"(اختياري)ملاحظة"}
          value={formData?.note_ar}
        />

        <Col md={6}>
          <h1> is available</h1>
          <select
            name="available"
            value={formData?.available}
            className="w-full text-center outline-none border py-4 rounded-xl mb-4"
            onChange={handleChangeInput}
          >
            <option value="" disabled selected hidden>
              is available
            </option>
            <option value="1">Available</option>
            <option value="0">Unavailable</option>
          </select>
        </Col>
        <Col md={6}>
          <h1> Force unavailable</h1>
          <select
            name="force_unavailable"
            value={formData?.force_unavailable}
            className="w-full text-center outline-none border py-4 rounded-xl mb-4"
            onChange={handleChangeInput}
          >
            <option value="" disabled selected hidden>
              is available
            </option>
            <option value="0">Available</option>
            <option value="1">Unavailable</option>
          </select>
        </Col>
        <Col md={6}>
          <AddImage
            id="image"
            name="images[]"
            onChange={handleChangeInput}
            oldImage={data?.images ? fileUrl + data?.images[0]?.image : ""}
            newImage={viewFile}
            clickDeleteImage={() => {
              setViewFile("");
              setFormData({ ...formData, "images[]": "" });
            }}
          />
        </Col>
        <Input
          col={3}
          name="p_order"
          type="number"
          onChange={handleChangeInput}
          placeholder={"Product order"}
          value={formData?.p_order}
        />
        <Col md={6}>
          <h1 className="mt-2">Select Category</h1>
          <DropdownWithSearch
            options={categoryOptions}
            label=""
            // onSelect={handleChangeInput}
            onSelect={(e) => setFormData({ ...formData, category_id: e.value })}
            selectedValue={formData?.category_id}
          />
        </Col>
        <Col md={6}>
          <h1 className="mt-2">Select Type</h1>
          <DropdownWithSearch
            options={productTypeOptions}
            label=""
            // onSelect={handleChangeInput}
            onSelect={(e) =>
              setFormData({ ...formData, product_type_id: e.value })
            }
            selectedValue={formData?.product_type_id}
          />
        </Col>

        {data?.requirements != null && (
          <Row className={" align-middle"}>
            <Col col={5}>
              <Check />
            </Col>
            <Col col={4}>
              <CheckAs7ab
                formData={formData}
                handleChangeInput={handleChangeInput}
              />
            </Col>
            <Col col={3}>
              <div className="flex items-center justify-end gap-3">
                <input
                  type="checkbox"
                  name="require_player_number"
                  checked={formData?.require_player_number}
                  onChange={handleChangeInput}
                  className="w-5 h-5"
                />
                <h1 className="">api تفعيل رقم اللاعب بلا </h1>
              </div>
            </Col>
          </Row>
        )}
      </Row>
    </div>
  );
};

export default APICounter;
