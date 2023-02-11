const emojis = {
    '-': ' ',
    O: '🚪',
    X: '💣',
    I: '🚀',
    PLAYER: '👽',
    BOMB_COLLISION: '🔥',
    GAME_OVER: '👎',
    WIN: '🏆',
    HEART: '❤️',
};
const maps = [];
maps.push(`
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
`);
maps.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  X-XXXX-XXX
  XXI-XX--XX
  XX---XX-XX
  XXXX----XX
  XXXXXXXXXX
  `);
maps.push(`
  I-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX--------
  XXXXXXXXX-
  XXOXXXXXX-
  XX-XXXXXX-
  XX--XXXX--
  XXX------X
`);
