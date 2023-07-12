import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismadb";
import getCurrentUser from "@/features/getCurrentUser";
import slugify from "slugify";
import { Product, ProductVariation } from "@/types";

export async function POST(request: NextRequest, response: NextResponse) {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return NextResponse.json({
      status: 401,
      message: "You are not authorized",
    });

  try {
    const formData: Product = await request.json();

    const slug = slugify(formData.name, { lower: true });

    const iftitleexit = await prisma.product.findFirst({
      where: {
        slug,
      },
    });

    if (iftitleexit) {
      return NextResponse.json({
        status: 401,
        message: "Product already exist",
      });
    }

    let newproduct: any;

    newproduct = await prisma.product.create({
      data: {
        category: {
          connect: { id: +formData.categoryId },
        },
        name: formData.name,
        slug,
        published: true,
        shortDesc: formData.shortDesc,
        longDesc: formData.longDesc,
        price: +formData.price,
        discountPrice: +formData.discountPrice,
        badge: formData.badge,
        quantity: +formData.quantity,
        weightDimension: JSON.stringify(formData.weightDimension),
        specifications: JSON.stringify(formData.specifications),
        mainImage: JSON.stringify(formData.images),
        variationType: formData.variationType,
        itemCode: formData.itemCode,
        itemSeries: formData.itemSeries,
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
        metaKeywords: formData.metaKeywords,
        createdBy: {
          connect: { id: currentUser.id },
        },
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    });

    if (
      formData.variationType === "variationbycolor" ||
      formData.variationType === "variationbysize"
    ) {
      const variation: ProductVariation[] = (formData.variation || []).map(
        (variation) => ({
          productId: newproduct.id as number,
          name: variation.name,
          price: +variation.price,
          quantity: +variation.quantity,
          size: variation.size,
          itemCode: variation.itemCode,
          colorImage: variation.images ? variation.images[0] : undefined,
          images: variation.images
            ? JSON.stringify(variation.images)
            : undefined,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      );

      await prisma.productVariation.createMany({
        data: variation,
      });
    } else if (formData.variationType === "variationbymulti") {
      const productVariationCreateManyInputs = [];
      for (const product of formData.variation || []) {
        for (const size of product.size || []) {
          const productVariation = {
            productId: newproduct.id as number,
            name: product.name,
            colorImage: product.colorImage,
            size: size.name,
            price: +size.price,
            quantity: +size.stock,
            itemCode: size.itemCode,
          };
          productVariationCreateManyInputs.push(productVariation);
        }
      }

      await prisma.productVariation.createMany({
        data: productVariationCreateManyInputs,
      });
    }

    return NextResponse.json({ success: true, data: newproduct });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      message: error.message || error.toString(),
    });
  }
}
