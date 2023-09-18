import moment from 'moment'

/**
 * Formats a given date using the specified format using the 'moment' library.
 * @param {*} date 
 * @param {*} format
 * @returns 
 */
export const momentFormatted = (date: string = "", format: string = "DD/MM/YYYY hh:ss A") => {
    if (!date) throw new Error("A valid date is required.")
    return moment(date).format(format)
}