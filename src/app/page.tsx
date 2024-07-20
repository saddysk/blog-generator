// src/app/page.tsx

import InputForm from "@/components/InputForm";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <nav className="p-5">
        <Link href="https://www.builderkit.ai" target="_blank">
          <p className="text-xl font-bold">BuilderKit.ai</p>
        </Link>
      </nav>
      <InputForm />
    </main>
  );
}
