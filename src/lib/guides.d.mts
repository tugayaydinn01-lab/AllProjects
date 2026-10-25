export type Guide = {heading:string;summary:string;steps:string[];formula:string;example:string;cautions:string[];related:Array<{href:string;label:string}>};
export const calculatorGuides: Record<string, Guide>;
export const pageGuides: Record<string, Guide>;
