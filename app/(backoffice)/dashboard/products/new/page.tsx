import NewHeader from "@/components/backoffice/NewHeader";
import CreateNewProductForm from "@/components/forms/CreateNewProductForm";

export default function NewProduct() {

  return (
    <div className="md:px-16">
      <NewHeader title="Add New Products" subTitle="product list" />
      <CreateNewProductForm />
    </div>
  );
}
