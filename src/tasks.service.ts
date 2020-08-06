import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios'
import { RatesService } from './rates/rates.service';
import { CreateRateDto } from './rates/dto/create-rate.dto';


@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  // private apiKey = '129f5ad924934427ad02bb0439fc01d5';
  private apiKey = '093f632bcb7942a1bcee5460c3428169';

  constructor(private ratesService: RatesService) {}

  @Cron('0 0 * * * *')
  handleCron() {
    axios
    .get(
      `https://openexchangerates.org/api/latest.json?app_id=${this.apiKey}`
    )
    .then(response => {
      const data = Object.entries((response.data || {}).rates || {}).map(([currency, rate]) => ({ currency, rate }));
      data.forEach( entry => {
          this.ratesService.create(<CreateRateDto> entry)
      })
    })
  }
}
/**
 * data: {
    disclaimer: 'Usage subject to terms: https://openexchangerates.org/terms',
    license: 'https://openexchangerates.org/license',
    timestamp: 1591894800,
    base: 'USD',
    rates: {
      AED: 3.673,
      AFN: 77.649994,
      ALL: 109.465,
      AMD: 483.289412,
      ANG: 1.791486,
      AOA: 599.765,
      ARS: 69.317437,
      AUD: 1.454812,
      AWG: 1.8,
      AZN: 1.7025,
      BAM: 1.720137,
      BBD: 2,
      BDT: 84.785336,
      BGN: 1.719059,
      BHD: 0.377626,
      BIF: 1910,
      BMD: 1,
      BND: 1.387153,
      BOB: 6.891985,
      BRL: 4.976632,
      BSD: 1,
      BTC: 0.000107716286,
      BTN: 75.764124,
      BWP: 11.471889,
      BYN: 2.374365,
      BZD: 2.011705,
      CAD: 1.356597,
      CDF: 1845,
      CHF: 0.939095,
      CLF: 0.027435,
      CLP: 788.6,
      CNH: 7.074155,
      CNY: 7.0651,
      COP: 3760.12,
      CRC: 578.862612,
      CUC: 1,
      CUP: 25.75,
      CVE: 97.465,
      CZK: 23.546,
      DJF: 178,
      DKK: 6.561521,
      DOP: 57.65,
      DZD: 128.200641,
      EGP: 16.1867,
      ERN: 15.003046,
      ETB: 34.4,
      EUR: 0.880143,
      FJD: 2.175,
      FKP: 0.792017,
      GBP: 0.792017,
      GEL: 3.04,
      GGP: 0.792017,
      GHS: 5.8,
      GIP: 0.792017,
      GMD: 51.56,
      GNF: 9462.5,
      GTQ: 7.675588,
      GYD: 209.452213,
      HKD: 7.75016,
      HNL: 24.960001,
      HRK: 6.6624,
      HTG: 107.188467,
      HUF: 304.609039,
      IDR: 14257.45,
      ILS: 3.45406,
      IMP: 0.792017,
      INR: 76.18155,
      IQD: 1190,
      IRR: 42105,
      ISK: 133.87,
      JEP: 0.792017,
      JMD: 140.543998,
      JOD: 0.709,
      JPY: 106.675,
      KES: 106.450079,
      KGS: 74.334492,
      KHR: 4100,
      KMF: 433.125009,
      KPW: 900,
      KRW: 1202.46,
      KWD: 0.3075,
      KYD: 0.831756,
      KZT: 400.485303,
      LAK: 9010,
      LBP: 1514,
      LKR: 185.23823,
      LRD: 199.099976,
      LSL: 16.66,
      LYD: 1.41,
      MAD: 9.6355,
      MDL: 17.192562,
      MGA: 3789,
      MKD: 54.242675,
      MMK: 1400.03652,
      MNT: 2814.433183,
      MOP: 7.984415,
      MRO: 357,
      MRU: 38.2,
      MUR: 39.748384,
      MVR: 15.5,
      MWK: 735.372862,
      MXN: 22.508498,
      MYR: 4.2755,
      MZN: 69.625,
      NAD: 16.65,
      NGN: 387.5,
      NIO: 34.35,
      NOK: 9.551908,
      NPR: 121.222858,
      NZD: 1.550845,
      OMR: 0.385001,
      PAB: 1,
      PEN: 3.4325,
      PGK: 3.455,
      PHP: 50.343899,
      PKR: 164,
      PLN: 3.944779,
      PYG: 6636.398964,
      QAR: 3.641,
      RON: 4.2542,
      RSD: 103.415,
      RUB: 69.8671,
      RWF: 950,
      SAR: 3.752156,
      SBD: 8.336952,
      SCR: 17.589573,
      SDG: 55.25,
      SEK: 9.279233,
      SGD: 1.390304,
      SHP: 0.792017,
      SLL: 9749.999839,
      SOS: 581,
      SRD: 7.458,
      SSP: 130.26,
      STD: 22050.346534,
      STN: 21.85,
      SVC: 8.732915,
      SYP: 513.01033,
      SZL: 16.66,
      THB: 30.98,
      TJS: 10.289529,
      TMT: 3.5,
      TND: 2.8325,
      TOP: 2.252572,
      TRY: 6.8389,
      TTD: 6.748361,
      TWD: 29.673798,
      TZS: 2316,
      UAH: 26.623631,
      UGX: 3735.715933,
      USD: 1,
      UYU: 43.053599,
      UZS: 10155,
      VEF: 248487.642241,
      VES: 197631.74346,
      VND: 23238.077011,
      VUV: 115.89381,
      WST: 2.660462,
      XAF: 577.336033,
      XAG: 0.0566862,
      XAU: 0.00057873,
      XCD: 2.70255,
      XDR: 0.722568,
      XOF: 577.336033,
      XPD: 0.00052462,
      XPF: 105.029011,
      XPT: 0.00123304,
      YER: 250.350066,
      ZAR: 17.11677,
      ZMW: 18.13424,
      ZWL: 322.000001
    }
  }
}
*/