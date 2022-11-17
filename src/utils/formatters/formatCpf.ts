const addMask = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

const removeMask = (value: string): string => {
  return value.replace(/\./g, '').replace('-', '');
};

export default {
  addMask,
  removeMask,
};
