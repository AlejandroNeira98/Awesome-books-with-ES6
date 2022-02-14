import { DateTime } from "../node_modules/luxon/build/es6/luxon.js";

export function currenTime(timeElement) {
  const dt =  DateTime.now();
  timeElement.innerHTML = `${dt.toFormat('DDD tt')}`;
  timeElement.setAttribute('datetime', dt.toISO());
}