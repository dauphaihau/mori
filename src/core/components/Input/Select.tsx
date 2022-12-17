import React, { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { cn } from 'core/helpers';

type OptionValue = number | string;

type Option<T extends OptionValue> = {
  label: string | number;
  value: string | number;
  // value: Type;
};

interface SelectType<O extends OptionValue> {
  options: Option<O>[];
  name: string,
  onChange: (option) => void;
  initialValue?: Option<O>;
  label?: string,
  size?: string,
  borderLight?: boolean,
  hideIconOptions?: boolean,
  value?: string,
  classesSpace?: string,
  classesBtn?: string,
}

function Select<Type extends OptionValue>(props: SelectType<Type>) {
  const {
    options = [{ label: '', value: '' }],
    onChange = (opt) => {},
    value,
    // initialValue,
    label = '',
    size = '',
    name,
    hideIconOptions,
    classesSpace = '',
    classesBtn = '',
    borderLight,
  } = props

  const [selected, setSelected] = useState(options[0])

  useEffect(() => {
    const opt = options.find(opt => opt.value === value)
    if (opt) setSelected(opt)
  }, [value])

  // useEffect(() => setSelected(initialValue), [initialValue]);

  return (
    <Listbox
      name={name}
      value={selected}
      onChange={(option) => {
        setSelected(option);
        onChange(option);
      }}
    >
      {({ open }) => (
        <div className={`form-select-input ${classesSpace}`}>
          {label && <Listbox.Label className='form-select-input__title font-bold'>{label}</Listbox.Label>}
          <Listbox.Button
            className={cn('form-select-input__btn cursor-pointer',
              // borderLight && 'border-none shadow-none focus:ring-0 focus:border-gray-200',
              size === 'medium' ? 'py-[10px]' : 'py-2',
              classesBtn,
            )}
          >
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
            <Listbox.Options
              className='form-select-input__options'
            >
              {
                options.map((option, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) => cn(
                      active ? 'text-gray-700 bg-light-200 dark:hover:bg-gray-custom-502 dark:text-white' : 'text-black dark:text-white',
                      'cursor-default select-none relative py-2 rounded-[5px] pl-3 pr-0'
                    )
                      // 'cursor-default select-none relative py-2 pl-3 pr-0'
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className='flex items-center'>
                          <span
                            className={cn(selected ? 'font-semibold' : 'font-normal', ' block truncate')}
                          >
                            {option.label}
                          </span>
                        </div>
                        {
                          !hideIconOptions &&
                          <>
                            {
                              selected ? (
                                <span
                                  className={cn(
                                    active ? 'text-black dark:text-white' : 'text-black dark:text-white',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                  )}
                                >
                                  <CheckIcon
                                    className='h-5 w-5'
                                    aria-hidden='true'
                                  />
                                </span>
                              ) : null
                            }
                          </>
                        }
                      </>
                    )}
                  </Listbox.Option>
                ))
              }
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>

  )
}

export default Select
