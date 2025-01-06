import React, { useContext, useEffect, useState } from 'react';
import Hoc from "../layout/Hoc";
import Loading from '../layout/Loading';
import axiosInstance from '../../client/utils/axiosInstance';
import { userRolesContext } from '../layout/RoleContext';
import { notifySuccess } from '../layout/ToastMessage';
import useCheckRolePermission from '../layout/CheckRolePermission';
const port = process.env.REACT_APP_URL;

const GeneralSetting = () => {
    const { refreshSettings } = useContext(userRolesContext);
    const [loading, setLoading] = useState(false);
    const [timeZoneData, setTimeZoneData] = useState([]);
    const { userRole } = useContext(userRolesContext);
    const [selectedTimeZone, setSelectedTimeZone] = useState('');  // State for selected timezone
    const perm = useCheckRolePermission("Notification Setting");
    const editNotificationPermission = perm.length > 0 && perm[0].can_edit === 1 ? 1 : 0;
    // Fetch available timezones    
    const getTimeZone = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get(`${port}/gettingTimezoneData`);
            setTimeZoneData(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // Fetch current timezone by ID
    const gettimeZineWithId = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(`${port}/gettingTimezoneDataWithId`);
            setSelectedTimeZone(res.data.timezone);  // Set the current timezone to state
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // Update timezone
    const updateTimeZone = async () => {
        setLoading(true);
        console.log(selectedTimeZone)
        try {
            await axiosInstance.put(`${port}/updatingTimezone`, {
                timezonename: selectedTimeZone
            });
            await refreshSettings();
            getTimeZone();
            notifySuccess("Timezone updated successfully");
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getTimeZone();
        gettimeZineWithId();
    }, []);

    return (
        <>
            <Hoc />
            <div className="main">
                {loading && <Loading />}
                <div className="main-top-bar">
                    <div id="user-tag">
                        <h5>General Setting</h5>
                    </div>
                    <div id="search-inner-hero-section">
                        <input id="search" type="text" placeholder="Search" />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
                <div className="main_pay_sec">
                    <div className="currency_page">
                        <div className="currency_input">
                            <label htmlFor="currency" className="currency_title">Time Zone</label>
                            <select
                                name="currency"
                                id="currency"
                                value={selectedTimeZone}
                                onChange={(e) => setSelectedTimeZone(e.target.value)}
                            >
                                <option value="">Select Time Zone</option>
                                {
                                    timeZoneData.map((item, index) => (
                                        <option value={item.timezone} key={index}>{item.time_zone_name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    {(userRole === "superAdmin" || editNotificationPermission == 1) && (
                        <button className="primary-btn module-btn mt-5" onClick={updateTimeZone}>Save</button>
                    )}
                </div>
            </div>
        </>
    );
}

export default GeneralSetting;
