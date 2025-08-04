import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { fileUrl, useFETCH } from "../../APIs/useMyAPI";
import { Col, Row } from "../../Grid-system";
import Loading from "../../Tools/Loading";
import Pagination from "../../Tools/Pagination";
import {
  Back,
  Buttons,
  CardBox,
  ViewCounter,
  ViewPackage,
} from "../../components";

const ViewApiProducts = () => {
  const { search } = useLocation();
  const { id } = useParams();
  const { data, isLoading } = useFETCH(`admin/products/${id}`);
  const { data: dataPackages, deleteItem } = useFETCH(
    `admin/products/${id}/packages${search}`,
    "admin/products/packages"
  );
  const dataAll = data?.data.data;

  

  if (
    dataPackages?.data?.data?.total == 1 &&
    dataPackages?.data.data?.data[0].type !== "package"
  ) {
    const mergedData = dataPackages?.data.data?.data[0];
    console.log(mergedData);

    mergedData["images"] = dataAll?.images;
    mergedData["name"] = dataAll?.name;
 

    return (
      <ViewCounter
        id={id}
        dataAll={dataPackages?.data.data?.data[0]}
        isLoading={isLoading}
        search={search}
      />
    );
  } else {
    return (
      <ViewPackage
        id={id}
        dataAll={dataAll}
        dataPackages={dataPackages}
        deleteItem={deleteItem}
        isLoading={isLoading}
        search={search}
      />
    );
  }

};

export default ViewApiProducts;
