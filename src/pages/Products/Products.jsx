import React, { useEffect, useMemo, useState } from "react";
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
  // Which category groups are unfolded. Collapsed by default: a category is
  // the same game once per provider, so the products inside it are rarely the
  // thing being edited.
  const [expanded, setExpanded] = useState({});

  const { setMessage } = useContextHook();

  const { search } = useLocation();
  const { data: commissions, isLoading } = useFETCH("admin/commissions");
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

  // Our own picture, replacing the one the parent ships. Normally set on the
  // CATEGORY -- it covers every provider copy of that game, including one
  // added later -- and per product only as an exception.
  //
  // fetchData() always sends JSON, so the upload posts FormData directly --
  // and deliberately sets no Content-Type, so the browser adds the multipart
  // boundary itself.
  const [uploading, setUploading] = useState(null);

  const rowKey = (item) => `${item.type}-${item.id}`;

  // Both rows live in the same flat items list, and a category and a product
  // can share an id, so a row is identified by type AND id.
  const patchRow = (item, customImage) =>
    setData((prev) => ({
      ...prev,
      items: prev.items.map((row) =>
        row.type === item.type && row.id === item.id
          ? { ...row, custom_image: customImage }
          : row
      ),
    }));

  const uploadImage = async (item, file) => {
    if (!file) return;
    const body = new FormData();
    body.append(item.type === "category" ? "category_id" : "product_id", item.id);
    body.append("image", file);
    try {
      setUploading(rowKey(item));
      const res = await fetch(`${baseUrl}admin/commissions/image`, {
        method: "POST",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        body,
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error("upload failed");
      patchRow(item, json.data.custom_image);
      setMessage(
        item.type === "category"
          ? "Image updated for the whole category!"
          : "Image updated!"
      );
    } catch (e) {
      setMessage("Could not upload that image");
    } finally {
      setUploading(null);
    }
  };

  const resetImage = async (item) => {
    try {
      setUploading(rowKey(item));
      const json = await fetchData(
        `admin/commissions/image/delete`,
        item.type === "category"
          ? { category_id: item.id }
          : { product_id: item.id },
        "POST"
      );
      if (json.success) {
        patchRow(item, null);
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

  // The flat list the API returns -- a category row followed by its products --
  // folded into one group per category. Keyed on category_id rather than on
  // the order of the rows or on the category name, which is not unique.
  const { groups, uncategorized } = useMemo(() => {
    const items = data?.items || [];
    const byId = {};
    const grouped = [];
    const loose = [];

    items.forEach((item) => {
      if (item.type === "category") {
        const group = { ...item, products: [] };
        byId[item.id] = group;
        grouped.push(group);
      }
    });

    items.forEach((item) => {
      if (item.type === "category") return;
      const group = item.category_id != null ? byId[item.category_id] : null;
      (group ? group.products : loose).push(item);
    });

    return { groups: grouped, uncategorized: loose };
  }, [data]);

  if (!data)
    return (
      <div>
        <Loading />
      </div>
    );

  // 🔍 Filter by search term. A category stays visible when its own name
  // matches (with all its products) or when any product inside it does (with
  // just those), so searching a game name still finds it through its category.
  const term = searchTerm.trim().toLowerCase();
  const hit = (name) => (name || "").toLowerCase().includes(term);

  const visibleGroups = !term
    ? groups.map((group) => ({ ...group, matched: group.products }))
    : groups
        .map((group) => {
          if (hit(group.name)) return { ...group, matched: group.products };
          const matched = group.products.filter((p) => hit(p.name));
          return matched.length ? { ...group, matched } : null;
        })
        .filter(Boolean);

  const visibleLoose = uncategorized.filter((p) => !term || hit(p.name));
  const nothingFound = !visibleGroups.length && !visibleLoose.length;

  // A group whose match came from a product is opened automatically -- the row
  // the search found is inside it.
  const isOpen = (group) =>
    expanded[group.id] ?? (!!term && !hit(group.name));

  const toggle = (group) =>
    setExpanded((prev) => ({ ...prev, [group.id]: !isOpen(group) }));

  const customCount = (group) =>
    group.products.filter((p) => p.custom_image).length;

  // The picture a category row shows: ours if it has one, otherwise the
  // parent's for the first product in it, just so the admin sees what the
  // category looks like today.
  const categoryImage = (group) =>
    group.custom_image
      ? { src: localFileUrl + group.custom_image, own: true, label: "Your image" }
      : {
          src: group.products.find((p) => p.image_url)?.image_url || "",
          own: false,
          label: "Default image",
        };

  // And a product row: its own picture, else its category's, else the parent's.
  const productImage = (item, group) => {
    if (item.custom_image)
      return {
        src: localFileUrl + item.custom_image,
        own: true,
        label: "Your image",
      };
    if (group?.custom_image)
      return {
        src: localFileUrl + group.custom_image,
        own: false,
        label: "From the category",
      };
    return { src: item.image_url || "", own: false, label: "Default image" };
  };

  const ImageCell = ({ item, picture, hint }) => (
    <div className="flex items-center gap-3">
      <img
        src={picture.src}
        alt=""
        title={picture.label}
        className="w-12 h-12 object-contain bg-slate-100 rounded"
        onError={(e) => {
          e.currentTarget.style.visibility = "hidden";
        }}
      />
      <div className="flex flex-col gap-1">
        <input
          type="file"
          accept="image/*"
          disabled={uploading === rowKey(item)}
          onChange={(e) => uploadImage(item, e.target.files[0])}
          className="text-xs"
        />
        <span className="text-[11px] text-gray-500">{hint}</span>
        {picture.own && (
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
  );

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
          {visibleGroups.map((group) => {
            const open = isOpen(group);
            const own = customCount(group);

            return (
              <React.Fragment key={`category-${group.id}`}>
                <tr className="bg-slate-100">
                  <td>
                    <button
                      type="button"
                      className="font-bold text-left"
                      onClick={() => toggle(group)}
                    >
                      {open ? "▾" : "▸"} {group.name}
                      <span className="ml-2 text-xs font-normal text-gray-500">
                        ({group.products.length} product
                        {group.products.length === 1 ? "" : "s"}
                        {own ? `, ${own} with its own image` : ""})
                      </span>
                    </button>
                  </td>
                  <td>
                    <input
                      id={`item-category-${group.id}`}
                      defaultValue={group.percentage ?? ""}
                      className="form-control bg-slate-300"
                    />
                  </td>
                  <td>
                    <button onClick={() => savePercentage(group)}>Save</button>
                  </td>
                  <td>
                    <ImageCell
                      item={group}
                      picture={categoryImage(group)}
                      hint={`Applies to all ${group.products.length} product${
                        group.products.length === 1 ? "" : "s"
                      } here`}
                    />
                  </td>
                </tr>

                {open &&
                  group.matched.map((item) => (
                    <tr key={`product-${item.id}`}>
                      <td>
                        <span className="pl-6 text-gray-700">{item.name}</span>
                      </td>
                      <td>
                        {/* Set on the category, not here: getPercentage()
                            always reads the category when a product has one, so
                            a per-product value would never be used. */}
                        <span className="text-xs text-gray-500">
                          {item.percentage ?? "global"} (from category)
                        </span>
                      </td>
                      <td></td>
                      <td>
                        <ImageCell
                          item={item}
                          picture={productImage(item, group)}
                          hint="Only this one — overrides the category"
                        />
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            );
          })}

          {visibleLoose.map((item) => (
            <tr key={`product-${item.id}`}>
              <td>{item.name}</td>
              <td>
                <input
                  id={`item-product-${item.id}`}
                  defaultValue={item.percentage ?? ""}
                  className="form-control bg-slate-300"
                />
              </td>
              <td>
                <button onClick={() => savePercentage(item)}>Save</button>
              </td>
              <td>
                <ImageCell
                  item={item}
                  picture={productImage(item, null)}
                  hint="No category — this product only"
                />
              </td>
            </tr>
          ))}

          {nothingFound && (
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
