import type { ComponentProps, ReactNode } from "react";
import { cn } from "../lib/utils";

type ListProps<Data extends { id: number | string }> = {
    data: Data[];
    renderData: (item: Data) => ReactNode
} & ComponentProps<"ul">

function List<Data extends { id: number | string }>({
    data, 
    renderData,
    className,
    ...props
}: ListProps<Data>) {
    return (
    <ul className={cn("list-none", className)} {...props}>
      {data.map((item) => (
        <li key={item.id}>{renderData(item)}</li>
      ))}
    </ul>
  );
}

export default List;