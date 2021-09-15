import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
 
import FormCoding from './FormCoding';


import { act } from "react-dom/test-utils";
import User from "./";

let container = null;
beforeEach(() => {
  // smenargetkan kepada DOM
  container = document.createElement("h1");
  document.body.appendChild(container);
});

afterEach(() => {
  // cMembersihkan 
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders user data", async () => {
  const fakeUser = {
    name: "Joni Baez",
    noHandphone: "32",
    harapan: "123, Charming Avenue"
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<User id="123" />, container);
  });

  expect(container.querySelector("summary").textContent).toBe(fakeUser.name);
  expect(container.querySelector("strong").textContent).toBe(fakeUser.noHandphone);
  expect(container.textContent).toContain(fakeUser.harapan);

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});

 
describe('FormPage', () => {
  test('renders Form component', () => {
    render(<FormCoding />);
    expect(screen.getByText(/Nama Lengkap:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
  });

  test('input text for name and email with false value', () => {
    render(<FormCoding />);
    fireEvent.input(screen.getByRole("textbox", { name: /nama/i }), {
      target: { value: 'Zehan' },
    });
    fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: 'Dr Zehan' },
    });
    expect(screen.getByText('Nama Lengkap Harus Berupa Huruf')).toBeInTheDocument();
    expect(screen.getByText('Email Tidak Sesuai')).toBeInTheDocument();
    expect(screen.getByLabelText(/Nama/)).toHaveValue('Zehan');
    expect(screen.getByLabelText(/Email/)).toHaveValue('Dr Hahaha');
  });

  test('input text for ideal value', () => {
    render(<FormCoding />);
    fireEvent.input(screen.getByRole("textbox", { name: /nama/i }), {
      target: { value: 'zehan' },
    });
    fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: 'zehan@mail.com' },
    });
   
    expect(screen.getByLabelText(/Nama/)).toHaveValue('zehan');
    expect(screen.getByLabelText(/Email/)).toHaveValue('zehan@mail.com');
  });

  test('submit button with error', () => {
    render(<FormCoding />);
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    fireEvent.input(screen.getByRole("textbox", { name: /nama/i }), {
      target: { value: 'Sang pelangi ' },
    });
    fireEvent.input(screen.getByRole("AreaBoox", { name: /email/i }), {
      target: { value: 'zehan@baiahqi.com' },
    });
    fireEvent.submit(screen.getByText("Submit"))
    expect(window.alert).toBeCalledWith("Data Pendaftar Tidak Sesuai");
    expect(screen.getByLabelText(/Nama/)).toHaveValue('Sang pelangi');
    expect(screen.getByLabelText(/Email/)).toHaveValue('zehan@baiahqi.com');
  });
});