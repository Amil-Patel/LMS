import React, { useEffect, useState, useContext } from "react";
import "../../../assets/css/setting.css";
import Hoc from "../layout/Hoc";
import { notifySuccess, notifyError, notifyWarning } from "../layout/ToastMessage";
import axiosInstance from "../utils/axiosInstance";
import Loading from "../layout/Loading";
import useCheckRolePermission from "../layout/CheckRolePermission";
import { userRolesContext } from "../layout/RoleContext";
const port = process.env.REACT_APP_URL;
function PaymentSetting() {
  const { userRole } = useContext(userRolesContext);
  const [formData, setFormData] = useState({
    identifier: "stripe",
    currency: "USD",
    title: "Stripe",
    description: "description",
    keys: {
      privateTestKey: "",
      publicTestKey: "",
      privateLiveKey: "",
      publicLiveKey: ""
    },
    model_name: "Payment Model",
    status: "0",
    enabled_test_mode: "0"
  });
  const [loading, setLoading] = useState(false);
  const [getPaymentGetwayData, setGetPaymentGetwayData] = useState([]);

  const perm = useCheckRolePermission("Payment Setting");
  const addPaymentPermission = perm.length > 0 && perm[0].can_add === 1 ? 1 : 0;
  const editPaymentPermission = perm.length > 0 && perm[0].can_edit === 1 ? 1 : 0;

  const handleGetPaymentGetwayData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${port}/gettingPaymentGetwayData`);
      setGetPaymentGetwayData(res.data);
      if (res.data.length > 0) {
        const paymentData = res.data[0];
        const parsedKeys = JSON.parse(paymentData.keys);
        setFormData({
          ...paymentData,
          keys: {
            privateTestKey: parsedKeys.privateTestKey, // Adjust based on your keys structure
            publicTestKey: parsedKeys.publicTestKey,
            privateLiveKey: parsedKeys.privateLiveKey,
            publicLiveKey: parsedKeys.publicLiveKey
          }
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.keys) {
      // Update the nested keys object
      setFormData((prevData) => ({
        ...prevData,
        keys: {
          ...prevData.keys,
          [name]: value
        }
      }));
    } else {
      // Update other fields in formData
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const resetForm = () => {
      setFormData({
        identifier: "stripe",
        currency: "USD",
        title: "Stripe",
        description: "description",
        keys: {
          privateTestKey: "",
          publicTestKey: "",
          privateLiveKey: "",
          publicLiveKey: ""
        },
        model_name: "Payment Model",
        status: "0",
        enabled_test_mode: "0"
      });
    };

    try {
      const hasData = getPaymentGetwayData.length > 0;
      const isEdit = hasData && userRole === "superAdmin" || editPaymentPermission == 1;
      const isAdd = !hasData && userRole === "superAdmin" || addPaymentPermission == 1;

      if (isEdit) {
        // Update existing SMTP setting
        await axiosInstance.put(`${port}/updatingPaymentGetway/${getPaymentGetwayData[0].id}`, formData);
        notifySuccess("SMTP setting edited successfully");
      } else if (isAdd) {
        // Add new SMTP setting
        await axiosInstance.post(`${port}/addPaymentGetwayData`, formData);
        notifySuccess("SMTP setting saved successfully");
      } else {
        notifyWarning(hasData ? "Edit not permitted" : "Add not permitted");
        resetForm();
      }

      handleGetPaymentGetwayData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetPaymentGetwayData()
    getCurrencyData();
    getCurrencyDataWithId()
  }, [])

  //get currency data
  const [currencyData, setCurrencyData] = useState([]);

  const getCurrencyData = async () => {
    try {
      const res = await axiosInstance.get(`${port}/gettingCurrencyData`);
      setCurrencyData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [currency, setCurrency] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [selectedCurrencySymbol, setSelectedCurrencySymbol] = useState('');
  const [selectedCurrencyPosition, setSelectedCurrencyPosition] = useState('');

  const getCurrencyDataWithId = async () => {
    try {
      const res = await axiosInstance.get(`${port}/gettingCurrencyDataWithId`);
      setCurrency(res.data);
      setSelectedCurrency(res.data.currency);
      setSelectedCurrencySymbol(res.data.symbol);
      setSelectedCurrencyPosition(res.data.position);
    } catch (error) {
      console.log(error);
    }
  }
  const updateCurrency = async () => {
    try {
      const res = await axiosInstance.put(`${port}/updatingCurrencyData/${currency.id}`, { currency: selectedCurrency, symbol: selectedCurrencySymbol, position: selectedCurrencyPosition });
      notifySuccess("Currency updated successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Hoc />
      <div className="main">
        {loading && <Loading />}
        <div className="main-top-bar">
          <div id="user-tag">
            <h5>Payment Setting</h5>
          </div>
          <div id="search-inner-hero-section">
            <input id="search" type="text" placeholder="Search" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div className="main_pay_sec">
          <div className="currency_page">
            <div className="currency_input">
              <label htmlFor="currency" className="currency_title">Currency</label>
              <select name="currency" id="currency" form="carform" value={selectedCurrency}
                onChange={(e) => {
                  setSelectedCurrency(e.target.value);
                  setSelectedCurrencySymbol(e.target.selectedOptions[0].getAttribute('name'));
                }}>
                <option value="">Select</option>
                {
                  currencyData.map((item) => (
                    <option key={item.name} value={item.name} name={item.symbol}>{item.name} ({item.symbol})</option>
                  ))
                }
              </select>
            </div>

            <div>
              <label htmlFor="currencyposition" className="currency_title">Currency Position</label>
              <br />
              <input
                id="left"
                type="radio"
                name="currencyPosition"
                value="left"
                className="cur_sel"
                checked={selectedCurrencyPosition === 'left'}
                onChange={(e) => setSelectedCurrencyPosition(e.target.value)}
              />
              <label htmlFor="left" className="text1">Left</label>
              <input
                type="radio"
                name="currencyPosition"
                value="right"
                className="cur_sel"
                id="right"
                checked={selectedCurrencyPosition === 'right'}
                onChange={(e) => setSelectedCurrencyPosition(e.target.value)}
              />
              <label htmlFor="right" className="text1">Right</label>
            </div>
            {(userRole === "superAdmin" || addPaymentPermission == 1 || editPaymentPermission == 1) && (
              <button onClick={updateCurrency} className="primary-btn module-btn">Save</button>
            )}
          </div>

          <div className="strip_page">
            <h6 className="str_text">STRIPE</h6>

            <div className="currency_input2" id="strip_cur">
              <div className="priv">
                <label htmlFor="privatetestkey">Private Test Key</label>
                <input
                  type="text"
                  id="privatetestkey"
                  name="privateTestKey"
                  placeholder="Private Test Key"
                  className="col12input"
                  value={formData.keys.privateTestKey}
                  onChange={handleChange}
                />
              </div>{" "}
              <div className="priv">
                <label htmlFor="publictestkey">Public Test Key</label>
                <input
                  type="text"
                  id="publictestkey"
                  placeholder="Public Test Key"
                  className="col12input"
                  name="publicTestKey"
                  value={formData.keys.publicTestKey}
                  onChange={handleChange}
                />
              </div>{" "}
              <div className="priv">
                <label htmlFor="privatelivekey">Private Live Key</label>
                <input
                  type="text"
                  id="privatelivekey"
                  placeholder="Private Live Key"
                  className="col12input"
                  name="privateLiveKey"
                  value={formData.keys.privateLiveKey}
                  onChange={handleChange}
                />
              </div>{" "}
              <div className="priv">
                <label htmlFor="publiclivekey">Public Live Key</label>
                <input
                  type="text"
                  id="publiclivekey"
                  placeholder="Public Live Key"
                  className="col12input"
                  name="publicLiveKey"
                  value={formData.keys.publicLiveKey}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="status_test">
              <div className="status">
                <label htmlFor="stripeStatus" className="currency_title">Status :</label>
                <input
                  type="radio"
                  name="status"
                  id="enable"
                  value="1"
                  checked={formData.status == "1"}
                  onChange={handleChange}
                  className="status_icon"
                />
                <label htmlFor="enable" className="s_icon">Enable</label>
                <input
                  type="radio"
                  name="status"
                  value="0"
                  checked={formData.status == "0"}
                  onChange={handleChange}
                />
                <label htmlFor="disable" className="s_icon">Disable</label>
              </div>

              <div className="status" id="test">
                <label htmlFor="testMode" className="currency_title">Test Mode :</label>
                <input
                  type="radio"
                  name="enabled_test_mode"
                  value="1"
                  checked={formData.enabled_test_mode == "1"}
                  onChange={handleChange}
                  className="status_icon"
                />
                <label htmlFor="enable" className="s_icon">Enable</label>
                <input
                  type="radio"
                  name="enabled_test_mode"
                  value="0"
                  checked={formData.enabled_test_mode == "0"}
                  onChange={handleChange}
                />
                <label htmlFor="disable" className="s_icon">Disable</label>
              </div>
            </div>
            {(userRole === "superAdmin" || addPaymentPermission == 1 || editPaymentPermission == 1) && (
              <button onClick={handleSubmit} className="primary-btn module-btn">Save</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentSetting;
