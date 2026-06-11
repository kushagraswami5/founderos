import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-white text-black hover:bg-zinc-200 transition-colors',
            card: 'bg-zinc-950 border border-zinc-800',
            headerTitle: 'text-white',
            headerSubtitle: 'text-zinc-400',
            socialButtonsBlockButton: 'bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800',
            socialButtonsBlockButtonText: 'text-white',
            dividerText: 'text-zinc-500',
            dividerLine: 'bg-zinc-800',
            formFieldLabel: 'text-zinc-400',
            formFieldInput: 'bg-zinc-900 border border-zinc-800 text-white focus:ring-1 focus:ring-white',
            footerActionText: 'text-zinc-500',
            footerActionLink: 'text-white hover:text-zinc-300 transition-colors',
          }
        }}
      />
    </div>
  );
}
