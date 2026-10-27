const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const leadService = {
    createLead: async (leadData) => {
        const response = await fetch(`${API_BASE}/leads`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(leadData),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to submit lead");
        }
        return data;
    },
};

export const blogService = {
    getAllBlogs: async (params = {}) => {
        const query = new URLSearchParams(params).toString();
        const response = await fetch(`${API_BASE}/blogs${query ? `?${query}` : ""}`, {
            next: { revalidate: 60 },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch blogs");
        }
        return data;
    },
    getBlogBySlug: async (slug) => {
        const response = await fetch(`${API_BASE}/blogs/${slug}`, {
            next: { revalidate: 60 },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch blog post");
        }
        return data;
    },
};

export const careerService = {
    getAllJobs: async () => {
        const response = await fetch(`${API_BASE}/careers/jobs`, {
            next: { revalidate: 60 },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch jobs");
        }
        return data;
    },
    applyForJob: async (formData) => {
        const response = await fetch(`${API_BASE}/careers/apply`, {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to submit application");
        }
        return data;
    },
};

export const authService = {
    login: async (credentials) => {
        const response = await fetch(`${API_BASE}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }
        return data;
    },
    getCurrentUser: async () => {
        const response = await fetch(`${API_BASE}/users/current-user`, {
            credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Not authenticated");
        }
        return data;
    },
    logout: async () => {
        const response = await fetch(`${API_BASE}/users/logout`, {
            method: "POST",
            credentials: "include",
        });
        const data = await response.json();
        return data;
    },
};
