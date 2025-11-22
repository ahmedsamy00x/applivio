import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black selection:bg-blue-500/30">
      {/* Background Gradient Blob */}
      <div className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[100px] filter" />
      <div className="absolute top-[20%] right-[10%] h-[400px] w-[400px] rounded-full bg-purple-500/20 blur-[100px] filter" />
      <div className="absolute bottom-[10%] left-[20%] h-[300px] w-[300px] rounded-full bg-indigo-500/20 blur-[100px] filter" />

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="mb-8 text-center">
             <Link href="/" className="inline-block">
                <h1 className="text-2xl font-bold tracking-tighter text-white">
                  Applivio
                </h1>
            </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
