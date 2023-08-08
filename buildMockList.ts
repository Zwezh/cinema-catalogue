// const appDiv: HTMLElement = document.getElementById('app');

const splitbySpace = (item: string): [string, string] => [item.replace(/\s.*/, ''), item.replace(/\S+\s/, '')];

const splitExtension = (item: string): [string, string] => [
  item.substring(item.lastIndexOf('.')),
  item.substring(0, item.lastIndexOf('.'))
];

const getYear = (item: string): string => {
  const index = item.search(/\((\d{4})\)/);
  if (index === -1) {
    return '';
  }
  return item.substring(index + 1, index + 5);
};

const buildMovie = (item: string): RawMovie => {
  const [size, itemWithoutSize] = splitbySpace(item);
  const [addedDate, itemWithoutDate] = splitbySpace(itemWithoutSize);
  const [extension, itemWithoutExt] = splitExtension(itemWithoutDate);
  const year = getYear(itemWithoutExt);
  const name = itemWithoutExt.replace(/\((\d{4})\)/, '');
  return {
    name,
    year,
    extension,
    addedDate,
    size: +size
  };
};

const moviesList = 'movies'.split(/\r?\n/).map(buildMovie);
const moviesHTML = moviesList.map((item: RawMovie) => Object.values(item)).join('</br>');
// appDiv.innerHTML = moviesHTML;

interface RawMovie {
  name: string;
  year: string;
  extension: string;
  addedDate: string;
}
