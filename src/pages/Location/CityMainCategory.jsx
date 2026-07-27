import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

import HOC from '../../components/HOC/HOC';
import { DeleteConfirmation } from '../../components/Modals/Modals';
import { deleteApi, getApi, postApi, putApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';
import loadingImage from '../../assest/loading1.gif';

const getItems = (response) => {
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.data)) return response.data;
    if (Array.isArray(response?.data?.docs)) return response.data.docs;
    if (Array.isArray(response?.results)) return response.results;
    return [];
};

const getId = (value) => typeof value === 'object' ? value?._id : value;
const getName = (value, fallback = 'N/A') =>
    typeof value === 'object' ? (value?.name || fallback) : fallback;

const CityMainCategoryModal = ({ show, onHide, data, onSaved }) => {
    const [cityId, setCityId] = useState('');
    const [mainCategoryId, setMainCategoryId] = useState('');
    const [active, setActive] = useState(true);
    const [cities, setCities] = useState([]);
    const [mainCategories, setMainCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const isEdit = Boolean(data?._id);

    useEffect(() => {
        if (!show) return;

        setCityId(getId(data?.cityId || data?.city) || '');
        setMainCategoryId(getId(data?.mainCategoryId || data?.mainCategory) || '');
        setActive(data?.active ?? true);

        Promise.all([
            getApi(endPoints.getcity, { errorMsg: 'Failed to fetch cities!' }),
            getApi(endPoints.getallMaincategory, { errorMsg: 'Failed to fetch main categories!' }),
        ]).then(([cityResponse, categoryResponse]) => {
            setCities(getItems(cityResponse));
            setMainCategories(getItems(categoryResponse));
        }).catch(() => {});
    }, [show, data]);

    const handleSubmit = async () => {
        if (!cityId || !mainCategoryId) {
            toast.error('Please select a city and main category!');
            return;
        }

        const payload = { cityId, mainCategoryId, active };

        try {
            if (isEdit) {
                await putApi(endPoints.updateCityMainCategory(data._id), payload, {
                    setLoading,
                    successMsg: 'City main category updated successfully!',
                    errorMsg: 'Failed to update city main category!',
                });
            } else {
                await postApi(endPoints.addCityMainCategory, payload, {
                    setLoading,
                    successMsg: 'City main category added successfully!',
                    errorMsg: 'Failed to add city main category!',
                });
            }
            await onSaved();
            onHide();
        } catch (_) {
            // The shared API helper displays the server error and keeps the modal open.
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="md" centered>
            <Modal.Body>
                <div className="referralusermodal-container">
                    <div className="referralusermodal-header">
                        <h6>{isEdit ? 'Edit City Main Category' : 'Add City Main Category'}</h6>
                        <IoMdClose size={25} onClick={onHide} />
                    </div>
                    <div className="addfund-main">
                        <div className="addcategory-container">
                            <label>Select City</label>
                            <select value={cityId} onChange={(event) => setCityId(event.target.value)}>
                                <option value="">Select City</option>
                                {cities.map((city) => <option key={city._id} value={city._id}>{city.name}</option>)}
                            </select>
                        </div>
                        <div className="addcategory-container">
                            <label>Select Main Category</label>
                            <select value={mainCategoryId} onChange={(event) => setMainCategoryId(event.target.value)}>
                                <option value="">Select Main Category</option>
                                {mainCategories.map((category) => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="addcategory-container">
                            <label>Status</label>
                            <select value={String(active)} onChange={(event) => setActive(event.target.value === 'true')}>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>
                        <div className="addfund-btns">
                            <div className="userlist5">
                                <button onClick={handleSubmit} disabled={loading}>
                                    {loading ? (isEdit ? 'Updating...' : 'Adding...') : (isEdit ? 'Update' : 'Add')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const CityMainCategory = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const items = useMemo(() => getItems(response), [response]);

    const fetchData = useCallback(async () => {
        try {
            await getApi(endPoints.getCityMainCategories, {
                setResponse,
                setLoading,
                errorMsg: 'Failed to fetch city main categories!',
            });
        } catch (_) {}
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    const confirmDelete = async () => {
        if (!itemToDelete) return;
        try {
            await deleteApi(endPoints.deleteCityMainCategory(itemToDelete), {
                setLoading: setDeleteLoading,
                successMsg: 'City main category deleted successfully!',
                errorMsg: 'Failed to delete city main category!',
            });
            setItemToDelete(null);
            await fetchData();
        } catch (_) {}
    };

    return (
        <>
            <CityMainCategoryModal
                show={showModal}
                onHide={() => { setShowModal(false); setSelectedItem(null); }}
                data={selectedItem}
                onSaved={fetchData}
            />
            <DeleteConfirmation
                show={Boolean(itemToDelete)}
                onHide={() => setItemToDelete(null)}
                onConfirm={confirmDelete}
                loading={deleteLoading}
            />
            <div className="userlistcontainer">
                <div className="userlist1">
                    <div className="userlist2"><h6>Location</h6></div>
                    <div className="userlist3">
                        <div className="userlist5">
                            <button onClick={() => setShowModal(true)}>Add new</button>
                        </div>
                    </div>
                </div>
                <div className="servicetnasctioncontainer">
                    <Link to="/location/cities" className="link"><div className="servicetnasction"><h6>Cities</h6></div></Link>
                    <Link to="/location/areas" className="link"><div className="servicetnasction"><h6>Areas</h6></div></Link>
                    <Link to="/location/city-main-categories" className="link">
                        <div className="servicetnasctionactive"><h6>City Main Categories</h6></div>
                    </Link>
                </div>
                <div className="userlist6">
                    <div className="bottomdashboard3">
                        <table>
                            <thead><tr><th>S.No</th><th>City Name</th><th>Main Category</th><th>Status</th><th>Action</th></tr></thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="5" className="tableloading"><img src={loadingImage} alt="Loading" /></td></tr>
                                ) : items.length === 0 ? (
                                    <tr><td colSpan="5" className="tableloading"><p>No data available.</p></td></tr>
                                ) : items.map((item, index) => {
                                    const city = item.cityId || item.city;
                                    const category = item.mainCategoryId || item.mainCategory;
                                    return (
                                        <tr key={item._id || index}>
                                            <td>#{index + 1}</td>
                                            <td>{getName(city, getId(city) || 'N/A')}</td>
                                            <td>{getName(category, getId(category) || 'N/A')}</td>
                                            <td style={{ color: item.active ? '#3FB031' : '#B60B0B' }}>{item.active ? 'Active' : 'Inactive'}</td>
                                            <td className="div-icons">
                                                <FaEdit onClick={() => { setSelectedItem(item); setShowModal(true); }} />
                                                <MdDelete onClick={() => setItemToDelete(item._id)} />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HOC(CityMainCategory);
