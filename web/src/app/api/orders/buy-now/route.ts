import { NextRequest, NextResponse } from "next/server";
import { mockAuth, mockPrisma } from "@/lib/mock-prisma";
import { redirect } from "next/navigation";

export async function POST(request: NextRequest) {
  const currentUser = mockAuth.getCurrentUser();
  
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const productId = formData.get("productId") as string;

  if (!productId) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }

  try {
    // Get the product
    const product = await mockPrisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.status === "OUT_OF_STOCK") {
      return NextResponse.json({ error: "Product is out of stock" }, { status: 400 });
    }

    // Create order with PENDING status
    const order = await mockPrisma.order.create({
      data: {
        userId: currentUser.id,
        status: "PENDING",
        total: product.price,
        items: {
          create: {
            productId: product.id,
            quantity: 1,
            price: product.price
          }
        }
      }
    });

    // Redirect to orders page
    return NextResponse.redirect(new URL("/pedidos", request.url));
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
