import { Client } from '@microsoft/microsoft-graph-client';
import { getAuthToken } from '../services/AuthServiceWorking';

class MeetingService {
  static async accessMeetingData(meetingId, callback) {
    try {
      const accessToken = await getAuthToken();

      const client = Client.init({
        authProvider: (done) => {
          done(null, accessToken);
        },
      });      
      

      console.log('Access token:', accessToken); // Add this line to display the access token

      const meeting = await client.api(`/v1.0/me/events/${meetingId}`).get();
      console.log('Meeting details:', meeting); // Add this line to display the meeting details

      const participants = await client.api(`/me/events/${meetingId}/participants`).get();
      console.log('Participants:', participants); // Add this line to display the participants

      callback({ meeting, participants: participants.value });
    } catch (error) {
      console.error('Error accessing meeting data:', error);
      console.log('Error details:', error.message);
    }
  }
}

export default MeetingService;
