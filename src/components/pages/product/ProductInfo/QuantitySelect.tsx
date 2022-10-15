import React, { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Box, clns, Row } from "../../../../core";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

const quantityOptions = new Array(10).fill('').map((_, i) => ({
  label: i + 1,
  value: i + 1
}));

export default function QuantitySelect({ onSelect }) {

  const [selected, setSelected] = useState(quantityOptions[0])

  useEffect(() => {
    onSelect(selected.value)
  }, [selected])

  return (
    <Listbox
      value={selected}
      onChange={(option) => setSelected(option)}
    >
      {({ open }) => (
        <Box classes='form-select-input m-0'>
          <Listbox.Button className='form-select-input__btn w-20 py-2'>
                  <span className='flex items-center'>
                                                     <span className='block truncate'>{selected.label}</span>
                                                       </span>
            <span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                    <SelectorIcon
                      className='h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                  </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='form-select-input__options'>
              {
                quantityOptions.map((option, index) => (
                  <Listbox.Option
                    key={index}
                    value={option}
                    className={({ active }) => clns(
                      active ? 'text-gray-700 bg-light-200 dark:hover:bg-gray-custom-502 dark:text-white' : 'text-black dark:text-white',
                      'cursor-default select-none relative py-2 rounded-[5px] pl-3 pr-0'
                    )}
                  >
                    {({ selected, active }) => (
                      <>
                        <Row
                          justify='between'
                          align='center'
                        >
                            <span className={clns(' block truncate')}>
                            {/*<span className={clns(selected ? 'font-semibold' : 'font-normal', ' block truncate')}>*/}
                              {option.label}
                            </span>
                          {selected ? (
                            <CheckIcon
                              className='mr-2 h-5 w-5 text-black'
                              aria-hidden='true'
                            />
                          ) : null}
                        </Row>
                      </>
                    )}
                  </Listbox.Option>
                ))
              }
            </Listbox.Options>
          </Transition>
        </Box>
      )}
    </Listbox>
  )
}
