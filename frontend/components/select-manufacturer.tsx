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

export function SelectManufacturer({
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
        <SelectValue placeholder="メーカー名を選択してください" />
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
