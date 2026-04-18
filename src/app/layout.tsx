import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { ToastProvider } from "@/components/toast/ToastContext";
import ToastContainer from "@/components/toast/ToastContainer";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { LoaderProvider } from "@/components/loader/LoaderContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HomeTutorly — Find the Best Home & Online Tutors Near You",
  description:
    "Connect with 2,000+ verified home tutors and online tutors across India. Post your requirement, get matched instantly, and book a free demo class. Subjects: Math, Physics, Chemistry, English, Coding and more.",
  keywords:
    "home tutor, online tutor, tutor near me, find tutor, mathematics tutor, physics tutor, NEET tutor, IIT JEE tutor, tutor in Hyderabad, tutor in Delhi, tutor in Bangalore",
  openGraph: {
    title: "HomeTutorly — Find the Best Home & Online Tutors Near You",
    description:
      "Connect with verified tutors. Book a free demo class. 10,000+ students trust HomeTutorly.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LoaderProvider>
        <ToastProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
          <ToastContainer />
        </ToastProvider>
        </LoaderProvider>
      </body>
    </html>
  );
}
