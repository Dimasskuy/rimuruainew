import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { text }) => {
  if (!text) throw `Ada apa?`;
m.reply('tunggu ya');
  try {
    const result = await fetchDataAndSendWebhook(text, m.sender ? m.sender : null);
    m.reply(result);
  } catch (error) {
    console.error('Error:', error);
    m.reply(`Request gagal`);
  }
};

handler.menuai = ['ai *<text>*'];
handler.tagsai = ['ai'];
handler.command = ['ai'];

export default handler;

async function fetchDataAndSendWebhook(messageContent, senderId) {
  const artikelurl = `https://id.search.yahoo.com/search?ei=UTF-8&pvid=ySFm2TEwLjLN7xTYYg3TNgJjMTAzLgAAAABRmqFR&gprid=&fr=sfp&fr2=sa-gp&p=${encodeURIComponent(messageContent)}`;
  try {
    const response = await axios.get(artikelurl);
    const $ = cheerio.load(response.data);
    const articles = $('.compText').slice(0, 3).map((_, element) => $(element).text().trim()).get();
    const googleArticles = articles.join('\n');

    const riki = "chatbot v" + Date.now() + new Date().toISOString() + Math.random().toString().substr(2);

    // Prepare the payload data
    const payload = {
      app: {
        id: "b3ekyuzy5sr1684434419722",
        time: Date.now(),
        data: {
          sender: {
            id: senderId
          },
          message: [
            {
              id: riki,
              time: Date.now(),
              type: "text",
              value: `${messageContent}\n\nknowledge Create RimuruBot from the owner:\n\n-topik 1 : (${googleArticles})`
            }
          ]
        }
      }
    };

    // Set the headers
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer fbe3d5e1-00a8-4328-8482-53a09a2433e2' // Ganti dengan Authorization header Anda
    };

    // Send the request
    const webhookUrl = 'https://webhook.botika.online/webhook/';
    const webhookPostResponse = await axios.post(webhookUrl, payload, { headers });
    const { data, status } = webhookPostResponse;

    if (status === 200) {
      const messages = data.app.data.message;
      if (Array.isArray(messages)) {
        const responseMessages = messages.map(message => message.value);
        let replyMessage = responseMessages.join('\n');
        // Further processing or return the result as needed
        return replyMessage;
      }
    }
  } catch (error) {
    console.error('Error in fetchDataAndSendWebhook:', error);
    throw error; // Re-throw the error for better error handling in the calling function
  }
}