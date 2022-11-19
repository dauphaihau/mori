import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { clns } from 'core/helpers';

interface FAQsProps {
  data: {
    title: string,
    content: string,
  }[]
}

function FAQs() {

  return (
      <div className=''>
      {/*<div className='mx-auto w-full max-w-4xl mx-auto rounded-2xl bg-white'>*/}
        {
          dataFaqs.map((faq, index) => {
            return <Disclosure
              key={index}
              as='div'
              className='mt-3'
            >
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className='flex w-full justify-between rounded-lg
                     hover:bg-gray-custom-50 text-left
                     px-4 py-2 text-[13px]
                     '
                  >
                    <span className='text-base font-bold md:text-[18px] tracking-wide'>{faq.title}</span>
                    <ChevronUpIcon
                      className={clns('h-5 w-5 text-primary-gray',
                        open ? '' : 'transform rotate-180',
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
                    <Disclosure.Panel className='p-4 pb-2 text-base text-primary-gray'>
                      {faq.content}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          })
        }
      </div>
  )
}

export default function DisclosureFAQs() {
  return (
    <div className='w-full laptop:w-[110%]'>
      <div className='mx-auto w-full max-w-4xl mx-auto rounded-2xl bg-white laptop:p-2'>
        <Disclosure
          as='div'
          className='mt-3'
        >
          {({ open }) => (
            <>
              <Disclosure.Button
                className='flex w-full justify-between rounded-lg
                     hover:bg-gray-custom-50
                     laptop:px-4 py-2 font-medium
                     '
              >
                <span className='text-base font-bold md:text-[18px] tracking-wide'>FAQs</span>
                <ChevronUpIcon
                  className={clns('h-5 w-5 text-primary-gray',
                    open ? '' : 'transform rotate-180',
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
                <Disclosure.Panel className='pl-2'>
                  <FAQs/>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  )
}

const dataFaqs = [
  {
    title: 'How do I know if death has occurred?',
    content: 'When a person is close to death you may notice something called Cheyne-Stokes breathing. This is an irregular breathing pattern which means there can be at first an increased breathing pattern and then long gaps between breaths. There can be a period of apnea when breating stops altogether, leading you to think the person has died, only for them to take another breath.\n' +
      'If you want to be really certain: Look for movement in the chest. Can you feel a pulse in their wrist or neck? Does a mirror mist over if held to the mouth or nose? Does the person respond to a physical stimulus? These are reliable indicators if you are with someone at the end of their life, perhaps at home.'
  },
  // {
  //   title: 'Can I use a local church if I am not religious?',
  //   content: 'While providing a beautiful and convenient venue, a service in a church is a religious one, and is led by a minister. If a minister other than ‘the incumbent’ is wanted, permission must be granted by the current minister. Sometimes a ‘multi-faith’ minister will be allowed to hold the service – or part of the service – in the church. Some ministers are understanding of the fact that your family might prefer a service that is ‘light’ on religion – but prayers and liturgical content will be part of the service.'
  // },
  {
    title: 'Keeping the person\'s body at home\n',
    content: 'A person’s body may be safely kept at home in cool conditions for a couple of days – more in colder conditions. You may want reassurance or advice from a funeral director, but you can close the person’s eyes, put a small towel rolled under the chin, or a scarf around the chin and head for a few hours to keep the mouth closed (teeth in!) Turn off radiators, keep the room shaded (curtains closed) and as cool as possible.  You can use a fan if you wish. Intro five frozen ice blocks (the type used for a picnic), each wrapped in a tea towel, will help cool the body quicker and keep it cool, so the person can stay at home for longer. Rotate the blocks every few hours as needed. ' +
      'Lavender oil in a burner helps too. The Natural Death Centre has great advice on how to care for a body at home.'
  },
  {
    title: 'How soon can the funeral take place?\n',
    content: 'It is best to allow seven to ten days for a cremation; five days does not allow for unforeseen delays, but can be done. In particular circumstances – as required by certain religious faiths, burial can take place within 24 hours of death.'
  },
  {
    title: 'Can I assist with the washing and dressing?\n',
    content: ' Yes, of course. We will provide warm water, towels, essential oils, and a quiet space. We can help, advise or let the family / friends present do it on their own.\n'
  },
  {
    title: 'Are the ashes toxic?',
    content: 'No, the ashes are inert. They contain dry calcium phosphates with some minor minerals, such as salts of sodium and potassium; a relatively small amount of carbon may remain as carbonate.'
  },
]
