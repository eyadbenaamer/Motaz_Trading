const Input = (props) => {
  const {
    name,
    label,
    value,
    defaultValue,
    autoFocus,
    setData,
    disabled,
    className,
    dir,
  } = props;

  return (
    <>
      <label htmlFor={name}>{label}</label>
      {(value || value === 0 || value === "") && (
        <input
          dir={dir}
          type="text"
          name={name}
          value={value}
          disabled={disabled}
          className={`max-w-[400px] rounded-md p-2 text-left ${
            disabled ? "bg-transparent text-slate-700" : "bg-200 shadow-md"
          } ${className ?? ""}`}
          autoFocus={autoFocus}
          onChange={(e) => {
            const value = e.target.value.trim();
            setData((prev) => ({ ...prev, [name]: value }));
          }}
        />
      )}
      {(value === null || value === undefined) && (
        <input
          dir={dir}
          type="text"
          name={name}
          defaultValue={defaultValue}
          disabled={disabled}
          className={`max-w-[400px] rounded-md p-2 text-left ${
            disabled ? "bg-transparent text-slate-700" : "bg-200 shadow-md"
          } ${className ?? ""}`}
          autoFocus={autoFocus}
          onChange={(e) => {
            const value = e.target.value.trim();
            setData((prev) => ({ ...prev, [name]: value }));
          }}
        />
      )}
    </>
  );
};

export default Input;
