import React, { useState, useEffect } from "react";
import SeoHelmet from "../components/SeoHelmet";
import AdminLogin from "./AdminLogin";
import { authService, API_BASE, getAuthHeaders } from "../services/api.service";
import { BrandedSpinner } from "../components/LoadingSkeleton";

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [activeTab, setActiveTab] = useState("leads");

    // Leads state & filters
    const [leads, setLeads] = useState([]);
    const [loadingLeads, setLoadingLeads] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Applications state
    const [applications, setApplications] = useState([]);
    const [loadingApps, setLoadingApps] = useState(false);

    // Live Traffic Analytics state
    const [analyticsStats, setAnalyticsStats] = useState(null);
    const [loadingStats, setLoadingStats] = useState(false);

    // Selected lead for dossier / location modal
    const [selectedLead, setSelectedLead] = useState(null);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const res = await authService.getCurrentUser();
                setUser(res?.data || null);
            } catch (err) {
                setUser(null);
            } finally {
                setCheckingAuth(false);
            }
        };
        verifyUser();
    }, []);

    const safeJson = async (res) => {
        try {
            const text = await res.text();
            return text ? JSON.parse(text) : {};
        } catch {
            return {};
        }
    };

    const fetchLeads = async () => {
        setLoadingLeads(true);
        try {
            const res = await fetch(`${API_BASE}/leads`, {
                headers: { ...getAuthHeaders() },
                credentials: "include",
            });
            const data = await safeJson(res);
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
            const res = await fetch(`${API_BASE}/careers/applications`, {
                headers: { ...getAuthHeaders() },
                credentials: "include",
            });
            const data = await safeJson(res);
            setApplications(data.data?.applications || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingApps(false);
        }
    };

    const fetchAnalytics = async () => {
        setLoadingStats(true);
        try {
            const res = await fetch(`${API_BASE}/analytics/stats`, {
                headers: { ...getAuthHeaders() },
                credentials: "include",
            });
            const data = await safeJson(res);
            setAnalyticsStats(data.data || null);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingStats(false);
        }
    };

    useEffect(() => {
        if (user) {
            if (activeTab === "leads") fetchLeads();
            if (activeTab === "apps") fetchApplications();
            if (activeTab === "traffic") fetchAnalytics();
        }
    }, [user, activeTab]);

    const handleStatusUpdate = async (leadId, newStatus) => {
        try {
            await fetch(`${API_BASE}/leads/${leadId}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    ...getAuthHeaders(),
                },
                credentials: "include",
                body: JSON.stringify({ status: newStatus }),
            });
            fetchLeads();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteLead = async (leadId) => {
        if (!window.confirm("Are you sure you want to permanently delete this lead?")) return;
        try {
            await fetch(`${API_BASE}/leads/${leadId}`, {
                method: "DELETE",
                headers: {
                    ...getAuthHeaders(),
                },
                credentials: "include",
            });
            fetchLeads();
        } catch (err) {
            console.error(err);
        }
    };

    const exportLeadsCSV = () => {
        if (!leads || leads.length === 0) {
            alert("No leads to export.");
            return;
        }

        const headers = ["Timestamp", "Name", "Email", "Phone", "Company", "Service", "Budget", "Message", "Status", "City", "Country", "Device", "OS", "IP"];
        const rows = leads.map((l) => [
            new Date(l.createdAt).toLocaleString("en-IN"),
            l.name || "",
            l.email || "",
            l.phone || "",
            l.company || "",
            l.service || "",
            l.budget || "",
            (l.message || "").replace(/"/g, '""'),
            l.status || "new",
            l.location?.city || "",
            l.location?.country || "",
            l.device?.type || "",
            l.device?.os || "",
            l.location?.ip || "",
        ]);

        const csvContent = [headers.join(","), ...rows.map((r) => r.map((c) => `"${String(c || "")}"`).join(","))].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `fitscalez_leads_${new Date().toISOString().split("T")[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleLogout = async () => {
        await authService.logout();
        setUser(null);
    };

    if (checkingAuth) {
        return <BrandedSpinner message="Verifying session & loading operations CRM..." />;
    }

    if (!user) {
        return <AdminLogin onLoginSuccess={(loggedIn) => setUser(loggedIn)} />;
    }

    // Filter leads
    const filteredLeads = leads.filter((l) => {
        const matchesStatus = statusFilter === "all" || l.status === statusFilter;
        const matchesSearch =
            !searchTerm ||
            l.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            l.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            l.phone?.includes(searchTerm) ||
            l.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            l.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            l.location?.city?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const newLeadsCount = leads.filter((l) => l.status === "new").length;
    const contactedCount = leads.filter((l) => l.status === "contacted").length;
    const qualifiedCount = leads.filter((l) => l.status === "qualified").length;

    return (
        <div style={{ minHeight: "90vh", padding: "120px 20px 60px" }}>
            <SeoHelmet title="Admin CRM & Operations Dashboard — Fitscalez" />
            <div className="container">
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px", marginBottom: "26px", borderBottom: "1px solid var(--border)", paddingBottom: "20px" }}>
                    <div>
                        <h2>Agency <span className="gradient-text">Operations CRM</span></h2>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                            Logged in as: <strong>{user.fullName || user.username}</strong> ({user.role})
                        </span>
                    </div>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <a
                            href="/lead.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline btn-sm"
                            title="Open standalone local telemetry view"
                        >
                            📊 Local Dossier
                        </a>
                        <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                            🔒 Logout
                        </button>
                    </div>
                </div>

                {/* KPI Metrics Ribbon */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "26px" }}>
                    <div className="card" style={{ padding: "16px 20px" }}>
                        <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>Total Leads</div>
                        <div style={{ fontSize: "1.8rem", fontWeight: "700", marginTop: "4px" }}>{leads.length}</div>
                    </div>
                    <div className="card" style={{ padding: "16px 20px", borderLeft: "3px solid var(--accent2)" }}>
                        <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>New Inquiries</div>
                        <div style={{ fontSize: "1.8rem", fontWeight: "700", marginTop: "4px", color: "var(--accent2)" }}>{newLeadsCount}</div>
                    </div>
                    <div className="card" style={{ padding: "16px 20px", borderLeft: "3px solid var(--primary-light)" }}>
                        <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>Contacted</div>
                        <div style={{ fontSize: "1.8rem", fontWeight: "700", marginTop: "4px", color: "var(--primary-light)" }}>{contactedCount}</div>
                    </div>
                    <div className="card" style={{ padding: "16px 20px", borderLeft: "3px solid #f59e0b" }}>
                        <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>Qualified</div>
                        <div style={{ fontSize: "1.8rem", fontWeight: "700", marginTop: "4px", color: "#f59e0b" }}>{qualifiedCount}</div>
                    </div>
                </div>

                {/* Dashboard Tabs & Actions */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <button
                            className={`btn ${activeTab === "leads" ? "btn-primary" : "btn-outline"}`}
                            onClick={() => setActiveTab("leads")}
                        >
                            📋 Inbound Leads ({leads.length})
                        </button>
                        <button
                            className={`btn ${activeTab === "traffic" ? "btn-primary" : "btn-outline"}`}
                            onClick={() => setActiveTab("traffic")}
                        >
                            🌐 Live Traffic (MongoDB)
                        </button>
                        <button
                            className={`btn ${activeTab === "apps" ? "btn-primary" : "btn-outline"}`}
                            onClick={() => setActiveTab("apps")}
                        >
                            💼 Career Applications ({applications.length})
                        </button>
                    </div>

                    {activeTab === "leads" && (
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            <button className="btn btn-outline btn-sm" onClick={exportLeadsCSV}>
                                📥 Export CSV
                            </button>
                            <button className="btn btn-outline btn-sm" onClick={fetchLeads}>
                                🔄 Refresh
                            </button>
                        </div>
                    )}

                    {activeTab === "traffic" && (
                        <button className="btn btn-outline btn-sm" onClick={fetchAnalytics}>
                            🔄 Refresh Traffic
                        </button>
                    )}
                </div>

                {/* Leads Tab Content */}
                {activeTab === "leads" && (
                    <div className="card" style={{ padding: "24px", overflowX: "auto" }}>
                        {/* Search and Filter toolbar */}
                        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center", marginBottom: "20px" }}>
                            <input
                                type="text"
                                placeholder="🔍 Search by name, email, phone, city..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    flex: "1",
                                    minWidth: "240px",
                                    padding: "8px 14px",
                                    background: "var(--bg2)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "6px",
                                    color: "var(--text)",
                                    fontSize: "0.88rem",
                                }}
                            />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                style={{
                                    padding: "8px 12px",
                                    background: "var(--bg2)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "6px",
                                    color: "var(--text)",
                                    fontSize: "0.88rem",
                                }}
                            >
                                <option value="all">All Statuses ({leads.length})</option>
                                <option value="new">🆕 New ({newLeadsCount})</option>
                                <option value="contacted">📞 Contacted ({contactedCount})</option>
                                <option value="qualified">⭐ Qualified ({qualifiedCount})</option>
                                <option value="closed">✅ Closed</option>
                            </select>
                        </div>

                        {loadingLeads ? (
                            <p style={{ padding: "30px 0", textAlign: "center", color: "var(--text-muted)" }}>Loading inquiries from database...</p>
                        ) : filteredLeads.length === 0 ? (
                            <p style={{ padding: "30px 0", textAlign: "center", color: "var(--text-muted)" }}>
                                {leads.length === 0 ? "No inquiries captured yet." : "No inquiries match your filter criteria."}
                            </p>
                        ) : (
                            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                                <thead>
                                    <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}>
                                        <th style={{ padding: "12px 8px" }}>Name / Contact</th>
                                        <th style={{ padding: "12px 8px" }}>Location & Device</th>
                                        <th style={{ padding: "12px 8px" }}>Service</th>
                                        <th style={{ padding: "12px 8px" }}>Budget</th>
                                        <th style={{ padding: "12px 8px" }}>Status</th>
                                        <th style={{ padding: "12px 8px" }}>Message</th>
                                        <th style={{ padding: "12px 8px", textAlign: "center" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLeads.map((l) => (
                                        <tr key={l._id} style={{ borderBottom: "1px solid var(--border)" }}>
                                            <td style={{ padding: "14px 8px" }}>
                                                <strong>{l.name}</strong>
                                                <div style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>{l.email}</div>
                                                <div style={{ color: "var(--primary-light)", fontSize: "0.78rem" }}>
                                                    <a href={`tel:${l.phone}`} style={{ color: "inherit", textDecoration: "none" }}>
                                                        📞 {l.phone}
                                                    </a>
                                                </div>
                                                {l.company && (
                                                    <div style={{ color: "var(--text-dim)", fontSize: "0.75rem", marginTop: "2px" }}>
                                                        🏢 {l.company}
                                                    </div>
                                                )}
                                            </td>
                                            <td style={{ padding: "14px 8px" }}>
                                                {l.location?.city ? (
                                                    <div>
                                                        <span style={{ fontSize: "0.82rem", fontWeight: "600" }}>
                                                            📍 {l.location.city}, {l.location.country}
                                                        </span>
                                                        <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
                                                            {l.device?.type || "Desktop"} ({l.device?.os || "OS"})
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}>Direct Web Form</span>
                                                )}
                                                <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "4px" }}>
                                                    {new Date(l.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                                                </div>
                                            </td>
                                            <td style={{ padding: "14px 8px" }}>
                                                <span style={{ fontWeight: "500" }}>{l.service}</span>
                                            </td>
                                            <td style={{ padding: "14px 8px" }}>{l.budget || "—"}</td>
                                            <td style={{ padding: "14px 8px" }}>
                                                <select
                                                    value={l.status}
                                                    onChange={(e) => handleStatusUpdate(l._id, e.target.value)}
                                                    style={{
                                                        background: "var(--card)",
                                                        border: "1px solid var(--border)",
                                                        color: "var(--text)",
                                                        padding: "4px 8px",
                                                        borderRadius: "4px",
                                                        fontSize: "0.8rem",
                                                    }}
                                                >
                                                    <option value="new">🆕 New</option>
                                                    <option value="contacted">📞 Contacted</option>
                                                    <option value="qualified">⭐ Qualified</option>
                                                    <option value="closed">✅ Closed</option>
                                                </select>
                                            </td>
                                            <td style={{ padding: "14px 8px", maxWidth: "240px", color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: "1.4" }}>
                                                {l.message}
                                            </td>
                                            <td style={{ padding: "14px 8px", textAlign: "center" }}>
                                                <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelectedLead(l)}
                                                        className="btn btn-outline btn-sm"
                                                        style={{ padding: "4px 8px", fontSize: "0.75rem" }}
                                                        title="View full lead dossier"
                                                    >
                                                        👁️ Dossier
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteLead(l._id)}
                                                        className="btn btn-outline btn-sm"
                                                        style={{ padding: "4px 8px", fontSize: "0.75rem", borderColor: "rgba(239, 68, 68, 0.4)", color: "#f87171" }}
                                                        title="Delete lead"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}

                {/* Live Traffic Tab Content */}
                {activeTab === "traffic" && (
                    <div className="card" style={{ padding: "24px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
                            <h3>Real-Time Visitors & Telemetry (Stored in MongoDB)</h3>
                            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Auto-purges after 90 days</div>
                        </div>

                        {loadingStats ? (
                            <p style={{ padding: "30px 0", textAlign: "center", color: "var(--text-muted)" }}>Loading visitor metrics from MongoDB...</p>
                        ) : !analyticsStats ? (
                            <p style={{ padding: "30px 0", textAlign: "center", color: "var(--text-muted)" }}>No analytics records found yet. Browse pages on the website to populate!</p>
                        ) : (
                            <div>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
                                    <div style={{ padding: "16px", background: "var(--bg2)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Total Page Views</div>
                                        <div style={{ fontSize: "1.6rem", fontWeight: "700", marginTop: "4px" }}>{analyticsStats.totalPageViews}</div>
                                    </div>
                                    <div style={{ padding: "16px", background: "var(--bg2)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Unique Visitors</div>
                                        <div style={{ fontSize: "1.6rem", fontWeight: "700", marginTop: "4px", color: "var(--primary-light)" }}>{analyticsStats.uniqueVisitors}</div>
                                    </div>
                                    <div style={{ padding: "16px", background: "var(--bg2)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Views Last 24 Hours</div>
                                        <div style={{ fontSize: "1.6rem", fontWeight: "700", marginTop: "4px", color: "var(--accent2)" }}>{analyticsStats.todayViews}</div>
                                    </div>
                                </div>

                                <h4 style={{ marginBottom: "14px" }}>Recent Activity Stream</h4>
                                <div style={{ overflowX: "auto" }}>
                                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.85rem" }}>
                                        <thead>
                                            <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}>
                                                <th style={{ padding: "10px 8px" }}>Time</th>
                                                <th style={{ padding: "10px 8px" }}>Page Path</th>
                                                <th style={{ padding: "10px 8px" }}>Location</th>
                                                <th style={{ padding: "10px 8px" }}>Device / OS</th>
                                                <th style={{ padding: "10px 8px" }}>Device ID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {analyticsStats.recentViews?.map((view) => (
                                                <tr key={view._id} style={{ borderBottom: "1px solid var(--border)" }}>
                                                    <td style={{ padding: "10px 8px", color: "var(--text-dim)", whiteSpace: "nowrap" }}>
                                                        {new Date(view.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                                                    </td>
                                                    <td style={{ padding: "10px 8px" }}>
                                                        <span style={{ fontWeight: "600", color: "var(--primary-light)" }}>{view.path}</span>
                                                    </td>
                                                    <td style={{ padding: "10px 8px" }}>
                                                        {view.location?.city ? `📍 ${view.location.city}, ${view.location.country}` : "—"}
                                                    </td>
                                                    <td style={{ padding: "10px 8px" }}>
                                                        {view.device?.type || "Desktop"} ({view.device?.os || "OS"} / {view.device?.browser || "Browser"})
                                                    </td>
                                                    <td style={{ padding: "10px 8px", fontFamily: "monospace", fontSize: "0.78rem", color: "var(--text-dim)" }}>
                                                        {view.deviceId}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
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
                            <p style={{ padding: "30px 0", textAlign: "center", color: "var(--text-muted)" }}>Loading candidate applications...</p>
                        ) : applications.length === 0 ? (
                            <p style={{ padding: "30px 0", textAlign: "center", color: "var(--text-muted)" }}>No applications submitted yet.</p>
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
                                                <div style={{ color: "var(--primary-light)", fontSize: "0.78rem" }}>
                                                    <a href={`tel:${app.phone}`} style={{ color: "inherit", textDecoration: "none" }}>
                                                        📞 {app.phone}
                                                    </a>
                                                </div>
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

                {/* Lead Detail Dossier Modal */}
                {selectedLead && (
                    <div
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.75)",
                            backdropFilter: "blur(6px)",
                            zIndex: 9999,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "20px",
                        }}
                        onClick={() => setSelectedLead(null)}
                    >
                        <div
                            className="card"
                            style={{
                                maxWidth: "600px",
                                width: "100%",
                                padding: "30px",
                                position: "relative",
                                maxHeight: "90vh",
                                overflowY: "auto",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid var(--border)", paddingBottom: "14px" }}>
                                <div>
                                    <h3>Visitor Intelligence Dossier</h3>
                                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Stored securely in MongoDB Atlas</span>
                                </div>
                                <button
                                    className="btn btn-outline btn-sm"
                                    onClick={() => setSelectedLead(null)}
                                    style={{ padding: "4px 10px" }}
                                >
                                    ✕
                                </button>
                            </div>

                            <div style={{ display: "grid", gap: "12px", fontSize: "0.9rem" }}>
                                <div>
                                    <span style={{ color: "var(--text-muted)" }}>Contact: </span>
                                    <strong>{selectedLead.name}</strong> ({selectedLead.email} | {selectedLead.phone})
                                </div>
                                {selectedLead.company && (
                                    <div>
                                        <span style={{ color: "var(--text-muted)" }}>Company: </span>
                                        {selectedLead.company}
                                    </div>
                                )}
                                <div>
                                    <span style={{ color: "var(--text-muted)" }}>Service: </span>
                                    <strong>{selectedLead.service}</strong>
                                </div>
                                <div>
                                    <span style={{ color: "var(--text-muted)" }}>Budget: </span>
                                    {selectedLead.budget || "Not specified"}
                                </div>

                                {/* Rich Geolocation & Device Card */}
                                {selectedLead.location && (
                                    <div style={{ padding: "14px", background: "var(--bg2)", borderRadius: "8px", border: "1px solid var(--border)", display: "grid", gap: "6px", fontSize: "0.83rem" }}>
                                        <div style={{ fontWeight: "600", color: "var(--primary-light)" }}>📍 Geolocation & Device Intelligence:</div>
                                        <div><strong>Location:</strong> {selectedLead.location.city || "Unknown City"}, {selectedLead.location.country || "India"} ({selectedLead.location.region || ""})</div>
                                        <div><strong>Network IP & ISP:</strong> {selectedLead.location.ip || "—"} ({selectedLead.location.isp || "Broadband"})</div>
                                        <div><strong>Device:</strong> {selectedLead.device?.type || "Desktop"} — {selectedLead.device?.os || "OS"} ({selectedLead.device?.browser || "Browser"}) | Screen: {selectedLead.device?.screen || "—"}</div>
                                        <div><strong>Visit Count:</strong> {selectedLead.visitCount || 1} session(s) {selectedLead.isReturning ? "(Returning Visitor)" : "(First-time Visitor)"}</div>
                                    </div>
                                )}

                                {/* User Browsing Journey */}
                                {selectedLead.journey && selectedLead.journey.length > 0 && (
                                    <div style={{ padding: "12px", background: "var(--bg2)", borderRadius: "8px", border: "1px solid var(--border)", fontSize: "0.83rem" }}>
                                        <div style={{ fontWeight: "600", color: "var(--primary-light)", marginBottom: "6px" }}>🧭 Browsing Journey:</div>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                            {selectedLead.journey.map((path, idx) => (
                                                <span key={idx} style={{ background: "rgba(255,255,255,0.06)", padding: "3px 8px", borderRadius: "4px", fontFamily: "monospace" }}>
                                                    {path}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div style={{ marginTop: "6px", padding: "14px", background: "var(--bg2)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                                    <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginBottom: "6px" }}>Inquiry Message:</div>
                                    <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.5" }}>{selectedLead.message}</div>
                                </div>
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px" }}>
                                <a
                                    href={`mailto:${selectedLead.email}?subject=Regarding Your Inquiry with Fitscalez`}
                                    className="btn btn-primary btn-sm"
                                >
                                    ✉️ Reply via Email
                                </a>
                                <a
                                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline btn-sm"
                                    style={{ borderColor: "#25d366", color: "#25d366" }}
                                >
                                    💬 WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
