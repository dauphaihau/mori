import { Text } from "core/components";

export default function SubTitle({ children }) {
  return (
    <Text
      size={11}
      transforms='uppercase'
      classes='tracking-widest text-primary-gray mb-6 border-b border-gray pb-1'
    >{children}</Text>
  );
}
