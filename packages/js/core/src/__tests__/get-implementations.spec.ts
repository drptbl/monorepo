import {
  getImplementations,
  Uri,
  UriRedirect,
  SchemaDocument,
  Plugin,
} from "../";

describe("getImplementations", () => {
  it("works in the typical case", () => {
    const implementations: UriRedirect[] = [
      {
        from: "authority/some-abstract-interface",
        to: "one/1",
      },
      {
        from: "authority/some-abstract-interface",
        to: {
          factory: () => ({} as Plugin),
          manifest: {
            schema: "",
            implemented: [new Uri("authority/some-abstract-interface")],
            imported: [],
          },
        },
      },
      {
        from: "something/else",
        to: {
          factory: () => ({} as Plugin),
          manifest: {
            schema: "",
            implemented: [new Uri("authority/some-abstract-interface")],
            imported: [new Uri("something/else-2")],
          },
        },
      },
    ];

    const others: UriRedirect[] = [
      {
        from: "some-other/other",
        to: "other/other",
      },
      {
        from: "some-other/other1",
        to: {
          factory: () => ({} as Plugin),
          manifest: {
            schema: "",
            implemented: [],
            imported: [],
          },
        },
      },
    ];

    const result = getImplementations(
      new Uri("authority/some-abstract-interface"),
      [...implementations, ...others]
    );

    const values = implementations.map((item) => {
      if (typeof item.to === "string") {
        return new Uri(item.to);
      } else {
        return new Uri(item.from);
      }
    });
    expect(result).toMatchObject(values);
  });
});
