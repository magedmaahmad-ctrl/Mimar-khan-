import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
}

const BrandLogo = ({ className }: BrandLogoProps) => {
  return (
    <img
      src="/brand/mimar-khan-wordmark.png"
      alt="Mimar Khan"
      className={cn("block h-auto select-none object-contain", className)}
      draggable={false}
      decoding="async"
      loading="eager"
    />
  );
};

export default BrandLogo;
