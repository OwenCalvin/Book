# Book
**Demo at https://ven.daven.io/**  

With Book you can create your own book simply, with 2 commands  
``` bash
# Create one page
npm run pages create

# do it after creating (with pages create command), deleting or renaming a page file)
npm run pages compile
``` 

## How it works ?
Each Vue components (page) are loaded/unloaded dynamicaly. In a web client you can't use fs to get a component file so you need to reference it to a file...  
**compile** command do it automaticaly, the function get all pages in the folder: *src/pager/pages/* and reference it into **pagesInfos.js** (*src/pager/*) file (JSON format).  
Then... *loader.js* use this file to load view and page number, into Article.vue component (*/src/components/Pager.vue*)

## Costum your pages
All pages can be customize, you can use sass, css, html, vue components, ... in your pages.  
The default pages style are located into *src/style/page.scss*.  
You can add your own and add it into the bottom of your page file  
**Example:**
``` scss
<style lang="scss" scoped>
  @import '../../style/page.scss';
</style>
```

## File location
**Pages:**  
*src/pager/pages/*    

**page.scss (pages default style):**  
*src/style/page.scss*    

**Pager.vue (Where pages are loaded):**  
*/src/components/Pager.vue*  

**loader.js:**  
*src/pager/loader.js*   

**pagesInfos.js (do not touch this file):**  
*src/pager/pagesInfos.js*   

**App.vue (Main vue, and style):**  
*src/App.vue*    

**pages.js (Compiler, and pages creating tool):**  
*/build/pages/pages.js*   

**Template.vue (The default page, when you create some pages -> custom it):**  
*/build/pages/Template.vue*

## Commands

``` bash
# install dependencies
npm install

# create one new pages
npm run pages create

# create multiple new pages
# example: npm run pages create 3
npm run pages create n

# do it after creating pages (with pages create command), if you delete or rename pages
npm run pages compile

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
