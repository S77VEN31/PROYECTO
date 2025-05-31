/**
 * Tag Input Component
 * Allows users to add and remove tags with a friendly interface
 */

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { KeyboardEvent, useState } from "react";

/**
 * Tag input component props
 */
interface TagInputProps {
  label?: string;
  placeholder?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
  disabled?: boolean;
  className?: string;
  error?: string;
  description?: string;
}

/**
 * Tag Input Component
 * @param props - Component props
 * @returns JSX element
 */
export function TagInput({
  label,
  placeholder = "Escribe y presiona Enter para agregar...",
  value = [],
  onChange,
  maxTags,
  disabled = false,
  className = "",
  error,
  description,
}: TagInputProps): React.JSX.Element {
  const [inputValue, setInputValue] = useState("");

  /**
   * Add a new tag
   */
  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();

    // Validate tag
    if (!trimmedTag) return;
    if (value.includes(trimmedTag)) return;
    if (maxTags && value.length >= maxTags) return;

    // Add tag and clear input
    onChange([...value, trimmedTag]);
    setInputValue("");
  };

  /**
   * Remove a tag
   */
  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  /**
   * Handle key press events
   */
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      // Remove last tag if input is empty and backspace is pressed
      removeTag(value[value.length - 1]);
    }
  };

  /**
   * Handle input change
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <Label className="text-sm font-medium text-foreground">
          {label}
          {maxTags && (
            <span className="text-xs text-muted-foreground ml-1">
              ({value.length}/{maxTags})
            </span>
          )}
        </Label>
      )}

      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      {/* Tags Display */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-muted/30 rounded-md border">
          {value.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1 text-xs"
            >
              <span>{tag}</span>
              {!disabled && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-auto w-auto p-0 hover:bg-transparent"
                  onClick={() => removeTag(tag)}
                  aria-label={`Eliminar ${tag}`}
                >
                  <X className="h-3 w-3 hover:text-destructive" />
                </Button>
              )}
            </Badge>
          ))}
        </div>
      )}

      {/* Input Field */}
      <div className="relative">
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder={
            maxTags && value.length >= maxTags
              ? `Máximo ${maxTags} elementos alcanzado`
              : placeholder
          }
          disabled={disabled || (maxTags ? value.length >= maxTags : false)}
          className={error ? "border-destructive" : ""}
        />

        {/* Add Button (optional, for mouse users) */}
        {inputValue.trim() &&
          !disabled &&
          (!maxTags || value.length < maxTags) && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-2 text-xs"
              onClick={() => addTag(inputValue)}
            >
              Agregar
            </Button>
          )}
      </div>

      {/* Error Message */}
      {error && <p className="text-xs text-destructive">{error}</p>}

      {/* Helper Text */}
      <p className="text-xs text-muted-foreground">
        Presiona Enter para agregar un elemento o haz clic en la X para
        eliminar.
      </p>
    </div>
  );
}
