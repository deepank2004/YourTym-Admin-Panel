import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import PartnerProfile from "./PartnerProfile";
import endPoints from "../../Repository/apiConfig";
import { getApi, deleteApi } from "../../Repository/Api";
import { useParams } from "react-router-dom";
import "./PartnerHub.css";

const PartnerHub = () => {
    const { id } = useParams();

    const [partnerData, setPartnerData] = useState({});
    const [loading, setLoading] = useState(false);
    const [removeLoading, setRemoveLoading] = useState(false);

    const fetchPartnerData = useCallback(async () => {
        await getApi(endPoints.getuserbyid(id), {
            setResponse: setPartnerData,
            setLoading,
            errorMsg: "Failed to fetch partner hub details!",
        });
    }, [id]);

    useEffect(() => {
        fetchPartnerData();
    }, [fetchPartnerData]);

    const findPartnerObject = (obj) => {
        if (!obj || typeof obj !== "object") return null;

        if (obj.hubId || obj.hubAreaId) return obj;

        for (const key in obj) {
            const found = findPartnerObject(obj[key]);
            if (found) return found;
        }

        return null;
    };

    const partner = findPartnerObject(partnerData);

    const hub = partner?.hubId;
    const hubArea = partner?.hubAreaId;

    const hubId =
        typeof hub === "object"
            ? hub?._id
            : hub || hubArea?.hubId;

    const hubAreaId =
        typeof hubArea === "object"
            ? hubArea?._id
            : hubArea;

    const hubAreaName =
        typeof hubArea === "object"
            ? hubArea?.name || hubArea?.slug || "N/A"
            : "N/A";

    const partnerId = partner?._id || id;

    const isAssigned = Boolean(hubId && hubAreaId);

    const handleRemovePartner = async () => {
        if (!isAssigned) {
            alert("Partner is not assigned to any hub");
            return;
        }

        const confirmRemove = window.confirm(
            "Are you sure you want to remove this partner from hub?"
        );

        if (!confirmRemove) return;

        await deleteApi(
            endPoints.removePartnerFromHub(hubId, hubAreaId, partnerId),
            {
                setLoading: setRemoveLoading,
                successMsg: "Partner removed from hub successfully!",
                errorMsg: "Failed to remove partner from hub!",
            }
        );

        fetchPartnerData();
    };

    return (
        <>
            <PartnerProfile active="Hub" />

            <div className="userspayments">
                <div className="partnerhub-container">
                    <div className="partnerhub-details-card">
                        <h4>Hub Details</h4>

                        {loading ? (
                            <p>Loading hub details...</p>
                        ) : !isAssigned ? (
                            <p>Partner is not assigned to any hub.</p>
                        ) : (
                            <>
                                <div className="partnerhub-info">
                                    <label>Hub ID</label>
                                    <p>{hubId}</p>
                                </div>

                                <div className="partnerhub-info">
                                    <label>Hub Area ID</label>
                                    <p>{hubAreaId}</p>
                                </div>

                                <div className="partnerhub-info">
                                    <label>Hub Area Name</label>
                                    <p>{hubAreaName}</p>
                                </div>

                                <button
                                    className="remove-partner-hub-btn"
                                    onClick={handleRemovePartner}
                                    disabled={removeLoading}
                                >
                                    {removeLoading ? "Removing..." : "Remove Partner From Hub"}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HOC(PartnerHub);