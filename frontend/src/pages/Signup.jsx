import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        password: "",
    });

    const signup = async () => {
        try {
            await api.post("/auth/register", form);

            alert("Signup Successful");

            navigate("/");
        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Signup Failed"
            );
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0f172a",
            }}
        >
            <div
                style={{
                    backgroundColor: "#1e293b",
                    padding: "40px",
                    borderRadius: "15px",
                    width: "400px",
                    textAlign: "center",
                    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
                }}
            >
                <h1 style={{ color: "white" }}>
                    Store Rating App
                </h1>

                <h2
                    style={{
                        color: "#cbd5e1",
                        marginBottom: "20px",
                    }}
                >
                    Sign Up
                </h2>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            name: e.target.value,
                        })
                    }
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "12px",
                        borderRadius: "8px",
                        border: "none",
                        boxSizing: "border-box",
                    }}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            email: e.target.value,
                        })
                    }
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "12px",
                        borderRadius: "8px",
                        border: "none",
                        boxSizing: "border-box",
                    }}
                />

                <input
                    type="text"
                    placeholder="Address"
                    value={form.address}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            address: e.target.value,
                        })
                    }
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "12px",
                        borderRadius: "8px",
                        border: "none",
                        boxSizing: "border-box",
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            password: e.target.value,
                        })
                    }
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "20px",
                        borderRadius: "8px",
                        border: "none",
                        boxSizing: "border-box",
                    }}
                />

                <button
                    onClick={signup}
                    style={{
                        width: "100%",
                        padding: "12px",
                        backgroundColor: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "16px",
                    }}
                >
                    Sign Up
                </button>

                <p
                    style={{
                        color: "#cbd5e1",
                        marginTop: "20px",
                    }}
                >
                    Already have an account?
                </p>

                <button
                    onClick={() => navigate("/")}
                    style={{
                        background: "none",
                        border: "none",
                        color: "#60a5fa",
                        cursor: "pointer",
                    }}
                >
                    Login
                </button>
            </div>
        </div>
    );
}