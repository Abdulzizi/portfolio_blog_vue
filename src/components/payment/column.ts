import type { ColumnDef } from "@tanstack/vue-table";
import DropdownAction from "@/components/payment/data-table-dropdown.vue";
import { h } from "vue";

export interface Payment {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: () => h("div", { class: "text-center" }, "ID"),
    cell: ({ row }) => h("div", { class: "text-center" }, row.getValue("id")),
  },
  {
    accessorKey: "email",
    header: () => h("div", { class: "text-left" }, "Email"),
    cell: ({ row }) => h("div", { class: "text-left" }, row.getValue("email")),
  },
  {
    accessorKey: "amount",
    header: () => h("div", { class: "text-right" }, "Amount"),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return h("div", { class: "text-right font-medium" }, formatted);
    },
  },
  {
    accessorKey: "status",
    header: () => h("div", { class: "text-center" }, "Status"),
    cell: ({ row }) =>
      h("div", { class: "text-center" }, row.getValue("status")),
  },
  {
    id: "actions",
    header: () => h("div", { class: "text-center" }, "Actions"),
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return h(
        "div",
        { class: "text-center" },
        h(DropdownAction, {
          payment,
        })
      );
    },
  },
];
