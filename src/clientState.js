import { NOTE_FRAGMENT } from "./fragments";
import { GET_NOTES } from "./queries";
import { saveNotes, restoreNotes } from "./offline";

export const defaults = {
  notes: restoreNotes()
};
export const typeDefs = [
  `
    schema{
        query: Query
        mutation: Mutation
    }
    type Query{
        notes: [Note]!
        note(id: Int!): Note
    }
    type Mutation{
        createNote(title: String!, content: String!, createAt: String!, del: Boolean!):Note
        editNote(id: Int!, title: String!, content: String!):Note
        delNote(id: Int!, del: Boolean!):Note
    }
    type Note{
        id: Int!
        title: String!
        content: String!
        createAt: String!
        del: Boolean!
    }
`
];

export const resolvers = {
  Query: {
    note: (_, variables, { cache }) => {
      const id = cache.config.dataIdFromObject({
        __typename: "Note",
        id: variables.id
      });
      const note = cache.readFragment({ fragment: NOTE_FRAGMENT, id });
      return note;
    }
  },
  Mutation: {
    createNote: (_, variables, { cache }) => {
      const { notes } = cache.readQuery({ query: GET_NOTES });
      const { title, content, createAt, del } = variables;
      const newNote = {
        __typename: "Note",
        title,
        content,
        createAt,
        del,
        id: notes.length + 1
      };
      cache.writeData({
        data: {
          notes: [newNote, ...notes]
        }
      });
      saveNotes(cache);
      return newNote;
    },
    editNote: (_, { id, title, content }, { cache }) => {
      const noteId = cache.config.dataIdFromObject({
        __typename: "Note",
        id
      });
      const note = cache.readFragment({ fragment: NOTE_FRAGMENT, id: noteId });
      const updateNote = {
        ...note,
        title,
        content
      };
      cache.writeFragment({
        id: noteId,
        fragment: NOTE_FRAGMENT,
        data: updateNote
      });
      saveNotes(cache);
      return updateNote;
    },
    delNote: (_, variables, { cache }) => {
      console.log("delNote!!!!!!!!");
      const noteDelId = cache.config.dataIdFromObject({
        __typename: "Note",
        id: variables.id
      });
      const note = cache.readFragment({ fragment: NOTE_FRAGMENT, id: noteDelId });
      console.log(note);
      const delNote = {
        ...note,
        del: !note.del
      };
      cache.writeFragment({
        id: noteDelId,
        fragment: NOTE_FRAGMENT,
        data: delNote
      });
      saveNotes(cache);
      return delNote;
    }
  }
};
