import { Injectable } from '@nestjs/common';
import { google } from "googleapis";
import * as moment from 'moment';

// Provide the required configuration
const CREDENTIALS = { "type": "service_account", "project_id": "sound-vehicle-326010", "private_key_id": "0cf262c1a9cb2c88ae521730e21f690b6c4acfcd", "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDCLBARkGdZM6VO\n/YGD9Ok6427SyoJfwkV98vJ7+NkAorNMbIYpeI3r1KVhKBgflg23z6qfAbfLv/d1\nL8I2tNVloKaOblgH6ypEAaI5U2AdC6Dz7NmwQQ2acWo1tt6rifwIQbL/XnW1zYsO\ngtBhyeN5pXBWnvwR0dXI7pcF7gJ09xqlc8b8r20B2BNcraugK7IfAnRnfDdNXhrF\nknjwsIGwTlLAqCR0mphe9gPYURcV6/Y958c1k+swaaURDuzlVEDojcnYBKuLsXn2\ngA20MypNiTvnrNDCR2OV86/qMjr/wRCZNoPEz0CWGpyqqror57byxPAkDRCMH6NJ\nZ25GrjwzAgMBAAECggEAD2hQV28eSZ1n1vkWB4gt4Ea0at+M3C0IjJz0PCgb4rQG\nXDXEU5LFrYVFy4woleEMnPL1NqwmjxwKy8QKui076FYza9vk+lk2al0NfVUDVxVZ\neTbocyxGTboFfoD7RvX/shFciGz7aX4Hib2RlsuJVFlvV5WX/5CnUSFgNHqVZqh4\nMRyBaGpmJ5vZ9n7H1TRqXjTYYj/kKT1Nxl6o8t8mmwIK7EHoZST7FgBjssskVLZW\nxOUVJHLe/Ij5eC2J+LTy8bqagn818+04aW1h6pQRXUI0Kcb7XtaKQ1w2hLktaUfR\nbWlqnWat5ct2WZlAEAzkDWnK5mAq5TS7hCaw3cKZYQKBgQDsAMJRiZ2RpSv4Y1L9\noq/YdYgpZ5Bg3qobpHp24+7JCkVGj5loGvTueAWAgDNTc2CVOo1RVzid3KYUM5hY\nyW73lx9yQHqBLRf3VppSArEhGI5TDw8lgV3dQaxx/0FA7qP15XRl2mY3mOOzFeuJ\nhxXFPqTVUJOfeEGYfsoD/mafAwKBgQDSn+7aVlBdQcLJndYX8fPKLIcL82uYjADj\nsVeT95V9zB88fE1WaePgRESgAIgjkgD599uZWhkJY7cxcCUIqviuzvegUAaXPOL5\nWJwJ95vd63jDiFW9egVIu+U4IOB+z6mZDuLifZHpgmPqbmsPbubYLB39LsnM95ig\n5GZk7VmPEQKBgQDDjV12crE9nb9xcduyjrtmgPzyUf4wRlBt1zwih3u02e3NKe/T\nc4LAlnL4p0HgRBojjQDMBZnENLDozFfQOhjYz0AfS442u0bAi+ITUmezJMXJzRCf\n4zIDxAc/7mIDi7oQZrCsNOu95dHG8sLYkjZX2jB7EOlBmkPAOE7sQECIQQKBgQCb\nyYPHprQGZk+HBOGIEIP7c/fnVQKucE9wGonmfefqhgJMoLwrQGM2TAheOEZ52NI0\nEaoxwTxnf4POY15hDOSnl5n8z3QwhO50859ml+iHulU2ey6/2PLzm1atr1OdOEf/\nV81lLO+xwanZihZR8ft4xRjhXawRmMkhqA48dHoboQKBgEvGpZUICBl4BwF987kt\nkz2rM54OqbKm81yaGtLX2H0K2SWD7PAkxHoNUh4QiCXG9oFfB2+ApfEDCHKL8NcA\nchY0cA1h0ESuGyCfPdB3KuaFeF8vnNi45Nm7OJ/5tRTdTVN2OKzLYRjfikCdVzIp\nSmR5YKnCQAKs/L2RUaswXCJV\n-----END PRIVATE KEY-----\n", "client_email": "googleapinode@sound-vehicle-326010.iam.gserviceaccount.com", "client_id": "108011998217228158133", "auth_uri": "https://accounts.google.com/o/oauth2/auth", "token_uri": "https://oauth2.googleapis.com/token", "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/googleapinode%40sound-vehicle-326010.iam.gserviceaccount.com" }
const calendarId ='qgdmttiajf44lqgp38jv39v0ug@group.calendar.google.com';

// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({ version: "v3" });

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);
async function freeBusyStatus(auth, calendarId) {
    const startDate = new Date('17 september 2021 9:00').toISOString()
    const endDate = new Date('17 september 2021 19:00').toISOString()
    const check = {
        auth: auth,
        resource: {
            timeMin: startDate,
            timeMax: endDate,
            timeZone: "Asia/Kolkata",
            items: [{ id: calendarId }]
        }
    }

    const response = await calendar.freebusy.query(check)
    let allGoogleSlots = response.data.calendars[calendarId].busy;
    return allGoogleSlots;
}

@Injectable()
export class SlotsService {
   async showDisplay(): Promise<any> {
        let result=[];
       await freeBusyStatus(auth, calendarId).then(googleSlots=>  {

            let x = {
                slotInterval: 30,
                openTime: '9:00',
                closeTime: '19:30'
            };

            //Format the time
            let startTime = moment(x.openTime, "HH:mm");
            const end = moment(x.openTime, "HH:mm")

            //Format the end time and the next day to it 
            let endTime = moment(x.openTime, "HH:mm").add(10, 'hours');

            //Times
            let allTimes = [];
            let busySlots = [];
            //Loop over the times - only pushes time with 30 minutes interval
            while (startTime < endTime) {
                //Push times
                allTimes.push({ "start": startTime.format("HH:mm"), "end": end.add(30, 'minutes').format("HH:mm") });
                //Add interval of 30 minutes
                startTime.add(x.slotInterval, 'minutes');
            }
            //console.log(allTimes);
            for (let i = 0; i < allTimes.length; i++) {
                const item = allTimes[i];
                googleSlots.forEach(slot => {
                    const { start, end } = slot;
                    if (moment(item.start, 'HH:mm').isBetween(moment(new Date(start)), moment(new Date(end))) ||
                        moment(item.end, 'HH:mm').isBetween(moment(new Date(start)), moment(new Date(end)))) {
                        busySlots.push(item);
                    }
                })
            }
            // console.log(busySlots)
            /// console.log(allTimes)
             result = allTimes.filter(item1 =>
                !busySlots.some(item2 => (item2.start === item1.start && item2.end === item1.end)))
        });
      return ({ message: "success", freeslots: result });
    }

    createEvent(): any{

    }
    
}
