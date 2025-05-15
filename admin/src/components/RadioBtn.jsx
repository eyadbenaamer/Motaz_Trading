const RadioBtn = (props) => {
  const { onClick, label, checked, disabled } = props;

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      onClick();
      event.preventDefault(); // Prevent default behavior for the Space key
    }
  };
  return (
    <div className="flex gap-2 items-center pt-2">
      <span
        tabIndex={0}
        role="button"
        className={`custom-radio ${checked ? "checked" : ""} ${
          disabled ? "cursor-default" : ""
        }`}
        onKeyDown={(e) => !disabled && handleKeyDown(e)}
        onClick={(e) => !disabled && onClick(e)}
      />
      <label className="radio-label">{label}</label>
    </div>
  );
};

export default RadioBtn;
