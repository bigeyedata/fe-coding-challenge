import { User } from "@/types";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  try {
    // Read the users.json file
    const filePath = path.join(process.cwd(), "src/data/users.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const users: User[] = JSON.parse(fileContents);

    return NextResponse.json({ data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
