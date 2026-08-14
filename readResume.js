import fs from "fs";
import { parse } from "path";
import {PDFParse} from "pdf-parse";
const pdfBuffer=fs.readFileSync("./resumes/resume.pdf");


async function readResume() {
  const parser = new PDFParse({data:pdfBuffer});
  const result = await parser.getText();
  console.log(result.text);
  await parser.destroy();
}

readResume()
