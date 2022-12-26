import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";

import { sortOptions } from 'assets/data/options';
import { Select, Row, Icons, Text } from 'core/components';
import { filterSearch } from "./Filters/Filters";
import { PATH } from "config/const";
import { Listbox, Transition } from "@headlessui/react";
import { cn } from "core/helpers";

export default function Sorter() {
  const router = useRouter()
  const [sort, setSort] = useState('')

  useEffect(() => {
    setSort(router.query?.sort as string ?? '')
  }, [])

  useEffect(() => {
    if (router.asPath === PATH.PRODUCT._) {
      setSort(sortOptions[0].value)
    }
  }, [router.asPath])

  const handleSort = (value) => {
    setSort(value)
    filterSearch({ router, sort: value })
  }

  return (
    <Row
      align='center'
      classes='gap-x-4'
    >
      {/*<Text classes='hidden laptop:block'>Sort by:</Text>*/}
      {/*<Select*/}
      {/*  name='sort'*/}
      {/*  classesSpace='m-0'*/}
      {/*  value={sort}*/}
      {/*  classesBtn='w-[11rem]'*/}
      {/*  options={sortOptions}*/}
      {/*  onChange={({ value }) => handleSort(value)}*/}
      {/*/>*/}
      <SortSelect
        name='sort'
        classesSpace='m-0'
        value={sort}
        classesBtn='w-[11rem]'
        options={sortOptions}
        onChange={({ value }) => handleSort(value)}
      />
    </Row>
  );
}

const SortSelect = (props) => {
  const [selected, setSelected] = useState(sortOptions[0])

  return (
    <Listbox
      value={selected}
      onChange={(option) => {
        setSelected(option)
        props.onChange(option)
      }}
    >
      {({ open }) => (
        <div className='form-select-input m-0'>
          <Listbox.Button
            className='
            relative
            bg-white text-sm
            pl-3 pr-10 tablet:pr-8 text-left cursor-pointer
            dark:bg-black dark:text-white
            rounded-md flex
            hover:bg-gray-custom-52 py-2'
          >
            <Text span classes='mr-2 font-bold'>Sort by:</Text>
            <Text span weight='bold' classes=''>{selected.label}</Text>
            {/*<Text span weight='bold' classes=''>Sort by: {selected.label}</Text>*/}
            <span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
            <Icons.chevronDown
              className='h-3 w-3 font-bold'
              aria-hidden='true'
            />

              {/*<SelectorIcon*/}
              {/*  className='h-5 w-5 text-gray-400'*/}
              {/*  aria-hidden='true'*/}
              {/*/>*/}
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
                sortOptions.map((option, index) => (
                  <Listbox.Option
                    key={index}
                    value={option}
                    className={({ active }) => cn(
                      active ? 'dark:text-white' : 'text-black dark:text-white',
                      ' hover:bg-gray-custom-50  cursor-default select-none relative py-2 rounded-[5px] pl-3 pr-0'
                    )}
                  >
                    {({ selected, active }) => (
                      <>
                        <Row
                          justify='between'
                          align='center'
                        >
                            <span className={cn(' block truncate')}>
                            {/*<span className={clns(selected ? 'font-semibold' : 'font-normal', ' block truncate')}>*/}
                              {option.label}
                            </span>
                          {selected ? (
                            <Icons.check
                              className='mr-2 h-4 w-4 text-black'
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
        </div>
      )}
    </Listbox>
  )
}

