import shuffle from "./not";

//[테스트 항목 힌트]
//셔플이 잘 되는지 동작을 확인해야 합니다.
//셔플이 반환한 배열이 원본 배열이 아니라 새로운 배열이라는 것을 확인해야 합니다.

describe("shuffle test", () => {
  const array = [1, 2, 3, 4];

  //shuffle이 새로운 배열을 반환하는지
  it("should shuffle array", () => {
    expect(shuffle(array)).not.toBe(array);
  });

  //두번 shuffle했을때에 대한 동작확인
  it("shuffle twice", () => {
    expect(shuffle(shuffle(array))).not.toBe([1, 2, 3, 4]);
  });

  //안에 똑같은 요소를 가지고 있는가
  it("should shuffle return a new array", () => {
    expect(shuffle(array).sort()).toEqual(array);
  });
});
