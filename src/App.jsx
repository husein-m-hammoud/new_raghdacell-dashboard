import * as pages from "./pages/index";
import { MessagePop, Navbar, SideBar } from "./components/index";
import { Route, Routes } from "react-router-dom";
import Logo from "./images/IMG-20230702-WA0052-removebg.png";
import { RequireAuth, useFETCH } from "./APIs/useMyAPI";
import { Container } from "./Grid-system";
import { P403, P404, P500 } from "./Tools/Error";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";
import { useContextHook } from "./Context/ContextOPen";

import { onMessage } from "firebase/messaging";
import { fileUrl, fetchData } from "./APIs/useMyAPI";

import { useEffect } from "react";
import Swal from "sweetalert2";
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

const App = () => {
  const {  setAdminInfo } = useContextHook();

  async function requestPermission() {
    if(isIOS) {
      return;
    }
    const prem = await Notification.requestPermission();
    if (prem === "granted") {
      const fcm_token = await getToken(messaging, {
        vapidKey:
          "BONx2o6NAkyiVasHiM-i1jM4yGGD8WaOdVKULD9cAWIbP_1xkL9JcSPy3qMuLUDnGbuiCc0A5lpwMxPL0C43meQ",
      });
      console.log("FCM Token: ", fcm_token);

      sessionStorage.setItem("fcm_token", fcm_token);
    } else if (prem === "denied") {
      console.log('denied');
    }
  }

  const fetchAdminInfo = async () => {
    var url =  window.localStorage.getItem("token") ? `admin/admin-info` : "";
    if(url) {
    try {
      var res = await fetchData(url, null, 'GET');
      if (res?.data) {
        setAdminInfo(res.data);
      } else {
        console.error("No data received:", res);
      }
    } catch (error) {
      console.error("Error fetching admin info:", error);
    }
  }
  };
  
  
  useEffect(() => {
    if(!isIOS) {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("🔥 Service Worker Registered:", registration);
        })
        .catch((error) => {
          console.error("❌ Service Worker Registration Failed:", error);
        });
    }
  }
    requestPermission();
  }, []);
  if(!isIOS) {

  onMessage(messaging,  async (payload) => {
    console.log("📩 TEST Foreground Notification Received:", payload);
  
    if (!payload.notification) {
      console.log("🚨 Payload missing notification object", payload);
      return;
    }
    fetchAdminInfo();
   

    new Notification(payload.notification.title, {
      body: payload.notification.body,
      icon: "/logo.png",
    });
  
    console.log("✅ Foreground Notification Displayed");
  });
}

  useEffect(() => {
    if(!isIOS) {
    console.log("🔄 Checking Notification Permissions...");
  
    Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") {
          console.log("✅ Notification Permission Granted");
        } else {
          console.warn("🚫 Notification Permission Denied");
        }
      })
      .catch((err) => console.error("🚨 Error requesting permission:", err));
    }
  }, []);
  
  
  

  useEffect(() => {
    const handleOnline = () => {
      Swal.fire({
        icon: "success",
        title: "Online",
        text: "You are online!",
        timer: 2000,
        timerProgressBar: true,
      });
    };

    const handleOffline = () => {
      Swal.fire({
        icon: "error",
        title: "Offline",
        text: "You are offline!",
        timer: 2000,
        timerProgressBar: true,
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  const { data } = useFETCH("admin/check/auth");
  return (
    <>
      <div className="relative flex">
        <MessagePop />
        <SideBar />
        <div className="container mx-auto relative font-semibold">
          <Navbar />
          <Container>
            <Routes>
              <Route path="login">
                <Route index element={<pages.Login />} />
                <Route
                  path="forget-password"
                  element={<pages.ForgetPassword />}
                />
                <Route path="verification-code" element={<pages.Code />} />
                <Route path="set-password" element={<pages.SetPassword />} />
              </Route>
              <Route element={<RequireAuth />}>
                <Route
                  path=""
                  element={
                    <h1 className="grid place-content-center h-[60vh]">
                      <img src={Logo} alt="" className="w-[250px]" />
                    </h1>
                  }
                />
                <Route path="*" element={<P404 />} />
                <Route path="403" element={<P403 />} />
                <Route path="500" element={<P500 />} />
                <Route path="home">
                  <Route index element={<pages.Home />} />
                  <Route
                    path="add-image-slider"
                    element={<pages.AddImageSlider />}
                  />
                </Route>
                <Route path="About-Us">
                  <Route index element={<pages.AboutUs />} />
                  <Route path="add" element={<pages.EditAboutUs />} />
                  <Route path="Edit" element={<pages.EditTextAboutUs />} />
                </Route>
                <Route path="Contact-Us">
                  <Route index element={<pages.ContactUs />} />
                  <Route path="Edit" element={<pages.UpditeContact />} />
                </Route>
                <Route path="users">
                  <Route index element={<pages.Users />} />
                  <Route path=":id" element={<pages.AddUser />} />
                  <Route
                    path="Charging-user/:id"
                    element={<pages.ChargingUser />}
                  />
                  <Route
                    path="Orders-user/:id"
                    element={<pages.OrdersUser />}
                  />
                  <Route
                    path="Wallet-user/:id"
                    element={<pages.WalletUser />}
                  />
                  <Route
                    path="Wallet-user/show/:id"
                    element={<pages.Wallet2 />}
                  />
                </Route>
                <Route path="message" element={<pages.Message />} />
                <Route path="/payment" element={<pages.Payment />} />
                <Route path="/exchange-rate" element={<pages.ExchangeRate />} />
                <Route path="Notifications" element={<pages.Notifications />} />
                <Route path="Income" element={<pages.Income />} />
                <Route path="Orders">
                  <Route index element={<pages.Orders />} />
                  <Route path=":id" element={<pages.Order />} />
                </Route>
                <Route path="Requests">
                  <Route index element={<pages.Requests />} />
                  <Route path=":id" element={<pages.ShippingPayments2 />} />
                </Route>
                <Route path="Codes">
                  <Route index element={<pages.Codes />} />
                  <Route path=":id" element={<pages.AddCodes />} />
                </Route>
                <Route path="Products">
                  <Route index element={<pages.Products />} />
                  <Route
                    path="Product-5/:id"
                    element={<pages.AddProductFive />}
                  />
                  <Route
                    path="Product-4/:id"
                    element={<pages.AddProductFour />}
                  />
                  <Route
                    path="Product-3/:id"
                    element={<pages.AddProductThree />}
                  />
                  <Route
                    path="Product-2/:id"
                    element={<pages.AddProductTwo />}
                  />
                  <Route
                    path="Product-6/add"
                    element={<pages.AddApiProducts />}
                  />
                  <Route
                    path="Product-6/:id"
                    element={<pages.EditApiProducts />}
                  />
                  <Route
                    path="Product-6/view/:id"
                    element={<pages.ViewApiProducts />}
                  />
                  <Route
                    path="Product-1/:id"
                    element={<pages.AddProductOne />}
                  />
                   <Route
                    path="Product-7/:id"
                    element={<pages.AddGroupProduct />}
                  />
                  <Route
                    path="Product-1/package/:id/:uid"
                    element={<pages.AddPackageOne />}
                  />
                  <Route path="merge/:id/" element={<pages.Merge />} />
                  <Route path="merge/:id/:pk" element={<pages.Merge />} />
                  <Route
                    path="Product-6/package/:id/:uid"
                    element={<pages.EditApiPackage />}
                  />
                  <Route
                    path="Product-5/view/:id"
                    element={<pages.ViewProductFive />}
                  />
                  <Route
                    path="Product-4/view/:id"
                    element={<pages.ViewProductFour />}
                  />
                  <Route
                    path="Product-3/view/:id"
                    element={<pages.ViewProductThree />}
                  />
                  <Route
                    path="Product-2/view/:id"
                    element={<pages.ViewProductTwo />}
                  />
                  <Route
                    path="Product-1/view/:id"
                    element={<pages.ViewProductOne />}
                  />
                  <Route
                    path="Product-7/view/:id"
                    element={<pages.ViewGroupProduct />}
                  />
                    <Route
                    path="ProductList"
                    element={<pages.ProductList />}
                  />
                </Route>
                <Route
                  path="Change-Password"
                  element={<pages.ChangePassword />}
                />
                <Route path="Categories" element={<pages.Categories />} />
                <Route path="product-types" element={<pages.ProductTypes />} />

                
                <Route path="Wish-Excel" element={<pages.WishExcel />} />
                <Route path="analytics" element={<pages.Analytics />} />
              </Route>
            </Routes>
          </Container>
        </div>
      </div>
    </>
  );
};

export default App;
