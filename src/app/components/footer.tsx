export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black py-8 w-full">
      <div className="mx-auto px-4 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Infinitum. All rights reserved.
        </p>
      </div>
    </footer>
  );
}


