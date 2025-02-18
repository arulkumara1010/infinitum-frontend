import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Define expected response structure
  interface AuthResponse {
    token: string;
  }
  interface ErrorResponse {
    message?: string;
  }
  useEffect(() => {
    const exchangeTokenForSession = async (access_token: string) => {
      try {
        const response = await axios.post<AuthResponse>(
          "https://infinitum-website.onrender.com/api/auth/callback",
          { access_token },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } catch (err: unknown) {
        if (typeof err === "object" && err !== null && "response" in err) {
          const errorResponse = (
            err as { response?: { status?: number; data?: unknown } }
          ).response;
          if (errorResponse?.status === 404) {
            const data = errorResponse.data as ErrorResponse;
            if (data?.message === "Student not found") {
              console.warn("Student not found, redirecting to register...");
              navigate("/register");
              return;
            }
          }

          console.error(
            "Google login failed:",
            errorResponse?.data || "Unknown error"
          );
        } else {
          console.error("An unknown error occurred.", err);
        }
        navigate("/login");
      }
    };

    const hashParams = new URLSearchParams(location.hash.substring(1));
    console.log(hashParams);
    const accessToken = hashParams.get("access_token");
    console.log(accessToken);
    if (accessToken) {
      exchangeTokenForSession(accessToken);
    } else {
      console.error("Required tokens not found in URL");
      navigate("/login");
    }
  }, [location, navigate]);
  return <h2>Processing login...</h2>;
};
export default AuthCallback;
