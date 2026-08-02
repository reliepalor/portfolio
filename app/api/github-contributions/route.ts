import { NextResponse } from "next/server";

const QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: QUERY,
      variables: { username: process.env.NEXT_PUBLIC_GITHUB_USERNAME },
    }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }

  const json = await res.json();

  if (json.errors) {
    return NextResponse.json({ error: json.errors[0].message }, { status: 500 });
  }

  const calendar = json.data.user.contributionsCollection.contributionCalendar;
  return NextResponse.json(calendar);
}