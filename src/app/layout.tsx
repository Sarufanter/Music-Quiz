import { auth } from "@/lib/auth";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { EdgeStoreProvider } from "@/lib/edgestore";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
