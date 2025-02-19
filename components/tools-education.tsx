"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { useTranslations } from "@/components/translations-context"

// Add disclaimer component
function Disclaimer() {
  return (
    <div className="fixed bottom-4 right-4 text-xs text-muted-foreground">
      <p>For Demo Purposes Only</p>
      <p>© AI Team Force, LLC</p>
    </div>
  )
}

export function ToolsEducation() {
  const { t } = useTranslations();

  // Return both null for tools and the disclaimer
  return <Disclaimer />;

  const AVAILABLE_TOOLS = [
    {
      name: t('tools.availableTools.copyFn.name'),
      description: t('tools.availableTools.copyFn.description'),
    },
    {
      name: t('tools.availableTools.getTime.name'),
      description: t('tools.availableTools.getTime.description'),
    },
    {
      name: t('tools.availableTools.themeSwitcher.name'),
      description: t('tools.availableTools.themeSwitcher.description'),
    },
    {
      name: t('tools.availableTools.partyMode.name'),
      description: t('tools.availableTools.partyMode.description'),
    },
    {
      name: t('tools.availableTools.launchWebsite.name'),
      description: t('tools.availableTools.launchWebsite.description'),
    },
    {
      name: t('tools.availableTools.scrapeWebsite.name'),
      description: t('tools.availableTools.scrapeWebsite.description'),
    },
  ] as const;

  // Original code is preserved but not executed
  /* return (
    <div className="w-full max-w-lg mt-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="tools">
          <AccordionTrigger>{t('tools.availableTools.title')}</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableBody>
                {AVAILABLE_TOOLS.map((tool) => (
                  <TableRow key={tool.name}>
                    <TableCell className="font-medium">{tool.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {tool.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ) */
} 