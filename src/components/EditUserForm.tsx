import { useLayoutEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { User } from '../types';
import { getUser, updateUser } from '../Utils/Api';
import { useTranslation } from "react-i18next";

class Input {
  name: string = "";
  surName: string = "";
  nickName: string = "";
}

class EditUserData extends Input {
  id: string = "";
}

function EditProducForm(props: {userId: string}) {
  const userId = props.userId
  const navigate = useNavigate();
  const [input, setValues] = useState(new Input())
  const [error, setError] = useState('')

  useLayoutEffect(() => {
    async function fetchApi() {
      const user: User = await getUser(userId);
      if (user.id != userId) {
        setError("Something went wrong")
      } else {
        setValues({
          name: user.name,
          surName: user.surName,
          nickName: user.nickName
        })
      }
    }
    fetchApi()
  }, [])
     
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const data: EditUserData = input as EditUserData;
    data.id = (props.userId).toString();

    const result = await updateUser(data);
    const error = result?.error ?? '';
    if (error) {
      setError(error)
    } else {
      navigate('/users')
    }
  }
  const { t } = useTranslation();
  return (
    <Form onSubmit={handleSubmit} action="/users">
      <div className="text-danger">
        <h6>{error}</h6>
      </div>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>{t("Name")}</Form.Label>
        <Form.Control
          id="name"
          name="name"
          value={input.name}
          onChange={e => {setValues({...input, name: e.target.value});}}
          required
          type="text"
          placeholder={t("Enter name")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicSurname">
        <Form.Label>{t("Surname")}</Form.Label>
        <Form.Control
          id="surName"
          name="surName"
          value={input.surName}
          onChange={e => {setValues({...input, surName: e.target.value});}}
          required
          type="text"
          placeholder={t("Enter surname")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicNickname">
        <Form.Label>{t("Email address")}</Form.Label>
        <Form.Control
          id="nickName"
          name="nickName"
          value={input.nickName}
          onChange={e => {setValues({...input, nickName: e.target.value});}}
          required
          type="text"
          placeholder={t("Enter email")} />
      </Form.Group>
      <Button variant="primary" type="submit">
        {t("Submit")}
      </Button>      
    </Form>
  );
}
  
export default EditProducForm;