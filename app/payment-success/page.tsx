"use client";

import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-[#F5EFE6] px-3 py-4 font-sans text-[#422B1E] md:px-5 md:py-6">
      <div className="mx-auto max-w-[760px]">
        <div className="rounded-[24px] border border-[#dacdbf] bg-white p-4 shadow-lg sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-12 w-auto overflow-hidden sm:h-14">
              <img
                src="/images/petkeepsart_logo2.png"
                alt="Pet Keeps Art"
                className="h-full w-full object-contain"
              />
            </div>

            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-[#d7c9bb] bg-[#fcf9f5] px-4 py-2 text-[13px] font-bold text-[#5B4334] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
            >
              ← Back to Home
            </Link>
          </div>

          <div className="rounded-[22px] border border-[#e7ddd1] bg-[#fcf9f5] px-4 py-6 text-center shadow-sm sm:px-7 sm:py-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-[32px] shadow-sm">
              ✅
            </div>

            <h1 className="text-[26px] font-black leading-tight text-[#4B3427] sm:text-[32px]">
              Payment received
            </h1>

            <p className="mx-auto mt-3 max-w-[560px] text-[15px] leading-relaxed text-[#6B5345] sm:text-[17px]">
              Please check your email for your secure customize link.
            </p>

            <p className="mx-auto mt-2 max-w-[560px] text-[13px] leading-relaxed text-[#8A7464] sm:text-[14px]">
              If you do not see the email, please check your spam or junk folder.
            </p>

            <div className="mt-6 rounded-[16px] border border-[#eadfd2] bg-white px-4 py-4 text-left text-[14px] text-[#5B4334] shadow-sm sm:px-5">
              <div className="font-black text-[#4B3427]">Next step</div>
              <div className="mt-2 leading-relaxed">
                Open the email from Pet Keeps Art and click your secure order link
                to start customizing your files.
              </div>
            </div>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-[14px] bg-[#6B8E7B] px-6 py-3 text-[15px] font-black text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#5a7a68] hover:shadow-lg"
              >
                Return to Home
              </Link>

              <a
                href="mailto:info@petkeepsart.com"
                className="inline-flex items-center justify-center rounded-[14px] border border-[#d7c9bb] bg-white px-6 py-3 text-[15px] font-black text-[#5B4334] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#fcf9f5] hover:shadow-md"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}