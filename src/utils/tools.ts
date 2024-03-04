// 时间对齐
export function formatTime(input, format: string = 'yyyy.MM.dd') {
  
    // 计算年、月、日、小时、分钟和秒数
    const date = new Date(input);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const remainingSeconds = Math.floor(date.getSeconds());
  
    // 根据传入的格式字符串生成时间字符串
    let formattedTime = format
        .replace('yyyy', year + '')
        .replace('MM', month.toString().padStart(2, '0'))
        .replace('dd', day.toString().padStart(2, '0'))
        .replace('hh', hours.toString().padStart(2, '0'))
        .replace('mm', minutes.toString().padStart(2, '0'))
        .replace('ss', remainingSeconds.toString().padStart(2, '0'));
  
    return formattedTime;
}