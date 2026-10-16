import type { MockedResponse } from "@apollo/client/testing";
import { MockedProvider } from "@apollo/client/testing/react";
import { render, screen } from "@testing-library/react-native";

import { initI18n } from "@/i18n";

import { HomeViewerDocument } from "../Home.generated";
import HomeScreen from "../index";

jest.mock("@/state/AuthContext", () => ({
  useAuth: () => ({
    session: { user: { id: "user-1" } },
    isReady: true,
    signIn: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn(),
  }),
}));

jest.mock("@/components/Host", () => {
  const { View } = require("react-native");
  return {
    Host: ({
      children,
      style,
    }: {
      children?: React.ReactNode;
      style?: object;
    }) => <View style={style}>{children}</View>,
  };
});

beforeAll(async () => {
  await initI18n();
});

describe("HomeScreen", () => {
  it("shows the viewer name", async () => {
    const mocks: MockedResponse[] = [
      {
        request: { query: HomeViewerDocument },
        result: {
          data: {
            viewer: {
              __typename: "Viewer",
              id: "viewer-1",
              fullName: "Ada Lovelace",
            },
          },
        },
      },
    ];

    await render(
      <MockedProvider mocks={mocks}>
        <HomeScreen />
      </MockedProvider>,
    );

    expect(await screen.findByTestId("home-viewer-name")).toHaveTextContent(
      "Ada Lovelace",
    );
  });

  it("shows the retry button on error", async () => {
    const mocks: MockedResponse[] = [
      {
        request: { query: HomeViewerDocument },
        error: new Error("Network failed"),
      },
    ];

    await render(
      <MockedProvider mocks={mocks}>
        <HomeScreen />
      </MockedProvider>,
    );

    expect(await screen.findByTestId("home-retry")).toBeOnTheScreen();
    expect(screen.getByTestId("home-viewer-error")).toHaveTextContent(
      "Network failed",
    );
  });
});
