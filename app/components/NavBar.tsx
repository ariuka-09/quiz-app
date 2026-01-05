import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const NavBar = () => {
  return (
    // Outer wrapper: Handles background and border
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-slate-200">
      {/* Inner Container: Constrains width and handles padding */}
      <div className=" sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Branding */}
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <p className="text-xl font-bold tracking-tight text-slate-900">
            Quiz<span className="text-[#fabd32]">App</span>
          </p>
        </Link>

        {/* Center/Right: Functional Navigation & Auth */}
        <div className="flex items-center gap-6">
          {/* Auth State Management */}
          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" size="sm" className="font-semibold">
                  Нэвтрэх
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-9 w-9",
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};
