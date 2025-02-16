"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router
import axios from "axios";

interface UserProfile {
    email: string;
}

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
            const response = await axios.get<UserProfile>("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const { email } = response.data;

            if (email.endsWith("@psgtech.ac.in")) {
                const year = `20${email.substring(0, 2)}`;
                const rollNo = email.substring(0, 6);
                const currentYear = new Date().getFullYear();
                const admissionYear = parseInt(year, 10);
                const yearOption = currentYear - admissionYear;

                localStorage.setItem("email", email);
                localStorage.setItem("year", yearOption.toString());
                localStorage.setItem("rollNo", rollNo);
                router.push("/register");
            } else {
                alert("Please use your PSG Tech email ID.");
                router.push("/login");
            }
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
            router.push("/register");
        }
    };

    return <h2>Processing login...</h2>;
};

export default AuthCallback;