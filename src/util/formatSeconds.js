import * as moment from 'moment';
import * as momentDurationFormat from 'moment-duration-format';

momentDurationFormat(moment);

export const formatSeconds = amount =>
  moment.duration(amount, 'seconds').format();
