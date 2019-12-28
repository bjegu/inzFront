export class StringUtils {
    public static convertDate(date: { year: number, month: number, day: number }): string {
        return date.year + '-' + StringUtils.leadingZero(date.month) + '-' + StringUtils.leadingZero(date.day)
    }

    public static leadingZero(value: number): string {
        return value < 10 ? '0' + value : '' + value
    }


}