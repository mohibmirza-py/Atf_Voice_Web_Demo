"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { MobileNav } from "./mobile-nav";
import { Badge } from "./ui/badge";
import { siteConfig } from "@/config/site";
import { TwitterIcon, StarIcon, InstagramIcon, GlobeIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "@/components/translations-context";

export function Header() {
  const { t } = useTranslations()
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-200/60 shadow-sm"
    >
      <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-2">
        <MobileNav />
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-md:hidden flex items-center"
        >
          <Link href="/" className="flex gap-3 items-center">
            <Image 
              src="/atf_logo.svg"
              alt="AI Team Force Logo"
              width={28}
              height={28}
              className="opacity-90"
            />
            <motion.h1 
              className="text-lg font-medium tracking-tight flex gap-1 items-center text-slate-900"
              whileHover={{ scale: 1.02 }}
            >
              {t('header.logo')}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Badge 
                variant="outline" 
                className="text-xs font-medium bg-white/90 backdrop-blur-sm border border-primary/10 px-2.5 py-0.5 text-primary"
              >
                {t('header.beta')}
              </Badge>
            </motion.div>
          </Link>
        </motion.nav>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 items-center justify-end ml-auto"
        >
          <Link
            href="https://www.aiteamforce.com"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Visit the Website"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                size="sm"
                className="flex gap-2 items-center bg-white/90 backdrop-blur-sm border-slate-200/60 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
                aria-label="Visit the Website"
              >
                <span className="hidden md:block">Visit Website</span>
                <GlobeIcon className="h-4 w-4" />
              </Button>
            </motion.div>
          </Link>
          <Link
            href="https://www.instagram.com/aiteamforce/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Follow on Instagram"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                size="sm"
                className="flex gap-2 items-center bg-white/90 backdrop-blur-sm border-slate-200/60 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
                aria-label="Follow on Instagram"
              >
                <span className="hidden md:block">Follow on Instagram</span>
                <InstagramIcon className="h-4 w-4" />
              </Button>
            </motion.div>
          </Link>
          <ThemeSwitcher />
        </motion.div>
      </div>
    </motion.header>
  );
}
