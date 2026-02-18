import css from "./SidebarNotes.module.css";

import { FetchTagNote } from "@/types/note";

import Link from "next/link";

export default function Sidebar() {
  const tags: FetchTagNote[] = [
    "all",
    "Todo",
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
  ];

  return (
    <ul className={css.menuList}>
      {tags.map((el, index) => (
        <li key={index} className={css.menuItem}>
          <Link href={`/notes/filter/${el}`} className={css.menuLink}>
            {`${el === "all" ? "All notes" : el}`}
          </Link>
        </li>
      ))}
    </ul>
  );
}
