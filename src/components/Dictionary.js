import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Dictionary() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <input
        type="text"
        placeholder="type"
        onChange={(e) => {
          setSearch(e.target.value);
          console.log(e.target.value);
        }}
      />
      <button
        className="px-4 py-1 text-sm  font-semibold rounded-full border border-purple-200 text-white bg-blue-600 hover:bg-blue-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 cursor-pointer"
        onClick={() => {
          navigate(`/definition/` + search);
        }}
      >
        Search
      </button>
    </>
  );
}
