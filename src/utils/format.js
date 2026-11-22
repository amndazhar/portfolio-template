/** 1 → "01" — used for the numbered labels across the site. */
export const padNumber = (value) => String(value).padStart(2, '0');

/** Fills {placeholders} in a content string: fill('{n} items', { n: 3 }) → "3 items". */
export const fill = (template, values) =>
  template.replace(/\{(\w+)\}/g, (match, key) => (key in values ? String(values[key]) : match));

/** True once the contact email is a real address rather than the shipped placeholder. */
export const isEmailConfigured = (email) => Boolean(email) && !/YOUR_EMAIL|example\.(com|org|net)/i.test(email);
