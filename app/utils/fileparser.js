import csv from 'csv-parser';

export const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    const results = [];
    file
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};
