"use client"

import Image from "next/image"
import Link from "next/link"
import PulsatingButton from "@/components/ui/pulsating-button";
import { AnimatedSubscribeButton } from "@/components/ui/animated-subscribe-button";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { useParams } from "next/navigation";


export default function Hero() {

  const params = useParams()
  const tableNumber = params.selectedTable
  console.log(params);
  
  return (
    <div>
      <div className="w-full h-[40vh] relative overflow-hidden">
        <Image
          src="/assets/hero.jpeg"
          alt="Hotel Kolhapuri hero image"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div className="max-w-3xl mx-auto px-4 text-center -mt-16 relative z-10">
          <div className="bg-[#FF6B2B] rounded-full w-32 h-32 mx-auto flex items-center justify-center mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
              <path d="M7 2v20" />
              <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl lexend font-bold mb-4">Hotel Jagdamba</h1>
          <p className="font-bold khula	 text-gray-600 mb-8 ">
          "स्वाद महाराष्ट्राचा, सेवा आमची – बसल्या जागेवर ऑर्डर करा, स्वादिष्ट जेवणाचा आनंद घ्या!"
            <br />          
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          
          {tableNumber && (
  <Link href={`/table/${tableNumber}/menu/Veg`} passHref>
    <PulsatingButton className="bg-white text-black font-semibold px-8 py-3 rounded-lg border-2 border-gray-300">
      Browse menu
    </PulsatingButton>
  </Link>
)}

          </div>
        </div>
      </div>
  )
}
