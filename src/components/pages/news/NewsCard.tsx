import { BlurImage, Box, Link, Text } from 'core/components';
import { PATH } from 'config/const';
import { sliceText } from "core/helpers";

export default function NewsCard({ data }) {
  return (
    <Box classes='max-w-sm'>
      <Link href={PATH.DEFAULT}>
        <BlurImage
          src={data.srcImg}
          alt={data.title}
          width={300}
          height={180}
          className='rounded-lg w-full'
        />
      </Link>
      <Box classes='mt-6'>
        <Link href={PATH.DEFAULT}>
          <Text
            h2
            weight='bold'
            classes='text-[18px] tablet:text-xl font-bold'
            // classes='text-[18px] tablet:text-xl font-bold text-gray-900 dark:text-white'
          >
            {data.title}
          </Text>
        </Link>
        <Text classes='mb-3 mt-2 font-normal text-sm laptop:text-base'>
          {/*<Text classes='mb-3 mt-2 font-normal text-sm laptop:text-base text-primary-gray'>*/}
          {/*<Text classes='mb-3 mt-2 font-normal text-sm laptop:text-base text-gray-700'>*/}
          {sliceText(data.content, 170)}
        </Text>
        <div className='no-underline'></div>
        <Link
          href={'#'}
          underline
          classes='inline-flex items-center py-2
          text-sm font-medium
          underline-offset-4
          text-black
          '
        >
          Read more
        </Link>
      </Box>
    </Box>
  );
}

