import csvtojson from 'csvtojson';
import {Options, Tabulator} from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';

const loadCSV = async (filePath: string, id: string, options?: Options) => {
  const res = await fetch(filePath);
  if (!res.ok) {
    return;
  }
  const csv = csvtojson();
  const text = await res.text();
  const data = await csv.fromString(text);
  if (!options) {
    const tabulator = new Tabulator('#csv-table', {
      data: data,
      autoColumns: true,
      layout: 'fitColumns',
    });
  } else {
    const tabulator = new Tabulator(`#${id}`, {
      ...options,
      layout: 'fitColumns',
      data: data,
    });
  }
};

export function csvTable(options: {filename: string; options?: Options}[]) {
  const images = document.getElementsByTagName('img');
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const match = /.*\.csv/;
    if (image.src.match(match)) {
      const csvTable = document.createElement('div');
      csvTable.id = 'csv-table' + i.toString();
      const parent = image.parentElement;
      parent?.replaceChild(csvTable, image);
      const optionCandidates = options.filter(option => {
        return option.filename === image.src;
      });
      const selectedOptions =
        optionCandidates.length > 0 ? optionCandidates[0] : undefined;
      loadCSV(image.src, csvTable.id, selectedOptions?.options);
    }
  }
}
