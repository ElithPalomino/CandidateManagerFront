// pages/api/categories.js
import axios from "axios";

const apiUrl = process.env.API_URL;
const categoriesUrl = "tech-categories?populate=technologies&pagination[page]=";

async function fetchCategories(page = 1, allCategories = []) {
  try {
    const response = await axios.get(
      `${apiUrl}${categoriesUrl}${page}&pagination[pageSize]=100`
    );
    const categories = allCategories.concat(
      response.data.data.map((category) => category)
    );

    if (response.data.meta.pagination.pageCount > page) {
      return fetchCategories(page + 1, categories);
    } else {
      return categories;
    }
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async (req, res) => {
  const categories = await fetchCategories();
  res.status(200).json(categories);
};
