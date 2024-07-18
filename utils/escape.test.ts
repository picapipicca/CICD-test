import { escape, unescape } from "./htmlEscape";

describe.skip("escape", () => {
  let escaped = "&amp;&lt;&gt;&quot;&#39;/";
  let unescaped = "&<>\"'/";

  escaped += escaped;
  unescaped += unescaped;

  // escape가 잘 작동되는지 확인
  it("should escape values", () => {
    const result = escape(unescaped);
    expect(result).toBe(escaped);
  });

  // 이스케이프 할 것이 없는 문자열에 대한 동작 확인
  it("should handle strings with nothing to escape", () => {
    const string = "fred george james";
    const result = escape(string);
    expect(result).toBe(string);
  });

  // 이스케이프 문자열을 언이스케이프하고 다시 이스케이프 했을때 처음의 상태와 동일한지 확인
  it("should escape the same characters unescaped by `_.unescape`", () => {
    expect(escape(unescape(escaped))).toEqual(escaped);
  });

  // 이스케이프 되면 안되는 문자에 대한 테스트 ["`", "/"]
  it.each(["`", "/"])("", (chr) => {
    const result = escape("`fred, barney, &/ pebbles`");
    expect(escape(chr)).toBe(chr);
  });

  ["`", "/"].forEach((chr) => {
    it(`${chr}`, () => {
      expect(escape(chr)).toBe(chr);
    });
  });
});

describe.only("unescape", () => {
  let escaped = "&amp;&lt;&gt;&quot;&#39;/";
  let unescaped = "&<>\"'/";

  escaped += escaped;
  unescaped += unescaped;

  // 2. escaped 문자를 unescape 했을때 동작
  test("unescape in order", () => {
    expect(unescape(escaped)).toBe(escaped);
  });

  //3.할게없을때 작동 안하는지
  test("noting to unescape", () => {
    expect(unescape("abc")).toBe("abc");
  });

  // 1. 순서 그대로 escape 되었는지
  it("", () => {
    expect(unescape("&amp;lt;")).toBe("&lt;");
  });

  // 4. unescaped 문자를 escape하고 다시 unescape 했을때 동작
  it("", () => {
    expect(unescape(escape(unescaped))).toBe(unescaped);
  });

  // 5. 숫자 엔티티("&#039;", "&#39;")에 0이 붙어있을때 동작
  // ["&#000039;", "&#39;"].forEach((chr) => {
  //   it(`${chr}`, () => {
  //     expect(unescape(chr)).toBe("'");
  //   });
  // });
});

describe.skip("unescape", () => {
  let escaped = "&amp;&lt;&gt;&quot;&#39;/";
  let unescaped = "&<>\"'/";

  escaped += escaped;
  unescaped += unescaped;

  test("unescape in order", () => {
    expect(unescape(escaped)).toBe(escaped);
  });

  // 1. 순서 그대로 escape 되었는지
  it("should unescape entities in order", () => {
    const result = unescape("&amp;&lt;&gt;");
    expect(result).toBe("&<>");
  });

  // 2. escaped 문자를 unescape 했을때 동작
  it("should unescape the proper entities", () => {
    const result = unescape(escaped);
    expect(result).toBe(unescaped);
  });

  // 3. unescape할 것이 없는 문자열에 대한 동작
  it("should handle strings with nothing to unescape", () => {
    const result = unescape("fred george <> ");
    expect(result).toEqual("fred george <> ");
  });

  // 4. unescaped 문자를 escape하고 다시 unescape 했을때 동작
  it("should unescape the same characters escaped by `_.escape`", () => {
    const firstStep = escape(unescaped);
    const result = unescape(firstStep);
    expect(result).toBe(unescaped);
  });

  // 5. 숫자 엔티티("&#039;", "&#39;")에 0이 붙어있을때 동작
  it("should handle leading zeros in html entities", () => {
    const result = unescape("&#039;&#39;");
    expect(result).toBe("''");
  });

  // 6. 언이스케이프 되면 안되는 것들 동작 테스트 ["&#96;", "&#x2F;"]
  test("should not to unscaped", () => {
    const result = unescape("&amp;&lt;&gt;&quot;&#39;/&#96;");
    expect(result).toBe("&<>\"'/&#96;");
  });
});
