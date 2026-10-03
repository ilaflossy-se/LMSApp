interface Props { loading: boolean; error: string | null; onRetry: () => void }

function Status({ loading, error, onRetry }: Props) {
  if (loading) return <p className="status">Loading…</p>;
  if (error) {
    return (
      <div className="status error">
        <p>Could not load data: {error}</p>
        <button className="btn" onClick={onRetry}>Try again</button>
      </div>
    );
  }
  return null;
}

export default Status;