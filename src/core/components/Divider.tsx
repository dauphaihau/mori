interface DividerProps {
  classes?: string,
}

const Divider = ({ classes }: DividerProps) => {
  return (
    <div className={`border-b  ${classes} `}/>
  );
}

export default Divider;
