import { ApolloClient, ApolloLink, gql, InMemoryCache } from "@apollo/client";
import { firstValueFrom, Observable } from "rxjs";

import { createAuthLink } from "@/lib/apollo";

const TEST_QUERY = gql`
  query TestQuery {
    __typename
  }
`;

describe("createAuthLink", () => {
  it("sets authorization when a token is present", async () => {
    let capturedHeaders: Record<string, unknown> | undefined;

    const terminatingLink = new ApolloLink((operation) => {
      capturedHeaders = operation.getContext().headers as
        Record<string, unknown> | undefined;

      return new Observable((subscriber) => {
        subscriber.next({ data: {} });
        subscriber.complete();
      });
    });

    const link = ApolloLink.from([
      createAuthLink(async () => "abc"),
      terminatingLink,
    ]);
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: ApolloLink.empty(),
    });

    await firstValueFrom(
      ApolloLink.execute(link, { query: TEST_QUERY }, { client }),
    );

    expect(capturedHeaders?.authorization).toBe("Bearer abc");
  });

  it("does not set authorization when the token is missing", async () => {
    let capturedHeaders: Record<string, unknown> | undefined;

    const terminatingLink = new ApolloLink((operation) => {
      capturedHeaders = operation.getContext().headers as
        Record<string, unknown> | undefined;

      return new Observable((subscriber) => {
        subscriber.next({ data: {} });
        subscriber.complete();
      });
    });

    const link = ApolloLink.from([
      createAuthLink(async () => null),
      terminatingLink,
    ]);
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: ApolloLink.empty(),
    });

    await firstValueFrom(
      ApolloLink.execute(
        link,
        { query: TEST_QUERY, context: { headers: {} } },
        { client },
      ),
    );

    expect(capturedHeaders).not.toHaveProperty("authorization");
  });
});
