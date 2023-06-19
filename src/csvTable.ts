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
  const targetId = `#${id}`;
  if (!options) {
    const tabulator = new Tabulator(targetId, {
      data: data,
      autoColumns: true,
      layout: 'fitColumns',
    });
  } else {
    const tabulator = new Tabulator(targetId, {
      layout: 'fitColumns',
      ...options,
      data: data,
    });
  }
};

export function csvTable(options: {filename: string; options?: Options}[]) {
  const images = document.getElementsByTagName('img');
  const replacePairs: {
    parent: HTMLElement;
    to: HTMLDivElement;
    from: HTMLImageElement;
  }[] = [];
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const match = /.*\.csv/;
    if (image.src.match(match)) {
      const csvTable = document.createElement('div');
      csvTable.id = 'csv-table' + i.toString();
      const parent = image.parentElement;
      if (parent) {
        replacePairs.push({parent: parent, to: csvTable, from: image});
      }
    }
  }
  for (const pair of replacePairs) {
    const src = pair.from.src;
    pair.parent.replaceChild(pair.to, pair.from);
    const optionCandidates = options?.filter(option => {
      return option.filename === src;
    });
    const selectedOptions =
      optionCandidates && optionCandidates.length > 0
        ? optionCandidates[0]
        : undefined;
    loadCSV(src, pair.to.id, selectedOptions?.options);
  }
}
