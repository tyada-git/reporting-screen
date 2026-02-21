import * as React from "react";
import { List } from "react-window";
import type { RowComponentProps } from "react-window";

const MAX_VISIBLE_ROWS = 4;
const ROW_HEIGHT = 46;
type ListboxProps = React.HTMLAttributes<HTMLElement>;
type RowProps = {
  items: React.ReactElement<React.LiHTMLAttributes<HTMLLIElement>>[];
};

function RowComponent({ index, items, style }: RowComponentProps<RowProps>) {
  const item = items[index];

  return React.cloneElement(item, {
    style: {
      ...(item.props.style as React.CSSProperties | undefined),
      ...style,
      width: "100%",
      boxSizing: "border-box",
    },
  });
}

export const VirtualizedListbox = React.forwardRef<
  HTMLUListElement,
  ListboxProps
>(function VirtualizedListbox(props, ref) {
  const { children, ...other } = props;
  const items = React.Children.toArray(children) as React.ReactElement<
    React.LiHTMLAttributes<HTMLLIElement>
  >[];

  const height = Math.min(items.length, MAX_VISIBLE_ROWS) * ROW_HEIGHT;

  return (
    <ul
      ref={ref}
      {...other}
      style={{
        ...(other.style as React.CSSProperties),
        padding: 0,
        margin: 0,
        listStyle: "none",
      }}
    >
      <List
        className="virtualized-scroll"
        style={{
          height,
          width: "100%",
          overflowY: "auto", // allow vertical scroll
          overflowX: "hidden",
        }}
        rowCount={items.length}
        rowHeight={ROW_HEIGHT}
        rowComponent={RowComponent}
        rowProps={{ items }}
        overscanCount={6}
      />
    </ul>
  );
});
