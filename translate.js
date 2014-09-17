if ( !String.prototype.contains ) {
    String.prototype.contains = function() {
        return String.prototype.indexOf.apply( this, arguments ) !== -1;
    };
}

if ( !String.prototype.startsWith ) {
    String.prototype.startsWith = function() {
        return String.prototype.indexOf.apply( this, arguments ) === 0;
    };
}

var translate = function(word) {

  var backup = word;

  word = word.toUpperCase();

  // Don't translate short words
  if (word.length == 1) {
    return word;
  }

  if (word[0] == '@' || word[0] == '#') {
    return backup;
  }

  if (word.startsWith('HTTP')) {
    return backup;
  }

  if (word.contains(':')) {
    return word;
  }

  // Handle specific words
  switch (word) {
    case 'DRAGON':     return 'DERGON';
    case 'AGE':        return 'AGE';
    case 'AWESOME':    return 'ERSUM';
    case 'BANANA':     return 'BERNERNER';
    case 'BAYOU':      return 'BERU';
    case 'FAVORITE':
    case 'FAVOURITE':  return 'FRAVRIT';
    case 'GOOSEBUMPS': return 'GERSBERMS';
    case 'LONG':       return 'LERNG';
    case 'MY':         return 'MAH';
    case 'THE':        return 'DA';
    case 'THEY':       return 'DEY';
    case 'WE\'RE':     return 'WER';
    case 'YOU':        return 'U';
    case 'YOU\'RE':    return 'YER';
    case 'WHO':        return 'WHO';
    case 'WHOM':       return 'WHERM';
  }


  // Before translating, keep a reference of the original word
  var originalWord = word;

  // Drop vowel from end of words
  if (originalWord.length > 2) { // Keep it for short words, like "WE"
    word = word.replace(/[AEIOU]$/, '');
  }

  // Reduce duplicate letters
  word = word.replace(/[^\w\s]|(.)(?=\1)/gi, '');

  // Reduce adjacent vowels to one
  word = word.replace(/[AEIOUY]{2,}/g, 'E'); // TODO: Keep Y as first letter

  // DOWN -> DERN
  word = word.replace(/OW/g, 'ER');

  // PANCAKES -> PERNKERKS
  word = word.replace(/AKES/g, 'ERKS');

  // The meat and potatoes: replace vowels with ER
  word = word.replace(/[AEIOUY]/g, 'ER'); // TODO: Keep Y as first letter

  // OH -> ER
  word = word.replace(/ERH/g, 'ER');

  // MY -> MAH
  word = word.replace(/MER/g, 'MAH');

  // FALLING -> FALERNG -> FERLIN
  word = word.replace('ERNG', 'IN');

  // POOPED -> PERPERD -> PERPED
  word = word.replace('ERPERD', 'ERPED');

  // MEME -> MAHM -> MERM
  word = word.replace('MAHM', 'MERM');

  // Keep Y as first character
  // YES -> ERS -> YERS
  if (originalWord.charAt(0) == 'Y') {
    word = 'Y' + word;
  }

  // Reduce duplicate letters
  word = word.replace(/[^\w\s]|(.)(?=\1)/gi, '');

  // YELLOW -> YERLER -> YERLO
  if ((originalWord.substr(-3) == 'LOW') && (word.substr(-3) == 'LER')) {
    word = word.substr(0, word.length - 3) + 'LO';
  }

  return word;
};

module.exports = translate;
