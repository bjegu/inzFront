export class StringUtils {
  
    public static convertDate(date: { year: number, month: number, day: number }): string {
        return date.year + '-' + this.leadingZero(date.month) + '-' + this.leadingZero(date.day)
    }

    public static convertTime(time:{hour: number, minute: number, second: number}): string {
        return this.leadingZero(time.hour) + ':' + this.leadingZero(time.minute) + ':' + this.leadingZero(time.second)
    }

    public static convertDateTime(date: { year: number, month: number, day: number }, time:{hour: number, minute: number, second: number}): string {
        return this.convertDate(date)+ 'T'+this.convertTime(time);
    }

    public static leadingZero(value: number): string {
        return value < 10 ? '0' + value : '' + value
    }

    public static showTime(dateString: string) {
        const date = new Date(dateString)
        return this.leadingZero(date.getHours()) + ':' + this.leadingZero( date.getMinutes())
    }

    public static convertDateToNbDate(date:Date): { year: number, month: number, day: number }{
            return { year: date.getFullYear(), month: date.getMonth()+1, day: date.getUTCDate() }
    }
    public static convertDateToNbTime(date:Date): {hour: number, minute: number, second: number}{
        return {hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds()}
}
    

}