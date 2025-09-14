import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useContextHook } from "../Context/ContextOPen";
// export const baseUrl = "https://dev-backend.raghdacell.com/api/";
export const fileUrl = "https://backend.raghdacell.com/storage/";

// export const baseUrl = "http://localhost:8000/api/";
// export const localFileUrl = "http://localhost:8000/storage/";


const hostname = window.location.hostname;
// e.g. "alicell.net", "raghdacell.com", etc.

export const baseUrl = `https://backend.${hostname}/api/`;
export const localFileUrl = `https://backend.${hostname}/storage/`;


// export const baseUrl = "https://backend.raghdacell.com/api/";
// export const fileUrl = "https://backend.raghdacell.com/storage/";

// export const baseUrl = process.env.REACT_APP_BASE_URL;
// export const fileUrl = process.env.REACT_APP_FILE_URL;

//!=============================================================> post data login
export const useLOGIN = (initialState) => {
    const [formData, setFormData] = useState(initialState); // data
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async(url) => {
        setLoading(true);
        setError("");
        const formDataToSend = new FormData();
        for (const [key, value] of Object.entries(formData)) {
            formDataToSend.append(key, value);
        }

        axios
            .post(`${baseUrl}${url}`, formDataToSend)
            .then((req) => {
                setLoading(false);
                setError("");
                localStorage.setItem("token", req.data.data.token);
                navigate("/");
            })
            .catch((e) => {
                setError(e.response.data.message);
                setLoading(false);
            });
    };
    //
    return {
        formData,
        handleChange,
        loading,
        error,
        handleSubmit,
        setFormData,
    };
};
// !======================================================================================
export const usePOST = (initialState) => {
    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [viewFile, setViewFile] = useState("");
    const [viewImages, setViewImages] = useState({});
    const [images, setImages] = useState({});
    const [checkArray, setCheckArray] = useState({});
    const naviget = useNavigate();
    const { setMessage } = useContextHook();
    //=====================================================> function change   data all
    const handleChangeInput = (event) => {
        const { name, value, type, files, checked } = event.target;
        const newValue =
            type === "file" ? files[0] : type === "checkbox" ? checked : value;
        type === "file" && setViewFile(URL.createObjectURL(newValue));
        let dateTime =
            type === "datetime-local" ?
            value.substring(0, 10) + " " + value.substring(11) + ":00" :
            newValue;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: dateTime === true ? 1 : newValue === false ? 0 : dateTime,
        }));
    };
    //=====================================================>  function change  array images
    const handleChangeArrayImages = (event) => {
        const { files, name } = event.target;
        setImages({...images, [name]: [files[0]] });
        if (images[name]) {
            setImages({
                ...images,
                [name]: [...images[name], files[0]],
            });
        }
        setViewImages({...viewImages, [name]: [URL.createObjectURL(files[0])] });
        if (images[name]) {
            setViewImages({
                ...viewImages,
                [name]: [...viewImages[name], URL.createObjectURL(files[0])],
            });
        }
    };
    //=====================================================>
    const [dat, setDat] = useState([]);
    const [obj, setObj] = useState({});
    const [err, setErr] = useState("");
    const [productId, setProductId] = useState("");

    const handleChangeObject = (event) => {
        const { name, value } = event.target;
        setObj((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleAddObject = () => {
        if (
            obj.user_price &&
            obj.company_price &&
            obj.minimum_qut_note_en &&
            obj.minimum_qut_note_ar &&
            obj.note_en &&
            obj.note_ar &&
            obj.minimum_qut &&
            obj.type
        ) {
            setDat((prevData) => [...prevData, obj]);
            setLoading(false);
            setObj({
                note_ar: "",
                user_price: "",
                company_price: "",
                minimum_qut_note_en: "",
                minimum_qut_note_ar: "",

                note_en: "",
                minimum_qut: "",
                type: "",
            });
            setErr("");
        } else {
            !obj.user_price && setErr(" حقل السعر للمستخدم مطلوب");
            !obj.company_price && setErr(" حقل السعر للشركة مطلوب");
            !obj.minimum_qut_note_en &&
                setErr(" حقل ملاحظة الكمية بالانكليزي  مطلوب");

            !obj.minimum_qut_note_ar && setErr(" حقل ملاحظة الكمية بالعربي مطلوب");
            !obj.note_en && setErr(" حقل ملاحظة بالانكليزي  مطلوب");
            !obj.note_ar && setErr(" حقل ملاحظة بالعربي مطلوب");
            !obj.minimum_qut && setErr(" حقل الكمية  مطلوب");
            !obj.type && setErr(" حقل النوع مطلوب");
        }
    };
    useEffect(() => {
        if (dat?.length !== 0) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                product_additional_services: JSON.stringify(dat),
            }));
        }
    }, [dat]);
    //=====================================================> function change   array checkbox
    const handleCheckedArray = (e) => {
        const { value, checked, name } = e.target;
        if (checked) {
            setCheckArray({...checkArray, [name]: [value] });
            if (checkArray[name]) {
                setCheckArray({
                    ...checkArray,
                    [name]: [...checkArray[name], value],
                });
            }
        } else {
            if (checkArray[name]) {
                setCheckArray({
                    ...checkArray,
                    [name]: checkArray[name].filter((p) => p !== value),
                });
            }
        }
    };

    //=====================================================> post data
    const { setCheckId } = useContextHook();
    const handleSubmit = async(url, route, reload, return_response) => {
        setLoading(true);
        setError("");
        console.log("hussein formData", formData);
        const formDataToSend = new FormData();
        for (const [key, value] of Object.entries(formData)) {
            console.log("hussein", key, value);
            if (
                (value || +value === 0) &&
                value !== "" &&
                value !== "null" &&
                value !== null &&
                value !== "undefined" &&
                value !== undefined
            ) {
                if (Array.isArray(value)) {
                    formDataToSend.append(key, JSON.stringify(value));
                } else {
                    formDataToSend.append(key, value == "-1" ? "" : value);
                }
            } else {
                if (value == "-1") {
                    formDataToSend.append(key, value == "-1" ? "" : value);
                } else if (key == "th_party_as7ab_api" && value == "") {
                    formDataToSend.append(key, value);
                }
            }
        }
        for (const [key, value] of Object.entries(checkArray)) {
            for (let i = 0; i < value.length; i++) {
                formDataToSend.append(key, value[i]);
            }
        }
        for (const [key, value] of Object.entries(images)) {
            for (let i = 0; i < value.length; i++) {
                formDataToSend.append(key, value[i]);
            }
        }
        console.log("handleSubmit", Object.entries(formData));

        axios
            .post(`${baseUrl}${url}`, formDataToSend, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((req) => {
                setLoading(false);
                setError("");
                setCheckId("");
                if (return_response) {
                    console.log(" hussein data: " + return_response);
                    var last = getLastWordInUrl(url);
                    console.log("req?.data", last);
                    if (last != null) {
                        setMessage(last + " Updated successfully");
                        console.log("req?.data", last);
                        return;
                    }
                    console.log("req?.data", req?.data?.data?.id);
                    if (req?.data?.data?.id) {
                        setProductId(req?.data?.data?.id);
                        return;
                    }
                    return;
                }
                //console.log('handleSubmit', req);return;

                route
                    ?
                    naviget(route) :
                    reload ?
                    window.location.reload() :
                    window.history.go(-1);
            })
            .catch((e) => {
                console.log(e);
                setError(e.response.data.message);
                setMessage(e.response?.data.message);
                setLoading(false);
            });
    };

    function getLastWordInUrl(url) {
        // Check if the URL contains "availability"
        if (url.includes("availability") || url.includes("bulk/as7ab")) {
            // Split the URL by "/"
            const parts = url.split("/");
            // Get the last part (which is the last word in the URL)
            var lastWord = parts[parts.length - 1];
            if (lastWord) {
                lastWord = lastWord.charAt(0).toUpperCase() + lastWord.slice(1);
            }

            return lastWord == "Bulk" ? "As7ab" : lastWord;
        } else {
            // If "availability" is not present, return null or any other appropriate value
            return null;
        }
    }

    return {
        formData,
        setFormData,
        viewFile, //  لعرض الصورة او فيديو .....
        setViewFile, // ((local)) لحذف الصورة
        viewImages, // لعرض الصور
        setViewImages, // ((local)) لحذف الصور
        images, //api  لأرسال الصور الى
        setImages, //api  لحذف الصور الى
        error,
        setError,
        loading,
        setLoading,
        handleChangeInput,
        handleCheckedArray,
        handleChangeArrayImages,
        handleSubmit,
        handleChangeObject,
        handleAddObject,
        dat,
        obj,
        setMessage,
        setObj,
        setDat,
        err,
        productId,
    };
};

export const fetchData = async(url, data = null, method = "POST") => {
    try {
        const options = {
            method: method,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        };

        // Add the body only for POST, PUT, or PATCH methods
        if (["POST", "PUT", "PATCH"].includes(method.toUpperCase()) && data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(`${baseUrl}${url}`, options);

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const responseData = await response.json();
        console.log(responseData, "response");
        return responseData;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
export const AddPackage = async(data = [], product_id) => {
    console.log(data, "adding package");
    var url = `admin/products/${product_id}/packages`;

    const formDataToSend = new FormData();
    for (const [key, value] of Object.entries(data)) {
        if (
            (value || +value === 0) &&
            value !== "" &&
            value !== "null" &&
            value !== null &&
            value !== "undefined" &&
            value !== undefined
        ) {
            formDataToSend.append(key, value);
        }
    }
    var result = await axios
        .post(`${baseUrl}${url}`, formDataToSend, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((req) => {
            return "success";
        })
        .catch((e) => {
            return e.response.data.message;
        });
    return result;
};
//!=============================================================>start fetch data
// Function to fetch data from your API
export const useFETCH = (url, urlDelete) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isErroe, setIsError] = useState("");
    const { setMessage } = useContextHook();
    const [prevUrl, setPrevUrl] = useState("");

    const naviget = useNavigate();
    useEffect(() => {
        setPrevUrl(url);
        setIsLoading(true);
        axios
            .get(url.substring(url.length - 3) === "add" ? " " : `${baseUrl}${url}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((req) => {
                if (req) {
                    setData(req);
                    setIsLoading(false);
                    setIsError("");
                }
            })
            .catch((e) => {
                setIsLoading(false);
                setMessage(e.response?.data.message);
                setIsError("خطأ في جلب البيانات");

                if (e.request.status === 401) {
                    naviget("/login");
                    localStorage.clear();
                }
                if (e.request.status === 403) {
                    naviget("/403");
                }
                if (e.request.status === 500) {
                    naviget("/500");
                }
            });
    }, [url]);

    const reCallUrl = async(e) => {
        if (url) {

            //   setIsLoading(true);
            axios
                .get(`${baseUrl}${url}`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
                .then((req) => {
                    if (req) {
                        setData(req);
                        setIsLoading(false);
                        setIsError("");
                    }
                })
                .catch((e) => {
                    setIsLoading(false);
                    setIsError("خطأ في جلب البيانات");

                    if (e.request.status === 401) {
                        localStorage.removeItem("token");
                    }
                    if (e.request.status === 403) {
                        naviget("/403");
                    }
                });
        } else {
            console.log("cant reCallUrl", prevUrl);
        }
    };

    //?=============================================================> deleteItem
    const deleteItem = async(e) => {
        setIsLoading(true);
        axios
            .delete(`${baseUrl}${urlDelete || url}/${e.id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((req) => {
                setIsLoading(false);
                setMessage(req.data.data);
                window.location.reload();
            })
            .catch((e) => {
                setIsLoading(false);
                setMessage(e.response?.data.message);
            });
    };
    return { data, isLoading, isErroe, deleteItem, prevUrl, reCallUrl };
};
//=============================================================> end fetch data
export const logout = (url) => {
    axios
        .post(
            `${baseUrl}${url}`, {}, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        )
        .then((req) => {
            localStorage.removeItem("token");
            window.location.reload();
        })
        .catch((e) => {});
};
export const useClose = () => {
    const [open, setOpen] = useState(false);
    const mouse = useRef();
    useEffect(() => {
        const handler = (e) => {
            if (mouse.current) {
                if (!mouse.current.contains(e.target)) {
                    setOpen(false);
                }
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.addEventListener("mousedown", handler);
        };
    }, []);
    return { open, setOpen, mouse };
};
//!=============================================================> pagination or filter or search
export const useFilter = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const handleParamsClick = (name, value) => {
        searchParams.set(name, value);
        const newUrl = `${location.pathname}?${searchParams.toString()}`;
        navigate(newUrl);
    };
    const handleParamsDelete = (name) => {
        searchParams.delete(name);
        const newUrl = `${location.pathname}?${searchParams.toString()}`;
        navigate(newUrl);
    };
    const handleParamsDeleteAll = (name) => {
        const newUrl = `${location.pathname}`;
        navigate(newUrl);
    };
    const handlePageClick = (event) => {
        handleParamsClick("page", event.selected + 1);
    };
    return {
        searchParams,
        handlePageClick,
        handleParamsClick,
        handleParamsDelete,
        handleParamsDeleteAll,
    };
};
//!=============================================================> عدم دخول من غير تسجيل دخول
export const RequireAuth = () => {
    if (!window.localStorage.getItem("token")) {
        return <Navigate to = "/login" / > ;
    }

    return <Outlet / > ;
};
//! =============================================================>عدم فتح صفحة تسجيل دخول اذا مسجل مسيقا
export const RequireLogin = () => {
    if (window.localStorage.getItem("token")) {
        return <Navigate to = "/" / > ;
    }
    return <Outlet / > ;
};
//!=============================================================> تكبير الصورة
export const clickZoomInImage = (event) => {
    event.target.requestFullscreen();
};

export const useContactUs = (url) => {
    const [loading, setLoading] = useState(false);
    const { setMessage } = useContextHook();
    const updateContactUs = (info, info_value) => {
        setLoading(true);
        axios
            .post(
                `${baseUrl}${url}`, {
                    info: info,
                    // [en_info_value ? "en_info_value" : "info_value"]: info_value,
                    info_value: info_value,
                }, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            )
            .then((req) => {
                setLoading(false);
                setMessage("Modified successfully");
            })
            .catch((e) => {
                setLoading(false);
            });
    };
    return { updateContactUs, loading };
};

export const checkOrderStatus = () => {
    var url = "admin/automated/get/status/bulk";
    axios.get(`${baseUrl}${url}`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
};