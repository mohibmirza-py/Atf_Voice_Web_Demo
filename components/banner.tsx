"use client"

import { useTranslations } from "@/components/translations-context"

export const Banner = () => {
  const { t } = useTranslations();

  return (
    <div className="w-full bg-[#e83163] py-2">
      <div className="container mx-auto px-4 text-center text-white text-sm">
        {t('header.banner')}
        <a 
          href="https://www.aiteamforce.com" 
          className="underline ml-2 hover:text-gray-200"
        >
          {t('header.bannerLink')}
        </a>
      </div>
    </div>
  );
};

export default Banner;
