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
	expect(tu.canSuperscriptRa("ca")).toEqual(false)
	expect(tu.canSuperscriptRa("ཅ")).toEqual(false)
	expect(tu.canSuperscriptRa("tsa")).toEqual(true)
	expect(tu.canSuperscriptRa("ཏ")).toEqual(true)
	expect(tu.canSuperscriptRa("gya")).toEqual(true)
})

test("canSuperscriptLa", () => {
	expect(tu.canSuperscriptLa("dza")).toEqual(false)
	expect(tu.canSuperscriptLa("ཛ")).toEqual(false)
	expect(tu.canSuperscriptLa("ka")).toEqual(true)
	expect(tu.canSuperscriptLa("ང")).toEqual(true)
})


test("hasSuperscribedRa", () => {
	expect(tu.hasSuperscribedRa("dza")).toEqual(false)
	expect(tu.hasSuperscribedRa("ཛ")).toEqual(false)
	expect(tu.hasSuperscribedRa("grob")).toEqual(false)
	expect(tu.hasSuperscribedRa("རྫ")).toEqual(true)
	expect(tu.hasSuperscribedRa("རྒྱེད་")).toEqual(true)
	expect(tu.hasSuperscribedRa("rkyob")).toEqual(true)
	expect(tu.hasSuperscribedRa("རྐ")).toEqual(true)
})

test.concurrent.each("རྐ རྒ རྔ རྗ རྙ རྟ རྡ རྣ རྦ རྨ རྩ རྫ རྐྱ རྒྱ རྨྱ".split(' '))("hasSuperscribedRa true", (input) => {
	expect(tu.hasSuperscribedRa(input)).toBe(true)
})

test("hasSuperscribedLa", () => {
	expect(tu.hasSuperscribedLa("dza")).toEqual(false)
	expect(tu.hasSuperscribedLa("ཛ")).toEqual(false)
	expect(tu.hasSuperscribedLa("grob")).toEqual(false)
	expect(tu.hasSuperscribedLa("ལྡ་")).toEqual(true)
	expect(tu.hasSuperscribedLa("ལྒེ་")).toEqual(true)
	expect(tu.hasSuperscribedLa("rkyob")).toEqual(false)
	expect(tu.hasSuperscribedLa("ཀླིས")).toEqual(false)
	expect(tu.hasSuperscribedSa("sla")).toEqual(true)
	expect(tu.hasSuperscribedSa("སླ་")).toEqual(true)
})

test("hasSuperscribedSa", () => {
	expect(tu.hasSuperscribedSa("dza")).toEqual(false)
	expect(tu.hasSuperscribedSa("ཛ")).toEqual(false)
	expect(tu.hasSuperscribedSa("grob")).toEqual(false)
	expect(tu.hasSuperscribedSa("རྫ")).toEqual(false)
	expect(tu.hasSuperscribedSa("རྒྱེད་")).toEqual(false)
	expect(tu.hasSuperscribedSa("rkyob")).toEqual(false)
	expect(tu.hasSuperscribedSa("skyed")).toEqual(true)
	expect(tu.hasSuperscribedSa("སྟ་")).toEqual(true)
	expect(tu.hasSuperscribedSa("smrogs")).toEqual(true)
})

test("hasSubscribedRa", () => {
	expect(tu.hasSubscribedRa("rdza")).toEqual(false)
	expect(tu.hasSubscribedRa("ཛ")).toEqual(false)
	expect(tu.hasSubscribedRa("rgyob")).toEqual(false)
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
	expect(tu.hasSubscribedYa("rdza")).toEqual(false)
	expect(tu.hasSubscribedYa("nya")).toEqual(false)
	expect(tu.hasSubscribedYa("ཉ")).toEqual(false)
	expect(tu.hasSubscribedYa("ཛ")).toEqual(false)
	expect(tu.hasSubscribedYa("ཁྲ")).toEqual(false)
	expect(tu.hasSubscribedYa("khra")).toEqual(false)
	expect(tu.hasSubscribedYa("ཧྲིག")).toEqual(false)
	expect(tu.hasSubscribedYa("hrig")).toEqual(false)
	expect(tu.hasSubscribedYa("gyag")).toEqual(true)
	expect(tu.hasSubscribedYa("kya")).toEqual(true)
	expect(tu.hasSubscribedYa("kyid")).toEqual(true)
	expect(tu.hasSubscribedYa("པྱ")).toEqual(true)
	expect(tu.hasSubscribedYa("སྒྱ")).toEqual(true)
	expect(tu.hasSubscribedYa("སྒྱུར")).toEqual(true)
})

test("hasSubscribedLa", () => {
	expect(tu.hasSubscribedLa("rdza")).toEqual(false)
	expect(tu.hasSubscribedLa("ཛ")).toEqual(false)
	expect(tu.hasSubscribedLa("rgyob")).toEqual(false)
	expect(tu.hasSubscribedLa("སྒྱ")).toEqual(false)
	expect(tu.hasSubscribedLa("སྒྱུར")).toEqual(false)
	expect(tu.hasSubscribedLa("ཧྲིག")).toEqual(false)
})

test.each("ཀླ གླ བླ ཟླ རླ སླ".split(' '))("hasSubscribedLa true", (input) => {
	expect(tu.hasSubscribedLa(input)).toBe(true)
})

test("hasSubscript", () => {
	expect(tu.hasSubscript("rdza")).toEqual(false)
	expect(tu.hasSubscript("la")).toEqual(false)
	expect(tu.hasSubscript("tha")).toEqual(false)
	expect(tu.hasSubscript("cha")).toEqual(false)
	expect(tu.hasSubscript("na")).toEqual(false)
	expect(tu.hasSubscript("nya")).toEqual(false)
	expect(tu.hasSubscript("sked")).toEqual(false)
	expect(tu.hasSubscript("sha")).toEqual(false)

	expect(tu.hasSubscript("སླ")).toEqual(true)
	expect(tu.hasSubscript("gros")).toEqual(true)
	expect(tu.hasSubscript("thrad")).toEqual(true)
	expect(tu.hasSubscript("skyed")).toEqual(true)
})

test("hasSuperscript", () => {
	expect(tu.hasSuperscript("la")).toEqual(false)
	expect(tu.hasSuperscript("tha")).toEqual(false)
	expect(tu.hasSuperscript("cha")).toEqual(false)
	expect(tu.hasSuperscript("na")).toEqual(false)
	expect(tu.hasSuperscript("nya")).toEqual(false)
	expect(tu.hasSuperscript("sla")).toEqual(false)
	expect(tu.hasSuperscript("སླ")).toEqual(false)
	expect(tu.hasSuperscript("gros")).toEqual(false)
	expect(tu.hasSuperscript("bthrad")).toEqual(false)
	expect(tu.hasSuperscript("sha")).toEqual(false)

	expect(tu.hasSuperscript("skyed")).toEqual(true)
	expect(tu.hasSuperscript("rdza")).toEqual(true)
	expect(tu.hasSuperscript("dsked")).toEqual(true)
})

test("hasSubscriptOrSuperscript", () => {
	expect(tu.hasSubscriptOrSuperscript("sha")).toEqual(false)
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

	  console.log("-------------")
	  console.log(tu.matchRegex("སླ"))
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

})


const t0 = performance.now();

for (let i=0; i<1000;i++) {
	expect(tu.hasSubscript("rdza")).toEqual(false)
	expect(tu.hasSubscript("la")).toEqual(false)
	expect(tu.hasSubscript("tha")).toEqual(false)
	expect(tu.hasSubscript("cha")).toEqual(false)
	expect(tu.hasSubscript("na")).toEqual(false)
	expect(tu.hasSubscript("nya")).toEqual(false)
	expect(tu.hasSubscript("sked")).toEqual(false)
	expect(tu.hasSubscript("sha")).toEqual(false)
	expect(tu.hasSubscript("སླ་")).toEqual(true)
	expect(tu.hasSubscript("gros")).toEqual(true)
	expect(tu.hasSubscript("thrad")).toEqual(true)
	expect(tu.hasSubscript("skyed")).toEqual(true)
}

const t1 = performance.now();
console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);

const t2 = performance.now();

for (let i=0; i<1000;i++) {
	expect(tu.hasSubscript2("rdza")).toEqual(false)
	expect(tu.hasSubscript2("la")).toEqual(false)
	expect(tu.hasSubscript2("tha")).toEqual(false)
	expect(tu.hasSubscript2("cha")).toEqual(false)
	expect(tu.hasSubscript2("na")).toEqual(false)
	expect(tu.hasSubscript2("nya")).toEqual(false)
	expect(tu.hasSubscript2("sked")).toEqual(false)
	expect(tu.hasSubscript2("sha")).toEqual(false)
	expect(tu.hasSubscript2("སླ")).toEqual(true)
	expect(tu.hasSubscript2("gros")).toEqual(true)
	expect(tu.hasSubscript2("thrad")).toEqual(true)
	expect(tu.hasSubscript2("skyed")).toEqual(true)
}

const t3 = performance.now();
console.log(`Call to doSomething took ${t3 - t2} milliseconds.`);