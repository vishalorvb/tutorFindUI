import type { Metadata } from "next";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginAuthFlow from "@/components/auth/LoginAuthFlow";

export const metadata: Metadata = {
  title: "Login | Find Tutors Near You",
  robots: "noindex, nofollow",
};

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <AuthLayout>
        <LoginAuthFlow />
      </AuthLayout>
      <Footer />
    </>
  );
}
