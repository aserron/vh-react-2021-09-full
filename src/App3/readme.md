# Task

In this challenge, your task is to fix a bug in a component which contains a simple search box offering users the ability to filter an inventory of books on a variety of fields.

## Props

The `BookSearch` component is provided `props` containing an array of objects describing the books in a collection. The format for `props.books` follows this example:

```javascript
<BookSearch books={[
  {
    "author": "Chinua Achebe",
    "country": "Nigeria",
    "language": "English",
    "pages": 209,
    "title": "Things Fall Apart",
    "year": 1958
  },
  {
    "author": "Dante Alighieri",
    "country": "Italy",
    "language": "Italian",
    "pages": 928,
    "title": "The Divine Comedy",
    "year": 1315
  },
  /* ... more books ... */
]} />
```

## Searching

Initially, and whenever all input fields are empty, all books should be shown. Any keystrokes performed on one of the input fields should filter the displayed books using the relevant input field's class. The filtering algorithm should trim leading and trailing whitespace from the input value and perform case-insensitive substring matches.

For example, if the above array of two books were provided as `props.books` and the user typed `achebe` into the `author` input box, the shown results would filter out _The Divine Comedy_ and only render _Things Fall Apart_.

Multiple input fields can be used to add further constraints to the search filtering; if the user also added `2006` to the `year` field in the above example, no books would be shown because _Things Fall Apart_ was published in 1958, not in 2006. All changes should be dynamic per key-stroke (the test suite will send the "change" event to the input elements).

For the purposes of this challenge, you can assume that `props.books` contains no more than 100 items and that all fields will be present on each book (the `props.books` array will be well-formatted).

A full list of books which you may use for testing is provided in `./sample_data/books.json`. The test suite will use portions of this array only.

### Rendering

The `BookSearch` component renders specific elements by class name which are used by the testing suite to validate the component behavior.

You shouldn't need to adjust the markup, but for reference, the elements are as follows:

- A series of `<div class="book">` elements, each of which acts as a container for a single book's data. The total number of `.book` elements that will be rendered should be equal to the number of search results. For each book that is displayed containing the class `.book`, all fields available in the `props.books` object (author, title, pages, etc) should be displayed.
- A series of `<input />` elements. These elements are used to filter the search results and present them in the same order as `props.books`. The inputs must preserve the following class names:
  - `<input class="author" />`
  - `<input class="title" />`
  - `<input class="country" />`
  - `<input class="language" />`
  - `<input class="year" />`

## Expected behavior

This demo illustrates the expected behavior of the component.

The props the same as the example props which the Web Preview is populated with by default. You can view and change these in your workspace in `./src/App.jsx`.

![bs.gif](//res.cloudinary.com/strive/image/upload/w_1000,h_1000,c_limit/268d6dbf63809961e11754e80554308a-bs.gif)

## Current behavior

Currently, changing values in the input boxes doesn't filter books as expected. Your task is to fix the code to correctly filter books and make the test suite pass.

## Rubric

You'll be evaluated on how efficiently you're able to debug the code and pass the provided tests. All relevant tests have been provided, so you needn't worry about hidden edge cases.

## Resources

Feel free to consult documentation or external internet resources for [JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript) and [React](https://reactjs.org/docs/getting-started.html).