'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Company } from "@/types/company";

export function ManufacturerSelect({
  manufacturers,
  value,
  onValueChange,
}: {
  manufacturers: Company[];
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
