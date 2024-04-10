import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/component/Header";
import Image from "@/component/Image";
import Comp from "./Comp";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Image Compressor/Optimizer",
  description: "",
};

export default function RootLayout({ children }) {

  return (
    <>
      <html lang="en">
      <body className={inter.className}>
        <Comp children={children}/>
          
          
      </body>
      </html>
    </>
  );
}
