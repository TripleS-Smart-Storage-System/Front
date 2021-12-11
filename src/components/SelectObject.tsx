import { useLayoutEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { INameable } from "../types";


function SelectObject<T extends INameable>(props: {objects: T[], onSelectedChosen: (id: string) => void}) {
  const objects = props.objects;
  const [index, setIndex] = useState(0);

  const getIdByIndex = (idx: number) => objects[idx]?.id ?? ''

  const getIndexById = (id: string) => objects.map(o => o.id).indexOf(id)

  useLayoutEffect(() => {
    setIndex(0)
  }, [])

  const handleClick = () => {
    const objectId = getIdByIndex(index)
    if (objectId) {
      props.onSelectedChosen(objectId)
      objects.splice(index, 1);
      setIndex(0)
    }
  }

  const options = objects.map((obj, i) => (
    <option selected={obj.id == getIdByIndex(index)} value={i} id={obj.id}>
      {obj.name}
    </option>
  ))

  const isDisabled = objects.length == 0;

  return (
    <div className="mb-3">
      <Form.Select
        name="objects"
        value={index}
        onChange={(event) => {
          {setIndex(+event.target.value);}
        }}
        disabled={isDisabled}
      >
        {options}
      </Form.Select>
    </div>
  );
}

export default SelectObject;
