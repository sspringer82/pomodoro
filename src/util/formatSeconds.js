import * as moment from 'moment';
const momentDurationFormat = require('moment-duration-format');

momentDurationFormat(moment);

export const formatSeconds = amount =>
  !amount ? '0:00' : moment.duration(amount, 'seconds').format();
