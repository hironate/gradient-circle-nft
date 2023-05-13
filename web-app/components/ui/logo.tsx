import Link from 'next/link';
import Image from 'next/image';
import LogoImage from '@/public/images/logo.png';

export default function Logo() {
  return (
    <Link href="/" className="block" aria-label="Gradient Circle Logo">
      <Image src={LogoImage} alt="Gradient Circle Logo" className="w-8 h-8" />
    </Link>
  );
}
