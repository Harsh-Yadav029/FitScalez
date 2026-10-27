"use client";

import React, { useState } from "react";
import { authService } from "@/services/api.service";

const AdminLogin = ({ onLoginSuccess }) => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const isEmail = identifier.includes("@");
            const payload = isEmail
                ? { email: identifier, password }
                : { username: identifier, password };

            const res = await authService.login(payload);
            if (onLoginSuccess) {
                onLoginSuccess(res.data?.user);
            }
        } catch (err) {
            setError(err.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 20px 60px" }}>
            <div className="card" style={{ width: "100%", maxWidth: "440px", padding: "40px" }}>
                <div style={{ textAlign: "center", marginBottom: "24px" }}>
                    <span className="section-tag">Staff Portal</span>
                    <h2 style={{ marginTop: "10px" }}>Admin <span className="gradient-text">Login</span></h2>
                </div>

                {error && (
                    <div style={{ padding: "10px", background: "rgba(239, 68, 68, 0.15)", color: "#f87171", borderRadius: "6px", marginBottom: "16px", fontSize: "0.85rem" }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Username or Email</label>
                        <input
                            type="text"
                            required
                            placeholder="admin / admin@fitscalez.com"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="form-submit" disabled={loading} style={{ marginTop: "10px" }}>
                        {loading ? "Authenticating..." : "🔐 Access Dashboard"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
