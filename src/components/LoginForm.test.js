import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
//remember to import your LoginForm component
import LoginForm from './LoginForm';

describe("Testing a login component...", () => {

    test("Inputs are empty on first render...", () => { 
        //1) Render component
        render(<LoginForm />);
        //2) Query Inputs
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        //3) Assert Empty
        expect(emailInput.value).toBe("");
        expect(passwordInput.value).toBe("");
    });

    test("Ensure no error messages are displaying on render...", () => {
        render(<LoginForm />);

        const emailErrorText = screen.queryByText(/Invalid email/i);
        const passwordErrorText = screen.queryByText(/Password less than 6 characters/i);

        expect(emailErrorText).not.toBeInTheDocument();
        expect(passwordErrorText).not.toBeInTheDocument();
    })

    test("Inputs are updated correctly...", () => {
        render(<LoginForm />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);

        userEvent.type(emailInput, "johndoe@mail.com");
        userEvent.type(passwordInput, "john@123");

        expect(emailInput.value).toBe("johndoe@mail.com");
        expect(passwordInput.value).toBe("john@123");
    });

    test("Ensure valid email validation works...", () => {
        render(<LoginForm />);
        //type email input
        const emailInput = screen.getByLabelText(/email/i);
        userEvent.type(emailInput, "johndoe");
        //click submit button
        const button = screen.getByRole("button", {type: 'submit'})
        userEvent.click(button)
        //see if error shows
        const emailErrorText = screen.getByText(/Invalid email/i);
        expect(emailErrorText).toBeInTheDocument();
    })

    test("Ensure password validation of more than 6 characters works...", () => {
        render(<LoginForm />);
        //type password input
        const passwordInput = screen.getByLabelText(/password/i);
        userEvent.type(passwordInput, "john");
        //click submit button
        const button = screen.getByRole("button", {type: 'submit'})
        userEvent.click(button)
        //see if error shows
        const passwordErrorText = screen.getByText(/Password less than 6 characters/i);
        expect(passwordErrorText).toBeInTheDocument();
    })

    test("Ensure both password and email validation does not show if valid inputs are given...", () => {
        render(<LoginForm />);
        //type password & email input
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        userEvent.type(emailInput, "johndoe@mail.com");
        userEvent.type(passwordInput, "john@123");
        //click submit button
        const button = screen.getByRole("button", {type: 'submit'})
        userEvent.click(button)
        //see if error shows
        const emailErrorText = screen.queryByText(/Invalid email/i);
        const passwordErrorText = screen.queryByText(/Password less than 6 characters/i);
        expect(emailErrorText).not.toBeInTheDocument();
        expect(passwordErrorText).not.toBeInTheDocument();
    })

})