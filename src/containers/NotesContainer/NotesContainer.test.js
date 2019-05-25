import React from "react";
import {
  NotesContainer,
  mapStateToProps,
  mapDispatchToProps
} from "./NotesContainer";
import { fetchAllNotes } from "../../thunks/fetchAllNotes";
import { shallow } from "enzyme";
import NoteForm from "../NoteForm/NoteForm";

jest.mock("../../thunks/fetchAllNotes");
jest.mock("../NoteForm/NoteForm");

const mockNotes = [
    { title: "add global variable to test", list: [{ item: "groceries" }, { item: "toothpaste" }] }
  ];

describe("NotesContainer", () => {
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
      wrapper = shallow(
        <NotesContainer fetchAllNotes={fetchAllNotes} location={mockLocation} />
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
    it("should map dispatch to props", () => {});

    const mockDispatch = jest.fn();

    fetchAllNotes.mockImplementation(() => {});

    const dispatchReturned = mapDispatchToProps(mockDispatch);
    const expected = {fetchAllNotes: (expect.any(Function))
}
  
    expect(dispatchReturned).toEqual(expected);

  });
});