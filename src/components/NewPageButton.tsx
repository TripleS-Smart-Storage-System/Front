import { Link, To } from 'react-router-dom';

function NewPageButton(props: { link: To; text: string; }) {
  return <Link to={props.link} className="btn btn-primary">{props.text}</Link>;
}

export default NewPageButton;