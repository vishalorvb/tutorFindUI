import type { Metadata } from "next";
import BecomeTeacherClient from "./BecomeTeacherClient";

export const metadata: Metadata = {
  title: "Become a Tutor | HomeTutorly",
  description:
    "Register as a tutor on HomeTutorly. Set your own schedule, fees and start getting students near you.",
};

export default function BecomeTeacherPage() {
  return <BecomeTeacherClient />;
}
