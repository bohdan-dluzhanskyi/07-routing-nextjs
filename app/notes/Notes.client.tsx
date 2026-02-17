"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./NotesPage.module.css";

export default function NotesClient() {
  const router = useRouter();
  const params = useSearchParams();

  const page = Number(params.get("page")) || 1;
  const search = params.get("search") || "";

  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
    placeholderData: (prev) => prev,
  });

  const debouncedSearch = useDebouncedCallback((value: string) => {
    router.push(`/notes?page=1&search=${value}`);
  }, 500);

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={(value) => debouncedSearch(value)}
        />

        <button onClick={() => setIsOpen(true)}>Create note +</button>
      </div>

      <NoteList notes={data.notes} />

      {data.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          currentPage={page}
          onPageChange={(p) => router.push(`/notes?page=${p}&search=${search}`)}
        />
      )}

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
