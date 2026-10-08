import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Brian Kipkemoi | Electrical & Telecommunications Engineer",
  description:
    "Brian Kipkemoi is a Moi University Electrical & Telecommunications Engineering graduate focused on wireless networks, communication systems and connected infrastructure. Explore telecom projects, network design work, RF analysis and technical experience.",
  keywords: [
    "Brian Kipkemoi",
    "Telecommunications Engineer Kenya",
    "Network Engineer Kenya",
    "Moi University Telecom Engineer",
    "Graduate Telecom Engineer Kenya",
    "Wireless Engineer Kenya",
    "RF Engineering",
    "LoRa telemetry",
  ],
  authors: [{ name: "Brian Kipkemoi" }],
  openGraph: {
    title: "Brian Kipkemoi | Electrical & Telecommunications Engineer",
    description:
      "Moi University Electrical & Telecommunications Engineering graduate focused on wireless networks, communication systems and connected infrastructure.",
    siteName: "Brian Kipkemoi — Portfolio",
    type: "profile",
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian Kipkemoi | Electrical & Telecommunications Engineer",
    description:
      "Wireless networks, communication systems & connected infrastructure. Explore the projects, evidence and engineering story.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#081018",
  width: "device-width",
  initialScale: 1,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Brian Kipkemoi",
  jobTitle: "Graduate Electrical & Telecommunications Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Moi University",
  },
  knowsAbout: [
    "Telecommunications Engineering",
    "Wireless Networks",
    "Computer Networks",
    "Digital Signal Processing",
    "Embedded Connectivity",
    "RF Engineering",
    "Fiber Optic Transmission",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "KE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
