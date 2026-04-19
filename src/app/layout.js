import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import localFont from "next/font/local";
import NextAuthProvider from "@/lib/NextAuthProvider";

const popins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const fontBangla = localFont({
  src: "../fonts/mayaboti-normal.ttf",
});

export const metadata = {
  metadataBase: new URL("https://kidz-commerce.vercel.app/"),

  title: {
    default: "Kidz Commerce | Smart Shopping for Kids Products",
    template: "%s | Kidz Commerce",
  },

  description:
    "Kidz Commerce is a modern eCommerce platform for kids products. Explore toys, fashion, and essentials with a seamless shopping experience.",

  keywords: [
    "kids ecommerce",
    "kids products",
    "toys online",
    "kids fashion",
    "baby products",
    "Bangladesh ecommerce",
  ],

  authors: [{ name: "Kidz Commerce Team" }],
  creator: "Kidz Commerce",
  publisher: "Kidz Commerce",

  openGraph: {
    title: "Kidz Commerce | Smart Shopping for Kids",
    description:
      "Discover amazing kids products, toys, and essentials at Kidz Commerce. Fast, secure, and user-friendly shopping experience.",
    url: "https://kidz-commerce.vercel.app/",
    siteName: "Kidz Commerce",
    images: [
      {
        url: "https://i.ibb.co.com/ZbXLxmL/Screenshot-2026-04-15-225031.png",
        width: 1200,
        height: 630,
        alt: "Kidz Commerce Home Page",
      },
      {
        url: "https://i.ibb.co.com/jZv89xBj/Screenshot-2026-04-15-225121.png",
        width: 1200,
        height: 630,
        alt: "Kidz Commerce Products Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Kidz Commerce | Kids Shopping Made Easy",
    description:
      "Shop the best kids products, toys, and essentials online with Kidz Commerce.",
    images: ["https://i.ibb.co.com/ZbXLxmL/Screenshot-2026-04-15-225031.png"],
  },

  icons: {
    icon: "https://i.ibb.co.com/8nGNLjB2/logo.webp",
    shortcut: "https://i.ibb.co.com/8nGNLjB2/logo.webp",
    apple: "https://i.ibb.co.com/8nGNLjB2/logo.webp",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
  },

  category: "ecommerce",
};

export default function RootLayout({ children }) {
  return (
    <NextAuthProvider>
      <html lang="en" className={`${popins.className} antialiased`}>
        <body className="min-h-full flex flex-col">
          <header className="py-2 md:w-11/12 md:mx-auto">
            <Navbar />
          </header>
          <main className="py-2 md:w-11/12 mx-auto min-h[calc(100vh-302px)]">
            {children}
          </main>
          <footer className="">
            <Footer />
          </footer>
        </body>
      </html>
    </NextAuthProvider>
  );
}
