export const formatDate = (isoString) => {
  const date = new Date(isoString);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Intl.DateTimeFormat('en-GB', options).format(date); // en-GB locale for D/M/Y format
};