// pages/api/technologies.js
import axios from "axios";

const apiUrl = process.env.API_URL;
const technologiesUrl = "technologies?pagination[page]=";

async function fetchTechnologies(page = 1, allTechnologies = []) {
  try {
    const response = await axios.get(
      `${apiUrl}${technologiesUrl}${page}&pagination[pageSize]=100`
    );
    const tags = allTechnologies.concat(
      response.data.data.map((tag) => tag.attributes.Name)
    );

    if (response.data.meta.pagination.pageCount > page) {
      return fetchTechnologies(page + 1, tags);
    } else {
      return tags;
    }
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async (req, res) => {
  const technologies = await fetchTechnologies();
  res.status(200).json(technologies);
};
