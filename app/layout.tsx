import "./globals.css";

import { Inter } from "next/font/google";
import { themeEffect } from "./theme-effect";
import { Analytics } from "./analytics";
import { Header } from "./header";
import { Footer } from "./footer";
import { doge } from "./doge";

const inter = Inter({ subsets: ["latin"] });
//  text font For the headlines, Neutraface will be used and for the bodies of the text, Neris.

export const metadata = {
  title: "BuildWithin's blog",
  description:
    "Streamline training and mentoring with our comprehensive workforce solutions. Launch apprenticeships, access training materials, and leverage AI coaching",
  openGraph: {
    title: "BuildWithin's blog",
    description:
      "Streamline training and mentoring with our comprehensive workforce solutions. Launch apprenticeships, access training materials, and leverage AI coaching",
    url: "https://www.buildwithin.com/",
    siteName: "BuildWithin's blog",
  },
  twitter: {
    card: "summary_large_image",
    site: "@JoinBuildwithin",
    creator: "@JoinBuildwithin",
  },
  metadataBase: new URL("https://www.buildwithin.com/"),
  // 
};
export const viewport = {
  themeColor: "transparent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.className} antialiased`}
      suppressHydrationWarning={true}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})();(${doge.toString()})();`,
          }}
        />
      </head>

      <body className="dark:text-gray-100 max-w-2xl m-auto">
        <main className="p-6 pt-3 md:pt-6 min-h-screen">
          <Header />
          {children}
        </main>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
