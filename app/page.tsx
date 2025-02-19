"use client"

import React, { useEffect, useState } from "react"
import useWebRTCAudioSession from "@/hooks/use-webrtc"
import { tools } from "@/lib/tools"
import { Welcome } from "@/components/welcome"
import { VoiceSelector } from "@/components/voice-select"
import { BroadcastButton } from "@/components/broadcast-button"
import { StatusDisplay } from "@/components/status"
import { TokenUsageDisplay } from "@/components/token-usage"
import { MessageControls } from "@/components/message-controls"
import { ToolsEducation } from "@/components/tools-education"
import { TextInput } from "@/components/text-input"
import { motion } from "framer-motion"
import { useToolsFunctions } from "@/hooks/use-tools"
import { SystemPromptInput } from "@/components/system-prompt-input"
import { useTranslations } from "@/components/translations-context"
import { PromptSelector } from "@/components/prompt-selector"
import { Button } from "@/components/ui/button"
import { prompts } from "@/config/prompts"

const App: React.FC = () => {
  const { t, setLocale } = useTranslations();
  const [voice, setVoice] = useState("ash");
  const [industry, setIndustry] = useState("");
  const [language, setLanguage] = useState("");
  const [isCustomPrompt, setIsCustomPrompt] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState(t('systemPrompt.default'));

  // Move function declaration before its usage
  const getFinalPrompt = () => {
    if (isCustomPrompt) return systemPrompt;
    
    const industryPrompt = industry ? prompts.industry[industry as keyof typeof prompts.industry] : '';
    const languagePrompt = language ? prompts.language[language as keyof typeof prompts.language] : '';
    
    return `${industryPrompt}\n\n[Language Settings]\n${languagePrompt}`.trim() || systemPrompt;
  };

  const finalPrompt = getFinalPrompt();
  const {
    status,
    isSessionActive,
    registerFunction,
    handleStartStopClick,
    msgs,
    conversation,
    sendTextMessage,
    stopSession,
    startSession
  } = useWebRTCAudioSession(voice, tools, finalPrompt);

  // Get all tools functions
  const toolsFunctions = useToolsFunctions();

  useEffect(() => {
    // Register all functions by iterating over the object
    Object.entries(toolsFunctions).forEach(([name, func]) => {
      const functionNames: Record<string, string> = {
        timeFunction: 'getCurrentTime',
        backgroundFunction: 'changeBackgroundColor',
        partyFunction: 'partyMode',
        launchWebsite: 'launchWebsite', 
        copyToClipboard: 'copyToClipboard',
        scrapeWebsite: 'scrapeWebsite'
      };
      
      registerFunction(functionNames[name], func);
    });
  }, [registerFunction, toolsFunctions])

  return (
    <main className="h-full">
      <motion.div 
        className="container flex flex-col items-center justify-center mx-auto max-w-3xl my-20 p-12 bg-white dark:bg-gray-900 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.1)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Welcome />
        
        <motion.div 
          className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl border-[0.5px] border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <VoiceSelector value={voice} onValueChange={setVoice} />
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2 justify-center w-full mb-2">
              <Button 
                variant={isCustomPrompt ? "outline" : "default"}
                onClick={() => setIsCustomPrompt(false)}
                className="w-full bg-[#e83163] text-white hover:bg-[#d42b59]"
              >
                🤖 Configure Sarah
              </Button>
              <Button 
                variant={isCustomPrompt ? "default" : "outline"}
                onClick={() => setIsCustomPrompt(true)}
                className="w-full"
              >
                ⚙️ Custom Instructions
              </Button>
            </div>

            {!isCustomPrompt ? (
              <>
                <PromptSelector
                  type="industry"
                  value={industry}
                  onValueChange={setIndustry}
                  disabled={isSessionActive}
                />
                <PromptSelector
                  type="language"
                  value={language}
                  onValueChange={setLanguage}
                  disabled={isSessionActive}
                />
              </>
            ) : (
              <SystemPromptInput 
                value={systemPrompt}
                onChange={setSystemPrompt}
                disabled={isSessionActive}
              />
            )}
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <BroadcastButton 
              isSessionActive={isSessionActive} 
              onClick={handleStartStopClick}
            />
          </div>
          {msgs.length > 4 && <TokenUsageDisplay messages={msgs} />}
          {status && (
            <motion.div 
              className="w-full flex flex-col gap-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MessageControls conversation={conversation} msgs={msgs} />
              <TextInput 
                onSubmit={sendTextMessage}
                disabled={!isSessionActive}
              />
            </motion.div>
          )}
        </motion.div>
        
        {status && <StatusDisplay status={status} />}
        <div className="w-full flex flex-col items-center gap-4">
          <ToolsEducation />
        </div>
      </motion.div>
    </main>
  )
}

export default App;