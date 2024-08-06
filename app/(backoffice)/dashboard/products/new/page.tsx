import NewHeader from "@/components/backoffice/NewHeader";
import CreateNewProductForm from "@/components/forms/CreateNewProductForm";

export default function NewProduct() {

  return (
    <div className="max-w-6xl mx-auto">
      <NewHeader title="Add New Products" subTitle="product list" />
      <CreateNewProductForm />
    </div>
  );
}
