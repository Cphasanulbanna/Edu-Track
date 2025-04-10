import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

type AccordionDataObject = {
    title: string |number,
    content?: string | number,
    renderJsx?: () => React.ReactNode
}

type AccordionProps = {
    accordionData: AccordionDataObject[]
}

const CustomAccordion = ({ accordionData = [] }: AccordionProps) => {
  
  return (
    <Accordion  type="single" collapsible className="w-full">
      {accordionData?.map((data, index) => (
        <AccordionItem className="mt-2 first:mt-0" key={data?.title} value={String(index)}>
          <AccordionTrigger className="cursor-pointer py-4 px-5 bg-slate-300">{data?.title}</AccordionTrigger>
          <AccordionContent className="py-4 px-5 bg-slate-200">
            <p className="text-black">

            {data?.renderJsx ?  data?.renderJsx() : data?.content}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default CustomAccordion;
