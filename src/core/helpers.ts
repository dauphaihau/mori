export function cn(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(" ");
}

export function cnn(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(" ");
}

export const capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || ""

export const sliceText = (text, quantity) => {
  if (text && text.length > quantity) {
    return text.slice(0, quantity) + '...'
  }
  return text
}

export function debounce(callback, interval: number) {
  let debounceTimeoutId;
  return function (...args) {
    clearTimeout(debounceTimeoutId);
    debounceTimeoutId = setTimeout(
      () => callback.apply(null, args),
      interval
    );
  };
}

export const isDarkMode = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  }
}

export const uniqElement = (arr) => {
  return [...new Set(arr.filter((value, index, self) => self.indexOf(value) === index))];
}

export const toLower = (value) => {
  if (isString(value)) {
    return value.toLowerCase()
  }
  return value
}

// export const isEmpty = (obj = {}) => {
//   return Object.keys(obj).length === 0
// }

export const isEmptyObject = (obj = {}) => {
  return Object.keys(obj).length === 0
}

export function isEmpty(value) {
  try {
    return typeof value === "undefined" ||
      value === null ||
      value === "" ||
      value.length === 0;
  } catch (e) {
    return true;
  }
}

export const parseJson = (str) => {
  try {
    return JSON.parse(str)
  } catch (e) {
    return false;
  }
}

export function parseJSON<T>(value: string | null): T | undefined {
  try {
    return JSON.parse(value)
  } catch {
    console.log('parsing error on', { value })
    return undefined
  }
}

export const isNil = (value) => {
  return typeof value === 'undefined' || value === null
}

export const isString = (value) => {
  return typeof value === 'string' || value instanceof String
}

export const isNumber = (value) => {
  return typeof value == 'number' && !isNaN(value)
}

export const isBoolean = (value) => {
  return value === true || value === false
}

export const isDateString = (value) => {
  if (!isString(value)) return false

  return value.match(/^\d{2}-\d{2}-\d{4}$/)
}

export const omitFieldNullish = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value != null && value !== ''))
}

export const convertDateString = (value) => {
  return value.substr(6, 4) + value.substr(3, 2) + value.substr(0, 2)
}

// ----------------- components
export const filterRows = (rows, filters) => {
  if (isEmpty(filters)) return rows

  return rows.filter((row) => {
    return Object.keys(filters).every((accessor) => {
      const value = row[accessor]
      const searchValue = filters[accessor]

      if (isString(value)) {
        return toLower(value).includes(toLower(searchValue))
      }

      if (isBoolean(value)) {
        return (searchValue === 'true' && value) || (searchValue === 'false' && !value)
      }

      if (isNumber(value)) {
        return value == searchValue
      }

      return false
    })
  })
}

export const sortRows = (rows, sort) => {
  return rows.sort((a, b) => {
    const { order, orderBy } = sort

    if (isNil(a[orderBy])) return 1
    if (isNil(b[orderBy])) return -1

    const aLocale = convertType(a[orderBy])
    const bLocale = convertType(b[orderBy])

    if (order === 'asc') {
      return aLocale.localeCompare(bLocale, 'en', { numeric: isNumber(b[orderBy]) })
    } else {
      return bLocale.localeCompare(aLocale, 'en', { numeric: isNumber(a[orderBy]) })
    }
  })
}

export const paginateRows = (sortedRows, currentPage, rowsPerPage) => {
  return [...sortedRows].slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
}

// ---------- others

export const slugify = (string) => {
  const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
  const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
  .replace(/\s+/g, '-') // Replace spaces with -
  .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
  .replace(/&/g, '-and-') // Replace & with 'and'
  .replace(/[^\w-]+/g, '') // Remove all non-word characters
  .replace(/--+/g, '-') // Replace multiple - with single -
  .replace(/^-+/, '') // Trim - from start of text
  .replace(/-+$/, '') // Trim - from end of text
}

export function titleIfy(slug: string, except = ['and', 'with']) {
  if (!slug) return
  let words = slug.split('-')
  for (let i = 0; i < words.length; i++) {
    let word = words[i]
    if (!except.includes(word)) {
      words[i] = word.charAt(0).toUpperCase() + word.slice(1)
    }
  }
  return words.join(' ')
}

export const formatDollarUS = (price, newOptions = {}) => {
  let options = {
    style: "currency",
    currency: "USD",
    useGrouping: true,
    maximumSignificantDigits: 3,
  }
  options = { ...options, ...newOptions }
  return new Intl.NumberFormat("en-US", options).format(price / 1);
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  if (type === "colors") {
    unique = unique.flat();
    unique = unique.filter(u => u !== undefined);
  }
  return ["all", ...new Set(unique)];
};

export const convertType = (value) => {
  if (isNumber(value)) {
    return value.toString()
  }

  if (isDateString(value)) {
    return convertDateString(value)
  }

  if (isBoolean(value)) {
    return value ? '1' : '-1'
  }

  return value
}

export const createMaps = <ObjectMapType extends Record<string, string>>(
  obj: ObjectMapType
) => obj;

