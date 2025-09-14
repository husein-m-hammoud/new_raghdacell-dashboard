import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFETCH, fetchData } from "../../APIs/useMyAPI";
import { Col, Row } from "../../Grid-system";
import Loading from "../../Tools/Loading";
import { useContextHook } from "../../Context/ContextOPen";
import { Title } from "../../components";

const Products = () => {
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState(null);
  const [globalPercent, setGlobalPercent] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 search input

  const { setMessage } = useContextHook();

  const { search } = useLocation();
  const {
    data: commissions,
    isLoading,
    deleteItem,
  } = useFETCH("admin/commissions");
  const { data: global_percentage } = useFETCH("admin/global-percentage");

  useEffect(() => {
    if (commissions) {
      setData(commissions?.data?.data);
    }
  }, [commissions]);

  useEffect(() => {
    if (global_percentage) {
      setGlobalPercent(global_percentage?.data?.data ?? "");
    }
  }, [global_percentage]);

  const savePercentage = async (item) => {
    const value = document.getElementById(`item-${item.type}-${item.id}`).value;
    const json = await fetchData(
      `admin/commissions/update`,
      { type: item.type, id: item.id, percentage: value },
      "POST"
    );
    if (json.success) setMessage("Updated!");
  };

  const saveGlobalPercentage = async () => {
    setSaving(true);
    const json = await fetchData(
      `admin/global-percentage`,
      { percentage: globalPercent },
      "POST"
    );
    setSaving(false);
    if (json.success) {
      setMessage("Global Percentage Updated!");
      setGlobalPercent(json.data); // refresh state
    }
  };

  if (!data)
    return (
      <div>
        <Loading />
      </div>
    );

  // 🔍 Filter rows by search term
  const filteredItems =
    data?.items?.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div>
      <Row className="" justify={"between"} align={"center"}>
        <Col md={4}>
          <Title title="Products Percentage" />
        </Col>
        <Col md={6} className="flex justify-end">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control bg-slate-200"
            style={{ width: "250px" }}
          />
        </Col>
      </Row>

      <div className="mb-4 flex items-center gap-4">
        <p>Global Percentage</p>
        <input
          type="number"
          value={globalPercent ?? ""}
          onChange={(e) => setGlobalPercent(e.target.value)}
          className="form-control bg-slate-300"
          style={{
            width: "200px",
            display: "inline-block",
            marginRight: "10px",
          }}
        />
        <button onClick={saveGlobalPercentage} disabled={saving}>
          {saving ? "Saving..." : "Save Global"}
        </button>
      </div>

      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr className="text-left">
            <th style={{ width: "40%" }}>Name</th>
            <th style={{ width: "30%" }}>Percentage</th>
            <th style={{ width: "30%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={`${item.type}-${item.id}`}>
              <td>{item.name}</td>
              <td>
                <input
                  id={`item-${item.type}-${item.id}`}
                  defaultValue={item.percentage ?? ""}
                  className="form-control bg-slate-300"
                />
              </td>
              <td>
                <button onClick={() => savePercentage(item)}>Save</button>
              </td>
            </tr>
          ))}
          {filteredItems.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center text-gray-500">
                No matching products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
