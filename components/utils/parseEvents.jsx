import moment from 'moment';

export default (events)=>{
    let pevents = []
      events.map(e=>{
        let event = {
          id : parseInt(e.id),
          calendar: parseInt(e.calendar),
          title : e.title,
          description: e.description,
          start: moment.unix(parseInt(e.start)),
          end: moment.unix(parseInt(e.end)),
          tz:e.tz,
          location : e.location,
          status: parseInt(e.status),
          owner: e.owner,
          ispublic: e.ispublic

        }
        pevents.push(event);
      })
      return pevents;
}