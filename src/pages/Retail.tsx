import { CategoryPage } from "@/components/abc/CategoryPage";
import { allTenants } from "@/data/abcPlace";
import heroImg from "@/assets/onyx-pieces.webp";

const RETAIL_SUBS = ["Electronics", "Home & Kitchen", "Optical", "Jewellery", "Toys & Children", "Supermarket", "Greengrocer", "Butchery", "Marketplace"];

const Retail = () => (
  <CategoryPage
    routePrefix="/retail"
    eyebrow="Shopping Experience"
    hero="The Shopping Experience"
    intro="A considered selection of retail — each tenant chosen to serve the full arc of a well-lived life in Westlands."
    heroImage={heroImg}
    items={allTenants.filter(
      (r) => r.category === "Retail & Lifestyle" || r.category === "Gourmet & Grocery",
    )}
    subcategories={RETAIL_SUBS}
  />
);

export default Retail;