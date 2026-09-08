import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
}

const BrandLogo = ({ className }: BrandLogoProps) => {
  return (
    <img
      src="/brand/mimar-khan-wordmark-600.png"
      alt="Mimar Khan"
      width="600"
      height="53"
      className={cn("block h-auto select-none object-contain", className)}
      draggable={false}
      decoding="async"
      loading="eager"
    />
  );
};

export default BrandLogo;
