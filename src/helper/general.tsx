export { formatDate, formatMonth, formatDateTime, formatTime, only_number, convertNumberToWords, base64FromPath,dateDiffer,getYear,months }
const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];

const zero = "Zero";
const arab = "Arab";
const crore = "Crore";
const lakh = "Lakh";
const thousand = "Thousand";
const hundred = "Hundred";
const currency = "Rupees";
const paisa = "Paisa";
const only = "Only";
const convertNumberToWords = (amount: number) => {
    if (amount === 0) return `${zero} ${currency} ${only}`;

    let integerPart = Math.floor(amount);
    let wholeWordPart = convertNumber(integerPart);
    let result = wholeWordPart ? `${wholeWordPart} ${currency}` : '';

    let decimalPart = Math.round((amount - integerPart) * 100);
    if (decimalPart > 0) {
        if (wholeWordPart) {
            result += " and ";
        }
        result += `${convertNumber(decimalPart)} ${paisa}`;
    }

    return `${result} ${only}`;
};
const convertNumber:any = (num: number) => {
    let parts = [];
    if (num >= 1e9) {
        parts.push(`${convertNumber(Math.floor(num / 1e9))} ${arab}`);
        num %= 1e9;
    }
    if (num >= 1e7) {
        parts.push(`${convertNumber(Math.floor(num / 1e7))} ${crore}`);
        num %= 1e7;
    }
    if (num >= 1e5) {
        parts.push(`${convertNumber(Math.floor(num / 1e5))} ${lakh}`);
        num %= 1e5;
    }
    if (num >= 1000) {
        parts.push(`${convertNumber(Math.floor(num / 1000))} ${thousand}`);
        num %= 1000;
    }
    if (num >= 100) {
        parts.push(`${convertNumber(Math.floor(num / 100))} ${hundred}`);
        num %= 100;
    }
    if (num >= 20) {
        parts.push(`${tens[Math.floor(num / 10)]}`);
        if (num % 10 > 0) parts.push(units[num % 10]);
    } else if (num >= 10) {
        parts.push(`${teens[num - 10]}`);
    } else if (num > 0) {
        parts.push(`${units[num]}`);
    }
    return parts.join(" ");
}
const formatDateTime = (date: any, type: any = null) => {
    if (date) {
        var date: any = new Date(date);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, "0");
        var date: any = String(date.getDate()).padStart(2, "0");
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        if (type == 'time')
            var strTime = hours + ':' + minutes + ' ' + ampm;
        else if (type == 'date')
            var strTime = year + '-' + month + '-' + date;
        else
            var strTime = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ' ' + ampm;

        return strTime;
    }
    else {
        return '---';
    }
}
const formatTime = (date: any) => {
    if (date) {
        let [hours, minutes, seconds] = date.split(":");
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        return hours + ':' + minutes + ' ' + ampm;
    }
    else {
        return "---";
    }
}
const only_number = (e: any) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, '');
}
const monthNames:any = {
    "01": "January", "02": "February", "03": "March", "04": "April", "05": "May", "06": "June",
    "07": "July", "08": "August", "09": "September", "10": "October", "11": "November", "12": "December"
};
const months:any=
   [{ key:"01",value: "January"}, {key:"02",value: "February"}, {key:"03",value: "March"}, {key:"04",value: "April"}, {key:"05",value: "May"}, {key:"06",value: "June"},
    {key:"07",value: "July"}, {key:"08",value: "August"},{ key:"09",value: "September"}, {key:"10",value: "October"}, {key:"11",value: "November"}, {key:"12",value: "December"}
    
   ];
const getYear =()=>{
    const date = new Date().getFullYear().toString();
    let startDate = 2023;
    let endDate = parseInt(date);
    const yearList:any = []; 
    for(endDate; endDate > startDate; endDate--){
        yearList.push(endDate);
    }
    return yearList;
}
const formatDate = (date: any, formate: any = '') => {
    if (date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        if (formate == 'string')
            return d.toDateString();
        else if (formate == 'time')
            return d.toTimeString();
        else if (formate == 'day_month')
            return [day, monthNames[month]].join(' ');
        else
            return [year, month, day].join('-');
    }
    else {
        return '---';
    }
}

const formatMonth = (date:any,type='other') => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    if(type=='month_name'){
        return [monthNames[month],year].join('-');
    }else if(type=='only_month_name'){
        return monthNames[month];  
      }
    else{
        return [year, month].join('-');

    }
}

const dateDiffer = (date_from: any, date_to:any) => {
    var dt1 = new Date(date_from);
    var dt2 = new Date(date_to);
    const dif= Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
    if(dif>=0){
        return (dif+1)
    }else{
        return 'Invaid date';
    }
}



const base64FromPath = async (path: string) => {
    const response = await fetch(path);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject('method did not return a string');
            }
        };
        reader.readAsDataURL(blob);
    });
}