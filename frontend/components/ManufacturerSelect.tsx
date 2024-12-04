'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Manufacturer } from "@/types/manufacturer";

export function ManufacturerSelect({
  manucaturers,
  value,
  onValueChange,
}: {
  manucaturers: Manufacturer[];
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  return (
    <Select onValueChange={onValueChange} value={value} >
      <SelectTrigger>
        <SelectValue placeholder="select manufacturer" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {manucaturers.map((manucaturer) => (
            <SelectItem key={manucaturer.id} value={manucaturer.id.toString()}>
              {manucaturer.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
