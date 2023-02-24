/* eslint-disable testing-library/no-await-sync-query */
/* eslint-disable testing-library/await-async-query */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import App from "./App";

import { GET_APPLICATIONS } from "../src/queries/clientQueries";

const mocks = [
  {
    request: {
      query: GET_APPLICATIONS,
    },
    result: {
      data: {
        getApps: {
          id: "app0",
          companyName: "Test Company",
          dateApplied: "2-14-2023",
          role: {
            id: "app0",
            name: "Test Role",
            url: "http://www.example.com",
          },
          status: "active",
          submittedResume: false,
          resumeViewed: false,
          contacted1stCall: false,
          techInterview: false,
          interview3: false,
          interview4: false,
          jobOffered: false,
        },
      },
    },
  },
];

const setup = () =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );

describe("run page tests", () => {
  test("renders header", () => {
    setup();
    const headerElement = screen.getByText("The Job Search App!");
    expect(headerElement).toBeInTheDocument();
  });
});
