import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthLayout from "@/components/auth/AuthLayout";
import RegistrationAuthFlow from "@/components/auth/RegistrationAuthFlow";

export const metadata: Metadata = {
  title: "Register | Find Tutors Near You",
  robots: "noindex, nofollow",
};

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <AuthLayout>
        <RegistrationAuthFlow />
      </AuthLayout>
      <Footer />
    </>
  );
}
