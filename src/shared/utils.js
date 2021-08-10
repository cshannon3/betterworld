import { matchSorter } from 'match-sorter';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import JitsiIcon from "assets/Landing/jitsi.png";
import DriveIcon from "assets/Landing/google-drive.png";
import DocIcon from "assets/Landing/google-docs.png";
import InstaIcon from "assets/Landing/insta.png";
import FBIcon from "assets/Landing/fb.png";
import TwitterIcon from "assets/Landing/twitter.png";
import FigmaIcon from "assets/Landing/figma.png";
import GeneralLinkIcon from "assets/Landing/link.png";


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



export const getIconType = (url) => {
    if (url.includes("meet.jit.si")) return JitsiIcon;
    if (url.includes("drive.google.com")) return DriveIcon;
    if (url.includes("docs.google.com")) return DocIcon;
    if (url.includes("www.instagram.com")) return InstaIcon;
    if (url.includes("www.facebook.com")) return FBIcon;
    if (url.includes("www.twitter.com")) return TwitterIcon;
    else return GeneralLinkIcon;
  };