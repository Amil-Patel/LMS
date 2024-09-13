import React from "react";
import "../../../assets/css/setting.css";
import Hoc from "../layout/Hoc";
function PaymentSetting() {
  return (
    <>
      <Hoc />

      <div className="main">
        <div class="main-top-bar">
          <div id="user-tag">
            <h5>Payment Setting</h5>
          </div>
          <div id="search-inner-hero-section">
            <input type="text" placeholder="Search" />
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div className="main_pay_sec">
          <div className="currency_page">
            <div className="currency_input">
              <p className="currency_title">Currency</p>
              <select name="cars" id="cars" form="carform">
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="JPY">Japanese Yen (JPY)</option>
                <option value="GBP">British Pound (GBP)</option>
                <option value="AUD">Australian Dollar (AUD)</option>
                <option value="CAD">Canadian Dollar (CAD)</option>
              </select>
            </div>

            <div className="cur_posi">
              <p className="currency_title">Currency Position</p>

              <input
                type="radio"
                name="fav_language"
                value="HTML"
                className="cur_sel"
              />
              <label for="left" className="text1">
                Left
              </label>
              <input
                type="radio"
                name="fav_language"
                value="CSS"
                className="cur_sel"
                id="right"
              />
              <label for="right" className="text1">
                Right
              </label>
            </div>
          </div>

          <div className="strip_page">
            <h6 className="str_text">STRIPE</h6>

            <div className="currency_input2" id="strip_cur">
              <p>Currency</p>
              <div className="carrency_div">
                <select
                  name="currency"
                  id="currency"
                  className="col12input"
                  form="currencyform"
                >
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="JPY">Japanese Yen (JPY)</option>
                  <option value="GBP">British Pound (GBP)</option>
                  <option value="AUD">Australian Dollar (AUD)</option>
                  <option value="CAD">Canadian Dollar (CAD)</option>
                </select>
              </div>
              <div className="priv">
                <p>Private Test Key</p>
                <input
                  type="text"
                  placeholder="Private Test Key"
                  className="col12input"
                />
              </div>{" "}
              <div className="priv">
                <p>Public Test Key</p>
                <input
                  type="text"
                  placeholder="Public Test Key"
                  className="col12input"
                />
              </div>{" "}
              <div className="priv">
                <p>Private Live Key</p>
                <input
                  type="text"
                  placeholder="Private Live Key"
                  className="col12input"
                />
              </div>{" "}
              <div className="priv">
                <p>Public Live Key</p>
                <input
                  type="text"
                  placeholder="Public Live Key"
                  className="col12input"
                />
              </div>
            </div>

            <div className="status_test">
              <div className="status">
                <p className="currency_title">Status :</p>
                <input
                  type="radio"
                  name="fav_language"
                  value="HTML"
                  className="status_icon"
                />
                <label for="enable" className="s_icon">
                  Enable
                </label>
                <input
                  type="radio"
                  name="fav_language"
                  value="CSS"
                  id="right"
                />
                <label for="disable" className="s_icon">
                  Disable
                </label>
              </div>

              <div className="status" id="test">
                <p className="currency_title">Test Mode :</p>
                <input
                  type="radio"
                  name="fav_language"
                  value="HTML"
                  className="status_icon"
                />
                <label for="enable" className="s_icon">
                  Enable
                </label>
                <input
                  type="radio"
                  name="fav_language"
                  value="CSS"
                  id="right"
                />
                <label for="disable" className="s_icon">
                  Disable
                </label>
              </div>
            </div>

            <button className="primary-btn module-btn">Save</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentSetting;
