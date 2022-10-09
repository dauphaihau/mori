import { Text, Link, NextImage, Box } from 'core/components';
import Enums from "config/enums";

const CategoryCard = ({ imageSrc, title, count,  onClick  }) => {
  return (
    <Box classes='mb-4 laptop:mb-0 bg-product p-6 relative' >
    {/*<Box classes='mb-4 laptop:mb-0 bg-product p-8 relative' >*/}
      <Link href={Enums.PATH.PRODUCT._}>
      {/*<Link href={link}>*/}
        <NextImage
          alt={title}
          width={200}
          height={220}
          src={imageSrc}
          className='mx-auto'
          objectFit='contain'
          // imgClassName='w-3/5'
        />
        <Box classes='text-left mt-4'>
          <Text
            weight='semibold'
            classes='text-xl mb-1'
          >{title}</Text>
          <Text classes='text-xs text-primary-gray'>{count}</Text>
        </Box>
      </Link>
    </Box>
  )
}

export default CategoryCard;
