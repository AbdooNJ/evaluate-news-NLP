import { checkForName } from "../src/client/js/nameChecker";

describe("test for checkForName function", () => {
  global.alert = jest.fn();

  //to ensure that alert calls from one test dont affect another.
  afterEach(() => {
    alert.mockClear();
  });
  it('alert "Welcome, Captain!" if the name  in the list', () => {
    checkForName("Picard");
    expect(alert).toHaveBeenCalledWith("Welcome, Captain!");
  });

  it(' not alert "Welcome, Captain!" becuase the name is not in the list', () => {
    checkForName("Mohammed");
    expect(alert).not.toHaveBeenCalledWith("Welcome, Captain!");
  });
});
