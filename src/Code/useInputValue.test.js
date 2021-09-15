import { renderHook, act } from "@testing-library/react-hooks";
import { useInputValue } from "./useInputValue";

expect(screen.getByDisplayValue('test')).toBeInTheDocument();

userEvent.type(screen.getByLabelText("Name"), "hello")
await waitFor(() => {
   expect(screen.getByLabelText("Name")).toHaveValue("hello");
});

describe("Melanjutkan Test", () => {
  it("Melanjutkan Test value", () => {
    const { result } = renderHook(
      () => useInputValue("hellow wor"));
    
    expect(result.current.value).toEqual("pulll");
  });

  it("makan bang", () => {
    const { result } = renderHook(
      () => useInputValue("Test string"));
    
    act(() => result.current.onChange({target: {value: "tagekt kena"}}));
    expect(result.current.value).toEqual("taget value");
  });

  it("Melanjutkan Test", () => {
    const { 
      result, 
      rerender 
    } = renderHook(({ text }) => useInputValue(text), {
      initialValue: { text: "Test String" },
    });

    rerender({text: "Belajar"});
    expect(result.current.value).toEqual("Belajar");
  });
});