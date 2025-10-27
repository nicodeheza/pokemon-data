import Image from "next/image";

export function Header() {
  return (
    <header className="container mx-auto bg-white px-4 pt-3">
      <Image
        src="/images/Pokémon.svg"
        alt="Pokémon"
        width={80}
        height={10}
        priority
      />
    </header>
  );
}
