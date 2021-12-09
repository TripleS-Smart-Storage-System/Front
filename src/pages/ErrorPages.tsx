import '../App.css';


export function BadRequest() {
  return (
    <ErrorPage message="Bad Request" status={400} />
  );
}

export function Unauthorized() {
  return (
    <ErrorPage message="Unauthorized" status={401} />
  );
}

export function AccessDenied() {
  return (
    <ErrorPage message="Access Denied" status={403} />
  );
}

export function PageNotFound() {
  return (
    <ErrorPage message="Page not found" status={404} />
  );
}

export function ErrorPage (props: {message: string, status: number}) {
  return (
    <div className="page-not-found">
      <div className="text-center py-5">
        <h1 className="display-1">{props.status}</h1>
        <h2>{props.message}</h2>
      </div>
    </div>
  );
}