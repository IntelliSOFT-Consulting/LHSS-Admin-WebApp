export const csvToArrayOfObjects = (csvString) => {
    const lines = csvString.split('\n');

    const headers = lines[0].split(',');

    const result = lines.slice(1).map(line =>{
        const values = line.split(",");
        const obj = {};
        headers.forEach((header, index) => {
            obj[header.trim()] = values[index].trim();
        })
        return obj;
    })
     return result;
}