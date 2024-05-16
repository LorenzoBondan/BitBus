export const classNames = (...classes) => classes.filter(Boolean).join(' ')
export const addClassNameIf = (condition, className) => (condition ? className : '')
