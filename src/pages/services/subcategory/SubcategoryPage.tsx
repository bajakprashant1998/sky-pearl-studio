import { useParams } from "react-router-dom";
import { services, getServiceBySlug } from "@/data/services";
import SubcategoryPageLayout from "@/components/SubcategoryPageLayout";
import NotFound from "@/pages/NotFound";

const SubcategoryPage = () => {
  const { serviceSlug, subcategoryId } = useParams<{ serviceSlug: string; subcategoryId: string }>();
  
  if (!serviceSlug || !subcategoryId) {
    return <NotFound />;
  }
  
  const service = getServiceBySlug(serviceSlug);
  
  if (!service) {
    return <NotFound />;
  }
  
  const subcategory = service.subcategories.find(sub => sub.id === subcategoryId);
  
  if (!subcategory) {
    return <NotFound />;
  }
  
  return (
    <SubcategoryPageLayout
      serviceIcon={service.icon}
      serviceSlug={service.slug}
      serviceTitle={service.shortTitle}
      subcategoryId={subcategory.id}
      subcategoryTitle={subcategory.title}
      items={subcategory.items}
    />
  );
};

export default SubcategoryPage;
