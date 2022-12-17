import { ComponentPropsWithoutRef, ReactNode } from "react";

type ListProps = {
  classes?: string
  children: ReactNode
} & ComponentPropsWithoutRef<'ul'> & ComponentPropsWithoutRef<'li'>

const List = ({ children, classes = '', ...others }: ListProps) => {
  return (
    <ul className={classes} {...others}>
      {children}
    </ul>
  )
}

const Item = ({ children, classes, ...others }: ListProps) => <li {...others} className={classes}>{children}</li>;

List.Item = Item;

export default List
