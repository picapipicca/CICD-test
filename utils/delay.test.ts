//비동기 코드 다루기 callback 부분 jest docs 문서 읽으면서 사용법 파악
//콜백으로 넘긴 함수가 실제로 딜레이 되는지 확인하는 테스트 작성
import delay from "./delay";

describe("should function delay", () => {
  test.skip("should first", (done) => {
    let pass = false;
    delay(() => {
      pass = true;
    }, 32);

    setTimeout(() => {
      expect(pass).toBe(false);
    }, 1);
    setTimeout(() => {
      expect(pass).toBe(true);
      done();
    }, 64);
  });

  // ???? 취소 가능한지(타이머 아이디)
  test("cancel timer", (done) => {
    let pass = true;

    const id = delay(() => {
      pass = false;
    }, 32);

    clearTimeout(id);

    setTimeout(() => {
      expect(pass).toBe(true);
      done();
    }, 64);
  });

  //????? wait 인자를 넣지않았을때 동작확인
  test("not include wait/ default wait 0", (done) => {
    let pass = false;

    delay(() => {
      pass = true;
    });

    setTimeout(() => {
      expect(pass).toBe(true);
      done();
    }, 1);
  });

  // ???? args 인자를 넣었을때 동작확인
  //macrotask queue 에 delay에서 생성한 settimeout이 들어가있음 그다음 callback함수가 그 다음 실행됨
  test("arguments included", (done) => {
    const mock = jest.fn();

    delay(mock, 32, "a", 1);

    setTimeout(() => {
      expect(mock).toHaveBeenCalledWith("a", 1);
      done();
    }, 64);
  });
});
