import { FormProvider, useForm } from "react-hook-form";
import FormController from "./FormController";
import { SearchIcon } from "lucide-react";
import { SearchInputProps } from "@/types/components";

type SearchForm = {
  search?: string;
};

const SearchInput = ({searchTerm, searchData}:SearchInputProps) => {
      const form = useForm<SearchForm>({
        mode: "all",
        defaultValues: { search: "" },
      });
      const {
        control,
        formState: { errors },
      } = form;
  return (
         <div className="w-[300px] mb-2">
        <FormProvider {...form}>
          <FormController
            control={control}
            errors={errors}
            value={searchTerm}
            name={"search"}
            placeholder="Search"
            onChange={searchData}
            leftContent={<SearchIcon className="w-4 h-4" />}
          />
        </FormProvider>
      </div>
  )
}

export default SearchInput