import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | HomeTutorly",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md border border-slate-100 p-8 sm:p-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          Terms and Conditions
        </h1>
        <p className="text-sm text-slate-500 mb-8">Last Updated: April 12, 2026</p>

        <p className="text-sm text-slate-700 mb-6">
          Welcome to <strong>HomeTutorly</strong>. By accessing or using our platform, you agree to
          comply with and be bound by the following Terms and Conditions.
        </p>

        <Section title="1. About HomeTutorly">
          <p>
            HomeTutorly is an online platform that connects students and tutors. We act only as a
            facilitator to help users find and connect with each other. We do not provide tutoring
            services or act as an agent for any user.
          </p>
        </Section>

        <Section title="2. User Eligibility">
          <ul>
            <li>You must be at least 18 years old to use this platform.</li>
            <li>
              By using HomeTutorly, you confirm that the information you provide is accurate and
              complete.
            </li>
          </ul>
        </Section>

        <Section title="3. User Accounts">
          <ul>
            <li>Users must register using a valid phone number and OTP verification.</li>
            <li>You are responsible for maintaining the confidentiality of your account.</li>
            <li>Any activity under your account is your responsibility.</li>
          </ul>
        </Section>

        <Section title="4. OTP Verification">
          <ul>
            <li>Login and registration are secured using OTP verification.</li>
            <li>You must not share your OTP with anyone.</li>
            <li>
              HomeTutorly is not responsible for unauthorized access due to OTP sharing.
            </li>
          </ul>
        </Section>

        <Section title="5. Teacher Profiles">
          <ul>
            <li>Users can create one or more teaching profiles.</li>
            <li>All information provided must be accurate and truthful.</li>
            <li>HomeTutorly does not verify the authenticity of teacher profiles.</li>
            <li>Users are responsible for verifying credentials before engaging.</li>
          </ul>
        </Section>

        <Section title="6. Tuition Posts">
          <ul>
            <li>Users can post tuition requirements.</li>
            <li>All details must be accurate and not misleading.</li>
            <li>HomeTutorly does not guarantee responses from tutors.</li>
          </ul>
        </Section>

        <Section title="7. Platform Role & Disclaimer">
          <p>
            HomeTutorly is a technology platform that connects students and tutors. We do not
            verify, endorse, or guarantee the authenticity, qualifications, or reliability of any
            user on the platform.
          </p>
          <p className="mt-2">
            Users are solely responsible for verifying the credentials, background, and suitability
            of tutors or students before engaging.
          </p>
          <p className="mt-2">HomeTutorly shall not be held responsible for:</p>
          <ul>
            <li>Quality of teaching</li>
            <li>Accuracy of user-provided information</li>
            <li>Any disputes between users</li>
            <li>Any financial or personal loss</li>
          </ul>
        </Section>

        <Section title="8. Communication Between Users">
          <ul>
            <li>Users may contact each other using provided contact details.</li>
            <li>
              HomeTutorly is not responsible for any communication, agreement, or outcome between
              users.
            </li>
          </ul>
        </Section>

        <Section title="9. Payments & Charges">
          <ul>
            <li>Currently, services may be offered for free.</li>
            <li>In the future, certain features may become paid.</li>
            <li>Users will be informed before any charges are applied.</li>
          </ul>
        </Section>

        <Section title="10. Prohibited Activities">
          <p>Users must not:</p>
          <ul>
            <li>Provide false or misleading information</li>
            <li>Use the platform for illegal purposes</li>
            <li>Harass or abuse other users</li>
            <li>Attempt to hack, disrupt, or misuse the platform</li>
          </ul>
        </Section>

        <Section title="11. Content Responsibility">
          <ul>
            <li>Users are responsible for all content they upload.</li>
            <li>
              HomeTutorly reserves the right to remove any inappropriate or misleading content.
            </li>
          </ul>
        </Section>

        <Section title="12. Account Suspension">
          <p>
            We reserve the right to suspend or terminate accounts that violate these Terms and
            Conditions.
          </p>
        </Section>

        <Section title="13. Privacy">
          <p>Your data is handled in accordance with our Privacy Policy.</p>
        </Section>

        <Section title="14. Changes to Terms">
          <p>
            HomeTutorly may update these Terms at any time. Continued use of the platform means you
            accept the updated Terms.
          </p>
        </Section>

        <Section title="15. Contact Us">
          <p>
            If you have any questions, contact us at:{" "}
            <a
              href="mailto:support@hometutorly.com"
              className="text-violet-600 underline hover:text-violet-800"
            >
              support@hometutorly.com
            </a>
          </p>
        </Section>

        <hr className="my-6 border-slate-200" />
        <p className="text-sm text-slate-700 font-medium">
          By using HomeTutorly, you agree to these Terms and Conditions.
        </p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-base font-semibold text-slate-800 mb-2">{title}</h2>
      <div className="text-sm text-slate-600 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mt-1 [&_li]:mb-1">
        {children}
      </div>
    </div>
  );
}
