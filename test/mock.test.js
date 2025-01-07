describe('vi.fn', () => {
  it.concurrent('spy function no arguments and no returns', () => {
    // Define mock function
    const getApples = vi.fn();
    // call mock function
    getApples();

    // check if mock function is called
    expect(getApples).toHaveBeenCalledWith();
  });

  it.concurrent('spy function returns a product', () => {
    const getProduct = vi.fn((product) => ({ product }));

    getProduct('apples');

    expect(getProduct).toHaveReturnedWith({ product: 'apples' });
  });
});

describe('mock.calls and mock.results', () => {
  it.concurrent('sample test', () => {
    const fn = vi.fn();

    fn('hello', 1);

    expect(vi.isMockFunction(fn)).toBeTruthy();
    expect(fn.mock.calls[0]).toStrictEqual(['hello', 1]);

    fn.mockImplementation((arg) => arg);

    fn('world', 2);

    expect(fn.mock.results[1].value).toBe('world');
  });
});

describe('spyOn', () => {
  const cart1 = {
    getApples: () => 4,
  };

  it.concurrent('spy method', () => {
    // Define mock method
    const spy = vi.spyOn(cart1, 'getApples');
    // call mock method
    cart1.getApples();

    // check if mock is called
    expect(spy).toHaveBeenCalledWith();
    expect(spy).toHaveReturnedWith(4);
  });

  const cart2 = {
    getApples: () => 4,
  };

  it.concurrent('overwrite spy method', () => {
    const spy = vi.spyOn(cart2, 'getApples').mockImplementation(() => 8);
    cart2.getApples();

    expect(spy).toHaveReturnedWith(8);
  });
});
