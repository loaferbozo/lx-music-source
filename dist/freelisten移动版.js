/*!
 * @name Free listen-Flac版(移动版)
 * @description A lx-music mobile source
 * @version v1.1.2m
 * @wy_token null
 * @wy_token_desc 网易音乐会员token设置
 */
module.exports = [
  { // 酷我音乐
    name: '酷我音乐',
    type: 'music',
    actions: ['musicUrl'],
    qualitys: ['128k', '320k', 'flac'],
    async musicUrl({ songmid }, quality) {
      const qualityMap = {
        '128k': '128kmp3',
        '320k': '320kmp3',
        flac: 'flac'
      };
      const target_url = `https://m.kuwo.cn/api/v1/www/music/playUrl?mid=${songmid}&type=music&br=${qualityMap[quality]}`;
      
      return fetch(target_url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
          Referer: 'https://m.kuwo.cn/',
        }
      }).then(res => res.json())
      .then(data => data.data.url);
    }
  },
  { // 酷狗音乐
    name: '酷狗音乐',
    type: 'music',
    actions: ['musicUrl'],
    qualitys: ['flac'],
    musicUrl({ hash, albumId }) {
      return fetch(`https://mobile.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=${hash}&album_id=${albumId}`, {
        headers: {
          'User-Agent': 'KGMusic/12.0.8 (Android 10; Mobile)'
        }
      }).then(res => res.json())
      .then(data => data.url);
    }
  },
  { // 企鹅音乐
    name: '企鹅音乐',
    type: 'music',
    actions: ['musicUrl'],
    qualitys: ['flac'],
    async musicUrl({ songmid }) {
      const response = await fetch(`https://u.y.qq.com/cgi-bin/musicu.fcg?format=json&data=${encodeURIComponent(JSON.stringify({
        req_0: {
          module: "vkey.GetVkeyServer",
          method: "CgiGetVkey",
          param: {
            guid: "10000",
            songmid: [songmid],
            uin: "0"
          }
        }
      }))}`);

      const data = await response.json();
      return `https://dl.stream.qqmusic.qq.com/${data.req_0.data.midurlinfo[0].purl}`;
    }
  },
  { // 网易音乐
    name: '网易音乐',
    type: 'music',
    actions: ['musicUrl'],
    qualitys: ['flac'],
    async musicUrl({ songmid }) {
      const target_url = 'https://interface3.music.163.com/eapi/song/enhance/player/url';
      
      const res = await fetch(target_url, {
        method: 'POST',
        headers: {
          'User-Agent': 'NeteaseMusic/8.0.0 (Linux; Android 10)',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `ids=[${songmid}]&br=999000`
      });

      const data = await res.json();
      return data.data[0].url;
    }
  },
  { // 咪咕音乐
    name: '咪咕音乐',
    type: 'music',
    actions: ['musicUrl'],
    qualitys: ['flac'],
    musicUrl({ songmid }) {
      return fetch(`https://app.c.nf.migu.cn/MIGUM2.0/strategy/listen-url/v2.2?netType=01&resourceType=E&songId=${songmid}&toneFlag=SQ`, {
        headers: {
          'User-Agent': 'MiguMusic/6.3.0 (Linux; Android 10; Mobile)'
        }
      }).then(res => res.json())
      .then(data => data.data.url.replace(/\+/g, '%2B'));
    }
  }
];