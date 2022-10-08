interface DividerType {
  classes?: string,
}

const Divider = ({ classes }: DividerType) => {
  return (
    <div className={`border-b  ${classes} `}/>
  );
}

export default Divider;
