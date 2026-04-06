import type { Tuition } from "@/types";

const now = new Date();

function hoursAgo(hours: number): string {
  return new Date(now.getTime() - hours * 60 * 60 * 1000).toISOString();
}

function daysAgo(days: number): string {
  return new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();
}

export const mockTuitions: Tuition[] = [
  {
    id: 1,
    subject: "Mathematics",
    course: "Class 10",
    description:
      "Need an experienced math tutor for board exam preparation. Student is weak in trigonometry and algebra. Prefer someone with 3+ years experience.",
    teaching_mode: "home",
    fee: 5000,
    locality: "Banjara Hills",
    city: "Hyderabad",
    pincode: "500034",
    posted_date: hoursAgo(2),
    verify: true,
    slug: "mathematics-tutor-class-10-banjara-hills",
    unlocks: 3,
  },
  {
    id: 2,
    subject: "Physics",
    course: "Class 12",
    description:
      "Looking for a physics tutor who can explain concepts with practical examples. Student preparing for JEE Mains alongside boards.",
    teaching_mode: "online",
    fee: 8000,
    locality: "Koramangala",
    city: "Bangalore",
    pincode: "560034",
    posted_date: hoursAgo(5),
    verify: true,
    slug: "physics-tutor-class-12-koramangala",
    unlocks: 12,
  },
  {
    id: 3,
    subject: "English",
    course: "Class 8",
    description:
      "Need a tutor to improve spoken English and grammar skills. Student has difficulty with essay writing and comprehension.",
    teaching_mode: "home",
    fee: 3000,
    locality: "Connaught Place",
    city: "Delhi",
    pincode: "110001",
    posted_date: hoursAgo(12),
    verify: false,
    slug: "english-tutor-class-8-connaught-place",
    unlocks: 0,
  },
  {
    id: 4,
    subject: "Chemistry",
    course: "Class 11",
    description:
      "Organic chemistry is the main focus area. Need someone who can simplify complex reactions and mechanisms.",
    teaching_mode: "online",
    fee: 6000,
    locality: "Andheri West",
    city: "Mumbai",
    pincode: "400058",
    posted_date: daysAgo(1),
    verify: true,
    slug: "chemistry-tutor-class-11-andheri-west",
    unlocks: 7,
  },
  {
    id: 5,
    subject: "Computer Science",
    course: "Class 12",
    description:
      "Python and data structures tutoring needed. Student wants to build strong programming fundamentals for engineering entrance.",
    teaching_mode: "online",
    fee: 7000,
    locality: "Hitec City",
    city: "Hyderabad",
    pincode: "500081",
    posted_date: daysAgo(2),
    verify: true,
    slug: "computer-science-tutor-class-12-hitec-city",
    unlocks: 5,
  },
  {
    id: 6,
    subject: "Mathematics",
    course: "Class 6",
    description:
      "Basic math concepts and mental math practice needed. Looking for a patient tutor for a young learner.",
    teaching_mode: "home",
    fee: 2500,
    locality: "Jubilee Hills",
    city: "Hyderabad",
    pincode: "500033",
    posted_date: daysAgo(3),
    verify: false,
    slug: "mathematics-tutor-class-6-jubilee-hills",
    unlocks: 1,
  },
  {
    id: 7,
    subject: "Biology",
    course: "NEET",
    description:
      "NEET aspirant needs help with botany and zoology. Prefer a tutor who has coached NEET students before.",
    teaching_mode: "home",
    fee: 10000,
    locality: "Velachery",
    city: "Chennai",
    pincode: "600042",
    posted_date: hoursAgo(18),
    verify: true,
    slug: "biology-tutor-neet-velachery",
    unlocks: 15,
  },
  {
    id: 8,
    subject: "Hindi",
    course: "Class 9",
    description:
      "Need help with Hindi literature and grammar for CBSE board exams. Student is from an English medium background.",
    teaching_mode: "online",
    fee: 2000,
    locality: "Sector 62",
    city: "Noida",
    pincode: "201301",
    posted_date: daysAgo(4),
    verify: false,
    slug: "hindi-tutor-class-9-sector-62",
    unlocks: 0,
  },
  {
    id: 9,
    subject: "Physics",
    course: "IIT JEE",
    description:
      "Advanced physics for IIT JEE Advanced. Need a tutor experienced with HC Verma and Irodov level problems.",
    teaching_mode: "online",
    fee: 12000,
    locality: "Kota",
    city: "Kota",
    pincode: "324005",
    posted_date: hoursAgo(8),
    verify: true,
    slug: "physics-tutor-iit-jee-kota",
    unlocks: 20,
  },
  {
    id: 10,
    subject: "Accountancy",
    course: "Class 12",
    description:
      "Commerce student needs help with partnership accounts and company accounts chapters for board exam.",
    teaching_mode: "home",
    fee: 4000,
    locality: "Salt Lake",
    city: "Kolkata",
    pincode: "700091",
    posted_date: daysAgo(5),
    verify: true,
    slug: "accountancy-tutor-class-12-salt-lake",
    unlocks: 8,
  },
];

export const subjects: string[] = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Hindi",
  "Computer Science",
  "Accountancy",
];

export const courses: string[] = [
  "Class 6",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "NEET",
  "IIT JEE",
];

export const cities: string[] = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Kota",
  "Noida",
  "Gurgaon",
  "Chandigarh",
  "Patna",
  "Bhopal",
  "Indore",
  "Nagpur",
  "Surat",
  "Howrah",
];

export const popularCities: { label: string; href: string }[] = [
  { label: "Math Tutor in Hyderabad", href: "/tuition/math-hyderabad" },
  { label: "Home Tuition in Delhi", href: "/tuition/delhi" },
  { label: "Physics Tutor in Bangalore", href: "/tuition/physics-bangalore" },
  { label: "Chemistry Tutor in Mumbai", href: "/tuition/chemistry-mumbai" },
  { label: "English Tutor in Chennai", href: "/tuition/english-chennai" },
  { label: "NEET Tutor in Kota", href: "/tuition/neet-kota" },
];
