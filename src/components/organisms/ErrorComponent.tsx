import { StatusCodes, getReasonPhrase } from "http-status-codes";

const ErrorComponent: React.FC<{
  code?: StatusCodes;
  error?: Error & { digest?: string };
  reset?: () => void;
}> & {
  StatusCodes: typeof StatusCodes;
} = ({ code, error, reset }) => {
  return (
    <div className="p-container pi-containerInline" lang="en">
      <h1>⚠️ {code ? [code, " - ", getReasonPhrase(code)] : "Error"}</h1>
      {reset && (
        <p>
          <button onClick={reset}>Try again</button>
        </p>
      )}
      {error?.digest && (
        <p>
          <small>{error.digest}</small>
        </p>
      )}
    </div>
  );
};

ErrorComponent.StatusCodes = StatusCodes;

export { ErrorComponent };
