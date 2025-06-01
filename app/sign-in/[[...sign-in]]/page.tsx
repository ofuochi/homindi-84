import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#0B8457] to-[#0a7249] rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <span className="text-white font-bold text-2xl font-poppins">DB</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 font-poppins">Sign in to DiasporaBasket</h2>
          <p className="mt-2 text-sm text-gray-600 font-inter">Access your account and manage your orders</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: "bg-[#0B8457] hover:bg-[#0a7249] text-white",
              card: "shadow-lg border-0",
              headerTitle: "font-poppins text-2xl",
              headerSubtitle: "font-inter",
              socialButtonsBlockButton: "border-gray-200 hover:bg-gray-50",
              formFieldInput: "border-gray-300 focus:border-[#0B8457] focus:ring-[#0B8457]",
              footerActionLink: "text-[#0B8457] hover:text-[#0a7249]",
            },
          }}
        />
      </div>
    </div>
  )
}
