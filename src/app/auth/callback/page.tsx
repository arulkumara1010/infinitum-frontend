import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthCallback = () => {
    const router = useRouter();

    useEffect(() => {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get("access_token");

        if (accessToken) {
            fetchUserProfile(accessToken);
        } else {
            console.error("Access token not found in URL");
            router.push("/register");
        }
    }, []);

    const fetchUserProfile = async (accessToken: string) => {
        try {
            const response = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const { email } = response.data;
            localStorage.setItem("email", email);
            router.push("/register");
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
            router.push("/register");
        }
    };

    return <h2>Processing login...</h2>;
};

export default AuthCallback;