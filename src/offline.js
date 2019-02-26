import { GET_NOTES } from "./queries";

const ITEMS = "notes";

export const saveNotes = cache => {
  const { notes } = cache.readQuery({ query: GET_NOTES });
  const jsonNotes = JSON.stringify(notes);
  try {
    localStorage.setItem(ITEMS, jsonNotes);
  } catch (error) {
    console.log(error);
  }
};
export const restoreNotes = () => {
  const notes = localStorage.getItem(ITEMS);
  if (notes) {
    try {
      const parseNotes = JSON.parse(notes);
      return parseNotes;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  return [];
};
