import { Text, Box, Button, NextImage } from 'core/components';
import { FC } from "react";

const MemberServices: FC = () => {
  return (
    <Box classes='my-8 tablet:my-12 laptop:my-16 desktop:my-20 monitor:my-24 pb-5 laptop:pb-3.5 desktop:pb-5 pt-3 laptop:pt-1.5 desktop:pt-2 monitor:pt-3 text-center'>
      <Box classes='max-w-md mx-auto mb-4 tablet:mb-5 desktop:mb-8 desktop:mb-10 monitor:mb-12'>
        <Text
          h3
          classes='text-heading text-lg tablet:text-xl laptop:text-desktop desktop:text-monitor desktop:leading-10 font-bold mb-2 tablet:mb-3 laptop:mb-3.5'
        >
          Talk To A Real Person
        </Text>
        <Text classes='text-xs tablet:text-sm leading-6 tablet:leading-7'>Are you on the fence?
          Have a question? Need a recommendation? Member Services is always here to help. Send us a message.</Text>
      </Box>
      <Box classes='mb-2 tablet:mb-0 desktop:mb-2 desktop:mb-4 monitor:mb-6 tablet:px-20 laptop:px-40 desktop:px-0 flex justify-center'>
        <NextImage
          alt='people'
          width={700}
          height={200}
          src='/images/people.png'
          objectFit='contain'
        />
      </Box>
      <Box classes='px-6 laptop:px-0'>
        <Button>Chat With Member Services</Button>
      </Box>
    </Box>
  );
}

export default MemberServices;
