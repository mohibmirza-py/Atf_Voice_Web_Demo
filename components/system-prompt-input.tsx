import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/components/translations-context";

interface SystemPromptInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function SystemPromptInput({ value, onChange, disabled }: SystemPromptInputProps) {
  const { t } = useTranslations();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{t('systemPrompt.label')}</label>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? t('systemPrompt.collapse') : t('systemPrompt.expand')}
        </Button>
      </div>
      {isExpanded && (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={t('systemPrompt.placeholder')}
          className="min-h-[100px]"
        />
      )}
    </div>
  );
} 