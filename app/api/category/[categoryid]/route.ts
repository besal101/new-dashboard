import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismadb";

interface IParams {
  categoryid?: number;
}

export async function GET(
  request: NextRequest,
  { params }: { params: IParams }
) {
  let { categoryid } = params;

  if (!categoryid || typeof categoryid !== "string") {
    throw new Error("Invalid category id");
  }

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: +categoryid,
      },
    });
    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error("Error getting category:", error);
    NextResponse.json({ message: "Error getting category" });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: IParams }
) {
  let { categoryid } = params;
  const formData = await request.json();

  if (!categoryid || typeof categoryid !== "string") {
    throw new Error("Invalid category id");
  }

  try {
    const category = await prisma.category.update({
      where: {
        id: +categoryid,
      },
      data: formData,
    });

    return NextResponse.json({
      success: true,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.error("Error updating category:", error);
    NextResponse.json({ message: "Error updating category" });
  }
}
