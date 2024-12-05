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
  manufacturers: manufacturers,
  value,
  onValueChange,
}: {
  manufacturers: Manufacturer[];
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
          {manufacturers.map((manucaturer) => (
            <SelectItem key={manucaturer.id} value={manucaturer.id.toString()}>
              {manucaturer.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
