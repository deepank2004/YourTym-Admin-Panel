import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { useNavigate, useParams } from "react-router-dom";
import endPoints from "../../Repository/apiConfig";
import { getApi, postApi } from "../../Repository/Api";

import { LiaArrowLeftSolid } from "react-icons/lia";
import img from "../../assest/loading1.gif";

import ReactQuill from "react-quill";

const EditPlan = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState("");
  const [loading1, setLoading1] = useState(false);

  const fetchData = useCallback(async () => {
    await getApi(endPoints.getplanbyid(id), {
      setResponse: (response) => {
        setName(response?.data?.name || "");
        setType(response?.data?.type || "");
        setPrice(response?.data?.price || "");
        setDescription(response?.data?.description || "");
      },
      setLoading: setLoading,
      errorMsg: "Failed to fetch data!",
    });
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  const handleSubmit = async () => {
    const payload = {
      name: name,
      type: type,
      price: price,
      description: description,
    };

    await postApi(endPoints.updateSubsacription(id), payload, {
      setLoading: setLoading1,
      successMsg: "Subscription updated successfully!",
      errorMsg: "Failed to update subscription!",
    });
    navigate("/monthlysubscription");
  };

  const fullToolbarOptions = [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["clean"],
  ];
  return (
    <>
      <div className="userprofilecontainer">
        <div className="partnerprofile-container">
          <div className="userprofile-header">
            <LiaArrowLeftSolid
              color="#000000"
              size={25}
              onClick={() => navigate(-1)}
            />
            <h6>Edit Plan</h6>
          </div>
          <div className="addserivce-btn">
            <button onClick={handleSubmit} disabled={loading1}>
              {loading1 ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
        {loading ? (
          <div className="normalloading">
            <img src={img} alt="" />
          </div>
        ) : (
          <>
            <div
              className="addsubcategory-left-div"
              style={{ marginTop: "1rem" }}
            >
              <div className="addservice-left-div">
                <label htmlFor="">Subscription Plan</label>
                <input
                  type="text"
                  placeholder="Plan Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="addservice-left-div">
                <label htmlFor="">Price</label>
                <input
                  type="number"
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="addservice-left-div">
                <label htmlFor="">Plan Duration</label>
                <select
                  name=""
                  id=""
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">Choose</option>
                  <option value="Week">Week</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
            </div>
            <div className="addservice-left-div">
              <label htmlFor="">Description</label>
              <div className="custom-quill-wrapper">
                <ReactQuill
                  theme="snow"
                  modules={{ toolbar: fullToolbarOptions }}
                  value={description}
                  onChange={setDescription}
                  className="custom-quill-editor"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HOC(EditPlan);
