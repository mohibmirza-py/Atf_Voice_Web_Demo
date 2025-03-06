import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { prompts } from "@/config/prompts"

interface PromptSelectorProps {
  type: 'industry' | 'language'
  value: string
  onValueChange: (value: string) => void
  disabled?: boolean
}

export function PromptSelector({ type, value, onValueChange, disabled }: PromptSelectorProps) {
  const options = type === 'industry' ? prompts.industry : prompts.language
  
  // Function to format the display name of each option
  const formatDisplayName = (key: string) => {
    if (key === 'first_class_property') return 'FIRST CLASS PROPERTY';
    return key.replace('_', ' ').toUpperCase();
  };
  
  return (
    <div className="form-group space-y-2">
      <Label htmlFor={`${type}Select`} className="text-sm font-medium flex items-center gap-2">
        {type === 'industry' ? '🎯 Configure Sarah\'s Role' : '🌐 Select Language'}
      </Label>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-[#e83163] dark:hover:border-[#e83163] transition-colors">
          <SelectValue placeholder={type === 'industry' ? "Choose Sarah's role..." : "Choose language..."} />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(options).map(([key, _]) => (
            <SelectItem key={key} value={key}>
              {formatDisplayName(key)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
} 