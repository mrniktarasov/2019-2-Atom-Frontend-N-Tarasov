/*
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция  должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * человекопонятную строку, которая будет
 * отражать размер файла. Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

export default function convertBytesToHuman(bytes) {
  if (typeof(bytes) !== "number" || isNaN(bytes) ||  bytes < 0 )
    return false;
  let KB = 1024;
  let MB = 2e20;
  let GB = 2e30;
  let TB = 2e40;
  let PB = 2e50;
  if (bytes < KB)
    return (bytes).toFixed(2) + " " + "B";
  else if ( bytes >= KB && bytes < MB )
    return (bytes/KB).toFixed(2) + " " + "KB";
  else if (bytes >= MB && bytes < GB)
    return (bytes/MB).toFixed(2) + " " + "MB";
  else if (bytes >= GB && bytes < TB)
    return (bytes/GB).toFixed(2) + " " + "GB";
  else if ( bytes >= TB && bytes < PB)
    return (bytes/TB).toFixed(2) + " " + "TB";
  else
    return (bytes/PB).toFixed(2) + " " + "PB";
}
