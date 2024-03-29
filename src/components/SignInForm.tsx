import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { signIn } from "../Utils/Api";
import { setUserSession } from "../Utils/Common";
import { useTranslation } from "react-i18next";

class Input {
  email: string = "";
  password: string = "";
}

type SignInData = Input;

function SignInForm() {
  const [input, setValues] = useState(new Input());
  const [error, setError] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const data: SignInData = input as Input;
    const result = await signIn(data);
    setError(result?.error ?? "");

    const token = result.response?.data.token ?? "";
    const user = result.response?.data.id ?? "";
    setUserSession(token, user)

    if (user && token) {
      window.location.href = "/";
    }
  };
  const { t } = useTranslation();
  return (
    <Form onSubmit={handleSubmit} action="/">
      <div className="text-danger">
        <h6>{error}</h6>
      </div>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{t("Email address")}</Form.Label>
        <Form.Control
          id="email"
          name="email"
          value={input.email}
          onChange={(event) => {
            setValues({ ...input, email: event.target.value });
          }}
          required
          type="email"
          placeholder={t("Enter email")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>{t("Password")}</Form.Label>
        <Form.Control
          id="password"
          name="password"
          value={input.password}
          onChange={(event) => {
            setValues({ ...input, password: event.target.value });
          }}
          required
          type="password"
          placeholder={t("Enter password")}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {t("Submit")}
      </Button>
    </Form>
  );
}

export default SignInForm;
