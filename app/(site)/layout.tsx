import React from 'react'
import Slider from "@/app/components/slider";
import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Navbar />
            <Slider />
            {children}
            <Footer />
        </div>
    )
}
