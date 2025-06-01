/**
 * Paginated Selector Component
 * Reusable component for selecting items with infinite scroll pagination
 */

"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Generic item interface for the selector
 */
export interface SelectorItem {
  id: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allow additional properties
}

/**
 * Paginated response interface
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

/**
 * Props for the paginated selector component
 */
interface PaginatedSelectorProps<T extends SelectorItem> {
  /** Current selected item IDs */
  value: string[];
  /** Callback when selection changes */
  onChange: (selectedIds: string[]) => void;
  /** Function to fetch items */
  fetchItems: (params: {
    page: number;
    limit: number;
    search?: string;
  }) => Promise<PaginatedResponse<T>>;
  /** Placeholder text for the trigger button */
  placeholder: string;
  /** Placeholder text for the search input */
  searchPlaceholder: string;
  /** Text to show when no items are found */
  emptyText: string;
  /** Text to show when loading */
  loadingText: string;
  /** Function to render each item in the list */
  renderItem: (item: T, isSelected: boolean) => React.ReactNode;
  /** Function to render selected items as tags */
  renderSelectedItem: (item: T, onRemove: () => void) => React.ReactNode;
  /** Whether the selector is disabled */
  disabled?: boolean;
  /** Maximum number of items to load per page */
  pageSize?: number;
  /** Whether to allow multiple selection */
  multiple?: boolean;
}

/**
 * Paginated selector component with infinite scroll
 */
export function PaginatedSelector<T extends SelectorItem>({
  value,
  onChange,
  fetchItems,
  placeholder,
  searchPlaceholder,
  emptyText,
  loadingText,
  renderItem,
  renderSelectedItem,
  disabled = false,
  pageSize = 10,
  multiple = true,
}: PaginatedSelectorProps<T>): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  /**
   * Load items from the API
   */
  const loadItems = useCallback(
    async (page: number, searchTerm: string = "", reset: boolean = false) => {
      try {
        if (page === 1) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }
        setError(null);

        const response = await fetchItems({
          page,
          limit: pageSize,
          search: searchTerm || undefined,
        });

        if (reset || page === 1) {
          setItems(response.data);
        } else {
          // Merge new items with existing ones, avoiding duplicates
          setItems((prev) => {
            const existingIds = new Set(prev.map((item) => item.id));
            const newItems = response.data.filter(
              (item) => !existingIds.has(item.id)
            );
            return [...prev, ...newItems];
          });
        }

        setHasMore(page < response.pages);
        setCurrentPage(page);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading items");
        console.error("Error loading items:", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [fetchItems, pageSize]
  );

  /**
   * Handle search input change with debouncing
   */
  const handleSearchChange = useCallback(
    (searchTerm: string) => {
      setSearch(searchTerm);

      // Clear existing timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // Set new timeout for debounced search
      searchTimeoutRef.current = setTimeout(() => {
        setCurrentPage(1);
        setHasMore(true);
        loadItems(1, searchTerm, true);
      }, 300);
    },
    [loadItems]
  );

  /**
   * Check if should load more items
   */
  const checkLoadMore = useCallback(() => {
    if (!listRef.current || loading || loadingMore || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

    // Load more when scrolled to 85% of the list
    if (scrollPercentage > 0.85) {
      loadItems(currentPage + 1, search);
    }
  }, [loading, loadingMore, hasMore, currentPage, search, loadItems]);

  /**
   * Handle scroll events with throttling
   */
  const handleScroll = useCallback(() => {
    checkLoadMore();
  }, [checkLoadMore]);

  /**
   * Handle wheel events specifically for mouse wheel - based on Radix UI solution
   */
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!listRef.current || e.deltaY === 0 || e.deltaX !== 0) {
        return;
      }

      // Prevent default to avoid conflicts
      e.preventDefault();
      e.stopPropagation();

      // Scroll the list manually
      const delta = e.deltaY;
      const currPos = listRef.current.scrollTop;
      const scrollHeight = listRef.current.scrollHeight;
      const clientHeight = listRef.current.clientHeight;
      const maxScroll = scrollHeight - clientHeight;
      const newPos = Math.max(0, Math.min(maxScroll, currPos + delta));

      listRef.current.scrollTop = newPos;

      // Check if we need to load more after scrolling
      requestAnimationFrame(() => {
        setTimeout(checkLoadMore, 10);
      });
    },
    [checkLoadMore]
  );

  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        event.key === "End"
      ) {
        // Small delay to ensure scroll position is updated
        requestAnimationFrame(() => {
          setTimeout(checkLoadMore, 50);
        });
      }
    },
    [checkLoadMore]
  );

  /**
   * Load initial items when dialog opens
   */
  useEffect(() => {
    if (open) {
      setCurrentPage(1);
      setHasMore(true);
      setSearch("");
      loadItems(1, "", true);
    }
  }, [open, loadItems]);

  /**
   * Add event listeners when component mounts and list is available
   */
  useEffect(() => {
    const listElement = listRef.current;
    if (listElement && open) {
      // Add wheel event listener directly to avoid passive event issues
      listElement.addEventListener("wheel", handleWheel, { passive: false });
      listElement.addEventListener("keydown", handleKeyDown);

      return () => {
        listElement.removeEventListener("wheel", handleWheel);
        listElement.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [handleWheel, handleKeyDown, open, items.length]); // Re-run when items change

  /**
   * Handle item selection
   */
  const handleItemSelect = (item: T) => {
    if (!multiple) {
      onChange([item.id]);
      setOpen(false);
      return;
    }

    const isSelected = value.includes(item.id);
    if (isSelected) {
      onChange(value.filter((id) => id !== item.id));
    } else {
      onChange([...value, item.id]);
    }
  };

  /**
   * Handle item removal from selected items
   */
  const handleItemRemove = (itemId: string) => {
    onChange(value.filter((id) => id !== itemId));
  };

  /**
   * Get selected items for display
   */
  const selectedItems = items.filter((item) => value.includes(item.id));

  /**
   * Clean up timeout on unmount
   */
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
            disabled={disabled}
          >
            {value.length > 0
              ? multiple
                ? `${value.length} elemento(s) seleccionado(s)`
                : selectedItems[0]?.name || placeholder
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={searchPlaceholder}
              value={search}
              onValueChange={handleSearchChange}
            />
            <CommandList
              ref={listRef}
              onScroll={handleScroll}
              className="max-h-[300px] overflow-y-auto"
            >
              {loading && (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="ml-2 text-sm">{loadingText}</span>
                </div>
              )}

              {!loading && error && (
                <CommandEmpty>
                  <div className="text-center text-sm text-destructive">
                    {error}
                  </div>
                </CommandEmpty>
              )}

              {!loading && !error && items.length === 0 && (
                <CommandEmpty>{emptyText}</CommandEmpty>
              )}

              {!loading && !error && items.length > 0 && (
                <CommandGroup>
                  {items.map((item, index) => {
                    const isSelected = value.includes(item.id);
                    return (
                      <CommandItem
                        key={`${item.id}-${index}`}
                        onSelect={() => handleItemSelect(item)}
                      >
                        <Check
                          className={`mr-2 h-4 w-4 ${
                            isSelected ? "opacity-100" : "opacity-0"
                          }`}
                        />
                        {renderItem(item, isSelected)}
                      </CommandItem>
                    );
                  })}

                  {/* Load More Button */}
                  {!loading && !loadingMore && hasMore && (
                    <div className="flex justify-center py-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => loadItems(currentPage + 1, search)}
                        className="text-xs"
                      >
                        Cargar más elementos...
                      </Button>
                    </div>
                  )}

                  {loadingMore && (
                    <div className="flex items-center justify-center py-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="ml-2 text-sm">Cargando más...</span>
                    </div>
                  )}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Selected Items Display */}
      {multiple && value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedItems.map((item) => (
            <div key={`selected-${item.id}`}>
              {renderSelectedItem(item, () => handleItemRemove(item.id))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
