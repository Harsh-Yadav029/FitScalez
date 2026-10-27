import React, { useState, useEffect } from "react";
import SeoHelmet from "../components/SeoHelmet";
import AdminLogin from "./AdminLogin";
import { authService } from "../services/api.service";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [activeTab, setActiveTab] = useState("leads");

    // Leads state
    const [leads, setLeads] = useState([]);
    const [loadingLeads, setLoadingLeads] = useState(false);

    // Applications state
    const [applications, setApplications] = useState([]);
    const [loadingApps, setLoadingApps] = useState(false);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const res = await authService.getCurrentUser();
                setUser(res.data);
            } catch (err) {
                setUser(null);
            } finally {
                setCheckingAuth(false);
            }
        };
        verifyUser();
    }, []);

    const fetchLeads = async () => {
        setLoadingLeads(true);
        try {
            const res = await fetch(`${API_BASE}/leads`, { credentials: "include" });
            const data = await res.json();
            setLeads(data.data?.leads || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingLeads(false);
        }
    };

    const fetchApplications = async () => {
        setLoadingApps(true);
        try {
            const res = await fetch(`${API_BASE}/careers/applications`, { credentials: "include" });
            const data = await res.json();
            setApplications(data.data?.applications || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingApps(false);
        }
    };

    useEffect(() => {
        if (user) {
            if (activeTab === "leads") fetchLeads();
            if (activeTab === "apps") fetchApplications();
        }
    }, [user, activeTab]);

    const handleStatusUpdate = async (leadId, newStatus) => {
        try {
            await fetch(`${API_BASE}/leads/${leadId}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ status: newStatus }),
            });
            fetchLeads();
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = async () => {
        await authService.logout();
        setUser(null);
    };

    if (checkingAuth) {
        return (
            <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                Checking authentication...
            </div>
        );
    }

    if (!user) {
        return <AdminLogin onLoginSuccess={(loggedIn) => setUser(loggedIn)} />;
    }

    return (
        <div style={{ minHeight: "90vh", padding: "120px 20px 60px" }}>
            <SeoHelmet title="Admin CRM & Operations Dashboard — Fitscalez" />
            <div className="container">
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px", marginBottom: "30px", borderBottom: "1px solid var(--border)", paddingBottom: "20px" }}>
                    <div>
                        <h2>Agency <span className="gradient-text">Operations CRM</span></h2>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                            Logged in as: <strong>{user.fullName || user.username}</strong> ({user.role})
                        </span>
                    </div>
                    <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                        🔒 Logout
                    </button>
                </div>

                {/* Dashboard Tabs */}
                <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
                    <button
                        className={`btn ${activeTab === "leads" ? "btn-primary" : "btn-outline"}`}
                        onClick={() => setActiveTab("leads")}
                    >
                        📋 Inbound Leads ({leads.length})
                    </button>
                    <button
                        className={`btn ${activeTab === "apps" ? "btn-primary" : "btn-outline"}`}
                        onClick={() => setActiveTab("apps")}
                    >
                        💼 Career Applications ({applications.length})
                    </button>
                </div>

                {/* Leads Tab Content */}
                {activeTab === "leads" && (
                    <div className="card" style={{ padding: "24px", overflowX: "auto" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                            <h3>Inquiries & Leads</h3>
                            <button className="btn btn-outline btn-sm" onClick={fetchLeads}>🔄 Refresh</button>
                        </div>

                        {loadingLeads ? (
                            <p>Loading inquiries...</p>
                        ) : leads.length === 0 ? (
                            <p style={{ color: "var(--text-muted)" }}>No leads captured yet.</p>
                        ) : (
                            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                                <thead>
                                    <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}>
                                        <th style={{ padding: "12px 8px" }}>Name / Contact</th>
                                        <th style={{ padding: "12px 8px" }}>Service</th>
                                        <th style={{ padding: "12px 8px" }}>Budget</th>
                                        <th style={{ padding: "12px 8px" }}>Source</th>
                                        <th style={{ padding: "12px 8px" }}>Status</th>
                                        <th style={{ padding: "12px 8px" }}>Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leads.map((l) => (
                                        <tr key={l._id} style={{ borderBottom: "1px solid var(--border)" }}>
                                            <td style={{ padding: "14px 8px" }}>
                                                <strong>{l.name}</strong>
                                                <div style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>{l.email}</div>
                                                <div style={{ color: "var(--primary-light)", fontSize: "0.78rem" }}>{l.phone}</div>
                                            </td>
                                            <td style={{ padding: "14px 8px" }}>{l.service}</td>
                                            <td style={{ padding: "14px 8px" }}>{l.budget || "—"}</td>
                                            <td style={{ padding: "14px 8px" }}>
                                                <span style={{ fontSize: "0.75rem", background: "rgba(255,255,255,0.06)", padding: "3px 8px", borderRadius: "4px" }}>
                                                    {l.source}
                                                </span>
                                            </td>
                                            <td style={{ padding: "14px 8px" }}>
                                                <select
                                                    value={l.status}
                                                    onChange={(e) => handleStatusUpdate(l._id, e.target.value)}
                                                    style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--text)", padding: "4px 8px", borderRadius: "4px", fontSize: "0.8rem" }}
                                                >
                                                    <option value="new">🆕 New</option>
                                                    <option value="contacted">📞 Contacted</option>
                                                    <option value="qualified">⭐ Qualified</option>
                                                    <option value="closed">✅ Closed</option>
                                                </select>
                                            </td>
                                            <td style={{ padding: "14px 8px", maxWidth: "240px", color: "var(--text-muted)" }}>
                                                {l.message}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}

                {/* Applications Tab Content */}
                {activeTab === "apps" && (
                    <div className="card" style={{ padding: "24px", overflowX: "auto" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                            <h3>Job Applications</h3>
                            <button className="btn btn-outline btn-sm" onClick={fetchApplications}>🔄 Refresh</button>
                        </div>

                        {loadingApps ? (
                            <p>Loading candidate applications...</p>
                        ) : applications.length === 0 ? (
                            <p style={{ color: "var(--text-muted)" }}>No applications submitted yet.</p>
                        ) : (
                            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                                <thead>
                                    <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}>
                                        <th style={{ padding: "12px 8px" }}>Candidate</th>
                                        <th style={{ padding: "12px 8px" }}>Role Applied</th>
                                        <th style={{ padding: "12px 8px" }}>Experience</th>
                                        <th style={{ padding: "12px 8px" }}>Portfolio / Links</th>
                                        <th style={{ padding: "12px 8px" }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applications.map((app) => (
                                        <tr key={app._id} style={{ borderBottom: "1px solid var(--border)" }}>
                                            <td style={{ padding: "14px 8px" }}>
                                                <strong>{app.name}</strong>
                                                <div style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>{app.email}</div>
                                                <div style={{ color: "var(--primary-light)", fontSize: "0.78rem" }}>{app.phone}</div>
                                            </td>
                                            <td style={{ padding: "14px 8px" }}>{app.jobTitle}</td>
                                            <td style={{ padding: "14px 8px" }}>{app.experience}</td>
                                            <td style={{ padding: "14px 8px" }}>
                                                {app.portfolioUrl ? (
                                                    <a href={app.portfolioUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary-light)" }}>
                                                        View Profile ↗
                                                    </a>
                                                ) : "—"}
                                            </td>
                                            <td style={{ padding: "14px 8px" }}>
                                                <span style={{ fontSize: "0.8rem", color: "#43e97b", textTransform: "uppercase" }}>
                                                    {app.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
