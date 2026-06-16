import { useEffect, useState } from "react";
import api from "../services/api";

export default function OwnerDashboard() {
    const [data, setData] = useState({
        averageRating: 0,
        usersWhoRated: [],
    });

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const res = await api.get("/owner/dashboard");
            setData(res.data);
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

            <h1>Owner Dashboard</h1>

            <h2>
                Average Rating: {data.averageRating}
            </h2>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px",
                }}
            >
                <thead>
                    <tr>
                        <th style={headerStyle}>Name</th>
                        <th style={headerStyle}>Email</th>
                        <th style={headerStyle}>Rating</th>
                    </tr>
                </thead>

                <tbody>
                    {data.usersWhoRated.length > 0 ? (
                        data.usersWhoRated.map((user, index) => (
                            <tr key={index}>
                                <td style={cellStyle}>
                                    {user.name}
                                </td>

                                <td style={cellStyle}>
                                    {user.email}
                                </td>

                                <td style={cellStyle}>
                                    {user.rating}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="3"
                                style={cellStyle}
                            >
                                No ratings found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}