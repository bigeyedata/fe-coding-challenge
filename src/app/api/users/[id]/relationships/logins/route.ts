import { UserLogins } from "@/types";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = parseInt(params.id, 10);

    if (isNaN(userId)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 },
      );
    }

    // Read the user_logins.json file
    const filePath = path.join(process.cwd(), "src/data/user_logins.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const userLogins: UserLogins[] = JSON.parse(fileContents);

    // Find the user by ID
    const userLogin = userLogins.find((user) => user.user_id === userId);

    if (!userLogin) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data: userLogin.logins });
  } catch (error) {
    console.error("Error fetching user logins:", error);
    return NextResponse.json(
      { error: "Failed to fetch user logins" },
      { status: 500 },
    );
  }
}
