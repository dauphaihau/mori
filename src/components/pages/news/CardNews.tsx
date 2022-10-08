import { NextImage, Box, Link, Text } from 'core/components';
import Enums from 'config/enums';
import { sliceText } from "core/helpers";

const CardNews = ({ title, content = '', imgSrc }) => {
  return (
    <Box classes='max-w-sm animate-pulse'>
      <Link href={Enums.PATH.DEFAULT}>
        <NextImage
          alt={title}
          useSkeleton
          className='rounded-lg w-full'
          width={300}
          height={180}
          src={imgSrc}
        />
      </Link>
      <Box classes='mt-6'>
        <Link href={Enums.PATH.DEFAULT}>
          <Text
            h2
            weight='bold'
            classes='text-[18px] tablet:text-xl font-bold'
            // classes='text-[18px] tablet:text-xl font-bold text-gray-900 dark:text-white'
          >
            {title}
          </Text>
        </Link>
        <Text classes='mb-3 mt-2 font-normal text-sm laptop:text-base'>
        {/*<Text classes='mb-3 mt-2 font-normal text-sm laptop:text-base text-primary-gray'>*/}
        {/*<Text classes='mb-3 mt-2 font-normal text-sm laptop:text-base text-gray-700'>*/}
          {sliceText(content, 170)}
        </Text>
        <div className='no-underline'></div>
        <Link
          href={Enums.PATH.DEFAULT}
          classes='inline-flex items-center py-2
          text-sm font-medium text-center
          underline underline-offset-4 decoration-1 hover:opacity-80
          text-black hover:no-underline
          '
        >
          Read more
        </Link>
      </Box>
    </Box>
  );
}

export default CardNews;
