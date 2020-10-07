/* global API_KEY */

//-----------------------------------------
// SendMessage
//-----------------------------------------
const roomId = '123456789';

class SendMessage { // eslint-disable-line no-unused-vars
  public static main() {
    const message = 'test message';
    let url = 'https://api.chatwork.com/v2';
    url = `${url}/rooms/${roomId}/messages`;
    const options = {
      method: 'post',
      headers: { 'X-ChatWorkToken': API_KEY },
      payload: { body: message },
    };
    UrlFetchApp.fetch(url, options);
    }
  }
}
