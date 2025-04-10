import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

type AccordionDataObject = {
    title: string,
    content?: string,
    renderJsx?: () => React.ReactNode
}

type AccordionProps = {
    accordionData: AccordionDataObject[]
}

const CustomAccordion = ({accordionData=[]}: AccordionProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {accordionData?.map((data) => (
        <AccordionItem key={data?.title} value={data?.title}>
          <AccordionTrigger>{data?.title}</AccordionTrigger>
          <AccordionContent>
            {data?.renderJsx ?  data?.renderJsx() : data?.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default CustomAccordion;
