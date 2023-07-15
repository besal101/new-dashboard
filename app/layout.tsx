import ClientOnly from "@/components/ClientOnly";
import Modal from "@/components/Modal";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { ReduxProvider } from "@/providers/ReduxProvider";
import SessionProviderWrapper from "@/providers/SessionProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import "@/styles/globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const fonts = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Lifesmile |  ERP SYSTEMS",
  description:
    "ERP System for Lifesmile.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fonts.className} suppressHydrationWarning={true}>
        <ClientOnly>
          <ReactQueryProvider>
            <SessionProviderWrapper>
              <ReduxProvider>
                <ToasterProvider />
                <Modal />
                {children}
              </ReduxProvider>
            </SessionProviderWrapper>
          </ReactQueryProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
