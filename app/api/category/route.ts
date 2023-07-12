import getCurrentUser from "@/features/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismadb";

export async function POST(request: NextRequest, response: NextResponse) {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return NextResponse.json({
      status: 401,
      message: "You are not authorized",
    });

  try {
    const formData = await request.json();

    let response;

    if (
      formData.parentCategory === null ||
      formData.parentCategory === undefined
    ) {
      response = await prisma.category.create({
        data: {
          ...formData,
          createdBy: {
            connect: { id: currentUser.id },
          },
        },
      });
    } else {
      response = await prisma.category.create({
        data: {
          ...formData,
          parentCategory: {
            connect: { id: formData.parentCategory },
          },
          published: formData.subcategoryPublished,
          createdBy: {
            connect: { id: currentUser.id },
          },
        },
      });
    }

    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error("Error creating category and subcategory:", error);
    return NextResponse.json({
      message: "Error creating category and subcategory",
    });
  }
}

export async function GET(request: NextRequest, response: NextResponse) {
  const page = request.nextUrl.searchParams.get("page");
  const limit = request.nextUrl.searchParams.get("limit");

  let skip = 0;
  let take = undefined;
  let totalItems = 0;
  let totalPages = 0;

  if (page && limit) {
    skip = (parseInt(page) - 1) * parseInt(limit);
    take = parseInt(limit);

    totalItems = await prisma.category.count({
      where: {
        parentCategory: null,
      },
    });

    totalPages = Math.ceil(totalItems / take);
  }

  try {
    const categories = await prisma.category.findMany({
      where: {
        parentCategory: null,
      },
      include: {
        subcategories: true,
      },
      skip,
      take,
    });

    return NextResponse.json({ success: true, categories, totalPages });
  } catch (error) {
    console.error("Error getting category:", error);
    NextResponse.json({ message: "Error getting category" });
  }
}

export async function DELETE(request: NextRequest, response: NextResponse) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id)
    return NextResponse.json({
      success: false,
      message: "Error deleting category",
    });
  try {
    const category = await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        published: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    NextResponse.json({ success: false, message: "Error deleting category" });
  }
}

export async function PUT(request: NextRequest, response: NextResponse) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id)
    return NextResponse.json({
      success: false,
      message: "Error activating category",
    });
  try {
    const category = await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        published: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Category activated successfully",
    });
  } catch (error) {
    NextResponse.json({ success: false, message: "Error activating category" });
  }
}
