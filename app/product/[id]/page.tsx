
import products from "../../data/products";
import ProductDetails from "./ProductDetailsClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return <div>Product not found.</div>;
  }

  return <ProductDetails product={product} />;
}