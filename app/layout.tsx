import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ServiceNest — Premium Hair Braiding & African Cuisine in North Dakota",
    template: "%s | ServiceNest"
  },
  description: "ServiceNest offers premium African hair braiding services and authentic Nigerian dish cooking in North Dakota. Book your appointment or order your favorite dish today.",
  keywords: ["hair braiding", "African braiding", "Nigerian food", "Nkwobi", "Abacha", "North Dakota", "ServiceNest"],
  openGraph: {
    title: "ServiceNest — Premium Hair Braiding & African Cuisine",
    description: "Book premium hair braiding and authentic African cuisine services in North Dakota.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
