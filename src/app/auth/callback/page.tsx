import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AuthCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const hashParams = new URLSearchParams(location.hash.substring(1));
        const accessToken = hashParams.get("access_token");
        const providerToken = hashParams.get("provider_token");

        if (accessToken && providerToken) {
            exchangeTokenForSession(accessToken, providerToken);
        } else {
            console.error("Required tokens not found in URL");
            navigate("/login");
        }
    }, [location]);

    // Define expected response structure
    interface AuthResponse {
        token: string;
    }

    interface ErrorResponse {
        message?: string;
    }

    const exchangeTokenForSession = async (access_token: string, provider_token: string) => {
        try {
            const response = await axios.post<AuthResponse>(
                "http://localhost:4000/api/auth/callback",
                { access_token, provider_token },
                { withCredentials: true, headers: { "Content-Type": "application/json" } }
            );

            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (err: unknown) {
            if (typeof err === "object" && err !== null && "response" in err) {
                const errorResponse = (err as { response?: { status?: number; data?: unknown } }).response;

                if (errorResponse?.status === 404) {
                    const data = errorResponse.data as ErrorResponse;
                    if (data?.message === "Student not found") {
                        console.warn("Student not found, redirecting to register...");
                        navigate("/register");
                        return;
                    }
                }
                
                console.error("Google login failed:", errorResponse?.data || "Unknown error");
            } else {
                console.error("An unknown error occurred.", err);
            }
            navigate("/login");
        }
    };

    return <h2>Processing login...</h2>;
};

export default AuthCallback;
