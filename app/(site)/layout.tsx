import React from 'react'
import Slider from "@/app/components/slider";
import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";
import NextTopLoader from 'nextjs-toploader';

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <NextTopLoader color='#4CB9C0' height={5} />
            <Navbar />
            <Slider />
            {children}
            <Footer />
        </div>
    )
}
