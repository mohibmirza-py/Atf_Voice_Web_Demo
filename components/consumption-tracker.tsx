import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ConsumptionTrackerProps {
  isSessionActive: boolean;
  onBalanceDepleted: () => void;
}

const INITIAL_BALANCE = 5.00;
const RATE_PER_MINUTE = 0.10; // $0.12 per minute
const STORAGE_KEY = 'atf_voice_balance';

export function ConsumptionTracker({ isSessionActive, onBalanceDepleted }: ConsumptionTrackerProps) {
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);
  const isInitializedRef = useRef(false);

  // Initialize from localStorage on client-side only
  useEffect(() => {
    if (!isInitializedRef.current) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setBalance(parseFloat(stored));
      }
      isInitializedRef.current = true;
    }
  }, []);

  // Save balance to localStorage whenever it changes
  useEffect(() => {
    if (isInitializedRef.current) {
      localStorage.setItem(STORAGE_KEY, balance.toString());
    }
  }, [balance]);

  // Start timer when session becomes active
  useEffect(() => {
    if (isSessionActive && !isRunningRef.current) {
      isRunningRef.current = true;
      startTimeRef.current = Date.now();
    }
  }, [isSessionActive]);

  // Timer effect - only for display
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunningRef.current) {
      interval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = (currentTime - (startTimeRef.current || currentTime)) / 1000; // Convert to seconds
        setTimeElapsed(Math.floor(elapsedTime));
      }, 100); // Update every 100ms for smoother updates
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  // Calculate and deduct consumption when session ends
  useEffect(() => {
    if (!isSessionActive && isRunningRef.current) {
      const endTime = Date.now();
      const elapsedTime = (endTime - (startTimeRef.current || endTime)) / 1000; // Convert to seconds
      const minutesElapsed = elapsedTime / 60; // Convert to minutes
      const consumption = minutesElapsed * RATE_PER_MINUTE;

      setBalance(prev => {
        const newBalance = prev - consumption;
        if (newBalance <= 0) {
          onBalanceDepleted();
          return 0;
        }
        return newBalance;
      });

      // Reset timer state
      isRunningRef.current = false;
      startTimeRef.current = null;
      setTimeElapsed(0);
    }
  }, [isSessionActive, onBalanceDepleted]);

  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;
  const progress = (balance / INITIAL_BALANCE) * 100; // Calculate progress percentage

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <CardTitle className="text-sm font-medium mb-2">Consumption Tracker</CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Balance: ${balance.toFixed(2)}</span>
            <span>Time: {minutes}:{seconds.toString().padStart(2, '0')}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="text-xs text-muted-foreground">
            Rate: ${RATE_PER_MINUTE}/minute
          </div>
          {balance <= 0 && (
            <div className="text-xs text-red-500 mt-2">
              Balance depleted. Please refresh the page to get a new balance.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 