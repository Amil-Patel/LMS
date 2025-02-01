import React, { useContext, useEffect, useRef, useState } from 'react'
import Hoc from '../layout/Hoc';
import { userRolesContext } from "../layout/RoleContext";
import axiosInstance from '../utils/axiosInstance';
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import Loading from '../layout/Loading';
import { Editor } from "@tinymce/tinymce-react";
import moment from "moment-timezone";
const port = process.env.REACT_APP_URL

const EditCourse = () => {
    const { userId, setting } = useContext(userRolesContext);
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const [tab, setTab] = useState("basic-info");
    const [isTax, setIsTax] = useState(false);
    const [isLimited, setIsLimited] = useState(false);
    const [notNullCourseCategory, setNotNullCourseCategory] = useState([]);
    const getNullCourseCategoryData = async () => {
        setLoading(true)
        try {
            const res = await axiosInstance.get(`${port}/gettingNotNullCourseCategory`);
            setNotNullCourseCategory(res.data);
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    //get data for edit
    const [courseData, setCourseData] = useState({
        course_title: "",
        short_desc: "",
        long_desc: "",
        course_cate: '',
        course_level: "",
        course_language: "",
        drip_content: "",
        course_status: "",
        upcoming_course_thumbnail: null,
        publish_date: "",
        is_top_course: "",
        featured_course: "",
        course_faqs: [{ question: "", answer: "" }],
        course_requirenment: [''],
        course_topics: [''],
        course_price: "",
        course_discount: "",
        is_tax: "",
        tax_name: "",
        tax_rate: "",
        is_inclusive: "",
        is_exclusive: "",
        auther: [''],
        expiring_time: "",
        no_of_month: "",
        course_overview_link: "",
        course_thumbnail: null,
        meta_tag: [''],
        meta_keyword: [''],
        meta_desc: "",
        canonical_url: "",
        title_tag: "",
        updated_by: userId
    })

    const [userData, setUserData] = useState([]);
    const getUserData = async () => {
        try {
            const res = await axiosInstance.get(`${port}/gettingUserMasterDataWithId/${userId}`);
            setUserData(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    const getCourseData = async () => {
        setLoading(true)
        try {
            const res = await axiosInstance.get(`${port}/gettingCourseMasterDataWithId/${id}`);
            console.log(res.data)
            if (res.data.expiring_time === "limited_time") {
                setIsLimited(true);
            }
            if (res.data.is_tax === 1) {
                setIsTax(true);
            }
            // setup for auther
            let long_desc = res.data.long_desc;
            try {
                long_desc = JSON.parse(long_desc); // Removes outer escaped quotes
            } catch (e) {
                // If parsing fails, keep it as is
            }
            res.data.long_desc = long_desc?.replace(/^"|"$/g, "");
            let auther = res.data.auther;
            try {
                auther = JSON.parse(auther);
                if (typeof auther === 'string') {
                    auther = JSON.parse(auther);
                }
            } catch (e) {
                auther = [];
            }
            res.data.auther = Array.isArray(auther) ? auther : [];

            //set up for course_faqs
            let course_faqs = res.data.course_faqs;
            try {
                course_faqs = JSON.parse(course_faqs);
                if (typeof course_faqs === 'string') {
                    course_faqs = JSON.parse(course_faqs);
                }
            } catch (e) {
                course_faqs = [];
            }
            res.data.course_faqs = Array.isArray(course_faqs) ? course_faqs : [];
            //set up for course_requirenment
            let course_requirenment = res.data.course_requirenment;
            try {
                course_requirenment = JSON.parse(course_requirenment);
                if (typeof course_requirenment === 'string') {
                    course_requirenment = JSON.parse(course_requirenment);
                }
            } catch (e) {
                course_requirenment = [];
            }
            res.data.course_requirenment = Array.isArray(course_requirenment) ? course_requirenment : [];
            //set up for course_topics
            let course_topics = res.data.course_topics;
            try {
                course_topics = JSON.parse(course_topics);
                if (typeof course_topics === 'string') {
                    course_topics = JSON.parse(course_topics);
                }
            } catch (e) {
                course_topics = [];
            }
            res.data.course_topics = Array.isArray(course_topics) ? course_topics : [];

            //set up for meta_tag
            let meta_tag = res.data.meta_tag;
            try {
                meta_tag = JSON.parse(meta_tag);
                if (typeof meta_tag === 'string') {
                    meta_tag = JSON.parse(meta_tag);
                }
            } catch (e) {
                meta_tag = [];
            }
            res.data.meta_tag = Array.isArray(meta_tag) ? meta_tag : [];

            //set up for meta_keyword
            let meta_keyword = res.data.meta_keyword;
            try {
                meta_keyword = JSON.parse(meta_keyword);
                if (typeof meta_keyword === 'string') {
                    meta_keyword = JSON.parse(meta_keyword);
                }
            } catch (e) {
                meta_keyword = [];
            }
            res.data.meta_keyword = Array.isArray(meta_keyword) ? meta_keyword : [];
            const time = moment.unix(res.data.publish_date).tz(setting.timezone).format("YYYY-MM-DD");
            setCourseData((prevState) => ({
                ...prevState,
                ...res.data,
                publish_date: time,
            }));
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    };


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        let updatedFields = { ...courseData };

        if (type === "checkbox") {
            // Normalize checkbox values to 1 or 0
            updatedFields[name] = checked ? 1 : 0;
        } else {
            updatedFields[name] = value;
        }

        if (name === "tax_type") {
            updatedFields = {
                ...updatedFields,
                tax_type: value,
                is_inclusive: value === "inclusive" ? 1 : 0,
                is_exclusive: value === "exclusive" ? 1 : 0,
            };
        } else if (name === "is_life_time") {
            if (checked) {
                updatedFields = {
                    ...updatedFields,
                    expiring_time: "life_time",
                    is_life_time: 1,
                    is_limited: 0, // Uncheck "is_limited" when "is_life_time" is selected
                };
                setIsLimited(false)
            } else {
                updatedFields = { ...updatedFields, is_life_time: 0 };
            }
        } else if (name === "is_limited") {
            if (checked) {
                updatedFields = {
                    ...updatedFields,
                    expiring_time: "limited_time",
                    is_limited: 1,
                    is_life_time: 0, // Uncheck "is_life_time" when "is_limited" is selected
                };
                setIsLimited(true)
            } else {
                updatedFields = { ...updatedFields, is_limited: 0, expiring_time: "" };
            }
        }

        setCourseData(updatedFields);
    };

    const editorRef = useRef(null);
    const handleEditorChange = (content, editor) => {
        setCourseData((prevData) => ({
            ...prevData,
            long_desc: content,
        }));
    };
    const handleTax = () => {
        setIsTax(!isTax);
    }
    const handleLimited = () => {
        setIsLimited(!isLimited);
    }
    const [newImage, setNewImage] = useState(null)
    const [imageName, setImageName] = useState("")
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageName(file.name)
        if (file) {
            setCourseData({ ...courseData, course_thumbnail: file });
            setNewImage(file);
        }
    };

    const handleFaqChange = (index, event) => {
        const values = [...courseData.course_faqs];

        if (!values[index]) {
            values[index] = { question: "", answer: "" };
        }

        values[index][event.target.name] = event.target.value;

        setCourseData((prev) => ({ ...prev, course_faqs: values }));
    };


    const handleLearningChange = (index, event) => {
        const values = [...courseData.course_topics];
        values[index] = event.target.value;
        setCourseData((prev) => ({ ...prev, course_topics: values }));
    };

    const handleAddFaq = () => {
        setCourseData((prev) => ({ ...prev, course_faqs: [...prev.course_faqs, { question: "", answer: "" }] }));
    };

    const handleRemoveFaq = (index) => {
        const values = [...courseData.course_faqs];
        values.splice(index, 1);
        setCourseData((prev) => ({ ...prev, course_faqs: values }));
    };

    const handleAddLearning = () => {
        setCourseData((prev) => ({ ...prev, course_topics: [...prev.course_topics, ""] }))
    };

    const handleRemoveLearning = (index) => {
        const values = [...courseData.course_topics];
        values.splice(index, 1);
        setCourseData((prev) => ({ ...prev, course_topics: values }));
    };

    const handlePrerequisiteChange = (index, event) => {
        const newPrerequisites = [...courseData.course_requirenment];
        newPrerequisites[index] = event.target.value;
        setCourseData({ ...courseData, course_requirenment: newPrerequisites });
    };

    const handleAddPrerequisite = () => {
        setCourseData({ ...courseData, course_requirenment: [...courseData.course_requirenment, ""] });
    };

    const handleRemovePrerequisite = (index) => {
        const newPrerequisites = courseData.course_requirenment.filter((_, i) => i !== index);
        setCourseData({ ...courseData, course_requirenment: newPrerequisites });
    };

    const handleAddAuther = (e) => {
        if (e.key === "Enter" && e.target.value) {
            const newKeywords = e.target.value.split(",").map((kw) => kw.trim());
            setCourseData((prevState) => ({
                ...prevState,
                auther: [...(prevState.auther || []), ...newKeywords],
            }));
            e.target.value = "";
        }
    };
    const handleRemoveAuther = (indexToRemove) => {
        setCourseData({
            ...courseData,
            auther: courseData.auther.filter(
                (_, index) => index !== indexToRemove
            ),
        });
    };
    const handleAddKeywords = (e) => {
        if (e.key === "Enter" && e.target.value) {
            const newTags = e.target.value.split(",").map((tag) => tag.trim());
            setCourseData((prevState) => ({
                ...prevState,
                meta_keyword: [...(prevState.meta_keyword || []), ...newTags],
            }))
            e.target.value = "";
        }
    };
    const handleAddTags = (e) => {
        if (e.key === "Enter" && e.target.value) {
            const newTags = e.target.value.split(",").map((tag) => tag.trim());
            setCourseData((prevState) => ({
                ...prevState,
                meta_tag: [...(prevState.meta_tag || []), ...newTags],
            }))
            e.target.value = "";
        }
    };

    const handleRemoveKeyword = (indexToRemove) => {
        setCourseData({
            ...courseData,
            meta_keyword: courseData.meta_keyword.filter(
                (_, index) => index !== indexToRemove
            ),
        });
    };
    const handleRemoveTag = (indexToRemove) => {
        setCourseData({
            ...courseData,
            meta_tag: courseData.meta_tag.filter(
                (_, index) => index !== indexToRemove
            ),
        });
    };
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("course_title", courseData.course_title);
        formData.append('short_desc', courseData.short_desc);
        formData.append('long_desc', courseData.long_desc);
        formData.append('course_cate', courseData.course_cate);
        formData.append('course_level', courseData.course_level);
        formData.append('course_language', courseData.course_language);
        formData.append('drip_content', courseData.drip_content);
        formData.append('course_status', courseData.course_status);
        formData.append('upcoming_course_thumbnail', courseData.upcoming_course_thumbnail);
        formData.append('publish_date', courseData.publish_date);
        formData.append('is_top_course', courseData.is_top_course);
        formData.append('featured_course', courseData.featured_course);
        formData.append('course_faqs', courseData.course_faqs);
        formData.append('course_topics', courseData.course_topics);
        formData.append('course_requirenment', courseData.course_requirenment);
        formData.append('course_price', courseData.course_price);
        formData.append('course_discount', courseData.course_discount);
        formData.append('is_tax', courseData.is_tax);
        formData.append('tax_name', courseData.tax_name);
        formData.append('tax_rate', courseData.tax_rate);
        formData.append('is_inclusive', courseData.is_inclusive);
        formData.append('is_exclusive', courseData.is_exclusive);
        formData.append('auther', courseData.auther);
        formData.append('expiring_time', courseData.expiring_time);
        formData.append('no_of_month', courseData.no_of_month);
        formData.append('course_overview_link', courseData.course_overview_link);
        formData.append('course_thumbnail', courseData.course_thumbnail);
        formData.append('meta_tag', courseData.meta_tag);
        formData.append('meta_keyword', courseData.meta_keyword);
        formData.append('meta_desc', courseData.meta_desc);
        formData.append('canonical_url', courseData.canonical_url);
        formData.append('title_tag', courseData.title_tag)
        formData.append('updated_by', courseData.updated_by)
        try {
            const res = await axiosInstance.put(`${port}/updatingCourseMaster/${id}`, courseData
            );
            navigate('/admin/all-course');
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };


    useEffect(() => {
        getCourseData();
        getNullCourseCategoryData();
        getUserData();
    }, [])



    const handleButtonClick = () => {
        document.getElementById("fileInput").click();
    };

    const handleChangeTab = (tabName) => {
        setTab(tabName);
    };

    return (
        <>
            <Hoc />
            <div className="main">
                {loading && <Loading />}
                <div className="main-top-bar">
                    <div id="user-tag">
                        <h5>Courses</h5>
                    </div>
                    <div id="search-inner-hero-section">
                        <input type="text" placeholder="Search" />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div className="hero-inner-logo">
                        <img
                            src={require("../../../assets/image/pdf-logo.png")}
                            alt="PDF Logo"
                        />
                        <img
                            src={require("../../../assets/image/x-logo.png")}
                            alt="X Logo"
                        />
                    </div>
                    <a className="primary-btn module-btn" onClick={handleSubmit} style={{ cursor: "pointer" }}>
                        <span className="text">Save</span>
                    </a>
                </div>

                <div className="admin-panel-tab-bar">
                    <ul className="tab">
                        <li onClick={() => handleChangeTab("basic-info")}>
                            <NavLink className={tab === "basic-info" ? "active-tab" : ""}>BASIC INFO</NavLink>
                        </li>
                        |
                        <li onClick={() => handleChangeTab("course")}>
                            <NavLink className={tab === "course" ? "active-tab" : ""}>COURSE DESCRIPTIONS</NavLink>
                        </li>
                        |
                        <li onClick={() => handleChangeTab("additional")}>
                            <NavLink className={tab === "additional" ? "active-tab" : ""}>ADDITIONAL INFO</NavLink>
                        </li>
                        |
                        <li onClick={() => handleChangeTab("seo")}>
                            <NavLink className={tab === "seo" ? "active-tab" : ""}>SEO</NavLink>
                        </li>
                    </ul>
                </div>

                <div className="course-form-container">
                    {/* Basic Info Tab */}
                    {tab == "basic-info" && (
                        <form>
                            {/* course title / desc */}
                            <div className="form-group">
                                <label>
                                    Course Title<span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="course_title"
                                    value={courseData.course_title}
                                    onChange={handleChange}
                                    className="col12input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Short Description</label>
                                <textarea
                                    type="text"
                                    name="short_desc"
                                    value={courseData.short_desc}
                                    onChange={handleChange}
                                    className="col12input"
                                />
                            </div>

                            {/* course category / level / language */}
                            <div className="flex-row flex-row80">
                                <div className="form-group mb-0" style={{ width: "32%" }}>
                                    <label>
                                        Course Category<span className="required">*</span>
                                    </label>
                                    <select className="col12input" name="course_cate" value={courseData.course_cate} onChange={handleChange}>
                                        <option value="">Select Category</option>
                                        {
                                            notNullCourseCategory.map((category, index) => (
                                                <option key={index} value={category.id}>
                                                    {category.cate_title}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="form-group mb-0" style={{ width: "32%" }}>
                                    <label>Course Level</label>
                                    <select className="col12input" name="course_level" value={courseData.course_level} onChange={handleChange}>
                                        <option value="">Select Level</option>
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                </div>

                                <div className="form-group mb-0" style={{ width: "32%" }}>
                                    <label>
                                        Course Language<span className="required">*</span>
                                    </label>
                                    <select className="col12input" name="course_language" value={courseData.course_language} onChange={handleChange}>
                                        <option value="">Select Language</option>
                                        <option value="english">English</option>
                                        <option value="hindi">Hindi</option>
                                    </select>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    width: "90%",
                                    justifyContent: "space-between",
                                }}
                            >
                                {/* course price / discount */}
                                <div className="flex-row flex-row40">
                                    <div className="form-group mb-0" style={{ width: "48%" }}>
                                        <label>
                                            Course Price<span className="required">*</span>
                                        </label>
                                        <input type="number" className="col12input" name="course_price" onChange={handleChange} value={courseData.course_price} />
                                    </div>

                                    <div className="form-group mb-0" style={{ width: "48%" }}>
                                        <label>Course Discount %</label>
                                        <input type="text" className="col12input" name="course_discount" onChange={handleChange} value={courseData.course_discount} />
                                    </div>
                                </div>

                                {/* status / publish date */}
                                <div className="flex-row flex-row40">
                                    <div className="form-group mb-0" style={{ width: courseData.course_status === "upcoming" ? "48%" : "96%" }}
                                    >
                                        <label>Status</label>
                                        <select className="col12input" name="course_status" value={courseData.course_status} onChange={handleChange}>
                                            <option value="">Select Status</option>
                                            <option value="active">Active</option>
                                            <option value="private">Private</option>
                                            <option value="upcoming">Upcoming</option>
                                        </select>
                                    </div>

                                    {
                                        courseData.course_status == "upcoming" && (
                                            <div className="form-group mb-0" style={{ width: "48%" }}>
                                                <label>Publish Date</label>
                                                <input
                                                    type="date"
                                                    name="publish_date"
                                                    onChange={handleChange}
                                                    value={courseData.publish_date || 0}
                                                    className="col12input"
                                                />
                                            </div>
                                        )
                                    }

                                </div>
                            </div>

                            {/* tax / taxt name / rate / type */}
                            <div
                                className="flex-row flex-row80"
                                style={{ width: "85%", gap: "20px" }}
                            >
                                <div className="chekbox">
                                    <input type="checkbox" name="is_tax" checked={courseData.is_tax} onClick={handleTax} onChange={handleChange} />
                                    <label>Tax</label>
                                </div>
                                {
                                    isTax && (
                                        <>
                                            <div className="form-group mb-0" style={{ width: "32%" }}>
                                                <label>
                                                    Tax Name<span className="required">*</span>
                                                </label>
                                                <input type="text" className="col12input" name="tax_name" onChange={handleChange} value={courseData.tax_name} />
                                            </div>

                                            <div className="form-group mb-0" style={{ width: "32%" }}>
                                                <label>
                                                    Tax Rate
                                                    <label>
                                                        <span className="required">*</span>
                                                    </label>
                                                </label>
                                                <input type="text" className="col12input" name="tax_rate" onChange={handleChange} value={courseData.tax_rate} />
                                            </div>

                                            <div className="form-group mb-0" style={{ width: "32%" }}>
                                                <label>
                                                    Type <span className="required">*</span>
                                                </label>
                                                <select className="col12input" value={courseData.is_inclusive == 1 ? "inclusive" : "exclusive"} name="tax_type" onChange={handleChange}>
                                                    <option value="">Select Tax Type</option>
                                                    <option value="inclusive">Is Inclusive</option>
                                                    <option value="exclusive">Is Exclusive</option>
                                                </select>
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    !isTax && (
                                        <>
                                            <div className="form-group mb-0" style={{ width: "100%", fontSize: "13px" }}>
                                                When You will check the box, you can add tax to the course.
                                            </div>
                                        </>
                                    )
                                }

                            </div>

                            {/* life time / limited time / expire time */}
                            <div style={{ display: "flex" }}>
                                <div className="flex-row" style={{ width: isLimited ? "43%" : "26%" }}>
                                    <div className="chekbox2">
                                        <input type="checkbox" name="is_life_time" checked={courseData.expiring_time == "life_time"} onChange={handleChange} />
                                        <label>Life Time</label>
                                    </div>
                                    <div className="chekbox2">
                                        <input type="checkbox" name="is_limited" onClick={handleLimited} checked={isLimited} onChange={handleChange} />
                                        <label>Limited Time</label>
                                    </div>
                                    {
                                        isLimited && (
                                            <div className="form-group mb-0" style={{ width: "32%" }}>
                                                <label>
                                                    Limited Time <span className="required">*</span>
                                                </label>
                                                <input type="text" className="col12input" name="no_of_month" onChange={handleChange} value={courseData.no_of_month} />
                                            </div>
                                        )
                                    }
                                </div>

                                <div
                                    className="flex-row"
                                    style={{
                                        width: "50%",
                                        border: "none",
                                        marginLeft: "30px",
                                        alignItems: "end",
                                        gap: "20px",
                                        justifyContent: "normal"
                                    }}
                                >
                                    <div className="form-group mb-0" style={{ width: "50%" }}>
                                        <label>
                                            Course Thumbnail <span className="required">*</span>
                                        </label>
                                        <input type="text" className="col12input" name="course_thumbnail" value={imageName ? imageName : courseData.course_thumbnail}
                                            readOnly />
                                    </div>

                                    <button
                                        className="primary-btn module-btn"
                                        type="button"
                                        onClick={handleButtonClick}
                                    >
                                        Browse
                                    </button>

                                    <input
                                        id="fileInput"
                                        type="file"
                                        name="course_thumbnail"
                                        style={{ display: "none" }}
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    <div>
                                        {newImage ? (
                                            <img
                                                src={URL.createObjectURL(newImage)}
                                                style={{ width: "67px", maxHeight: "67px" }}
                                                alt="Selected Thumbnail"
                                            />
                                        ) : courseData.course_thumbnail ? (
                                            <img
                                                src={`../../upload/${courseData.course_thumbnail}`}
                                                style={{ width: "67px", maxHeight: "67px" }}
                                                alt="Course Thumbnail"
                                            />
                                        ) : (
                                            <img
                                                src={require("../../../assets/image/default-thumbnail.png")}
                                                style={{ width: "67px", maxHeight: "67px" }}
                                                alt="Default Thumbnail"
                                            />
                                        )}
                                    </div>

                                </div>
                            </div>

                            {/* course overview link */}
                            <div style={{ display: "flex" }}>
                                <div className="flex-row flex-row40" style={{ border: "none" }}>
                                    <div className="form-group mb-0" style={{ width: "90%" }}>
                                        <label>Course OverView Link</label>
                                        <input
                                            type="text"
                                            name="course_overview_link"
                                            onChange={handleChange}
                                            value={courseData.course_overview_link}
                                            className="col12input"
                                        />
                                        <div style={{ display: "flex", marginTop: "10px" }}>
                                            <div className="chekbox2">
                                                <input type="checkbox" name="drip_content" checked={courseData.drip_content} onChange={handleChange} />
                                                <label>Drip Content</label>
                                            </div>
                                            <div className="chekbox2">
                                                <input type="checkbox" name="featured_course" checked={courseData.featured_course} onChange={handleChange} />
                                                <label>Featured Course</label>
                                            </div>
                                            <div className="chekbox2">
                                                <input type="checkbox" name="is_top_course" checked={courseData.is_top_course} onChange={handleChange} />
                                                <label>Top Course</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-row flex-row40" style={{ border: "none" }}>
                                    <div className="form-group mb-0" style={{ width: "90%" }}>
                                        <label>Author</label>
                                        <small className="text-muted ms-2">(↵ Press Enter to add author)</small>
                                        <input
                                            type="text"
                                            name="auther"
                                            placeholder="Enter One Or More Author"
                                            className="col12input"
                                            onKeyDown={handleAddAuther}
                                        />
                                        <div className="tag-container">
                                            {Array.isArray(courseData.auther) && courseData.auther.map((keyword, index) => (
                                                <div className="tag" key={index}>
                                                    <span>{keyword}</span>
                                                    {userData?.first_name == keyword ?
                                                        ""
                                                        : (
                                                            <span
                                                                onClick={() => handleRemoveAuther(index)}
                                                                className="tag-close"
                                                            >
                                                                <i className="fa-solid fa-xmark"></i>
                                                            </span>
                                                        )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}

                    {/* Course Description TAB */}
                    {tab == "course" && (
                        <div className="description-container">
                            <label htmlFor="courseDescription" className="description-label mb-2">
                                Long Description
                            </label>
                            <Editor
                                apiKey='1ufup43ij0id27vrhewjb9ez5hf6ico9fpkd8qwsxje7r5bo'
                                onInit={(evt, editor) => (editorRef.current = editor)}
                                value={courseData.long_desc}
                                init={{
                                    height: 500,
                                    menubar: true,
                                    plugins: [
                                        "advlist",
                                        "autolink",
                                        "lists",
                                        "link",
                                        "image",
                                        "charmap",
                                        "preview",
                                        "anchor",
                                        "searchreplace",
                                        "visualblocks",
                                        "code",
                                        "fullscreen",
                                        "insertdatetime",
                                        "media",
                                        "table",
                                        "code",
                                        "help",
                                        "wordcount",
                                    ],
                                    toolbar:
                                        "undo redo | blocks | " +
                                        "bold italic forecolor | alignleft aligncenter " +
                                        "alignright alignjustify | bullist numlist outdent indent | " +
                                        "removeformat | help",
                                }}
                                onEditorChange={(content, editor) => {
                                    handleEditorChange(content, editor)
                                }
                                }
                            />
                        </div>
                    )}

                    {/* Additional INFO TAB */}
                    {tab == "additional" && (
                        <div className="faq-section">
                            <div className="section">
                                <label htmlFor="courseDescription" className="description-label">
                                    FAQS
                                </label>
                                {courseData.course_faqs.map((faq, index) => (
                                    <div key={index} className="faq-item">
                                        {/* FAQ Question with Button on the Right */}
                                        <div className="input-button">
                                            <input
                                                type="text"
                                                name="question"
                                                value={faq.question}
                                                onChange={(event) => handleFaqChange(index, event)}
                                                className="col12input"
                                            />

                                            {/* Add/Remove Button */}
                                            <button
                                                className={`faq-button ${index === courseData.course_faqs.length - 1 ? "add" : "remove"
                                                    }`}
                                                onClick={
                                                    index === courseData.course_faqs.length - 1
                                                        ? handleAddFaq
                                                        : () => handleRemoveFaq(index)
                                                }
                                            >
                                                {index === courseData.course_faqs.length - 1 ? "+" : "-"}
                                            </button>
                                        </div>

                                        {/* FAQ Answer */}
                                        <textarea
                                            style={{
                                                width: "calc(100% - 41px)",
                                                marginRight: "41px",
                                            }}
                                            name="answer"
                                            value={faq.answer}
                                            onChange={(event) => handleFaqChange(index, event)}
                                            placeholder="Your FAQS Answer Description Here"
                                            className="textarea-field col12input"
                                        />
                                    </div>
                                ))}

                                {/* Ensure at least one FAQ input is shown if the array is empty */}
                                {courseData.course_faqs.length === 0 && (
                                    <div className="faq-item">
                                        <div className="input-button">
                                            <input
                                                type="text"
                                                name="question"
                                                value=""
                                                onChange={(event) => handleFaqChange(0, event)}
                                                className="col12input"
                                            />
                                            <button className="faq-button add" onClick={handleAddFaq}>
                                                +
                                            </button>
                                        </div>
                                        <textarea
                                            style={{
                                                width: "calc(100% - 41px)",
                                                marginRight: "41px",
                                            }}
                                            name="answer"
                                            value=""
                                            onChange={(event) => handleFaqChange(0, event)}
                                            placeholder="Your FAQS Answer Description Here"
                                            className="textarea-field col12input"
                                        />
                                    </div>
                                )}

                            </div>

                            <div className="section">
                                <label htmlFor="courseDescription" className="description-label">
                                    What You Will Learn ?
                                </label>
                                {
                                    courseData.course_topics.length === 0 ? (
                                        <div className="learning-item">
                                            <input
                                                type="text"
                                                value=""
                                                onChange={(event) => handleLearningChange(0, event)}
                                                placeholder="Enter Topics detail what you will learn"
                                                className="col12input input-space"
                                            />
                                            <button
                                                className="faq-button add"
                                                onClick={handleAddLearning}
                                            >
                                                +
                                            </button>
                                        </div>
                                    ) : (
                                        courseData.course_topics.map((point, index) => (
                                            <div key={index} className="learning-item">
                                                <input
                                                    type="text"
                                                    value={point}
                                                    onChange={(event) => handleLearningChange(index, event)}
                                                    placeholder="Enter Topics detail what you will learn"
                                                    className="col12input input-space"
                                                />
                                                <button
                                                    className={`faq-button ${index === courseData.course_topics.length - 1 ? "add" : "remove"}`}
                                                    onClick={
                                                        index === courseData.course_topics.length - 1
                                                            ? handleAddLearning
                                                            : () => handleRemoveLearning(index)
                                                    }
                                                >
                                                    {index === courseData.course_topics.length - 1 ? "+" : "-"}
                                                </button>
                                            </div>
                                        ))
                                    )
                                }

                            </div>

                            <div className="section">
                                <label htmlFor="courseDescription" className="description-label">
                                    Prerequisites
                                </label>
                                {
                                    courseData.course_requirenment.length === 0 ? (
                                        <div className="learning-item">
                                            <input
                                                type="text"
                                                value=""
                                                onChange={(event) => handlePrerequisiteChange(0, event)}
                                                placeholder="Enter prerequisite"
                                                className="col12input input-space"
                                            />
                                            <button
                                                className="faq-button add"
                                                onClick={handleAddPrerequisite}
                                            >
                                                +
                                            </button>
                                        </div>
                                    ) : (
                                        courseData.course_requirenment.map((point, index) => (
                                            <div key={index} className="learning-item">
                                                <input
                                                    type="text"
                                                    name="course_requirenment"
                                                    value={point}
                                                    onChange={(event) => handlePrerequisiteChange(index, event)}
                                                    className="col12input input-space"
                                                />
                                                <button
                                                    className={`faq-button ${index === courseData.course_requirenment.length - 1 ? "add" : "remove"}`}
                                                    onClick={
                                                        index === courseData.course_requirenment.length - 1
                                                            ? handleAddPrerequisite
                                                            : () => handleRemovePrerequisite(index)
                                                    }
                                                >
                                                    {index === courseData.course_requirenment.length - 1 ? "+" : "-"}
                                                </button>
                                            </div>
                                        ))
                                    )
                                }

                            </div>
                        </div>
                    )}

                    {/* SEO TAB */}
                    {tab == "seo" && (
                        <div className="meta-form">
                            <div className="form-group">
                                <label>Meta Title</label>
                                <input
                                    type="text"
                                    name="title_tag"
                                    onChange={handleChange}
                                    value={courseData.title_tag}
                                    className="col12input"
                                />
                            </div>

                            <div className="form-group">
                                <label>Canonical URL</label>
                                <input
                                    type="text"
                                    name="canonical_url"
                                    onChange={handleChange}
                                    value={courseData.canonical_url}
                                    className="col12input"
                                />
                            </div>

                            <div className="form-group">
                                <label>Meta Keywords</label>
                                <input
                                    type="text"
                                    name="meta_keywords"
                                    className="col12input"
                                    onKeyDown={handleAddKeywords}
                                />
                                <div className="tag-container">
                                    {courseData.meta_keyword.map((keyword, index) => (
                                        <div className="tag" key={index}>
                                            <span>{keyword}</span>
                                            <span
                                                className="tag-close"
                                                onClick={() => handleRemoveKeyword(index)}
                                            >
                                                <i className="fa-solid fa-xmark"></i>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Meta Tags</label>
                                <input
                                    type="text"
                                    name="meta_tag"
                                    className="col12input"
                                    placeholder="Enter Your Tags here, separated by commas"
                                    onKeyDown={handleAddTags}
                                />
                                <div className="tag-container">
                                    {courseData.meta_tag.map((tag, index) => (
                                        <div className="tag" key={index}>
                                            <span>{tag}</span>
                                            <span
                                                className="tag-close"
                                                onClick={() => handleRemoveTag(index)}
                                            >
                                                <i className="fa-solid fa-xmark"></i>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="meta-description">
                                <div className="form-group">
                                    <label>Meta Description</label>
                                    <textarea
                                        placeholder="Describe Your Meta Description over Here"
                                        name="meta_desc"
                                        onChange={handleChange}
                                        value={courseData.meta_desc}
                                        className="col12input"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div >
        </>
    )
}

export default EditCourse