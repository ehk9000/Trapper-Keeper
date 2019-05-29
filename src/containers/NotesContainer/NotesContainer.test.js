import React from "react";
import {
  NotesContainer,
  mapStateToProps,
  mapDispatchToProps
} from "./NotesContainer";
import { fetchAllNotes } from "../../thunks/fetchAllNotes";
import { fetchDeleteNote } from "../../thunks/fetchDeleteNote";

import { shallow } from "enzyme";
import NoteForm from "../NoteForm/NoteForm";

jest.mock("../../thunks/fetchAllNotes");
jest.mock("../../thunks/fetchDeleteNote");

jest.mock("../NoteForm/NoteForm");

describe("NotesContainer", () => {
  let wrapper;
  let mockLocation;
  let mockNotes;

  beforeEach(() => {
    mockLocation = { pathname: "/new-note" };
    mockNotes = [
        { title: "add global variable to test", list: [{ item: "groceries" }, { item: "toothpaste" }] }
      ];
    wrapper = shallow(
      <NotesContainer
        fetchAllNotes={fetchAllNotes}
        notes={mockNotes}
        location={mockLocation}
      />
    );
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("componentDidMount", () => {
    fetchAllNotes.mockImplementation(() => {});

    it("should call fetchAllNotes", () => {
      expect(fetchAllNotes).toHaveBeenCalled();
    });
  });

  describe("Render", () => {
    let wrapper;
    let mockLocation;
    beforeEach(() => {
      mockLocation = { pathname: "/new-note" };
      wrapper = shallow(
        <NotesContainer
          fetchAllNotes={fetchAllNotes}
          notes={mockNotes}
          location={mockLocation}
        />
      );
    });

    it("should match snapshot if notes are present", () => {
      expect(wrapper).toMatchInlineSnapshot(`ShallowWrapper {}`);
    });

    it("should match snapshot if no notes are present", () => {
      mockNotes = [];

      wrapper = shallow(
        <NotesContainer fetchAllNotes={fetchAllNotes} location={mockLocation} notes={mockNotes}/>
      );
      expect(wrapper).toMatchInlineSnapshot(`ShallowWrapper {}`);
    });
  });

  describe("mapStateToProps", () => {
    it("should map state to props", () => {
      const mockState = {notes:mockNotes}
      const expected = {notes:mockNotes};

      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });

  describe("mapDispatchToProps", () => {
    it("should map fetchAllNotes dispatch to props", () => {
      const mockDispatch = jest.fn();

      const props = mapDispatchToProps(mockDispatch);

      const thunk = fetchAllNotes();
      
      props.fetchAllNotes();
      
      expect(mockDispatch).toHaveBeenCalledWith(thunk);
    });
  });

  describe("mapDispatchToProps", () => {
    it("should map fetchDeleteNote dispatch to props", () => {
      const mockDispatch = jest.fn();

      const props = mapDispatchToProps(mockDispatch);

      const thunk = fetchDeleteNote(mockNotes[0].id);
      
      props.fetchDeleteNote();
      
      expect(mockDispatch).toHaveBeenCalledWith(thunk);
    });
  });
});