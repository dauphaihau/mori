import { Icons, Row, Text } from "core/components";

export default function ErrorServer({
  message, onClick
}) {
  if (!message) return null
  return (
    <Row
      align='center'
      justify='between'
      classes='p-3 mb-4 rounded-lg bg-[#f8dde0]'
    >
      <Text classes='text-[#792425] text-sm'>{message}</Text>
      <Icons.x
        className='text-[#ab6c6e] h-4 w-4 hover:opacity-80 cursor-pointer'
        onClick={onClick}
      />
    </Row>
  );
}
