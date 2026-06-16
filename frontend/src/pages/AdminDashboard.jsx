import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminDashboard() {
    const [dashboard, setDashboard] = useState({
        totalUsers: 0,
        totalStores: 0,
        totalRatings: 0,
    });

    const [users, setUsers] = useState([]);
    const [stores, setStores] = useState([]);

    useEffect(() => {
        fetchDashboard();
        fetchUsers();
        fetchStores();
    }, []);

    const fetchDashboard = async () => {
        try {
            const res = await api.get("/admin/dashboard");
            setDashboard(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await api.get("/admin/users");
            setUsers(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchStores = async () => {
        try {
            const res = await api.get("/admin/stores");
            setStores(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const cellStyle = {
        padding: "12px",
        border: "1px solid #ddd",
        textAlign: "center",
    };

    const headerStyle = {
        backgroundColor: "#1e293b",
        color: "white",
        padding: "12px",
    };

    return (
        <div style={{ padding: "20px" }}>
            <button
                onClick={() => {
                    localStorage.clear();
                    window.location.href = "/";
                }}
            >
                Logout
            </button>

            <h1>Admin Dashboard</h1>

            <hr />

            {/* Dashboard Cards */}
            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    margin: "20px 0",
                }}
            >
                <div
                    style={{
                        padding: "20px",
                        background: "#2563eb",
                        color: "white",
                        borderRadius: "10px",
                        width: "200px",
                    }}
                >
                    <h3>Total Users</h3>
                    <h1>{dashboard.totalUsers}</h1>
                </div>

                <div
                    style={{
                        padding: "20px",
                        background: "#16a34a",
                        color: "white",
                        borderRadius: "10px",
                        width: "200px",
                    }}
                >
                    <h3>Total Stores</h3>
                    <h1>{dashboard.totalStores}</h1>
                </div>

                <div
                    style={{
                        padding: "20px",
                        background: "#dc2626",
                        color: "white",
                        borderRadius: "10px",
                        width: "200px",
                    }}
                >
                    <h3>Total Ratings</h3>
                    <h1>{dashboard.totalRatings}</h1>
                </div>
            </div>

            <hr />

            {/* Users Table */}
            <h2>Users</h2>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px",
                }}
            >
                <thead>
                    <tr>
                        <th style={headerStyle}>ID</th>
                        <th style={headerStyle}>Name</th>
                        <th style={headerStyle}>Email</th>
                        <th style={headerStyle}>Role</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td style={cellStyle}>{user.id}</td>
                            <td style={cellStyle}>{user.name}</td>
                            <td style={cellStyle}>{user.email}</td>
                            <td style={cellStyle}>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <hr />

            {/* Stores Table */}
            <h2>Stores</h2>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px",
                }}
            >
                <thead>
                    <tr>
                        <th style={headerStyle}>ID</th>
                        <th style={headerStyle}>Name</th>
                        <th style={headerStyle}>Email</th>
                        <th style={headerStyle}>Owner ID</th>
                    </tr>
                </thead>

                <tbody>
                    {stores.map((store) => (
                        <tr key={store.id}>
                            <td style={cellStyle}>{store.id}</td>
                            <td style={cellStyle}>{store.name}</td>
                            <td style={cellStyle}>{store.email}</td>
                            <td style={cellStyle}>{store.ownerId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}