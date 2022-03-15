const getNews=async function()
{
   try {
    const res=await fetch('https://newsapi.org/v2/everything?q=tesla&from=2021-12-13&sortBy=publishedAt&apiKey=fa3eaa3dc2b947e7958de87e8ef715d8')
    const data=await res.json()
    console.log(data);
    
   } catch (error) {
       console.log(error);
   }
}
getNews();
module.exports=getNews;