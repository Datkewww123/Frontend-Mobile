export const BASE_URL = 'https://kingfood-wms-backend.onrender.com/api/v1';


let authToken = null;

export function setToken(token){authToken = token;}
export function getToken(){return authToken;}

async function request(method, endpoint, body = null) {
    const headers = { 'Content-Type': 'application/json' };
    if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
    const config = { method, headers };
    if (body) config.body = JSON.stringify(body);

    const res = await fetch(`${BASE_URL}${endpoint}`, config);
    const json = await res.json();

    if (!res.ok) throw new Error(json.message || 'Lỗi server');

    // Server trả về { success, statusCode, message, metadata }
    // → trả về metadata để screen dùng trực tiếp
    return json.metadata ?? json;
}
// AUTH
export const login = (username, password) => 
    request ('POST', '/auth/user/login', {username, password});
export const logout = () =>
    request ('POST', '/auth/user/logout');
// Customer
export const customerLogin = (email, password) =>
    request ('POST', '/auth/customer/login', {email, password});
export const customerLogout = () =>
    request ('POST', '/auth/customer/logout');
// PROFILE 
export const getProfile = () =>
    request ('GET', '/client/profile');
export const updateProfile = (data) =>
    request ('POST', '/client/profile', data);
// PICKING
export const getAssignedTasks = () =>
    request ('GET', '/admin/picking/assigned');
export const packItem = (itemId, containerCode, quantity) =>
    request ('POST', '/admin/picking/pack', {itemId, containerCode,quantity});
export const moveItem = (ItemId, fromContainer, toContainer) =>
    request ('POST', '/admin/picking/move', {itemId, fromContainer, toContainer});
export const reportIncident = (itemId, reason, note) =>
    requst ('POST', '/admin/picking/incident',{itemId, reason, note});
export const handoverTask =(data) =>
    request ('POST', '/admin/picking/handover', data)
export const getIncidents = () =>
    request ('GET', '/admin/picking/incidents');
export const resolveIncident = (id) =>
    request ('POST', `admin/picking/incidents/${id}/resolve`);
export const traceContainer = (ContainerCode) =>
    request ('GET', `admin/picking/trace/${containerCode}`);
// ORDERS
export const getOrders = () =>
    request ('GET', `admin/orders`);
export const updateOrderStatus = (id, status) =>
    request('PATCH', `/admin/orders/${id}`, {status});
export const createOrder = (items) =>
    request ('POST', '/client/orders', {items});
// PRODUCTS
export const getProducts = (query = '') =>
    request ('GET', `/public/products${query ? `?search=${query}`: ''}`)
export const getByProductId = (id) =>
    request ('GET', `public/prodcuts/${id}`);
// Admin
export const getUsers = () =>
    request ('GET', '/admin/users');
export const createUser = (data) =>
    request ('POST', '/admin/users', data);
export const getDashboardStatus = () =>
    request ('GET', '/admin/dashboard/status');
export const getCustomers = (page = 1, limit = 50) =>
    request ('GET', `/admin/customers?page=${page}&limit=${limit}`);
