import { matchSorter } from 'match-sorter';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)


export function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}

export const formatTimestamp = (timestamp) => {
    let date = new Date(timestamp);

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = date.getFullYear();
    year= year.toString().substring(2);
    var month = date.getMonth() //months[];
    var day = date.getDate();
    var hour = date.getHours() %12;
    var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var time = hour + ':' + min + ' ' + day + '/' + month + '/' + year;
    return time;
}

export const formatTimeAgo = (timestamp) => {
    let date = new Date(timestamp);
    const timeAgo = new TimeAgo('en-US')
    return timeAgo.format(date);
}
