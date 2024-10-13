import { LogoIcon } from "@/assets";
import Image from "next/image";
import Link from "next/link";
export default function Logo() {
  return (
    <Link href='/' className="flex items-center gap-1">
      <Image
        src={LogoIcon.src}
        alt="Nicodigos"
        width={30}
        height={30}
        priority={true}
      />
      <h1 className="font-montserrat font-bold mt-1">Nicodigos</h1>
    </Link>
  );
}
