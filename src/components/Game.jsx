import React, { useMemo, useState } from "react";

export default function CountryCapitalGame({ data }) {
  // Fisher-Yates shuffle
  const shuffle = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Create initial buttons list
  const individualButtons = useMemo(() => {
    const countries = Object.keys(data);
    const capitals = Object.values(data);
    return shuffle([...countries, ...capitals]);
  }, [data]);

  const [items, setItems] = useState(individualButtons);
  const [selected, setSelected] = useState([]);
  const [wrongPair, setWrongPair] = useState([]);

  const isMatch = (a, b) => {
    return data[a] === b || data[b] === a;
  };

  const handleClick = (item) => {
    // If we just had a wrong pair, reset and select the new item
    if (wrongPair.length > 0) {
      setWrongPair([]);
      setSelected([item]);
      return;
    }

    // First item selection
    if (selected.length === 0) {
      setSelected([item]);
    }
    // Second item selection
    else {
      const first = selected[0];

      // Prevent clicking the same button twice
      if (first === item) return;

      if (isMatch(first, item)) {
        // Correct pair: Remove them from the list
        setItems((prev) => prev.filter((i) => i !== first && i !== item));
        setSelected([]);
      } else {
        // Wrong pair: Highlight them red
        setWrongPair([first, item]);
        setSelected([]);
      }
    }
  };

  if (items.length === 0) {
    return <h1>Congratulations</h1>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {items.map((item) => {
        let backgroundColor = "";
        if (selected.includes(item)) backgroundColor = "#0000ff";
        if (wrongPair.includes(item)) backgroundColor = "#ff0000";

        return (
          <button
            key={item}
            onClick={() => handleClick(item)}
            style={{
              backgroundColor: backgroundColor,
              margin: "5px",
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
