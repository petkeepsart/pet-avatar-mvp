import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { imageUrl } = await req.json();
    if (!imageUrl || typeof imageUrl !== "string") {
      return NextResponse.json({ error: "Missing or invalid imageUrl" }, { status: 400 });
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Return a mock generated result URL
    const mockResultUrl = "https://example.com/generated/mock-result.png";
    return NextResponse.json({ resultUrl: mockResultUrl });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
