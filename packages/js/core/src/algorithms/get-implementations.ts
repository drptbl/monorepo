import { Uri, UriRedirect } from "../types";

export function getImplementations(
  abstractApi: Uri,
  redirects: readonly UriRedirect[]
): Uri[] {
  const result: Uri[] = [];

  for (const redirect of redirects) {
    // Plugin implemented check
    if (typeof redirect.to !== "string") {
      const { implemented } = redirect.to.manifest;
      const implementedApi =
        implemented.findIndex((uri) => Uri.equals(uri, abstractApi)) > -1;

      if (implementedApi) {
        result.push(new Uri(redirect.from));
      }
    } else {
      const fromUri = new Uri(redirect.from);
      if (Uri.equals(fromUri, abstractApi)) {
        result.push(new Uri(redirect.to));
      }
    }
  }

  return result;
}
