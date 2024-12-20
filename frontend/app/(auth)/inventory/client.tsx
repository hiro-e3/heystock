"use client";

import { InventoryHistoryTable } from "@/components/inventory-history-table";
import { TablePaginator } from "@/components/table-paginator";
import { InventoryResponse } from "@/types/inventory";
import { PaginatorResourceResponse } from "@/types/paginator-response";

export function InventoryClient({
  inventories,
}: {
  inventories: PaginatorResourceResponse<InventoryResponse>;
}) {
  return (
    <>
      <div className="border rounded p-3">
        <InventoryHistoryTable inventories={inventories.data} />
        <TablePaginator
          currentPage={inventories.meta.current_page}
          lastPage={inventories.meta.last_page}
        />
      </div>
    </>
  );
}
