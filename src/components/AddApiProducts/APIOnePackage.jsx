import React, { useEffect } from "react";
import { Col, Row } from "../../Grid-system";
import { Back, Input, Title } from "../../components";


const APIOnePackage = ({ index, pkg, handlePackageInputChange }) => {
  return (
    <div>
      <Row className="p-4">
        <div className="text-start mb-2 undefined text-lg font-bold">{pkg?.name_en}</div>
        <Input
          name="name_en"
          onChange={(e) =>
            handlePackageInputChange(pkg.index, "name_en", e.target.value)
          }
          placeholder={"Product Name"}
          value={pkg?.name_en}
        />
        <Input
          name="name_ar"
          onChange={(e) =>
            handlePackageInputChange(pkg.index, "name_ar", e.target.value)
          }
          placeholder={"اسم الباقة"}
          value={pkg?.name_ar}
        />
        <Input
          name="user_price"
          onChange={(e) =>
            handlePackageInputChange(pkg.index, "user_price", e.target.value)
          }
          placeholder={"User Price "}
          value={pkg?.user_price}
        />
        <Input
          type="number"
          name="user_percentage"
          onChange={(e) =>
            handlePackageInputChange(pkg.index, "user_percentage", e.target.value)
          }
          placeholder={"User percentage % "}
          value={pkg?.user_percentage}
        />
        <Input
          name="company_price"
          onChange={(e) =>
            handlePackageInputChange(pkg.index, "company_price", e.target.value)
          }
          placeholder={"Company  Price "}
          value={pkg?.company_price}
        />
        <Input
          type="number"
          name="company_percentage"
          onChange={(e) =>
            handlePackageInputChange(pkg.index, "company_percentage", e.target.value)
          }
          placeholder={"Company percentage %"}
          value={pkg?.company_percentage}
        />
        <Input
          type="number"
          name="minimum_qut"
           onChange={(e) =>
            handlePackageInputChange(pkg.index, "minimum_qut", e.target.value)
          }
          placeholder={"minimum quantity"}
          value={pkg?.minimum_qut ?? 1}
        />       
        <Input
          type="number"
          name="maximum_qut"
           onChange={(e) =>
            handlePackageInputChange(pkg.index, "maximum_qut", e.target.value)
          }
          placeholder={"maximum quantity"}
          value={pkg?.maximum_qut}
        />
        <Col md={6}> 
        <h1> Available</h1>
          <select
            name="is_available"
            value={pkg?.is_available}
            className="w-full text-center outline-none border py-4 rounded-xl mb-4"
            onChange={(e) =>
              handlePackageInputChange(pkg.index, "is_available", e.target.value)
            }
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
            value={pkg?.force_unavailable}
            className="w-full text-center outline-none border py-4 rounded-xl mb-4"
            onChange={(e) =>
              handlePackageInputChange(pkg.index, "force_unavailable", e.target.value)
            }
          >
            <option value="" disabled selected hidden>
              is available
            </option>
            <option value="0">Available</option>
            <option value="1">Unavailable</option>
          </select>
        </Col>
      </Row>
     
    </div>
  );
};

export default APIOnePackage;
