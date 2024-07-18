/*
 * Good summation: https://www.rigpawiki.org/index.php?title=Tibetan_Grammar_-_Formation_of_the_Tibetan_Syllable
 */

import jsEwts from './jsewts'

export const unicodeConsonants = [
  'ཀ', 'ཁ', 'ག', 'ང',
  'ཅ', 'ཆ', 'ཇ', 'ཉ',
  'ཏ', 'ཐ', 'ད', 'ན',
  'པ', 'ཕ', 'བ', 'མ',
  'ཙ', 'ཚ', 'ཛ', 'ཝ',
  'ཞ', 'ཟ', 'འ', 'ཡ',
  'ར', 'ལ', 'ཤ', 'ས',
  'ཧ', 'ཨ']

/*
    (?<prefix>  # handle prefixes
      (g(?=(?:.?)(?:c|ny|t|d|n|ts|zh|z|.y|sh|s)))|
      (d(?=(?:.?)(?:k|g|ng|p|b|m|ky|gy|py|by|my|kr|gr|pr|br)))|
      (b(?=(?:.?)(?:k|g|c|t|d|ts|zh|z|sh|s|ky|gy|kr|gr|rl|sl|rk|rg|rng|rj|rny|rt|rd|rn|rts|rdz|lt|ld|st|sk|sg|sng|sny|st|sd|sn|sts|rky|rgy|sky|sgy|skr|sgr)))|
      (m(?=(?:.?)(?:kh|g|ng|ch|j|ny|th|d|n|tsh|dz|khy|gy|khr|gr)))|
      ('(?=(?:.?)(?:kh|g|ch|j|th|d|ph|b|tsh|dz|khy|gy|phy|by|khr|gr|dr|phr|br)))
    )?
    \.?  # eat the dot forcing separation between prefix and main stack
    (?<superscript>[rls]?)
    (?<root>k|kh|g|ng|c|ch|j|ny|t|th|d|n|p|ph|b|m|ts|tsh|dz|w|zh|z|'|y|r|l|sh|s|h)
    (?<subscript>[yrlw]?)
    (?<vowel>[aeiou])
    (  # suffix or 6th/terminator
        ((?<suffix>g|ng|d|n|b|m|'|r|l|s){0,1}(?<suffix2>g|s)?$)|
        (?<sixth>'[aeiou])
    )
*/
//export const wylieRegex = /(?<prefix>(g(?=(?:.?)(?:c|ny|t|d|n|ts|zh|z|.y|sh|s)))|(d(?=(?:.?)(?:k|g|ng|p|b|m|ky|gy|py|by|my|kr|gr|pr|br)))|(b(?=(?:.?)(?:k|g|c|t|d|ts|zh|z|sh|s|ky|gy|kr|gr|rl|sl|rk|rg|rng|rj|rny|rt|rd|rn|rts|rdz|lt|ld|st|sk|sg|sng|sny|st|sd|sn|sts|rky|rgy|sky|sgy|skr|sgr)))|(m(?=(?:.?)(?:kh|g|ng|ch|j|ny|th|d|n|tsh|dz|khy|gy|khr|gr)))|('(?=(?:.?)(?:kh|g|ch|j|th|d|ph|b|tsh|dz|khy|gy|phy|by|khr|gr|dr|phr|br))))?\.?(?<superscript>[rls]?)(?<root>k|kh|g|ng|c|ch|j|ny|t|th|d|n|p|ph|b|m|ts|tsh|dz|w|zh|z|'|y|r|l|sh|s|h)(?<subscript>[yrlw]?)(?<vowel>[aeiou])(((?<suffix>g|ng|d|n|b|m|'|r|l|s){0,1}(?<suffix2>g|s)?$)|(?<sixth>'[aeiou]))/

export const wylieRegex = /(?<prefix>g(?=c|ny|t|d|n|ts|zh|z|\.y|sh|s)|d(?=k|g|ng|p|b|m|ky|gy|py|by|my|kr|gr|pr|br)|b(?=k|g|c|t|d|ts|zh|z|sh|s|ky|gy|kr|gr|rl|sl|rk|rg|rng|rj|rny|rt|rd|rn|rts|rdz|lt|ld|st|sk|sg|sng|sny|st|sd|sn|sts|rky|rgy|sky|sgy|skr|sgr)|m(?=:kh|g|ng|ch|j|ny|th|d|n|tsh|dz|khy|gy|khr|gr)|'(?=kh|g|ch|j|th|d|ph|b|tsh|dz|khy|gy|phy|by|khr|gr|dr|phr|br))?\.?(?<superscript>l(?=k|g|ng|c|j|t|d|p|b|h)|r(?=k|g|ng|j|ny|t|d|n|b|m|ts|dz|ky|gy|my)|s(?=k|g|ng|ny|t|d|n|p|b|m|ts|ky|gy|py|by|my|kr|gr|pr|mr|nr))?(?<root>k|kh|g|ng|c|ch|j|ny|t|th|d|n|p|ph|b|m|ts|tsh|dz|w|zh|z|'|y|r|l|sh|s|h)(?<subscript>[yrlw]?)(?<vowel>[aeiou])(((?<suffix>g|ng|d|n|b|m|'|r|l|s){0,1}(?<suffix2>g|s)?$)|(?<sixth>'[aeiou])) ?/


export const isWylie = (input) => {
  return input === jsEwts.toWylie(jsEwts.fromWylie(input))
}

/*
export function breakWylie(input) {
  let stack = input
  const info = {}

  // remove trailing 'i or 'o (6th case or termination)
  const postfix = stack.match(/'i|'o$/m)
  if (postfix) {
    info.postfix = postfix[0]
    stack.replace(info.postfix, '')
  }

  const vowel = stack.match([aeiou])
  if (!vowel) throw Error ("must include vowel")
  info.vowel = vowel[0]
  const split = stack.splt(info.vowel)

  const suffixes = split[1]
  const prefixAndRootStack = split[0]

  const prefixRegex = /(?<prefix>(g(?=(?:.?)(?:c|ny|t|d|n|ts|zh|z|.y|sh|s)))|(d(?=(?:.?)(?:k|g|ng|p|b|m|ky|gy|py|by|my|kr|gr|pr|br)))|(b(?=(?:.?)(?:k|g|c|t|d|ts|zh|z|sh|s|ky|gy|kr|gr|rl|sl|rk|rg|rng|rj|rny|rt|rd|rn|rts|rdz|lt|ld|st|sk|sg|sng|sny|st|sd|sn|sts|rky|rgy|sky|sgy|skr|sgr)))|(m(?=(?:.?)(?:kh|g|ng|ch|j|ny|th|d|n|tsh|dz|khy|gy|khr|gr)))|('(?=(?:.?)(?:kh|g|ch|j|th|d|ph|b|tsh|dz|khy|gy|phy|by|khr|gr|dr|phr|br))))/
  const prefixMatch = prefixAndRootStack.match(prefixRegex)


}
*/

// This expects one syllable of regular Wylie, not extended. It
// cannot handle EWTS with Sanskrit and what not.
export const matchRegex = (string) => {
  const wylie = toWylieIfNecessary(string).trim()
  const result = wylie.match(wylieRegex)
  if (!result) return false

  function normalize(toCheck) {
    return toCheck ? toCheck : null
  }

  return {
    match: normalize(result[0]),
    prefix: normalize(result.groups.prefix),
    superscript: normalize(result.groups.superscript),
    root: normalize(result.groups.root),
    subscript: normalize(result.groups.subscript),
    vowel: normalize(result.groups.vowel),
    suffix: normalize(result.groups.suffix),
    suffix2: normalize(result.groups.suffix2),
    sixth: normalize(result.groups.sixth)
    }
}

export const row1Unicode = unicodeConsonants.slice(0, 4)
export const row2Unicode = unicodeConsonants.slice(4, 8)
export const row3Unicode = unicodeConsonants.slice(8, 12)
export const row4Unicode = unicodeConsonants.slice(12, 16)
export const row5Unicode = unicodeConsonants.slice(16, 20)
export const row6Unicode = unicodeConsonants.slice(20, 24)
export const row7Unicode = unicodeConsonants.slice(24, 28)
export const row8Unicode = unicodeConsonants.slice(28, 30)
export const finall11Unicode = unicodeConsonants.slice(19, 30)

export const wylieConsonants = [
  'ka', 'kha', 'ga', 'nga',
  'ca', 'cha', 'ja', 'nya',
  'ta', 'tha', 'da', 'na',
  'pa', 'pha', 'ba', 'ma',
  'tsa', 'tsha', 'dza', 'wa',
  'zha', 'za', '\'a', 'ya',
  'ra', 'la', 'sha', 'sa',
  'ha', 'a']

export const row1Wylie = wylieConsonants.slice(0, 4)
export const row2Wylie = wylieConsonants.slice(4, 8)
export const row3Wylie = wylieConsonants.slice(8, 12)
export const row4Wylie = wylieConsonants.slice(12, 16)
export const row5Wylie = wylieConsonants.slice(16, 20)
export const row6Wylie = wylieConsonants.slice(20, 24)
export const row7Wylie = wylieConsonants.slice(24, 28)
export const row8Wylie = wylieConsonants.slice(28, 30)
export const finall11Wylie = wylieConsonants.slice(19, 30)

export const suffixesUnicode = ['ག', 'ང', 'ད', 'ན', 'བ', 'མ', 'འ', 'ར', 'ལ', 'ས']
export const prefixesUnicode = ['བ', 'ག', 'ད', 'འ', 'མ']

export function toUnicodeIfNecessary(toTest) {
  return /[a-z]/.test(toTest) ? jsEwts.toUnicode(toTest) : toTest
}

export function toWylieIfNecessary(toTest) {
  return /[a-z]/.test(toTest) ? toTest : jsEwts.toWylie(toTest)
}

function getSupSubRegex(stacks) {
  return new RegExp("^[" + stacks.replace(/་/g,'') + "]+$")
}


// SUPER RA
const canSuperscriptRaStacks = "ཀ་ག་ང་ཇ་ཉ་ཏ་ད་ན་བ་མ་ཙ་ཛ་ཀྱ་གྱ་མྱ་"
const canSuperscriptRaRegex = getSupSubRegex(canSuperscriptRaStacks)
export function canSuperscriptRa(letter) {
  return canSuperscriptRaRegex.test(toUnicodeIfNecessary(letter))
}
export const stacksWithSuperscribedRa = "རྐ་རྒ་རྔ་རྗ་རྙ་རྟ་རྡ་རྣ་རྦ་རྨ་རྩ་རྫ་རྐྱ་རྒྱ་རྨྱ་"

// SUPER LA
const canSuperscriptLaStacks = "ཀ་ག་ང་ཅ་ཇ་ཏ་ད་པ་བ་ཧ་"
const canSuperscriptLaRegex = getSupSubRegex(canSuperscriptLaStacks)
export function canSuperscriptLa(letter) {
  return canSuperscriptLaRegex.test(toUnicodeIfNecessary(letter))
}
export const stacksWithSuperscribedLa = "ལྐ་ལྒ་ལྔ་ལྕ་ལྗ་ལྟ་ལྡ་ལྤ་ལྦ་ལྷ་"

// SUPER SA
const canSuperscriptSaStacks = "ཀ་ག་ང་ཉ་ཏ་ད་ན་པ་བ་མ་ཙ་ཀྱ་གྱ་པྱ་བྱ་མྱ་ཀྲ་གྲ་པྲ་མྲ་ནྲ་"
const canSuperscriptSaRegex = getSupSubRegex(canSuperscriptSaStacks)
export function canSuperscriptSa(letter) {
  return canSuperscriptSaRegex.test(toUnicodeIfNecessary(letter))
}
export const stacksWithSuperscribedSa = "སྐ་སྒ་སྔ་སྙ་སྟ་སྡ་སྣ་སྤ་སྦ་སྨ་སྩ་སྐྱ་སྒྱ་སྤྱ་སྦྱ་སྨྱ་སྐྲ་སྒྲ་སྤྲ་སྨྲ་སྣྲ་"

// SUB YA
const canSubscriptYaStacks = "ཀ་ཁ་ག་པ་ཕ་བ་མ་རྐ་རྒ་རྨ་སྐ་སྒ་སྤ་སྦ་སྨ་"
const canSubscriptYaRegex = getSupSubRegex(canSubscriptYaStacks)
export function canSubscriptYa(letter) {
  return canSubscriptYaRegex.test(toUnicodeIfNecessary(letter))
}
export const stacksWithSubscribedYa = "ཀྱ་ཁྱ་གྱ་པྱ་ཕྱ་བྱ་མྱ་རྐྱ་རྒྱ་རྨྱ་སྐྱ་སྒྱ་སྤྱ་སྦྱ་སྨྱ་"

// SUB RA
const canSubscriptRaStacks = "ཀ་ཁ་ག་ཏ་ཐ་ད་པ་ཕ་བ་མ་ཤ་ས་ཧ་སྐ་སྒ་སྤ་སྦྲ་སྨ་སྣ་"
const canSubscriptRaRegex = getSupSubRegex(canSubscriptRaStacks)
export function canSubscriptRa(letter) {
  return canSubscriptRaRegex.test(toUnicodeIfNecessary(letter))
}
export const stacksWithSubscribedRa = "ཀྲ་ཁྲ་གྲ་ཏྲ་ཐྲ་དྲ་པྲ་ཕྲ་བྲ་མྲ་ཤྲ་སྲ་ཧྲ་སྐྲ་སྒྲ་སྤྲ་སྦྲ་སྨྲ་སྣྲ་"

// SUB LA
const canSubscriptLaStacks = "ཀ་ག་བ་ཟ་ར་ས་"
const canSubscriptLaRegex = getSupSubRegex(canSubscriptLaStacks)
export function canSubscriptLa(letter) {
  return canSubscriptLaRegex.test(toUnicodeIfNecessary(letter))
}
export const stacksWithSubscribedLa = "ཀླ་གླ་བླ་ཟླ་རླ་སླ་"

// SUB WA
const canSubscriptWaStacks = "ཀ་ཁ་ག་ཅ་ཉ་ཏ་ད་ཙ་ཚ་ཞ་ཟ་ར་ལ་ཤ་ས་ཧ་གྲ་དྲ་ཕྱ་རྒ་རྩ་"
const canSubscriptWaRegex = getSupSubRegex(canSubscriptWaStacks)
export function canSubscriptWa(letter) {
  return canSubscriptWaRegex.test(toUnicodeIfNecessary(letter))
}
export const stacksWithSubscribedWa = "ཀྭ་ཁྭ་གྭ་ཅྭ་ཉྭ་ཏྭ་དྭ་ཙྭ་ཚྭ་ཞྭ་ཟྭ་རྭ་ལྭ་ཤྭ་སྭ་ཧྭ་གྲྭ་དྲྭ་ཕྱྭ་རྒྭ་རྩྭ་"

export function hasSuperscribedRa(toTest) {
  //return /^(g|d|b|m|')?r[^aiuoe]/.test(toWylieIfNecessary(toTest))
  return getSuperscript(toTest) === "r"
}

export function hasSuperscribedLa(toTest) {
  //return /^(g|th|b|m|')?l[^aiuoe]/.test(toWylieIfNecessary(toTest))
  return getSuperscript(toTest) === "l"
}

export function hasSuperscribedSa(toTest) {
  //return /^(g|d|b|m|')?s[^aiuoe]/.test(toWylieIfNecessary(toTest))
  return getSuperscript(toTest) === "s"
}


export function hasSubscribedRa(toTest) {
  //return /^(g|d|b|m|')?[^aiuoe]{1,2}r[aeiou]/.test(toWylieIfNecessary(toTest))
  return getSubscript(toTest) === "r"
}

export function hasSubscribedYa(toTest) {
  //return /^(g.|d|b|m|')?[^aiuoen]{1,2}y[aeiou]/.test(toWylieIfNecessary(toTest))
  return getSubscript(toTest) === "y"
}

export function hasSubscribedLa(toTest) {
  //return /^(g|d|b|m|')?[^aiuoe]{1,2}l[aeiou]/.test(toWylieIfNecessary(toTest))
  return getSubscript(toTest) === "l"
}

export function getSubscript(toTest) {
  const matches = matchRegex(toTest)
  if (!matches || !matches.subscript) return false
  else return matches.subscript
}

export function getSuperscript(toTest) {
  const matches = matchRegex(toTest)
  if (!matches || !matches.superscript) return false
  else return matches.superscript
}

export function hasSubscript(toTest) {
  const matches = matchRegex(toTest)
  return matches != null && matches.subscript != null
}

export function hasSuperscript(toTest) {
  const matches = matchRegex(toTest)
  return matches != null && matches.superscript != null
}

export function hasSubscriptOrSuperscript(toTest) {
  const matches = matchRegex(toTest)
  return matches != null && (matches.superscript || matches.subscript)
}

export const rootsForPrefixBaUnicode = 'ཀ ཅ ཏ ཙ ག ང ཇ ཉ ད ན ཛ ཞ ཟ ར ཤ ས'.split(' ')
export const rootsForPrefixAhUnicode = 'ག ཇ ད བ ཛ ཁ ཆ ཐ ཕ ཚ'.split(' ')
export const rootsForPrefixGaUnicode = 'ཅ ཏ ཙ ཉ ད ན ཞ ཟ ཡ ཤ ས'.split(' ')
export const rootsForPrefixDaUnicode = 'ཀ པ ག ང བ མ'.split(' ')
export const rootsForPrefixMaUnicode = 'ཁ ཆ ཐ ཚ ག ཇ ད ཛ ང ཉ ན'.split(' ')

export const rootsForPrefixBaWylie = 'ka ca ta tsa ga nga ja nya da na dza zha za ra sha sa'.split(' ')
export const rootsForPrefixAhWylie = 'ga ja da ba dza kha cha tha pha tsha'.split(' ')
export const rootsForPrefixGaWylie = 'ca ta tsa nya da na zha za ya sha sa'.split(' ')
export const rootsForPrefixDaWylie = 'ka pa ga nga ba ma'.split(' ')
export const rootsForPrefixMaWylie = 'kha cha tha tsha ga ja da dza nga nya na'.split(' ')

export function superscript(p, root) {
  return jsEwts.toUnicode(p + jsEwts.toWylie(root))
}

export function subscript(s, root) {
  const rootWylie = jsEwts.toWylie(root)
  return jsEwts.toUnicode(rootWylie.replace('a', s + 'a'))
}

const canPrefixGa = /^(ཅ|ཉ|ཏ|ད|ན|ཙ|ཞ|ཟ|ཡ|ཤ|ས)/
const canPrefixGaWylie = /^(c|ny|t|d|n|ts|zh|z|y|sh|s)/
const canPrefixDa = /^(ཀ|ག|ང|པ|བ|མ|ཀྱ|གྱ|པྱ|བྱ|མྱ|ཀྲ|གྲ|པྲ|བྲ)/
const canPrefixDaWylie = /^(k|g|ng|p|b|m|ky|gy|py|by|my|kr|gr|pr|br)/
const canPrefixBa = /^(ཀ|ག|ཅ|ཏ|ད|ཙ|ཞ|ཟ|ཤ|ས|ཀྱ|གྱ|ཀྲ|གྲ|རླ|སླ|རྐ|རྒ|རྔ|རྗ|རྙ|རྟ|རྡ|རྣ|རྩ|རྫ|ལྟ|ལྡ|སྟ|སྐ|སྒ|སྔ|སྙ|སྟ|སྡ|སྣ|སྩ|རྐྱ|རྒྱ|སྐྱ|སྒྱ|སྐྲ|སྒྲ)/
const canPrefixBaWylie = /^(k|g|c|t|d|ts|zh|z|sh|s|ky|gy|kr|gr|rl|sl|rk|rg|rng|rj|rny|rt|rd|rn|rts|rdz|lt|ld|st|sk|sg|sng|sny|st|sd|sn|sts|rky|rgy|sky|sgy|skr|sgr)/
const canPrefixMa = /^(ཁ|ག|ང|ཆ|ཇ|ཉ|ཐ|ད|ན|ཚ|ཛ|ཁྱ|གྱ|ཁྲ|གྲ)/
const canPrefixMaWylie = /^(kh|g|ng|ch|j|ny|th|d|n|tsh|dz|khy|gy|khr|gr)/
const canPrefixAh = /^(ཁ|ག|ཆ|ཇ|ཐ|ད|ཕ|བ|ཚ|ཛ|ཁྱ|གྱ|ཕྱ|བྱ|ཁྲ|གྲ|དྲ|ཕྲ|བྲ)/
const canPrefixAhWylie = /^(kh|g|ch|j|th|d|ph|b|tsh|dz|khy|gy|phy|by|khr|gr|dr|phr|br)/

export const canAttachPrefix = (prefix, string) => {
  const unicode = toUnicodeIfNecessary(string)
  if (prefix === 'བ') {
    return canPrefixBa.test(unicode)
  } else if (prefix === 'འ') {
    return canPrefixAh.test(unicode)
  } else if (prefix === 'ག') {
    return canPrefixGa.test(unicode)
  } else if (prefix === 'ད') {
    return canPrefixDa.test(unicode)
  } else if (prefix === 'མ') {
    return canPrefixMa.test(unicode)
  } else {
    console.log("Should not happen")
    return false;
  }
}

export const _jsEwts = jsEwts