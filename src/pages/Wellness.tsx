import { CategoryPage } from "@/components/abc/CategoryPage";
import { allTenants, type Tenant } from "@/data/abcPlace";
import heroImg from "@/assets/healthyu-storefront.webp";

const wellness: Tenant[] = allTenants.filter(
  (t) => t.category === "Health & Wellness",
);
const WELLNESS_SUBS = ["Medical & Dental", "Optical", "Nutrition", "Therapy"];

const Wellness = () => (
  <CategoryPage
    routePrefix="/wellness"
    eyebrow="Live Well"
    hero="Live Well"
    intro="ABC Place is home to Nairobi's most considered wellness addresses — from precision nutrition to therapeutic care."
    heroImage={heroImg}
    items={wellness}
    subcategories={WELLNESS_SUBS}
  />
);

export default Wellness;
