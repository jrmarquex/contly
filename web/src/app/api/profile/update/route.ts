import { NextRequest, NextResponse } from "next/server";
import { mockAuth, mockPrisma } from "@/lib/mock-prisma";
import { updateProfileSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  const currentUser = mockAuth.getCurrentUser();
  
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const name = formData.get("name") as string;
  const displayName = formData.get("displayName") as string;

  try {
    // Validate input
    const validatedData = updateProfileSchema.parse({ name, displayName });

    // Check if displayName is already taken by another user
    const existingUser = await mockPrisma.user.findFirst({
      where: {
        handle: displayName,
        id: { not: currentUser.id }
      }
    });

    if (existingUser) {
      return NextResponse.json({ error: "Nome de exibição já está em uso" }, { status: 400 });
    }

    // Update user profile
    await mockPrisma.user.update({
      where: { id: currentUser.id },
      data: {
        name: validatedData.name,
        displayName: validatedData.displayName,
        handle: validatedData.displayName
      }
    });

    return NextResponse.redirect(new URL("/perfil", request.url));
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
