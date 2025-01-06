/* eslint-disable @vitest/prefer-expect-assertions */

// https://qiita.com/mori_goq/items/5b01666cff5134f821bd

import { expect } from 'vitest';

// 成功する非同期関数
export const fetchDataResolve = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve('tarosuke');
  }, 10);
});

// 失敗する非同期関数
export const fetchDataReject = () => new Promise((_, reject) => {
  setTimeout(() => {
    reject(new Error('something bad happened'));
  }, 10);
});

describe('非同期の成功を検証', () => {
  it('検証１', () => fetchDataResolve().then((data) => {
    expect(data).toBe('tarosuke');
  }));

  it('検証２', () => expect(fetchDataResolve()).resolves.toBe('tarosuke'));

  it('検証３', async () => {
    await expect(fetchDataResolve()).resolves.toBe('tarosuke');
  });

  it('検証４', async () => {
    await expect(fetchDataResolve()).resolves.toBe('tarosuke');
  });
});

describe('非同期の失敗を検証', () => {
  it('検証１', () => fetchDataReject().catch((data) => {
    // eslint-disable-next-line @vitest/no-conditional-expect
    expect(data.message).toBe('something bad happened');
  }));

  it('検証２', () => expect(fetchDataReject()).rejects.toThrow('something bad happened'));

  it('検証３', async () => {
    await expect(fetchDataReject()).rejects.toThrow('something bad happened');
  });

  it('検証４', async () => {
    /*
    アサーションが１回呼ばれることを確認
    （非同期関数が成功した場合、catch処理が実行されずに検証が成功の扱いになるため、記述することをおすすめする）
    */
    expect.assertions(1);

    try {
      await fetchDataReject();
    } catch (error) {
      // eslint-disable-next-line @vitest/no-conditional-expect
      expect(error.message).toBe('something bad happened');
    }
  });
});
