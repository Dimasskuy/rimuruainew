let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw(`Contoh:\n${usedPrefix}${command} Halo?`);   
  let ouh = await fetch(`https://kiicodeofficial.my.id/api/others/cai?query=${text}&apikey=mswreJVZxE`)
 //let ouh = await fetch(`https://api.betabotz.org/api/search/c-ai?prompt=hai%20ai%20siapa%20namamu?&char=HuTao&apikey=8cZTmd8U`)
  let gyh = await ouh.json() 
  await conn.sendMessage(m.chat, {
  text: `${gyh.result}`,
      contextInfo: {
      externalAdReply: {
        title: 'C.ai',
        body: 'R U M U R U  M U L T I D E V I C E',
        thumbnailUrl: 'https://telegra.ph/file/8c7b95bba7719b179bfe5.jpg',
        sourceUrl: 'https://whatsapp.com/channel/0029VaCvaNgBPzjcfrTixA1U',
        mediaType: 1,
        renderLargerThumbnail: true, 
        showAdAttribution: true
      }}
  })}
handler.command = /^(cai)$/i
handler.help = ['cai']
handler.tags = ['character-ai']
handler.premium = false

export default handler;