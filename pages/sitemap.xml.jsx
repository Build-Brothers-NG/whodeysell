import Axios from "axios";
import { CleanURL } from "simple-sharer";
function generateSiteMap(items) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://whodeysell.com.ng</loc>
        <priority>1.0</priority>
     </url>
     <url>
       <loc>https://whodeysell.com.ng/add</loc>
       <priority>0.9</priority>
     </url>
     <url>
       <loc>https://whodeysell.com.ng/login</loc>
       <priority>0.9</priority>
     </url>
     <url>
       <loc>https://whodeysell.com.ng/register</loc>
       <priority>0.9</priority>
     </url>
     <url>
       <loc>https://whodeysell.com.ng/search</loc>
       <priority>0.9</priority>
     </url>
     ${items
       .map(({ id, itemName }) => {
         return `
       <url>
           <loc>https://whodeysell.com.ng/item/${`${CleanURL(
             `${itemName}/${id}`
           )}`}</loc>
           <priority>1.0</priority>
           <changefreq>always</changefreq>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const data = await Axios.get(
    `https://buildbrothers.com/enenu/api/search?api=true&city=`
  );
  const sitemap = generateSiteMap(data.data.items);
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
