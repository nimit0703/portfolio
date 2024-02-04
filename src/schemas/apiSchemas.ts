
/**
 * hotel api request details for more refrence : 
 * https://rapidapi.com/ntd119/api/booking-com13
 */

export interface AutoComplete {
  location: string;
  language_code ?: string;
}

export interface SearchHotelList {
    location : string,
    checkin_date : string, // YYYY-MM-DD
    checkout_date : string, // YYYY-MM-DD
    language_code ?: string,
    currency_code ?: string
}