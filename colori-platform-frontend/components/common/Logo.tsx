import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  linkTo?: string | null;
}

export function Logo({
  width = 40,
  height = 40,
  className = "",
  linkTo = "/",
}: LogoProps) {
  const LogoContent = () => (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/logo.jpg"
        alt="Colori Logo"
        width={width}
        height={height}
        className="rounded-full"
      />
    </div>
  );

  if (linkTo) {
    return (
      <Link href={linkTo} className="focus:outline-none">
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
}
