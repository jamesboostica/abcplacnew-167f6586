import { CategoryPage } from "@/components/abc/CategoryPage";
import { allTenants, type Tenant } from "@/data/abcPlace";
import heroImg from "@/assets/im-bank.webp";

const items: Tenant[] = allTenants.filter(
  (t) =>
     t.category === "Professional Services" ||
    t.category === "Guest & Building Services",
);

const SERVICE_SUBS = ["Banking", "Corporate", "Certification", "Business Support"];

const Services = () => (
  <CategoryPage
    routePrefix="/services"
    eyebrow="Professional Nairobi"
    hero="Professional Nairobi"
    intro="Every professional service you need, in the address Westlands trusts."
    heroImage={heroImg}
    items={items}
    subcategories={SERVICE_SUBS}
  />
);

export default Services;
