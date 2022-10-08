import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { clns } from 'core/helpers';

interface DisclosureProps {
  data: {
    title: string,
    content: string,
  }[]
}

export default function DisclosureCustom({ data }: DisclosureProps) {
  // const { data } = props;

  return (
    <div className='w-full px-4'>
      <div className='mx-auto w-full max-w-4xl mx-auto rounded-2xl bg-white p-2'>
        {
          data?.map((obj, index) => {
            return <Disclosure
              key={index}
              as='div'
              className='mt-3'
            >
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className='flex w-full justify-between rounded-lg
                     bg-gray-custom-50 hover:bg-gray-custom-52
                     px-4 py-2 text-left text-sm font-medium text-primary-black
                     focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
                  >
                    <span className='text-base md:text-[18px]'>{obj.title}</span>
                    <ChevronUpIcon
                      className={clns('h-5 w-5 text-primary-gray',
                        open ? 'rotate-180 transform' : '',
                      )}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className='px-4 pt-4 pb-2 text-base text-primary-gray'>
                    {obj.content}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          })
        }
      </div>
    </div>
  )
}
