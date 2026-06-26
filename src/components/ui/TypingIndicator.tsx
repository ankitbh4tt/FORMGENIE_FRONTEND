const TypingIndicator = () => {
  return (
    <div className="mb-2 flex w-fit items-center gap-1.5 self-start rounded-2xl rounded-bl-md border border-border bg-surface-sunken px-4 py-3.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-1.5 animate-bounce rounded-full bg-ink-faint"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: "1s" }}
        />
      ))}
    </div>
  );
};

export default TypingIndicator;
