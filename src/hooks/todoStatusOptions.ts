import type { Status } from "@/types/Articles.type";

import { nanoid } from "nanoid";

export interface TodoStatusOption {
  id: string;
  label: string;
  value: Status;
}

export const useTodoStatusOptions = (): Array<TodoStatusOption> => [
  { id: nanoid(), label: "To do", value: "TODO" },
  { id: nanoid(), label: "Completed", value: "COMPLETED" },
];
