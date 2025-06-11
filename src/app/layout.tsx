"use client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          
          @keyframes marqueeReverse {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </head>
      <body style={{ 
        margin: 0, 
        padding: 0, 
        fontFamily: "system-ui, -apple-system, sans-serif",
        overflow: "hidden"
      }}>
        {children}
      </body>
    </html>
  );
}
