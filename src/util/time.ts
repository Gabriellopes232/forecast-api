import moment from 'moment';

export class TimeUtil {
  public static getUnixTimeForFutureDay(days: number): number {
    return moment().add(days, 'days').unix();
  }
}
