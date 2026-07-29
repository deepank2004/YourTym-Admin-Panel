import { getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';

const COMPLETED_STATUS = 'Complete';
const PAGE_LIMIT = 100;

export const getOrderRevenue = (order) => {
    const revenue = order?.adminEarnings ?? order?.paidAmount ?? order?.totalAmount ?? 0;
    const numericRevenue = Number(revenue);
    return Number.isFinite(numericRevenue) ? numericRevenue : 0;
};

export const getCompletedOrders = async ({ startDate = '', endDate = '' } = {}) => {
    const completedOrders = [];
    let page = 1;
    let totalPages = 1;

    do {
        const response = await getApi(
            endPoints.getallBookings(
                page,
                PAGE_LIMIT,
                '',
                '',
                COMPLETED_STATUS,
                startDate,
                endDate
            ),
            { errorMsg: 'Failed to fetch completed-order revenue!' }
        );

        const orders = Array.isArray(response?.data) ? response.data : [];
        completedOrders.push(...orders.filter((order) => order?.status === COMPLETED_STATUS));

        totalPages = Math.max(1, Number(response?.pagination?.totalPages) || 1);
        page += 1;
    } while (page <= totalPages);

    return completedOrders;
};

export const sumCompletedOrderRevenue = (orders) =>
    orders.reduce((total, order) => total + getOrderRevenue(order), 0);
