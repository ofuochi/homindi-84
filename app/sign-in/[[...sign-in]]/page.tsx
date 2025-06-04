"use client";
import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 flex items-center justify-center  mx-auto mb-4">
            <Link href="/">
              <motion.div
                className="w-16 h-16  flex items-center justify-center "
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/logo.png"
                  alt="Homindi Logo"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </motion.div>
            </Link>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 font-roboto">
            Sign in to Homindi
          </h2>
          <p className="mt-2 text-sm text-gray-600 font-roboto">
            Access your account and manage your orders
          </p>
        </div>

        <div className="flex justify-center">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: "bg-[#0B8457] hover:bg-[#0a7249] text-white",
                card: "shadow-lg border-0",
                headerTitle: "font-roboto text-2xl",
                headerSubtitle: "font-roboto",
                socialButtonsBlockButton: "border-gray-200 hover:bg-gray-50",
                formFieldInput:
                  "border-gray-300 focus:border-[#0B8457] focus:ring-[#0B8457]",
                footerActionLink: "text-[#0B8457] hover:text-[#0a7249]",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
