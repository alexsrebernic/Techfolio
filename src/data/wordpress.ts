interface WPGraphQLParams {
  query: string;
  variables?: object;
}
import { WORDPRESS } from "@/utils/config";

export async function wpquery({ query, variables = {} }: WPGraphQLParams) {
  if(!WORDPRESS.enabled) throw Error('Headless wordpress is not enabled')
  console.log(WORDPRESS.domain)
  const res = await fetch(`http://${WORDPRESS.domain}/graphql`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!res.ok) {
    console.error(res);
    return {};
  }

  const { data } = await res.json();
  return data;
}
