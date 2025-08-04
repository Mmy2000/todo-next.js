"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { X } from "lucide-react";
import { Filters, TodosFilterProps } from "@/app/types";


const TodosFilter: React.FC<TodosFilterProps> = ({
  filters,
  onChange,
  onApply,
  clearFilters,
}) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  const handleSelectChange = (name: keyof Filters, value: string) => {
    onChange({ ...filters, [name]: value });
  };

  const handleDateChange = (name: keyof Filters, date: Date | undefined) => {
    const formatted = date ? format(date, "yyyy-MM-dd") : "";
    onChange({ ...filters, [name]: formatted });
  };

  return (
      <div className="flex flex-wrap gap-4 items-end mb-6">
        {/* Search input */}
        <Input
          name="search"
          placeholder="Search title/description"
          value={filters.search}
          onChange={handleTextChange}
          className="w-[200px]"
        />

        {/* Status select */}
        <Select
          onValueChange={(val) =>
            handleSelectChange("status", val === "all" ? "" : val)
          }
          value={filters.status || "all"}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>{" "}
            {/* ✅ Use 'all' instead of '' */}
            <SelectItem value="todo">To Do</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>

        {/* Priority select */}
        <Select
          onValueChange={(val) =>
            handleSelectChange("priority", val === "all" ? "" : val)
          }
          value={filters.priority || "all"}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>{" "}
            {/* ✅ Use 'all' instead of '' */}
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>

        {/* Start Date */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[180px] justify-start text-left"
            >
              {filters.start_date ? (
                filters.start_date
              ) : (
                <span className="text-muted-foreground">Start date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={
                filters.start_date ? new Date(filters.start_date) : undefined
              }
              onSelect={(date) => handleDateChange("start_date", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* End Date */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[180px] justify-start text-left"
            >
              {filters.end_date ? (
                filters.end_date
              ) : (
                <span className="text-muted-foreground">End date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={
                filters.end_date ? new Date(filters.end_date) : undefined
              }
              onSelect={(date) => handleDateChange("end_date", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button
          variant="destructive"
          onClick={clearFilters}
          className="mt-2 flex items-center gap-1"
          disabled={
            !filters.status && !filters.priority && !filters.start_date && !filters.end_date
          }
        >
          <X className="w-4 h-4" />
          Clear Filters
        </Button>
      </div>
  );
};

export default TodosFilter;
