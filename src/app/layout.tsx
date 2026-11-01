import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/data/site";
import "./globals.css";

const grotesk = Manrope({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://plan-interior.netlify.app"),
  title: {
    default: `${site.name} | Luxury Interior Design, Bangladesh`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    images: ["/images/shekhertek/dining-01.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f1eb",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={grotesk.variable}>
      <body>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}[data-reveal-image]::after{display:none}`}</style>
        </noscript>
        <SmoothScroll />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
