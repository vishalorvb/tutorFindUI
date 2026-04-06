import type { Metadata } from "next";
import BecomeTeacherClient from "./BecomeTeacherClient";

export const metadata: Metadata = {
  title: "Become a Tutor | TutorFind",
  description:
    "Register as a tutor on TutorFind. Set your own schedule, fees and start getting students near you.",
};

export default function BecomeTeacherPage() {
  return <BecomeTeacherClient />;
}
