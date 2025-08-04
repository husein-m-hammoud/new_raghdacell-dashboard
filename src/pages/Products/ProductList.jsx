import { useLocation } from "react-router-dom";
import { fileUrl, useFETCH, fetchData } from "../../APIs/useMyAPI";
import { Col, Row } from "../../Grid-system";
import Loading from "../../Tools/Loading";
import axios from "axios";
import { useState, useEffect } from "react";

import {
  Add,
  ButtonRed,
  CardPro,
  FilterProducts,
  FilterSearch,
  ApiLogo,
  Title,
} from "../../components";

const ProductList = () => {
  const { search } = useLocation();
  const { data, isLoading, deleteItem } = useFETCH(
    `admin/products${search}`,
    "admin/products"
  );

  const [products, setProducts] = useState(data?.data.data || []);
  const [fetchingData, setFetchingData] = useState(false);
  useEffect(() => {
    if (data?.data.data) {
      setProducts(data.data.data);
    }
  }, [data]);

  const toggleSendCodeWhatsapp = async (productId, currentValue) => {
    try {
      setFetchingData(true);
      await fetchData(
        `admin/products/${productId}/send-code-whatsapp`,
        {
          send_code_whatsapp: !currentValue,
        },
        "POST"
      );
      setProducts(
        products.map((p) =>
          p.id === productId ? { ...p, send_code_whatsapp: !currentValue } : p
        )
      );
      setFetchingData(false);
    } catch (error) {
      setFetchingData(false);
      console.error("Failed to update product", error);
    }
  };
  const toggleHideOnMobile = async (productId, hideInMobile) => {
    try {
        setFetchingData(true);
        // Update the product's hide_in_mobile status
        const updatedProduct = await fetchData(`admin/products/${productId}/hide-in-mobile`, {
            hide_in_mobile: !hideInMobile
        }, 'PUT');
        setProducts(
          products.map((p) =>
            p.id === productId ? { ...p, hide_in_mobile: !hideInMobile } : p
          )
        );
 
        setFetchingData(false);
    } catch (error) {
        setFetchingData(false);
        console.error("Error updating product:", error);
    }
};

  const toggleHideOnAndroidMobile = async (productId, hideInMobile) => {
    try {
        setFetchingData(true);
        // Update the product's hide_in_mobile status
        const updatedProduct = await fetchData(`admin/products/${productId}/hide-on-android-mobile`, {
            hide_on_android_mobile: !hideInMobile
        }, 'PUT');
        setProducts(
          products.map((p) =>
            p.id === productId ? { ...p, hide_on_android_mobile: !hideInMobile } : p
          )
        );
 
        setFetchingData(false);
    } catch (error) {
        setFetchingData(false);
        console.error("Error updating product:", error);
    }
};
  return (
    <div>
      <Row className="" justify={"between"}>
        <Col md={4}>
          <Title title="Products List" />
        </Col>
        <Col md={6} className={"flex justify-end"}>
          <FilterSearch />
        </Col>
      </Row>
      <FilterProducts />
      {isLoading || fetchingData? <Loading /> : ""}

      <Row justify={"start"}>
        <div className="p-4">
          <h1 className="text-2xl mb-4">Products</h1>
          <table className="w-full border text-center">
          <thead className="sticky top-[95px] bg-white shadow">
          <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Image</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Send Code WhatsApp</th>
                <th className="border p-2">Hide On IOS Mobile</th>
               <th className="border p-2">Hide On Android Mobile</th>

              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="border p-2">{product.id}</td>
                  <td className="border p-2">
                    {" "}
                    <img
                      src={fileUrl + product.images[0]?.image}
                      alt=""
                      className=" w-16 grid m-auto"
                    />
                  </td>
                  <td className="border p-2">{product.name?.en}</td>

                  <td className="border p-2 text-center">
                    <input
                      type="checkbox"
                      checked={product.send_code_whatsapp}
                      onChange={() =>
                        toggleSendCodeWhatsapp(
                          product.id,
                          product.send_code_whatsapp
                        )
                      }
                    />
                  </td>
                  
                  <td className="border p-2 text-center">
                    <input
                      type="checkbox"
                      checked={product.hide_in_mobile}
                      onChange={() =>
                        toggleHideOnMobile(
                          product.id,
                          product.hide_in_mobile
                        )
                      }
                    />
                  </td>

                  <td className="border p-2 text-center">
                    <input
                      type="checkbox"
                      checked={product.hide_on_android_mobile}
                      onChange={() =>
                        toggleHideOnAndroidMobile(
                          product.id,
                          product.hide_on_android_mobile
                        )
                      }
                    />
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Row>
    </div>
  );
};

export default ProductList;
