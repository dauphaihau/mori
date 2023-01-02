import { Disclosure, Transition } from '@headlessui/react'
import { cn } from 'core/helpers';
import { Button, Text, Icons, Box } from "core/components";
import { useRef, useState } from "react";
import { useProductContext } from "context/ProductContext";

const description = `Our Willow Coffins have a slightly pink and golden look, they are hand-worked by traditional
basket
weavers using age-old methods that have changed very little in over 2000 years. Willow is by far
the
ultimate in environmental recycling, willow is grown in rows of bushes and once harvested can
generate
back to the same height within a year. Willow has been known to grow up to 3 metres tall annually
and
has the ability to degrade much more quickly than conventional hardwood.
  Our Willow Coffins have a slightly pink and golden look, they are hand-worked by traditional
basket
weavers using age-old methods that have changed very little in over 2000 years. Willow is by far
the
ultimate in environmental recycling, willow is grown in rows of bushes and once harvested can
generate
back to the same height within a year. Willow has been known to grow up to 3 metres tall annually
and
has the ability to degrade much more quickly than conventional hardwood.
  Our Willow Coffins have a slightly pink and golden look, they are hand-worked by traditional
basket
weavers using age-old methods that have changed very little in over 2000 years. Willow is by far
the
ultimate in environmental recycling, willow is grown in rows of bushes and once harvested can
generate
back to the same height within a year. Willow has been known to grow up to 3 metres tall annually
and
has the ability to degrade much more quickly than conventional hardwood.`

export default function DisclosureDescription({ limit = 500 }) {
  // const { product: { description } } = useProductContext()

  const [showMore, setShowMore] = useState(false)
  const contentRef = useRef(null)
  const longDescription = description.length > limit

  return (
    <div className='w-full'>
      {/*<div className='w-full laptop:w-[110%]'>*/}
      <div className='mx-auto w-full max-w-4xl mx-auto rounded-2xl bg-white laptop:p-2'>
        <Disclosure
          as='div'
          className='mt-3'
        >
          {({ open }) => (
            <>
              <Disclosure.Button
                className='flex w-full justify-between rounded-lg hover:bg-gray-custom-50 laptop:px-4 py-2 font-medium cursor-pointer'
              >
                <span className='text-base font-bold md:text-[18px] tracking-wide'>Description</span>
                <Icons.chevronUp
                  className={cn('h-5 w-5 text-primary-gray',
                    'ui-open:rotate-90 ui-open:transform',
                    { 'transform rotate-180': !open },
                  )}
                />
              </Disclosure.Button>
              <Transition
                enter="transition-opacity ease-linear duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Disclosure.Panel
                  ref={contentRef}
                  className={cn('p-4 pb-2 text-base text-primary-gray',
                    'transition-[height] overflow-hidden ease-in-out duration-500',
                    // open ? 'max-h-[1500px] from-inherit' : 'max-h-60 from-white',
                  )}
                >
                  <Box
                    ref={contentRef}
                    classes={['overflow-hidden  transition-all ease-in-out duration-500',
                      longDescription && `
                        relative
                        before:absolute before:inset-0 before:z-10
                        before:w-full before:h-full
                        before:bg-gradient-to-t 
                      `,
                      showMore ? 'max-h-[1500px] from-inherit ' : 'max-h-60 from-white',]}
                  >
                    <Text classes='text-base text-primary-gray whitespace-pre-line'>
                      {description}
                    </Text>
                  </Box>
                  {
                    longDescription &&
                    <div className="flex-center">
                      <Button light classes='font-bold ' onClick={() => setShowMore(!showMore)}>
                        {showMore ? 'Less' : 'Learn more about this item'}
                      </Button>
                    </div>
                  }
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  )
}
