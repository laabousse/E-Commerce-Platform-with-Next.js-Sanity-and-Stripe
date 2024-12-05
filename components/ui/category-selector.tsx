"use client";

import { ChevronsUpDown, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Category } from "@/sanity.types";

interface CategorySelectorProps {
  categories: Category[];
}
export function CategorySelectorComponent({
  categories,
}: CategorySelectorProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const router = useRouter();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full relative flex items-center justify-between
            bg-gradient-to-r from-teal-500 to-teal-600
            hover:from-teal-600 hover:to-teal-700
            text-white hover:text-white
            font-medium
            px-4 py-2.5 rounded-lg
            transition-all duration-200 ease-in-out
            shadow-sm hover:shadow-md"
        >
          <span className="truncate">
            {value
              ? categories.find((category) => category._id === value)?.title
              : "Filter by category"}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-70" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 shadow-lg rounded-lg border-0">
        <Command className="rounded-lg">
          <CommandInput
            placeholder="Search category..."
            className="h-9 rounded-t-lg border-0 focus:ring-2 focus:ring-teal-500 px-2"
          />
          <CommandList>
            <CommandEmpty className="py-6 text-sm text-gray-500">
              No category found.
            </CommandEmpty>
            <CommandGroup className="p-1.5">
              {categories.map((category) => (
                <CommandItem
                  key={category._id}
                  value={category.title}
                  className="rounded-md cursor-pointer hover:bg-teal-50 aria-selected:bg-teal-100 transition-colors"
                  onSelect={() => {
                    setValue(value === category._id ? "" : category._id);
                    router.push(`/categories/${category.slug?.current}`);
                    setOpen(false);
                  }}
                >
                  {category.title}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4 text-teal-600",
                      value === category._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
