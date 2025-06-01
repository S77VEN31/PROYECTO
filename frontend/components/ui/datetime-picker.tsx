"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

interface DateTimePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  minDate?: Date;
}

/**
 * DateTimePicker component that combines date and time selection
 * @param props - Component props
 * @returns JSX element
 */
export function DateTimePicker({
  value,
  onChange,
  placeholder = "Pick a date and time",
  disabled = false,
  className,
  minDate,
}: DateTimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    value
  );

  React.useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  /**
   * Handle date selection from calendar
   */
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      setSelectedDate(undefined);
      onChange?.(undefined);
      return;
    }

    const newDate = new Date(date);

    // If we already have a selected date, preserve the time
    if (selectedDate) {
      newDate.setHours(selectedDate.getHours());
      newDate.setMinutes(selectedDate.getMinutes());
    }

    setSelectedDate(newDate);
    onChange?.(newDate);
  };

  /**
   * Handle time input change
   */
  const handleTimeChange = (timeString: string) => {
    if (!selectedDate) return;

    const [hours, minutes] = timeString.split(":").map(Number);
    const newDate = new Date(selectedDate);
    newDate.setHours(hours || 0);
    newDate.setMinutes(minutes || 0);

    setSelectedDate(newDate);
    onChange?.(newDate);
  };

  /**
   * Get formatted time string for input
   */
  const getTimeString = () => {
    if (!selectedDate) return "";
    return format(selectedDate, "HH:mm");
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, "PPP 'at' HH:mm")
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 space-y-3">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={(date) => {
              if (minDate) {
                return date < minDate;
              }
              return false;
            }}
            initialFocus
          />
          <div className="border-t pt-3">
            <label className="text-sm font-medium mb-2 block">Time</label>
            <Input
              type="time"
              value={getTimeString()}
              onChange={(e) => handleTimeChange(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
