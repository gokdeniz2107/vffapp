// NewsAPI'den haber başlıkları çek
export async function getNews(country = 'tr', category = 'general') {
  const apiKey = '2d88348ed5ba4df1b3ef29b54edaacc7'; // API key doğrudan burada
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Haberler alınamadı');
  return await res.json();
} 