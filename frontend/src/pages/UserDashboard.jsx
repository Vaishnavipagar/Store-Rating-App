import { useEffect, useState } from "react";
import api from "../services/api";

export default function UserDashboard() {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        fetchStores();
    }, []);

    const fetchStores = async () => {
        try {
            const res = await api.get("/user/stores");
            setStores(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const submitRating = async (storeId) => {
        const rating = prompt("Enter Rating (1-5)");

        try {
            await api.post("/user/rate", {
                storeId,
                rating: Number(rating),
            });

            alert("Rating Submitted");
        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Failed"
            );
        }
    };

    const updateRating = async (storeId) => {
        const rating = prompt("Enter New Rating");

        try {
            await api.put(`/user/rate/${storeId}`, {
                rating: Number(rating),
            });

            alert("Rating Updated");
        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Failed"
            );
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

            <h1>User Dashboard</h1>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px",
                }}
            >
                <thead>
                    <tr>
                        <th style={headerStyle}>Store Name</th>
                        <th style={headerStyle}>Email</th>
                        <th style={headerStyle}>Address</th>
                        <th style={headerStyle}>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {stores.map((store) => (
                        <tr key={store.id}>
                            <td style={cellStyle}>
                                {store.name}
                            </td>

                            <td style={cellStyle}>
                                {store.email}
                            </td>

                            <td style={cellStyle}>
                                {store.address}
                            </td>

                            <td style={cellStyle}>
                                <button
                                    onClick={() =>
                                        submitRating(store.id)
                                    }
                                >
                                    Rate
                                </button>

                                {" "}

                                <button
                                    onClick={() =>
                                        updateRating(store.id)
                                    }
                                >
                                    Update Rating
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}