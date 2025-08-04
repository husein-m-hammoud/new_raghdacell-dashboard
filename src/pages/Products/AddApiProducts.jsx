import { useParams } from "react-router-dom";
import React, { useState } from "react";
import {
  fileUrl,
  useFETCH,
  usePOST,
  fetchData,
  AddPackage,
} from "../../APIs/useMyAPI";
import { Col, Row } from "../../Grid-system";
import AddImage from "../../Tools/AddFile";
import {
  Back,
  Title,
  Dropdown,
  DropdownWithSearch,
  APIPackage,
  APIOnePackage,
  APICounter,
} from "../../components";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import Loading from "../../Tools/Loading";
import { useContextHook } from "../../Context/ContextOPen";
import Products from "./Products";
import { Result } from "postcss";

const AddApiProducts = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState(null);
  const [productsOptions, setProductsOptions] = useState(null);
  const [ProductPackages, setProductPackages] = useState(null);
  const [packages, setPackages] = useState([]);

  const { setCheckId, checkId } = useContextHook();
  const {
    handleChangeInput,
    handleSubmit,
    viewFile,
    setViewFile,
    setFormData,
    formData,
    loading,
    error,
    setError,
    productId,
  } = usePOST({ number: 6 });

  const fetchPlatformsData = useFETCH("admin/automated/fetch/apis");
  const platforms = fetchPlatformsData?.data?.data?.data;

  const handleSubmitMain = (e) => {
    e.preventDefault();
    if(formData?.istoken == 1) {
      var check =   handleValidateToken();
      if(check) {
        setError(check);
        return;
      }
    }
    const retrun_product = handleSubmit("admin/products", false, false, true);
  };

  const handleValidateToken = () => { 
    var fields = ['name_en', 'name_ar', 'user_price', 'company_price','minimum_qut', 'maximum_qut'];
    for (var i = 0; i < fields.length; i++) {
      var fieldName = fields[i];
      console.log(fieldName, formData);
      // Check if the field exists in formData and if it's empty
      if (!formData.hasOwnProperty(fieldName) || !formData[fieldName]) {

        return fieldName + ' is empty';
      }
    }
    return;

  };

  useEffect(() => {
    setFormData({
      ...formData,
      is_available: formData?.available ? 1 : 0,
    });
  }, [formData?.available]);

  const handleSubmitForToken = async () => {
    if (productId) {
      handleSubmit(`admin/products/${productId}/packages`);
    }
  };
  console.log({ productId });
  useEffect(() => {
    if (productId) {
      if (!selectedProduct.package) {
        handleSubmitForToken();
      } else {
        if (!ProductPackages) {
          getPackegesofProduct();
        }
      }
    }
  }, [productId]);

  const getPackegesofProduct = async () => {
if(selectedPlatform?.id <4) {
    const fetchedData = await fetchData(
      `admin/automated/fetch/package/products/${productId}`,
      null,
      "GET"
    );
    console.log({ fetchedData });
    if (fetchedData?.data?.products) {

      fetchedData?.data?.products.forEach((pkg) => {
        // Send package data to the API
        handleAddPackage(pkg);
      });
      console.log("handleAddPackag2");
      setProductPackages(fetchedData?.data?.products);
    }
  }
  else {
    let packages = products[selectedProduct?.category_name];
    packages.forEach((pkg) => {
      // Send package data to the API
      handleAddPackage(pkg);
    });
    console.log("handleAddPackag2");
    setProductPackages(packages);

  }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      available: 1,
      th_party_api_id: checkId ? checkId : "",
    });
  }, [viewFile, checkId]);

  useEffect(() => {
    console.log("FormData", formData);
  }, [formData]);


  const handleAddPackage = (reference_Package) => {
    console.log("handleAddPackage1",reference_Package);
    setPackages((prevPackages) => [
      ...prevPackages,
      {
        index: prevPackages.length + 1,
        name_en: reference_Package?.name,
        name_ar: "",
        api_product_id: "",
        is_available: reference_Package?.is_available ? 1 : 0,
        force_unavailable: 0,
        user_price: reference_Package?.price,
        company_price: reference_Package?.price,
        requirements: JSON.stringify(reference_Package?.requirements ||selectedProduct?.requirements),
        automation_reference: selectedPlatform?.id,
        product_reference: reference_Package?.id,
        type: "package",
        minimum_qut: reference_Package?.min_amount,
        maximum_qut: reference_Package?.max_amount,
      },
    ]);
  };

  const handlePackageInputChange = (index, name, value) => {
    setPackages((prevPackages) =>
      prevPackages.map((pkg) =>
        pkg.index === index ? { ...pkg, [name]: value } : pkg
      )
    );
    console.log({ packages });
  };
  const handleSubmitPackags = async () => {
    setIsLoading(true);
    let packagesArray = packages;
    // Assuming you have an API endpoint to send package data
    for (const pkg of packagesArray) {
      var response = await AddPackage(pkg, productId);
      if (response == "success") {
        packagesArray = packagesArray.filter((obj) => obj.index !== pkg.index);
      } else {
        setError(response);
      }
      console.log("Package", pkg);
      console.log("response", response);
    }

    if (packagesArray.length > 0) {
      console.log("packagesArray", packagesArray);
      setPackages(packagesArray);
     
    } else {
      window.history.go(-1);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (selectedPlatform?.id !== undefined) {
      console.log({ selectedPlatform });
      getProducts();
    }
  }, [selectedPlatform]);


  const getProducts = async () => {
    setIsLoading(true);
    try {
      const fetchedData = await fetchData(
        `admin/automated/fetch/products/${selectedPlatform?.id}`
      );
      // const fetchedData = await fetchData(
      //   `admin/automated/get/order/status/2844397`, null, 'GET'
      // );
      let tmpproductsOptions;
      if(selectedPlatform?.id < 4) {
        console.log({ tmpproductsOptions }, 'hussein < 4');
        tmpproductsOptions = fetchedData.success.products.map(
          (product, index) => ({
            value: index,
            label: product.name,
             isDisabled: product?.disabled
          })
        );
      }
      else {
        console.log({ tmpproductsOptions }, 'hussein');
       var categories  =  Object.keys(fetchedData.success.products);
       console.log({ categories }, 'hussein');
        tmpproductsOptions = categories.map(
          (category, index) => ({
            value: category,
            label: category,
             //isDisabled: product?.disabled
          })
        );
      }
     
      
      setProductsOptions(tmpproductsOptions);
      setProducts(fetchedData.success.products);

      console.log({ fetchedData });
      //setData(fetchedData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleSelectPlatform = (option) => {
    setSelectedProduct();
    setFormData({ number: 6 });
    setProducts();
    setSelectedPlatform(option);
  };

  const handleSelectProduct = (option) => {
    setFormData({ number: 6 });
    let product;
    if(selectedPlatform?.id < 4) {
      product = products[option.value];

      if(!product.package) {
        setFormData({
          ...formData,
          automation_reference: selectedPlatform?.id,
          product_reference: product?.id,
          requirements: JSON.stringify(product?.requirements),
          available: product?.available ? 1 : 0,
          is_available: product?.available ? 1 : 0,
          type: product.package ? "package" : "token",
          istoken: product.package ? "0" : "1",
          name_en: product?.name,
          user_price: product?.price,
          company_price: product?.price,
          minimum_qut: product?.min_amount,
          maximum_qut: product?.max_amount,
          force_unavailable: 0,
          th_party_api_id: checkId ? checkId : "",
        });
      }
      else {
        setFormData({
          ...formData,
          automation_reference: selectedPlatform?.id,
          product_reference: product?.id,
          requirements: JSON.stringify(product?.requirements),
          available: product?.available ? 1 : 0,
          type: product.package ? "package" : "token",
          istoken: product.package ? "0" : "1",
          name_en: product?.name,
          force_unavailable: 0,
          th_party_api_id: checkId ? checkId : "",

        });
      }
    
    }
    else{
      product = products[option.value][0];
      if(!product.package) {
        setFormData({
          ...formData,
          automation_reference: selectedPlatform?.id,
          product_reference: product?.id,
          requirements: JSON.stringify(product?.requirements),
          available: product?.available || product?.is_available ? 1 : 0,
          is_available: product?.available || product?.is_available ? 1 : 0,
          type: product.package ? "package" : "token",
          istoken: product.package ? "0" : "1",
          name_en: option.value,
          user_price: product?.price,
          company_price: product?.price,
          minimum_qut: product?.min_amount,
          maximum_qut: product?.max_amount,
          force_unavailable: 0,
          th_party_api_id: checkId ? checkId : "",
        });
      }
      else {
        setFormData({
          ...formData,
          automation_reference: selectedPlatform?.id,
          product_reference: product?.id,
          requirements: JSON.stringify(product?.requirements),
          available: product?.available || product?.is_available ? 1 : 0,
          type: product.package ? "package" : "token",
          istoken: product.package ? "0" : "1",
          name_en: option.value,
          force_unavailable: 0,
          th_party_api_id: checkId ? checkId : "",

        });
      }

     
    }
    
    console.log({ option }, 'hussein',{product});
    
    setSelectedProduct(product);

   
    //getPackegesofProduct();
  };

  const renderInputsByType = () => {

    if (!selectedProduct) {
      return null;
    }
    if (selectedProduct.package) {
      return (
        <APIPackage
          id="add"
          formData={formData}
          data={selectedProduct}
          setFormData={setFormData}
          viewFile={viewFile}
          handleChangeInput={handleChangeInput}
          setViewFile={setViewFile}
        />
      );
    }
    return (
      <APICounter
        id="add"
        formData={formData}
        data={selectedProduct}
        setFormData={setFormData}
        viewFile={viewFile}
        handleChangeInput={handleChangeInput}
        setViewFile={setViewFile}
      />
    );
  };

  console.log({ selectedProduct });
  console.log({ ProductPackages });

  if (ProductPackages) {
    return (
      <div>
         {isLoading ? <Loading /> : ""}
        <Title title="Add Packages" />
        <div className="border-2 border-Purple rounded-2xl">
          {packages.map((pkg) => (
            <div key={pkg.index}>
              <APIOnePackage
                index={pkg.index}
                pkg={pkg}
                handlePackageInputChange={handlePackageInputChange}
              />
            </div>
          ))}
        </div>
        <div className="text-red-500 font-semibold">{error}</div>
        {loading ? <Loading /> : ""}
        <Back name="Save" onClick={handleSubmitPackags} />
      </div>
    );
  }
  return (
    <div>
      <Title title="Add Product From API" />
      <div className="border-2 border-Purple rounded-2xl">
        <Row className="p-4">
          <Col md={7}>
            {platforms && (
              <>
                <h1>Select PlatForm</h1>
                <Dropdown options={platforms} onSelect={handleSelectPlatform} />
              </>
            )}
            {selectedPlatform && products && (
              <>
                <h1 className="mt-2">Select product</h1>
                <DropdownWithSearch
                  options={productsOptions}
                  label=""
                  onSelect={handleSelectProduct}
                />
              </>
            )}
          </Col>
          <Col md={5} className="flex text-center">
            {selectedProduct && selectedProduct.image ? (
              <img
                src={selectedProduct.image}
                alt={selectedProduct.slug}
                className="flex m-auto h-[130px]"
              />
            ) : (
              <></>
            )}
          </Col>
          {isLoading ? <Loading /> : ""}

          {selectedProduct && renderInputsByType()}
        </Row>

        <div className="text-red-500 p-4 font-semibold">{error}</div>
      </div>
      {loading ? <Loading /> : ""}
      {isLoading ? <Loading /> : ""}
      <Back name="Save" onClick={handleSubmitMain} />
    </div>
  );
};

export default AddApiProducts;
