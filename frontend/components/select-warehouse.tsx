"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Warehouse } from "@/types/warehouse";

export function SelectWarehouse({
  warehouses,
  value,
  onValueChange,
}: {
  warehouses: Warehouse[];
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger>
        <SelectValue placeholder="select warehouses" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {warehouses.map((warehouse) => (
            <SelectItem key={warehouse.id} value={warehouse.id.toString()}>
              {warehouse.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
