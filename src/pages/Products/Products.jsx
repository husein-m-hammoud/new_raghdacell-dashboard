import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFETCH, fetchData, baseUrl, localFileUrl } from "../../APIs/useMyAPI";
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

  // Our own picture for a product, replacing the one the parent ships.
  // fetchData() always sends JSON, so the upload posts FormData directly --
  // and deliberately sets no Content-Type, so the browser adds the multipart
  // boundary itself.
  const [uploading, setUploading] = useState(null);

  const uploadImage = async (item, file) => {
    if (!file) return;
    const body = new FormData();
    body.append("product_id", item.id);
    body.append("image", file);
    try {
      setUploading(item.id);
      const res = await fetch(`${baseUrl}admin/commissions/image`, {
        method: "POST",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        body,
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error("upload failed");
      setData((prev) => ({
        ...prev,
        items: prev.items.map((row) =>
          row.type === item.type && row.id === item.id
            ? { ...row, custom_image: json.data.custom_image }
            : row
        ),
      }));
      setMessage("Image updated!");
    } catch (e) {
      setMessage("Could not upload that image");
    } finally {
      setUploading(null);
    }
  };

  const resetImage = async (item) => {
    try {
      setUploading(item.id);
      const json = await fetchData(
        `admin/commissions/image/delete`,
        { product_id: item.id },
        "POST"
      );
      if (json.success) {
        setData((prev) => ({
          ...prev,
          items: prev.items.map((row) =>
            row.type === item.type && row.id === item.id
              ? { ...row, custom_image: null }
              : row
          ),
        }));
        setMessage("Back to the default image");
      }
    } catch (e) {
      setMessage("Could not reset that image");
    } finally {
      setUploading(null);
    }
  };

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
            <th style={{ width: "28%" }}>Name</th>
            <th style={{ width: "22%" }}>Percentage</th>
            <th style={{ width: "15%" }}>Action</th>
            <th style={{ width: "35%" }}>Image</th>
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
              <td>
                {item.type === "product" ? (
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        item.custom_image
                          ? localFileUrl + item.custom_image
                          : item.image_url || ""
                      }
                      alt=""
                      title={item.custom_image ? "Your image" : "Default image"}
                      className="w-12 h-12 object-contain bg-slate-100 rounded"
                      onError={(e) => {
                        e.currentTarget.style.visibility = "hidden";
                      }}
                    />
                    <div className="flex flex-col gap-1">
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploading === item.id}
                        onChange={(e) => uploadImage(item, e.target.files[0])}
                        className="text-xs"
                      />
                      {item.custom_image && (
                        <button
                          type="button"
                          className="text-xs text-red-600 underline text-left"
                          onClick={() => resetImage(item)}
                        >
                          Use default image
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <span className="text-xs text-gray-400">—</span>
                )}
              </td>
            </tr>
          ))}
          {filteredItems.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center text-gray-500">
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
