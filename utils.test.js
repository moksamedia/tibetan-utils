import * as tu from './TibetanUtils.js'
import jsEwts from './jsewts'

test("check rows unicode", () => {
	expect(tu.row1Unicode).toStrictEqual(['ཀ', 'ཁ', 'ག', 'ང'])
	expect(tu.row2Unicode).toStrictEqual(['ཅ', 'ཆ', 'ཇ', 'ཉ'])
	expect(tu.row3Unicode).toStrictEqual(['ཏ', 'ཐ', 'ད', 'ན'])
	expect(tu.row4Unicode).toStrictEqual(['པ', 'ཕ', 'བ', 'མ'])
	expect(tu.row5Unicode).toStrictEqual(['ཙ', 'ཚ', 'ཛ', 'ཝ'])
	expect(tu.row6Unicode).toStrictEqual(['ཞ', 'ཟ', 'འ', 'ཡ'])
	expect(tu.row7Unicode).toStrictEqual(['ར', 'ལ', 'ཤ', 'ས'])
	expect(tu.row8Unicode).toStrictEqual(['ཧ', 'ཨ'])
	expect(tu.finall11Unicode).toStrictEqual([
		'ཝ',
		'ཞ', 'ཟ', 'འ', 'ཡ',
		'ར', 'ལ', 'ཤ', 'ས',
		'ཧ', 'ཨ'])
})


test("check rows wylie", () => {
	expect(tu.row1Wylie).toStrictEqual(['ka', 'kha', 'ga', 'nga'])
	expect(tu.row2Wylie).toStrictEqual(['ca', 'cha', 'ja', 'nya'])
	expect(tu.row3Wylie).toStrictEqual(['ta', 'tha', 'da', 'na'])
	expect(tu.row4Wylie).toStrictEqual(['pa', 'pha', 'ba', 'ma'])
	expect(tu.row5Wylie).toStrictEqual(['tsa', 'tsha', 'dza', 'wa'])
	expect(tu.row6Wylie).toStrictEqual(['zha', 'za', '\'a', 'ya'])
	expect(tu.row7Wylie).toStrictEqual(['ra', 'la', 'sha', 'sa'])
	expect(tu.row8Wylie).toStrictEqual(['ha', 'a'])
	expect(tu.finall11Wylie).toStrictEqual([
		'wa',
		'zha', 'za', '\'a', 'ya',
		'ra', 'la', 'sha', 'sa',
		'ha', 'a'])
})

test("toUnicodeIfNecessary", () => {
	expect(tu.toUnicodeIfNecessary("ca")).toEqual('ཅ')
	expect(tu.toUnicodeIfNecessary("ཨ")).toEqual('ཨ')
})

test("toWylieIfNecessary", () => {
	expect(tu.toWylieIfNecessary("ca")).toEqual('ca')
	expect(tu.toWylieIfNecessary("ཨ")).toEqual('a')
})

test("canSuperscriptRa", () => {
	expect(tu.canSuperscriptRa("ca")).toBeFalsy()
	expect(tu.canSuperscriptRa("ཅ")).toBeFalsy()
	expect(tu.canSuperscriptRa("tsa")).toEqual(true)
	expect(tu.canSuperscriptRa("ཏ")).toEqual(true)
	expect(tu.canSuperscriptRa("gya")).toEqual(true)
})

test("canSuperscriptLa", () => {
	expect(tu.canSuperscriptLa("dza")).toBeFalsy()
	expect(tu.canSuperscriptLa("ཛ")).toBeFalsy()
	expect(tu.canSuperscriptLa("ka")).toEqual(true)
	expect(tu.canSuperscriptLa("ང")).toEqual(true)
})


test("hasSuperscribedRa", () => {
	expect(tu.hasSuperscribedRa("dza")).toBeFalsy()
	expect(tu.hasSuperscribedRa("ཛ")).toBeFalsy()
	expect(tu.hasSuperscribedRa("grob")).toBeFalsy()
	expect(tu.hasSuperscribedRa("རྫ")).toEqual(true)
	expect(tu.hasSuperscribedRa("རྒྱེད་")).toEqual(true)
	expect(tu.hasSuperscribedRa("rkyob")).toEqual(true)
	expect(tu.hasSuperscribedRa("རྐ")).toEqual(true)
})

test.concurrent.each("རྐ རྒ རྔ རྗ རྙ རྟ རྡ རྣ རྦ རྨ རྩ རྫ རྐྱ རྒྱ རྨྱ".split(' '))("hasSuperscribedRa true", (input) => {
	expect(tu.hasSuperscribedRa(input)).toBe(true)
})

test("hasSuperscribedLa", () => {
	expect(tu.hasSuperscribedLa("dza")).toBeFalsy()
	expect(tu.hasSuperscribedLa("ཛ")).toBeFalsy()
	expect(tu.hasSuperscribedLa("grob")).toBeFalsy()
	expect(tu.hasSuperscribedLa("ལྡ་")).toEqual(true)
	expect(tu.hasSuperscribedLa("ལྒེ་")).toEqual(true)
	expect(tu.hasSuperscribedLa("rkyob")).toBeFalsy()
	expect(tu.hasSuperscribedLa("ཀླིས")).toBeFalsy()
	expect(tu.hasSuperscribedSa("sla")).toBeFalsy()
	expect(tu.hasSuperscribedSa("སླ་")).toBeFalsy()
})

test("hasSuperscribedSa", () => {
	expect(tu.hasSuperscribedSa("dza")).toBeFalsy()
	expect(tu.hasSuperscribedSa("ཛ")).toBeFalsy()
	expect(tu.hasSuperscribedSa("grob")).toBeFalsy()
	expect(tu.hasSuperscribedSa("རྫ")).toBeFalsy()
	expect(tu.hasSuperscribedSa("རྒྱེད་")).toBeFalsy()
	expect(tu.hasSuperscribedSa("rkyob")).toBeFalsy()
	expect(tu.hasSuperscribedSa("skyed")).toEqual(true)
	expect(tu.hasSuperscribedSa("སྟ་")).toEqual(true)
	expect(tu.hasSuperscribedSa("smrogs")).toEqual(true)
})

test("hasSubscribedRa", () => {
	expect(tu.hasSubscribedRa("rdza")).toBeFalsy()
	expect(tu.hasSubscribedRa("ཛ")).toBeFalsy()
	expect(tu.hasSubscribedRa("rgyob")).toBeFalsy()
	expect(tu.hasSubscribedRa("ཁྲ")).toEqual(true)
	expect(tu.hasSubscribedRa("khra")).toEqual(true)
	expect(tu.hasSubscribedRa("khred")).toEqual(true)
	expect(tu.hasSubscribedRa("ཧྲིག")).toEqual(true)
	expect(tu.hasSubscribedRa("hrig")).toEqual(true)
})

test.each("ཀྲ ཁྲ གྲ ཏྲ ཐྲ དྲ པྲ ཕྲ བྲ མྲ ཤྲ སྲ ཧྲ སྐྲ སྒྲ སྤྲ སྦྲ སྨྲ སྣྲ".split(' '))("hasSubscribedRa true", (input) => {
	expect(tu.hasSubscribedRa(input)).toBe(true)
})

test("hasSubscribedYa", () => {
	expect(tu.hasSubscribedYa("rdza")).toBeFalsy()
	expect(tu.hasSubscribedYa("nya")).toBeFalsy()
	expect(tu.hasSubscribedYa("ཉ")).toBeFalsy()
	expect(tu.hasSubscribedYa("ཛ")).toBeFalsy()
	expect(tu.hasSubscribedYa("ཁྲ")).toBeFalsy()
	expect(tu.hasSubscribedYa("khra")).toBeFalsy()
	expect(tu.hasSubscribedYa("ཧྲིག")).toBeFalsy()
	expect(tu.hasSubscribedYa("hrig")).toBeFalsy()
	expect(tu.hasSubscribedYa("gyag")).toEqual(true)
	expect(tu.hasSubscribedYa("kya")).toEqual(true)
	expect(tu.hasSubscribedYa("kyid")).toEqual(true)
	expect(tu.hasSubscribedYa("པྱ")).toEqual(true)
	expect(tu.hasSubscribedYa("སྒྱ")).toEqual(true)
	expect(tu.hasSubscribedYa("སྒྱུར")).toEqual(true)
})

test("hasSubscribedLa", () => {
	expect(tu.hasSubscribedLa("rdza")).toBeFalsy()
	expect(tu.hasSubscribedLa("ཛ")).toBeFalsy()
	expect(tu.hasSubscribedLa("rgyob")).toBeFalsy()
	expect(tu.hasSubscribedLa("སྒྱ")).toBeFalsy()
	expect(tu.hasSubscribedLa("སྒྱུར")).toBeFalsy()
	expect(tu.hasSubscribedLa("ཧྲིག")).toBeFalsy()
})

test.each("ཀླ གླ བླ ཟླ རླ སླ".split(' '))("hasSubscribedLa true", (input) => {
	expect(tu.hasSubscribedLa(input)).toBe(true)
})

test("hasSubscript", () => {
	expect(tu.hasSubscript("rdza")).toBeFalsy()
	expect(tu.hasSubscript("la")).toBeFalsy()
	expect(tu.hasSubscript("tha")).toBeFalsy()
	expect(tu.hasSubscript("cha")).toBeFalsy()
	expect(tu.hasSubscript("na")).toBeFalsy()
	expect(tu.hasSubscript("nya")).toBeFalsy()
	expect(tu.hasSubscript("sked")).toBeFalsy()
	expect(tu.hasSubscript("sha")).toBeFalsy()

	expect(tu.hasSubscript("སླ")).toEqual(true)
	expect(tu.hasSubscript("gros")).toEqual(true)
	expect(tu.hasSubscript("thrad")).toEqual(true)
	expect(tu.hasSubscript("skyed")).toEqual(true)
})

test("hasSuperscript", () => {
	expect(tu.hasSuperscript("la")).toBeFalsy()
	expect(tu.hasSuperscript("tha")).toBeFalsy()
	expect(tu.hasSuperscript("cha")).toBeFalsy()
	expect(tu.hasSuperscript("na")).toBeFalsy()
	expect(tu.hasSuperscript("nya")).toBeFalsy()
	expect(tu.hasSuperscript("sla")).toBeFalsy()
	expect(tu.hasSuperscript("སླ")).toBeFalsy()
	expect(tu.hasSuperscript("gros")).toBeFalsy()
	expect(tu.hasSuperscript("bthrad")).toBeFalsy()
	expect(tu.hasSuperscript("sha")).toBeFalsy()

	expect(tu.hasSuperscript("skyed")).toEqual(true)
	expect(tu.hasSuperscript("rdza")).toEqual(true)
	expect(tu.hasSuperscript("dsked")).toEqual(true)
})

test("hasSubscriptOrSuperscript", () => {
	expect(tu.hasSubscriptOrSuperscript("sha")).toBeFalsy()
})

test("wylieRegex", () => {

	expect("brgyad".match(tu.wylieRegex).groups).toEqual({
        prefix: 'b',
        superscript: 'r',
        root: 'g',
        subscript: 'y',
        vowel: 'a',
        suffix: 'd',
        suffix2: undefined,
        sixth: undefined
      })
	  expect(tu.matchRegex(jsEwts.toUnicode("brgyad"))).toEqual({
		match: "brgyad",
        prefix: 'b',
        superscript: 'r',
        root: 'g',
        subscript: 'y',
        vowel: 'a',
        suffix: 'd',
        suffix2: null,
        sixth: null
      })

	  expect(tu.matchRegex(jsEwts.toUnicode("dogs"))).toEqual({
		match: "dogs",
        prefix: null,
        superscript: null,
        root: 'd',
        subscript: null,
        vowel: 'o',
        suffix: 'g',
        suffix2: 's',
        sixth: null
      })

	  expect(tu.matchRegex(jsEwts.toUnicode("dbyings"))).toEqual({
		match: "dbyings",
        prefix: 'd',
        superscript: null,
        root: 'b',
        subscript: 'y',
        vowel: 'i',
        suffix: 'ng',
        suffix2: 's',
        sixth: null
      })

	  expect(tu.matchRegex("མདོའི")).toEqual({
		match: "mdo'i",
        prefix: 'm',
        superscript: null,
        root: 'd',
        subscript: null,
        vowel: 'o',
        suffix: null,
        suffix2: null,
        sixth: "'i"
      })

	  expect(tu.matchRegex("g.yag")).toEqual({
		match: "g.yag",
        prefix: 'g',
        superscript: null,
        root: 'y',
        subscript: null,
        vowel: 'a',
        suffix: 'g',
        suffix2: null,
        sixth: null
      })

	  expect(tu.matchRegex("gyag")).toEqual({
		match: "gyag",
        prefix: null,
        superscript: null,
        root: 'g',
        subscript: 'y',
        vowel: 'a',
        suffix: 'g',
        suffix2: null,
        sixth: null
      })

	  expect(tu.matchRegex("sla")).toEqual({
		match: "sla",
        prefix: null,
        superscript: null,
        root: 's',
        subscript: 'l',
        vowel: 'a',
        suffix: null,
        suffix2: null,
        sixth: null
      })

	  expect(tu.matchRegex("སླ")).toEqual({
		match: "sla",
        prefix: null,
        superscript: null,
        root: 's',
        subscript: 'l',
        vowel: 'a',
        suffix: null,
        suffix2: null,
        sixth: null
      })
	  expect(tu.matchRegex("སྤྲེའུ་")).toEqual({
		match: "spre'u",
        prefix: null,
        superscript: "s",
        root: 'p',
        subscript: 'r',
        vowel: 'e',
        suffix: null,
        suffix2: null,
        sixth: "'u"
      })

})

/*
const t0 = performance.now();

for (let i=0; i<1000;i++) {
	expect(tu.hasSubscript("rdza")).toBeFalsy()
	expect(tu.hasSubscript("la")).toBeFalsy()
	expect(tu.hasSubscript("tha")).toBeFalsy()
	expect(tu.hasSubscript("cha")).toBeFalsy()
	expect(tu.hasSubscript("na")).toBeFalsy()
	expect(tu.hasSubscript("nya")).toBeFalsy()
	expect(tu.hasSubscript("sked")).toBeFalsy()
	expect(tu.hasSubscript("sha")).toBeFalsy()
	expect(tu.hasSubscript("སླ་")).toEqual(true)
	expect(tu.hasSubscript("gros")).toEqual(true)
	expect(tu.hasSubscript("thrad")).toEqual(true)
	expect(tu.hasSubscript("skyed")).toEqual(true)
}

const t1 = performance.now();
console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);

const t2 = performance.now();

for (let i=0; i<1000;i++) {
	expect(tu.hasSubscript2("rdza")).toBeFalsy()
	expect(tu.hasSubscript2("la")).toBeFalsy()
	expect(tu.hasSubscript2("tha")).toBeFalsy()
	expect(tu.hasSubscript2("cha")).toBeFalsy()
	expect(tu.hasSubscript2("na")).toBeFalsy()
	expect(tu.hasSubscript2("nya")).toBeFalsy()
	expect(tu.hasSubscript2("sked")).toBeFalsy()
	expect(tu.hasSubscript2("sha")).toBeFalsy()
	expect(tu.hasSubscript2("སླ")).toEqual(true)
	expect(tu.hasSubscript2("gros")).toEqual(true)
	expect(tu.hasSubscript2("thrad")).toEqual(true)
	expect(tu.hasSubscript2("skyed")).toEqual(true)
}

const t3 = performance.now();
console.log(`Call to doSomething took ${t3 - t2} milliseconds.`);
*/