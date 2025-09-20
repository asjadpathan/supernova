import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center justify-center" aria-label="StudyGen Logo">
      <Image
        src="/favicon.ico"
        alt="StudyGen Logo"
        width={150}
        height={60}
        className="h-auto"
      />
    </div>
  );
}
