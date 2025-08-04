import React, { useEffect, useState } from "react";
import { Col, Row } from "../../Grid-system";
import { Back, Input, Title, DropdownWithSearch } from "../../components";
import { useFETCH, useFilter, usePOST } from "../../APIs/useMyAPI";
import { useParams } from "react-router-dom";
import Loading from "../../Tools/Loading";

const Merge = () => {
  const { id, pk } = useParams();
  const {
    handleChangeInput,
    handleSubmit,
    setFormData,
    formData,
    loading,
    error,
  } = usePOST();

  const [productsOptions, setProductsOptions] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data ,loading:isLoading} = useFETCH( 
    !pk
    ?`admin/products/merge/${id}`
    :`admin/products/merge/package/${id}`
    );
  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit( !pk 
      ?`admin/products/merge/${id}`
      :`admin/products/merge/package/${id}`
    );
  };
  useEffect(() => {
   
    if (data) {
      let tmpData = data?.data?.data?.data;
      let tmpproductsOptions = tmpData.map((item, index) => ({
        value: item.id,
        label: item.name.en+' '+(item.automated?.name ? `(${item.automated?.name})` : ''),
        //isDisabled: product?.disabled
      }));
      tmpproductsOptions.unshift({ value: "0", label: "Select..." });

      setProductsOptions(tmpproductsOptions);
      setSelectedProduct(!pk ? data?.data?.data?.product?.merge_with :data?.data?.data?.product?.merge_with_pk );
      setFormData({ merge_to: !pk ? data?.data?.data?.product?.merge_with :data?.data?.data?.product?.merge_to_pk});
    }
  }, [data]);

  console.log({selectedProduct});
  

  const handleSelectProduct = (option) => {
    
    setFormData({ merge_to: option.value});
    setSelectedProduct(option.value);
  };
  if (isLoading || isLoading || !data) {
    return <Loading />;
  }
  return (
    <div>
      <Title title="Add Packages" />
      <Row className="p-4">
        <Col md={6}>
          <h1 className="mt-2">Select product</h1>
          <DropdownWithSearch
            options={productsOptions}
            label=""
            selectedValue={selectedProduct}
            onSelect={handleSelectProduct}
          />
        </Col>
      </Row>
      <div className="text-red-500 font-semibold">{error}</div>
     
      <Back name="Save" onClick={handleSubmitMain} />
     
    </div>
  );
};

export default Merge;
