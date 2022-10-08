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
          width={290}
          height={224}
          src={imageSrc}
          className='mx-auto'
          objectFit='contain'
          imgClassName='w-3/5'
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

// import { Text, Link, NextImage, Box } from 'core/components';
//
// const CategoryCard = ({ imageSrc, title, subtitle, link }) => {
//   return (
//     <Box classes='mb-4 laptop:mb-0 bg-product p-8 '>
//     {/*<Box classes='mb-4 laptop:mb-0 bg-product p-8 pb-0'>*/}
//       <Link href={link}>
//         <NextImage
//           alt={title}
//           width={290}
//           height={224}
//           src={imageSrc}
//           className='mx-auto'
//           objectFit='contain'
//           imgClassName='w-3/5'
//         />
//         <Box classes=''>
//         {/*<Box classes='mb-8'>*/}
//           <Text
//             weight='semibold'
//             classes='text-xl mb-1'
//           >{title}</Text>
//           <Text classes='text-xs text-primary-gray'>{subtitle}</Text>
//         </Box>
//       </Link>
//     </Box>
//   )
// }
//
// export default CategoryCard;
