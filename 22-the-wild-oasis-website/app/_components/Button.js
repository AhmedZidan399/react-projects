function Button({ filter, activeFilter, handleClick, children }) {
  return (
    <button
      onClick={() => handleClick(filter)}
      style={{
        backgroundColor:
          activeFilter === filter || (!activeFilter && filter === "all")
            ? "var(--color-primary-700)"
            : "",
        cursor: "pointer",
      }}
      className={`px-5 py-2 hover:bg-primary-700 ${
        activeFilter === filter ? "bg-primary-700 text-primary-50" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
