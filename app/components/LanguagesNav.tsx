import React from "react";
import { Languages } from "../types/types";

export default function LanguagesNav({
  selected,
  onUpdateLanguage,
}: {
  selected: Languages;
  onUpdateLanguage: (lang: Languages) => void;
}) {
  const languages: Languages[] = [
    "All",
    "Javascript",
    "Ruby",
    "Java",
    "CSS",
    "Python",
  ];
  return (
    <ul className="flex-center">
      {languages.map((language) => (
        <li key={language}>
          <button
            className="btn-clear nav-link"
            style={language === selected ? { color: `red` } : undefined}
            onClick={() => onUpdateLanguage(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}
