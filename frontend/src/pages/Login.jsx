import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        try {
            const res = await api.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);

            if (res.data.role === "ADMIN") {
                navigate("/admin");
            } else if (res.data.role === "OWNER") {
                navigate("/owner");
            } else {
                navigate("/user");
            }
        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Login Failed"
            );
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#0f172a",
                padding: "20px",
            }}
        >
            <div
                style={{
                    background: "#1e293b",
                    padding: "40px",
                    borderRadius: "16px",
                    width: "380px",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
                }}
            >
                <h1
                    style={{
                        color: "white",
                        textAlign: "center",
                        fontSize: "36px",
                        margin: "0",
                    }}
                >
                    Store Rating App
                </h1>

                <h2
                    style={{
                        color: "#cbd5e1",
                        textAlign: "center",
                        marginTop: "10px",
                        marginBottom: "30px",
                        fontSize: "24px",
                    }}
                >
                    Login
                </h2>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px",
                        borderRadius: "8px",
                        border: "1px solid #475569",
                        outline: "none",
                        boxSizing: "border-box",
                        fontSize: "15px",
                    }}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "20px",
                        borderRadius: "8px",
                        border: "1px solid #475569",
                        outline: "none",
                        boxSizing: "border-box",
                        fontSize: "15px",
                    }}
                />

                <button
                    onClick={login}
                    style={{
                        width: "100%",
                        padding: "12px",
                        backgroundColor: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold",
                    }}
                >
                    Login
                </button>

                <div
                    style={{
                        textAlign: "center",
                        marginTop: "20px",
                    }}
                >
                    <p
                        style={{
                            color: "#cbd5e1",
                            marginBottom: "8px",
                        }}
                    >
                        Don't have an account?
                    </p>

                    <button
                        onClick={() => navigate("/signup")}
                        style={{
                            background: "none",
                            border: "none",
                            color: "#60a5fa",
                            cursor: "pointer",
                            fontSize: "15px",
                            fontWeight: "bold",
                        }}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}