import { remark } from "remark";
import html from 'remark-html'


export async function markdownToHTML(markdown: string) {
  const file = await remark().use(html).process(markdown)
  return file.toString()
}