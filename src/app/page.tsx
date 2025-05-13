import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center text-sm">
        <div className="font-semibold">Strides Over Stigma</div>
        <nav className="space-x-4">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#about" className="hover:underline">Studio</a>
          <a href="#work" className="hover:underline">Work</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
        <div className="hidden md:block">stridesoverstigma@gmail.com</div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center py-40 text-center">
        <h1 className="text-[5rem] md:text-[6rem] font-black leading-none tracking-tight">STRIDES OVER STIGMA</h1>
        <p className="mt-4 text-sm max-w-md">
          Strides Over Stigma is a Reno-based nonprofit running organization focused on community, mental health, and events.
        </p>
      </section>

      {/* Footer */}
      <footer className="text-xs px-6 py-12 flex justify-between w-full text-gray-500">
        <div>&copy; {new Date().getFullYear()} Strides Over Stigma</div>
        <div className="space-x-4">
          <a href="#" className="hover:underline">LinkedIn</a>
          <a href="#" className="hover:underline">Instagram</a>
          <a href="#" className="hover:underline">Twitter</a>
        </div>
      </footer>
    </main>
  )
}
