import * as moment from 'moment';
import * as momentDurationFormat from 'moment-duration-format';

momentDurationFormat(moment);

export const formatSeconds = amount =>
  amount === 0 ? '00:00' : moment.duration(amount, 'seconds').format();
