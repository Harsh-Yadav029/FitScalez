const getNormalizedApiBase = () => {
    let raw = (import.meta.env.VITE_API_URL || "").trim();
    if (!raw) {
        return "http://localhost:5000/api/v1";
    }
    // Remove any trailing slashes
    raw = raw.replace(/\/+$/, "");
    // If user provided https://fitscalez.onrender.com (without /api/v1), auto-append /api/v1
    if (!raw.endsWith("/api/v1")) {
        raw = `${raw}/api/v1`;
    }
    return raw;
};

export const API_BASE = getNormalizedApiBase();

export const getAuthToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("fitscalez_admin_token");
};

export const setAuthToken = (token) => {
    if (typeof window === "undefined") return;
    if (token) {
        localStorage.setItem("fitscalez_admin_token", token);
    } else {
        localStorage.removeItem("fitscalez_admin_token");
    }
};

export const getAuthHeaders = () => {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const parseJsonResponse = async (response) => {
    const text = await response.text();
    let data;
    try {
        data = text ? JSON.parse(text) : {};
    } catch {
        if (!response.ok) {
            throw new Error(`Server returned HTTP ${response.status} (${response.statusText || "Route not found or server error"}). Verify that your backend is running.`);
        }
        throw new Error("Invalid response format from server (expected JSON).");
    }
    return data;
};

const handleFetchError = (err) => {
    if (err.name === "TypeError" && err.message?.toLowerCase().includes("fetch")) {
        if (typeof window !== "undefined" && window.location.protocol === "https:" && API_BASE.startsWith("http://")) {
            throw new Error(
                "Mixed Content Error: Frontend is on HTTPS, but API is pointing to HTTP localhost. Set your HTTPS backend URL in Vercel (VITE_API_URL)."
            );
        }
        throw new Error(
            `Unable to connect to backend (${API_BASE}). Ensure your backend is running/deployed and CORS is configured.`
        );
    }
    throw err;
};

export const leadService = {
    createLead: async (leadData) => {
        try {
            const response = await fetch(`${API_BASE}/leads`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(leadData),
            });
            const data = await parseJsonResponse(response);
            if (!response.ok) {
                throw new Error(data.message || "Failed to submit lead");
            }
            return data;
        } catch (err) {
            handleFetchError(err);
        }
    },
};

export const blogService = {
    getAllBlogs: async (params = {}) => {
        try {
            const query = new URLSearchParams(params).toString();
            const response = await fetch(`${API_BASE}/blogs${query ? `?${query}` : ""}`);
            const data = await parseJsonResponse(response);
            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch blogs");
            }
            return data;
        } catch (err) {
            handleFetchError(err);
        }
    },
    getBlogBySlug: async (slug) => {
        try {
            const response = await fetch(`${API_BASE}/blogs/${slug}`);
            const data = await parseJsonResponse(response);
            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch blog post");
            }
            return data;
        } catch (err) {
            handleFetchError(err);
        }
    },
};

export const careerService = {
    getAllJobs: async () => {
        try {
            const response = await fetch(`${API_BASE}/careers/jobs`);
            const data = await parseJsonResponse(response);
            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch jobs");
            }
            return data;
        } catch (err) {
            handleFetchError(err);
        }
    },
    applyForJob: async (formData) => {
        try {
            const response = await fetch(`${API_BASE}/careers/apply`, {
                method: "POST",
                body: formData, // Sending FormData directly for multipart/form-data
            });
            const data = await parseJsonResponse(response);
            if (!response.ok) {
                throw new Error(data.message || "Failed to submit application");
            }
            return data;
        } catch (err) {
            handleFetchError(err);
        }
    },
};

export const authService = {
    login: async (credentials) => {
        try {
            const response = await fetch(`${API_BASE}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(credentials),
            });
            const data = await parseJsonResponse(response);
            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }
            if (data.data?.accessToken) {
                setAuthToken(data.data.accessToken);
            }
            return data;
        } catch (err) {
            handleFetchError(err);
        }
    },
    getCurrentUser: async () => {
        try {
            const response = await fetch(`${API_BASE}/users/current-user`, {
                headers: {
                    ...getAuthHeaders(),
                },
                credentials: "include",
            });
            const data = await parseJsonResponse(response);
            if (!response.ok) {
                throw new Error(data.message || "Not authenticated");
            }
            return data;
        } catch (err) {
            handleFetchError(err);
        }
    },
    logout: async () => {
        try {
            const response = await fetch(`${API_BASE}/users/logout`, {
                method: "POST",
                headers: {
                    ...getAuthHeaders(),
                },
                credentials: "include",
            });
            const data = await parseJsonResponse(response);
            return data;
        } catch (err) {
            handleFetchError(err);
        } finally {
            setAuthToken(null);
        }
    },
};
