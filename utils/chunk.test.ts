import { chunk } from "./chunk";

describe.only("find chunk error", () => {
  const arr = [0, 1, 2, 3, 4, 5];

  //기본역할 (딱나눠 떨어짐)
  it("should return chunked arrays", () => {
    const runningResult = chunk(arr, 2);
    expect(runningResult).toEqual([
      [0, 1],
      [2, 3],
      [4, 5],
    ]);
  });

  //기본역할2(딱나눠 떨어지지 않음)
  it("should return the last chunk as remaining elements", () => {
    const runningResult = chunk(arr, 4);
    expect(runningResult).toEqual([
      [0, 1, 2, 3],
      [4, 5],
    ]);
  });

  //나누기 형태가 소수일때
  test("should change the size to integer", () => {
    const runningResult = chunk(arr, arr.length / 4);
    expect(runningResult).toEqual([[0], [1], [2], [3], [4], [5]]);
  });
});
