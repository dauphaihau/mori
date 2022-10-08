import { ComponentPropsWithoutRef, ReactNode } from "react";

type ListType = {
  classes?: string
  children: ReactNode
} & ComponentPropsWithoutRef<'ul'> & ComponentPropsWithoutRef<'li'>

const List = ({ children, classes = '', ...others }: ListType) => {
  return (
    <ul className={classes} {...others}>
      {children}
    </ul>
  )
}

const Item = ({ children, classes, ...others }: ListType) => <li {...others} className={classes}>{children}</li>;

List.Item = Item;

export default List
