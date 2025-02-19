import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GithubIcon } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "@/components/translations-context"

export function Welcome() {
  const { t } = useTranslations()
  
  return (
    <div className="text-center mb-8 space-y-2">
      <h1 className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-[#e83163] to-[#fbb51f] bg-clip-text text-transparent">
        Meet Sarah - Your AI Assistant
      </h1>
      <p className="text-muted-foreground">
        By AI Team Force
      </p>
      <p className="max-w-[600px] text-sm text-muted-foreground mx-auto">
        Sarah is a versatile AI assistant that can adapt to various roles and speak multiple languages. 
        Choose a template or customize her behavior to suit your needs.
      </p>
    </div>
  )
}

export default Welcome;